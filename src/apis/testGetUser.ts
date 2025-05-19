import util from '../utils/index'

const http = util.axiosUtil

export function getUser() {
    return http.request({
        url: '/api/getUser',
        method: 'get',
    })
}
