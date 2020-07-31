import * as path from 'path';

const ROOT = path.resolve(__filename, '..', "..", "..")
const PROJECT_ROOT = path.resolve(__filename, '..', "..")
export const DATA_ROOT = path.join(ROOT, 'data')
export const DIST_ROOT = path.join(PROJECT_ROOT, 'dist')
export const DIST_DATA_ROOT = path.join(PROJECT_ROOT, 'dist', 'data')
export const SCHEMA_ROOT = path.join(PROJECT_ROOT, 'schemas')
export const CONFIG_FILE = path.join(ROOT, 'config.yaml')

export const INDEX_YAML = "index.yaml"
export const INDEX_JSON = 'index.json'

export const MEDIA_EXT_NAME = new Set('.png .jpg .jpeg .gif .webp .ogg .mp3 .wav'.split(' '))