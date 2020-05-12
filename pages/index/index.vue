<template>
	<view class="content">
		<home-page v-if="tab == 'home'"></home-page>
		<user-center v-if="tab == 'user-center'"></user-center>
		<my-footer :tab='tab'></my-footer>
	</view>
</template>

<script>
	import {
		mapGetters
	} from 'vuex'
	import homePage from '@/pages/tabs/home.vue'
	import userCenter from '@/pages/tabs/user-center.vue'
	import myFooter from '@/components/footer/myFooter.vue'
	export default {
		data() {
			return {
				title: 'Hello',
				tab: ''
			}
		},
		computed: {
			...mapGetters(['footerTab'])
		},
		watch: {
			footerTab(newValue) {
				this.tab = newValue
			}
		},
		components: {
			myFooter,
			homePage,
			userCenter
		},
		onLoad() {
			this.tab = 'user-center'
		},
		methods: {}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
