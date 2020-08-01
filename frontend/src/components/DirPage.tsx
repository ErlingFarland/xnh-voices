import {XDirData} from '../../../types/data'
import React from 'react'
import { Link } from 'react-router-dom'

interface Props {
    data: XDirData
}

export function DirPage({data}: Props){
    return <ul>
        {data.children.map(c => <li key={c.title}>
            <Link to={`/data/${c.url}`}>{c.title}</Link>
        </li>)}
    </ul>
}