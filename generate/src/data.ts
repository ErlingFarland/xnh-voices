import path from 'path';
import fs from 'fs';
import Ajv from 'ajv';
import Yaml from 'yaml';
import {SCHEMA_ROOT} from './consts'
import {OriginalCharacterData, XConfigFile} from '../../types/data'


async function loadSchema(name: string): Promise<any> {
    const fp = path.resolve(SCHEMA_ROOT, name + '.json')
    const data = await fs.readFileSync(fp, {encoding: 'utf-8'})
    const schema = JSON.parse(data)
    return schema
}

async function verifySchema<T>(data: any, schema: any):  Promise<T> {
    const ajv = new Ajv({loadSchema})
    const valid = ajv.validate(schema, data)
    if(!valid){
        throw new Error(ajv.errors?.map(e => e.message)?.join("\n"))
    }
    return data as T
}

async function loadYaml(fp: string): Promise<any>{
    const data = await fs.readFileSync(fp, {encoding: 'utf-8'})
    return Yaml.parse(data)
}

const characterDataSchema = loadSchema("OriginalCharacterData")
const configSchema = loadSchema("XConfigFile")

export async function loadCharacterData(fp: string): Promise<OriginalCharacterData>{
    const data = await loadYaml(fp)
    const schema = await characterDataSchema
    return verifySchema<OriginalCharacterData>(data, schema)
}

export async function loadConfigData(fp: string): Promise<XConfigFile>{
    const data = await loadYaml(fp)
    const schema = await configSchema
    return verifySchema<XConfigFile>(data, schema)
}