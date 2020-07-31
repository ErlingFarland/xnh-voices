import * as path from 'path';

const ROOT = path.resolve(__filename, '..', "..", "..")
const PROJECT_ROOT = path.resolve(__filename, '..', "..")
export const DATA_ROOT = path.join(ROOT, 'data')
export const DIST_ROOT = path.join(PROJECT_ROOT, 'dist')
export const SCHEMA_ROOT = path.join(PROJECT_ROOT, 'schemas')
export const INDEX_YAML = "index.yaml"
export const INDEX_JSON = 'index.json'