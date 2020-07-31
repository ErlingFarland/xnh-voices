export interface OriginalCharacterData {
    name: string
    source: string
    cv: string
    category: "少年" | "青年" | "正太"
    language: "中文" | "日语" | "英语"
    tags: string[]

    images: {[key: string]: string}
    files: {[key: string]: string}
}

export type XCharacterData = {type: "character"} & OriginalCharacterData
export interface XDirData {
    type: "dir"
    children: {
        name: string
        path: string
    }[]
}

export type XData = XCharacterData | XDirData