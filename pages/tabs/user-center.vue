<template>
	<view>
		usercenter
	</view>
</template>

<script>
	import api from '@/api/api.js'
	export default {
		data() {
			return {

			};
		},
		mounted() {
			this.initData()
		},
		methods: {
			initData() {
				// api.userInfo().then(res => {
				// 	console.log(res)
				// })
			}
		}
	}
</script>

<style lang="scss">

</style>
