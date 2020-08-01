import React, { useState, useEffect } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { XData } from '../../../types/data'
import { loadNodeData } from '../actions/data'
import { DirPage } from '../components/DirPage'
import { CharacterPage } from '../components/CharacterPage'

interface Params {
    path?: string
}


export const FilePage = withRouter((params: RouteComponentProps<Params>) => {
    const path = params.match.params.path || ""
    const [data, setData] = useState<XData|null>(null)
    useEffect(() => {
        loadNodeData(path, setData)
        console.log(path)
    }, [path])
    if(data == null){
        return <div>Loading</div>
    }else if (data.type == 'character'){
        return <CharacterPage data={data}/>
    }else {
        return <DirPage data={data}/>
    }
})
