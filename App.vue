<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods: {
			initData() {
				const face = uni.requireNativePlugin('DC-WBFaceService');
				face.startWbFaceVerifyService({
					userId: "test_user_1",
					nonce: "xxxxxx",
					sign: "xxxxxx",
					appId: "IDAN33rz",
					orderNo: "xxxxxx",
					apiVersion: "1.0.0",
					licence: "licence",
					faceType: "1",
					compareType: "0",
					faceId: "xxxx",
					sdkConfig: {
						//Android和iOS共有的配置参数                                  
						showSuccessPage: true, //是否展示成功页面
						showFailurePage: true, //是否展示失败页面
						recordVideo: false, //是否录制视频
						playVoice: true, //是否播放语音提示
						detectCloseEyes: false, //是否检测用户闭眼
						theme: '0', //sdk皮肤设置，0黑色，1白色

						//android独有的配置参数
						isEnableLog: true, //是否打开刷脸native日志，请release版本关闭！！！

						//iOS独有的配置参数
						windowLevel: '1', //sdk中拉起人脸活体识别界面中使用UIWindow时的windowLevel配置
						manualCookie: true //是否由SDK内部处理sdk网络请求的cookie
					}
				}, result => {
					console.log("【uni log】face SDK callback ================> result.");
					console.log(result);
				});
			}
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import '@/uni.scss';
</style>
