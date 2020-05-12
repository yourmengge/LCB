import util from '@/util/util.js'
const host = 'http://139.9.130.236';
const request = {
	uniRequest(url, method, paramObj) {
		return new Promise((resolve, reject) => {
			uni.showNavigationBarLoading()
			uni.request({
				url: `${host}${url}`,
				data: paramObj,
				method: method,
				header: {
					'Content-Type': 'application/json', //自定义请求头信息
					'token': util.getToken()
				},
				success: res => {
					if (res.data.result.code == 909) {
						util.goto('login/login');
						util.showToast(res.data.result.msg);
						reject(res.data);
					} else {
						resolve({
							errno: 0,
							...res.data
						})
					}


				},
				fail: err => {
					util.showToast(err.message);
					reject(err)
				},
				complete: () => {
					uni.hideNavigationBarLoading()
				}
			})
		})
	},
	get(url, paramObj = {}) {
		return this.uniRequest(url, 'GET', paramObj)
	},
	post(url, paramObj = {}) {
		return this.uniRequest(url, 'POST', paramObj)
	},
	put(url, paramObj = {}) {
		return this.uniRequest(url, 'PUT', paramObj)
	},
	delete(url, paramObj = {}) {
		return this.uniRequest(url, 'DELETE', paramObj)
	},
	host
}
export default request
