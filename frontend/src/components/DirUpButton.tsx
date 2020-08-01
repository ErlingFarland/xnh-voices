import { useHistory } from "react-router-dom"

import Fab from '@material-ui/core/Fab';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import React from "react";
import { CSSProperties } from "@material-ui/core/styles/withStyles";

interface Props {
    parent: string | null
}

const style: CSSProperties = {
    position: 'fixed',
    left: '1rem',
    top: '1rem'
}

export function DirUpButton({parent}: Props) {
    const history = useHistory()
    if(parent === null) return null
    return <Fab color="primary" style={style} onClick={() => history.push(`/data/${parent}`)}>
        <ArrowUpward/>
    </Fab>
}