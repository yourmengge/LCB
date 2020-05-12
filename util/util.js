import http from '@/api/http.js';
// import CryptoJS from 'crypto-js'
const util = {
	goto(url) {
		uni.navigateTo({
			url: `/pages/${url}`,
			animationType: 'none'
		});
	},
	gotoParam(url, param) {
		uni.navigateTo({
			url: `/pages/${url}/${url}?${param}`,
			animationType: 'none'
		});
	},
	redirect(url) {
		uni.redirectTo({
			url: `/pages/${url}/${url}`
		});
	},
	switchTab(url) {
		uni.switchTab({
			url: `/pages/${url}`
		});
	},
	goBack(num) {
		uni.navigateBack({
			delta: num
		});
	},
	showToast(text, type = 'none') {
		setTimeout(() => {
			uni.showToast({
				title: text,
				duration: 2000,
				mask: true,
				icon: type,
				success() {
					console.log('success')
				},
				fail() {
					console.log('fail')
				}
			});
		}, 100)
	},
	showLoading(text) {
		uni.showLoading({
			title: text
		});
	},
	getTime: function() {
		const time = new Date();
		const year = time.getFullYear();
		const month = time.getMonth() + 1;
		const day = time.getDate();
		const hour = time.getHours();
		const minutes = time.getMinutes();
		const seconds = time.getSeconds();
		return year + '-' + this.add0(month).toString() + '-' + this.add0(day) + ' ' +
			this.add0(hour) + ':' + this.add0(minutes) + ':' + this.add0(seconds);
	},
	add0: function(num) {
		return num < 10 ? '0' + num : num;
	},
	getToken() {
		return this.getSession('token') || '';
	},
	getUserId() {
		return this.getSession('userId') || '';
	},
	getSession(key) {
		return uni.getStorageSync(key);
	},
	setSession(key, value) {
		uni.setStorageSync(key, value);
	},
	removeSession(key) {
		uni.removeStorageSync(key);
	},
	logout() {
		this.removeSession('token');
		this.removeSession('userId');
		this.switchTab('home');
		this.goto('login')
	},
	random_string(len = 32) {
		var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
		var maxPos = chars.length;
		var pwd = '';
		for (let i = 0; i < len; i++) {
			pwd += chars.charAt(Math.floor(Math.random() * maxPos));
		}
		return pwd;
	},
	judgement(time) {
		/**
		 * 时间差是毫秒,将时间差除于60000得出时间差的分钟数,
		 * 将时间差除以60并取整,得出相差多少小时
		 * 将时间差除以(60 * 24)并取整,得出相差多少天
		 * 将时间差除以(60 * 24 * 30)并取整,得出相差多少月
		 * 将时间差除以(60 * 24 * 30 * 12)并取整,得出相差多少年
		 */
		time = time / 60000; // 
		if (time <= 30) { // 小于30分钟
			return '刚刚';
		} else if (time > 30 && time <= 60 * 9) { // 30分钟到九小时内
			return parseInt(time / 60) == 0 ? '半小时前' : Math.floor(time / 60) + '小时前';
		} else if (time > 60 * 9 && time <= 60 * 24 * 15) { // 九小时到14天前 
			return parseInt((time / (60 * 24))) == 0 ? '半天前' : parseInt((time / (60 * 24))) + '天前';
		} else if (time > 60 * 24 * 15 && time <= 60 * 24 * 6 * 30) { // 半个月前到6个月前
			return parseInt((time / (60 * 24 * 30))) == 0 ? '半个月前' : parseInt((time / (60 * 24 * 30))) + '个月前';
		} else if (time > 60 * 24 * 6 * 30) { // 大于半年
			return parseInt((time / (60 * 24 * 30 * 12))) == 0 ? '半年前' : parseInt((time / (60 * 24 * 30 * 12))) + '年前';
		}
	},
	// 是否是刘海屏
	isNotch() {
		return plus.navigator.hasNotchInScreen();
	},
	// encryption(word, keyStr = '1234567890adbcde', ivStr = '1234567890hjlkew') {
	// 	let key = CryptoJS.enc.Utf8.parse(keyStr)
	// 	let iv = CryptoJS.enc.Utf8.parse(ivStr)
	// 	let srcs = CryptoJS.enc.Utf8.parse(word);
	// 	var encrypted = CryptoJS.AES.encrypt(srcs, key, {
	// 		iv: iv,
	// 		mode: CryptoJS.mode.CBC,
	// 		padding: CryptoJS.pad.ZeroPadding
	// 	});
	// 	// console.log("-=-=-=-", encrypted.ciphertext)
	// 	return CryptoJS.enc.Base64.stringify(encrypted.ciphertext);

	// },
	// dateReplace(date, type) {
	// 	return this.DateFormat(date.replace(/-/g, '/'), type)
	// },
	DateFormat(param, type) {
		let date = new Date(param).getDate();
		let year = new Date(param).getFullYear();
		let month = new Date(param).getMonth() + 1;
		let hour = new Date(param).getHours();
		let minutes = new Date(param).getMinutes();
		let second = new Date(param).getSeconds();
		switch (type) {
			case 'yyyy-MM-dd':
				return `${year}-${this.add0(month)}-${this.add0(date)}`;
			case 'yyyy-MM-dd hh:mm':
				return `${year}-${this.add0(month)}-${this.add0(date)} ${this.add0(hour)}:${this.add0(minutes)}`;
			case 'hh:mm':
				return `${this.add0(hour)}:${this.add0(minutes)}`;
			case 'hh:mm:ss':
				return `${this.add0(hour)}:${this.add0(minutes)}:${this.add0(second)}`;
			case '月日':
				return `${this.add0(month)}月${this.add0(date)}日`
		}
	},
	chatTime(str) {
		// 取时间字符串的前十字符，判断是否是今天，如果是今天，显示后五个字符（hh:mm）,不是今天显示日期（yyyy-MM-dd)
		if (str.substr(0, 10) == this.DateFormat(new Date(), 'yyyy-MM-dd')) {
			return str.substr(11, 5)
		} else {
			return str.substr(0, 16)
		}
	},
	getDateTime(str) {
		return new Date(str.replace(/-/g, '/')).getTime()
	},
	showTime(str) {
		// 取时间字符串的前十字符，判断是否是今天，如果是今天，显示后五个字符（hh:mm）,不是今天显示日期（yyyy-MM-dd)
		if (str.substr(0, 10) == this.DateFormat(new Date(), 'yyyy-MM-dd')) {
			return str.substr(11, 5)
		} else {
			return str.substr(0, 10)
		}
	},
	msgReg(str) {
		let imgTest = /<img.*?(?:>|\/>)/gi
		let imageTest = /<img.*?(?:>|\/>)/gi
		let videoTest = /<video.*?(?:>|\/>)/gi
		let audioTest = /<audio.*?(?:>|\/>)/gi
		let fileTest = /<a.*\/a>/gi
		let imgArray = str.match(imgTest)
		let imageArray = str.match(imageTest)
		let audioArray = str.match(audioTest)
		let videoArray = str.match(videoTest)
		let fileArray = str.match(fileTest)
		if (fileArray != null) {
			return str.replace(fileTest, '[文件]')
		} else if (imgArray != null) {
			return str.replace(imgTest, '[表情]')
		} else if (videoArray != null) {
			return str.replace(videoTest, '[视频]')
		} else if (audioArray != null) {
			return str.replace(audioTest, '[音频]')
		} else if (imageArray != null) {
			return str.replace(audioTest, '[图片]')
		} else {
			return str
		}
	},
	setTitle(name) {
		uni.setNavigationBarTitle({
			title: name
		});
	}
}

export default util
