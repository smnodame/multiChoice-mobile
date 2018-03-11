import axios from 'axios'

export const fetchExampleLists = () => {
    return axios.get('http://192.168.1.39:8000/forms')
}

export const fetchDetail = (slug) => {
    return axios.get(`http://192.168.1.39:8000/question/?slug=${slug}`)
}

export const getPoint = (slug) => {
    return axios.get(`http://192.168.1.39:8000/point?slug=${slug}`)
}

export const sendPhoto = (user_slug, example_slug, file) => {
    const bodyFormData = new FormData()
    bodyFormData.append('user_slug', user_slug)
    bodyFormData.append('example_slug', example_slug)
    bodyFormData.append('file', {
        uri: file.uri,
        name: user_slug + '_' + example_slug,
        type: 'jpeg'
    })
    return fetch('http://192.168.1.39:8000/quickstart/upload-photo', {
        method: 'post',
        body: bodyFormData
        }).then(res => {
            if(res.status != 200) {
                return {
                    error: 'ระบบผิดพลาด ลองใหม่อีกครั้ง',
                    status: 500
                }
            }
            return res.json()
        })
}
