import fs from 'fs'
import path from 'path'
import URL from 'url'
import {filter, zip} from 'lodash'
import {loadCharacterData, loadConfigData} from './data'
import rimraf from 'rimraf'
import {DATA_ROOT, INDEX_YAML, INDEX_JSON, DIST_ROOT, DIST_DATA_ROOT, MEDIA_EXT_NAME, CONFIG_FILE} from './consts'
import {OriginalCharacterData, XCharacterData, XDirData, XConfigFile, FileIndexInfo} from '../../types/data'


async function onCharacter(config: XConfigFile, fp: string, filesList: string[]): Promise<OriginalCharacterData> {
    const [relPath, dstPath] = resolvePath(fp)
    const data = await loadCharacterData(path.resolve(fp, INDEX_YAML))
    const {files, images, ...meta} = data
    await fs.promises.mkdir(dstPath)
    const targetFile = path.resolve(dstPath, INDEX_JSON)
    const out: XCharacterData = {
        type: "character",
        ...meta,
        images: getMediaUrls(config, relPath, data.images, filesList),
        files: getMediaUrls(config, relPath, data.files, filesList)
    }
    const outData = JSON.stringify(out)
    await fs.promises.writeFile(targetFile, outData)
    return data
}

async function onDir(config: XConfigFile, fp: string, children: string[]): Promise<OriginalCharacterData[]> {
    const [relPath, dstPath] = resolvePath(fp)
    await fs.promises.mkdir(dstPath)
    const targetFile = path.resolve(dstPath, INDEX_JSON)
    const childrenData = (await Promise.all(children.map(c => walk(config, path.resolve(fp, c))))).reduce((a, b) => a.concat(b))
    const out: XDirData = {
        type: "dir",
        children: zip(children, childrenData).map(([c, d]) => ({
            title: c,
            url: URL.resolve(relPath, c)
        }))
    }
    const outData = JSON.stringify(out)
    await fs.promises.writeFile(targetFile, outData)
    return []
}

function resolvePath(fp: string): [string, string] {
    const relPath = path.relative(DATA_ROOT, fp)
    const dstPath = path.resolve(DIST_DATA_ROOT, relPath)
    return [relPath, dstPath]
}

function getMediaUrls(config: XConfigFile, relPath: string, data: OriginalCharacterData['files'], files: string[]): FileIndexInfo[] {
    for(const f of Object.values(data)){
        if(!files.includes(f)){
            throw Error(`Missing file ${f} at ${relPath}`)
        }
    }
    return Object.entries(data).map(([k, v]) => ({
        title: k,
        url: URL.resolve(URL.resolve(config.media_root, relPath), v)
    }))
}

async function walk(config: XConfigFile, fp: string): Promise<OriginalCharacterData[]> {
    const list = await fs.promises.readdir(fp)
    const getLstat = f => fs.promises.lstat(path.resolve(fp, f))
    const lstat = await Promise.all(list.map(async f => (await getLstat(f))))
    const files = filter(list, (_, i) => lstat[i].isFile())
    const dirs = filter(list, (_, i) => lstat[i].isDirectory())
    if(files.includes(INDEX_YAML)){
        const data = await onCharacter(config, fp, files)
        return [data]
    }else{
        return onDir(config, fp, dirs)
    }
}

async function main() {
    const config = await loadConfigData(CONFIG_FILE)
    if(fs.existsSync(DIST_ROOT)){
        await new Promise((res, rej) => rimraf(DIST_ROOT, (err) => err ? rej(err) : res()))
    }
    await fs.promises.mkdir(DIST_ROOT)
    await walk(config, DATA_ROOT)
}

main()