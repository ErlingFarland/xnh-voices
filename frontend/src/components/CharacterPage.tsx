
import {XCharacterData, FileIndexInfo} from '../../../types/data'
import React from 'react'

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import { DirUpButton } from './DirUpButton';
import Grid from '@material-ui/core/Grid';


const galleryImageStyle: CSSProperties = {
    maxHeight: '100%',
    objectFit: 'contain'
}

function renderGallery(images: FileIndexInfo[]){
    return <GridList cellHeight={window.innerHeight / 2}>
        {images.map(({title, url}) => (
            <GridListTile key={url}>
                <img src={url} alt={title} style={galleryImageStyle}/>
                <GridListTileBar title={title}/>
            </GridListTile>
        ))}
    </GridList>
}

function renderAudios(files: FileIndexInfo[]){
    return <Grid container>
        {files.map(({title, url}) => (
            <Grid item key={url}>
                <audio src={url} controls/>
            </Grid>
        ))}
    </Grid>
}

interface Props {
    data: XCharacterData
    parent: string | null
}


export function CharacterPage({data, parent}: Props){
    return <div>
        <DirUpButton parent={parent}/>
        <h1>{data.name}</h1>
        <h3>{data.cv}</h3>
        {renderGallery(data.images)}
        {renderAudios(data.files)}
    </div>
}