import {XDirData} from '../../../types/data'
import React, { CSSProperties } from 'react'
import { useHistory } from 'react-router-dom'

import List from '@material-ui/core/List';
import ListItem, { ListItemProps } from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText'
import { DirUpButton } from './DirUpButton';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

interface Props {
    data: XDirData
    relPath: string
    parent: string | null
}

const buttonStyle: CSSProperties = {
    width: "80%", 
    marginLeft: "10%",
    marginRight: "10%"
}

export function DirPage({data, parent, relPath}: Props){
    const hist = useHistory()
    return <div>
        <DirUpButton parent={parent}/>
        <Container>
        <Typography>{relPath}</Typography>
        {data.children.map(c => (
            <Button key={c.url} onClick={() => hist.push(`/data/${c.url}`)} color="primary" variant="contained" style={buttonStyle}>
                <ListItemText primary={c.title} />
            </Button>
        ))}
        </Container>
    </div>
}