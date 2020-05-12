import http from './http.js'
const api = {
	login(data) {
		return http.post('/usr/login/ictLogin', data)
	},
	userInfo() {
		return http.get(`/usr/user/getCurrentUserInfo`)
	}
}
export default api
