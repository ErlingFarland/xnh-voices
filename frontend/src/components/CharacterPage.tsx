
import {XCharacterData} from '../../../types/data'
import React from 'react'

interface Props {
    data: XCharacterData
}


export function CharacterPage({data}: Props){
    return <div>
        <h1>{data.name}</h1>
        <h3>{data.cv}</h3>
        {data.images.map(img => <img src={img.url} alt={img.title} key={img.title}></img>)}
    </div>
}