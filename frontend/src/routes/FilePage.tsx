import React, { useState, useEffect } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { XData } from '../../../types/data'
import { loadNodeData } from '../actions/data'
import { DirPage } from '../components/DirPage'
import { CharacterPage } from '../components/CharacterPage'
import Skeleton from '@material-ui/lab/Skeleton'

interface Params {
    path?: string
}


export const FilePage = withRouter((params: RouteComponentProps<Params>) => {
    const path = params.match.params.path || ""
    const [data, setData] = useState<XData|null>(null)
    useEffect(() => {
        loadNodeData(path, setData)
    }, [path])
    const parent = path ? path.split("/").slice(0, -1).join("/") : null
    if(data == null){
        return <Skeleton variant="rect" width={210} height={118} />
    }else if (data.type === 'character'){
        return <CharacterPage data={data} parent={parent}/>
    }else {
        return <DirPage data={data} parent={parent} relPath={path}/>
    }
})
