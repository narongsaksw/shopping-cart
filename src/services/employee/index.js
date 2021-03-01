import axios from 'axios'

export const functionGet = async (url, callback) => {
    await axios.get(url).then(res => {
        if (res.data.dataValues != null) {
            callback(res.data.dataValues);
        }
    }).catch((error) => { console.error(error) })
}