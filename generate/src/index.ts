import fs from 'fs'
import path from 'path'
import {filter, zip} from 'lodash'
import {loadCharacterData} from './data'
import rimraf from 'rimraf'
import {DATA_ROOT, INDEX_YAML, INDEX_JSON, DIST_ROOT} from './consts'
import {OriginalCharacterData, XCharacterData, XDirData} from '../../types/data'


async function onCharacter(fp: string, ): Promise<OriginalCharacterData> {
    const [relPath, dstPath] = resolvePath(fp)
    const data = await loadCharacterData(path.resolve(fp, INDEX_YAML))
    await fs.promises.mkdir(dstPath)
    const targetFile = path.resolve(dstPath, INDEX_JSON)
    const out: XCharacterData = {
        type: "character",
        ...data
    }
    const outData = JSON.stringify(out)
    await fs.promises.writeFile(targetFile, outData)
    return data
}

async function onDir(fp: string, children: string[]): Promise<OriginalCharacterData[]> {
    const [relPath, dstPath] = resolvePath(fp)
    await fs.promises.mkdir(dstPath)
    const targetFile = path.resolve(dstPath, INDEX_JSON)
    const childrenData = (await Promise.all(children.map(c => walk(path.resolve(fp, c))))).reduce((a, b) => a.concat(b))
    const out: XDirData = {
        type: "dir",
        children: zip(children, childrenData).map(([c, d]) => ({
            name: c,
            path: path.join(relPath, c)
        }))
    }
    const outData = JSON.stringify(out)
    await fs.promises.writeFile(targetFile, outData)
    return []
}

function resolvePath(fp: string): [string, string] {
    const relPath = path.relative(DATA_ROOT, fp)
    const dstPath = path.resolve(DIST_ROOT, relPath)
    return [relPath, dstPath]
}

async function walk(fp: string): Promise<OriginalCharacterData[]> {
    const list = await fs.promises.readdir(fp)
    const getLstat = f => fs.promises.lstat(path.resolve(fp, f))
    const lstat = await Promise.all(list.map(async f => (await getLstat(f))))
    const files = filter(list, (_, i) => lstat[i].isFile())
    const dirs = filter(list, (_, i) => lstat[i].isDirectory())
    if(files.includes(INDEX_YAML)){
        const data = await onCharacter(fp)
        return [data]
    }else{
        return onDir(fp, dirs)
    }
}

async function main() {
    if(fs.existsSync(DIST_ROOT)){
        await new Promise((res, rej) => rimraf(DIST_ROOT, (err) => err ? rej(err) : res()))
    }
    await walk(DATA_ROOT)
}

main()