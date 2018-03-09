import axios from 'axios'

export const fetchExampleLists = () => {
    return axios.get('http://192.168.1.39:8000/forms')
}

export const fetchDetail = (slug) => {
    return axios.get(`http://192.168.1.39:8000/question/?slug=${slug}`)
}
