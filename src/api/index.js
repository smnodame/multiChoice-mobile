import axios from 'axios'

export const login = (username, password) => {
    const data = {
        username,
        password
    }
    return axios.post('http://192.168.1.39:8000/login', data)
}

export const fetchExampleLists = () => {
    return axios.get('http://192.168.1.39:8000/forms')
}

export const fetchDetail = (slug) => {
    return axios.get(`http://192.168.1.39:8000/question/?slug=${slug}`)
}

export const getPoint = (slug) => {
    return axios.get(`http://192.168.1.39:8000/point?slug=${slug}`)
}

export const sendPhoto = (uniq_slug, example_slug, file) => {
    if(file.platform == 'android') {
        return axios.post('http://192.168.1.39:8000/quickstart/upload-photo', {
            uniq_slug: uniq_slug,
            example_slug: example_slug,
            platform: file.platform,
            base64: file.base64
        }).then(res => {
            if(res.status != 200) {
                return {
                    error: 'ระบบผิดพลาด ลองใหม่อีกครั้ง',
                    status: 500
                }
            }
            return res.json()
        }, (err) => {
            return {
                error: 'ระบบผิดพลาด ลองใหม่อีกครั้ง',
                status: 500
            }
        })
    }
    const bodyFormData = new FormData()
    bodyFormData.append('uniq_slug', uniq_slug)
    bodyFormData.append('example_slug', example_slug)
    bodyFormData.append('file', {
        uri: file.uri,
        name: uniq_slug + '_' + example_slug,
        type: 'image/jpeg'
    })
    return fetch('http://192.168.1.39:8000/quickstart/upload-photo', {
        method: 'post',
        body: bodyFormData,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data'
        },
        }).then(res => {
            if(res.status != 200) {
                return {
                    error: 'ระบบผิดพลาด ลองใหม่อีกครั้ง',
                    status: 500
                }
            }
            return res.json()
        }, (err) => {
            return {
                error: 'ระบบผิดพลาด ลองใหม่อีกครั้ง',
                status: 500
            }
        })
}
