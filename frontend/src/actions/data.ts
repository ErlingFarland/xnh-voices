import axios from 'axios'
import {XData} from '../../../types/data'
import {DATA_ROOT_URL} from '../consts'

export async function loadNodeData(path: string, setData: (data: XData) => void) {
    const resp = await axios.get(`${DATA_ROOT_URL}/${path}/index.json`)
    setData(resp.data)
}
