<template>
	<view class="login-view">
		<view class="login-view1">
			新用户注册
		</view>
		<view class="login-view2">
			您好，
		</view>
		<view class="login-view3">
			欢迎使用联车宝
		</view>
		<view class="login-input">
			<input placeholder-class="placeholder-color" type="text" v-model="username" placeholder="请输入手机号码/帐号">
		</view>
		<view class="login-input">
			<input placeholder-class="placeholder-color" type="password" v-model="password" placeholder="请输入登录密码">
		</view>
		<view class="login-view4">
			<text>手机验证码登录</text>
		</view>
		<view class="login-view5">
			<button hover-class='large-button_hover' class="large-button" type="default" @click="login">登录</button>
		</view>
	</view>
</template>

<script>
	import md5 from 'js-md5';
	import api from '@/api/api.js'
	import util from '@/util/util.js'
	export default {
		data() {
			return {
				username: '13305020974',
				password: '123456',
				dutyTypeKey: 0
			};
		},
		methods: {
			login() {
				let data = {
					username: this.username,
					password: md5(this.password)
				}
				api.login(data).then(res => {
					if (res.result.success) {
						util.showToast('登录成功')
						util.setSession('token', res.data.token);
						setTimeout(() => {
							util.goto('index/index')
						}, 1000)
					} else {
						util.showToast(res.result.msg)
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.login-view {
		position: fixed;
		top: 0;
		width: calc(100vw - 120upx);
		padding: 0 60upx;
		height: 100vh;
		background-color: #fff;

		.login-view1 {
			text-align: right;
			font-size: 28upx;
			color: #222;
			margin-top: 70upx;
			margin-right: -20upx;
		}

		.login-view2 {
			margin-top: 78upx;
			font-size: 56upx;
			margin-bottom: 30upx;
			color: #2e2e2e;
		}

		.login-view3 {
			font-size: 34upx;
			color: #2e2e2e;
			margin-bottom: 120upx;
		}

		.login-view4 {
			color: $main-color;
			font-size: 26upx;
			margin-top: -20upx;
		}

		.login-view5 {
			margin-top: 108upx;
		}

		.login-input {
			border-bottom: solid 2upx #eee;
			padding-bottom: 30upx;
			margin-bottom: 47upx;

			input {
				color: #333;
			}
		}
	}
</style>
