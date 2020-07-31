type CategoryLiteral = "少年" | "青年" | "正太"
type LanguageLiteral = "中文" | "日语" | "英语"

interface CharacterMetaData {
    name: string
    source: string
    cv: string
    category: CategoryLiteral
    language: LanguageLiteral
    tags: string[]
}

export interface FileIndexInfo {
    title: string
    url: string
}

export type OriginalCharacterData = CharacterMetaData & {
    images: {[key: string]: string}
    files: {[key: string]: string}
}

export type XCharacterData = CharacterMetaData & {
    type: "character"
    images: FileIndexInfo[]
    files: FileIndexInfo[]
}

export interface XDirData {
    type: "dir"
    children: FileIndexInfo[]
}

export type XData = XCharacterData | XDirData

export interface XConfigFile {
    media_root: string
}