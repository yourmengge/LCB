<template>
	<view class="footer">
		<view class="footer-item" v-for="(item,index) in footerArray" :key='index' @click="changeTab(item.type)">
			<view v-if="index != 2">
				<image class="footer-img" :src="footerIcon(item)" mode="aspectFill"></image>
				<view class="footer-title"><text :class="footerColor(item)">{{item.title}}</text></view>
			</view>
			<view v-else class="circle-footer">
				<view class="footer-title">{{item.title}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapGetters
	} from 'vuex'
	import staticData from '@/util/staticData.js'
	export default {
		data() {
			return {
				footerArray: [{
					type: 'home',
					icon: `${staticData.imgPath}/tabbar_home.png`,
					selectIcon: `${staticData.imgPath}/tabbar_home_pre.png`,
					title: '首页'
				}, {
					type: 'profit',
					icon: `${staticData.imgPath}/tabbar_profit.png`,
					selectIcon: `${staticData.imgPath}/tabbar_profit_pre.png`,
					title: '收藏'
				}, {
					type: 'home',
					icon: `${staticData.imgPath}/tabbar_home.png`,
					selectIcon: `${staticData.imgPath}/tabbar_home_pre.png`,
					title: '发货'
				}, {
					type: 'info',
					icon: `${staticData.imgPath}/tabbar_info.png`,
					selectIcon: `${staticData.imgPath}/tabbar_info_pre.png`,
					title: '消息'
				}, {
					type: 'user-center',
					icon: `${staticData.imgPath}/tabbar_personal.png`,
					selectIcon: `${staticData.imgPath}/tabbar_personal_pre.png`,
					title: '我的'
				}]
			}
		},
		props: {
			tab: '',
		},
		computed: {
			...mapGetters(['footerTab'])
		},
		watch: {
			footerTab(newValue) {
				this.tab = newValue
			}
		},
		methods: {
			changeTab(type) {
				this.$store.commit('SET_TAB', type)
			},
			footerIcon(item) {
				return this.tab == item.type ? item.selectIcon : item.icon
			},
			footerColor(item) {
				return this.tab == item.type ? 'main-color' : ''
			}
		}
	}
</script>

<style>
</style>
