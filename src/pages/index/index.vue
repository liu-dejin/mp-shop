<script setup lang="ts">
import { getHomeBannerApi, getHomeCategoryiApi, getHomeHotApi } from '@/services/home'
import CustomNavbar from './components/CustomNavbar.vue'
import CategoryPanel from './components/CategoryPanel.vue'
import HotPanel from './components/HotPanel.vue'
import PageSkeleton from './components/PageSkeleton.vue'
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import type { BannerItem, CategoryItem, HotItem } from '@/types/home'
import type { XtxGuessInstance } from '@/types/component'
// 获取轮播图数据
const bannerList = ref<BannerItem[]>([])
const getHomeBannerData = async () => {
  const res = await getHomeBannerApi()
  bannerList.value = res.result
}
// 获取前台分类面板数据
const categoryList = ref<CategoryItem[]>([])
const getCategoryData = async () => {
  const res = await getHomeCategoryiApi()
  categoryList.value = res.result
}
// 获取热门推荐数据
const hotList = ref<HotItem[]>([])
const getHomeHotData = async () => {
  const res = await getHomeHotApi()
  hotList.value = res.result
}

const guessRef = ref<XtxGuessInstance>()
// 滚动触底
const onScrolltoLower = async () => {
  guessRef.value?.getMore()
}
const isTriggered = ref(false)
const isloading = ref(false)
// 下拉刷新
const onRefresherrefresh = async () => {
  // 开启动画
  isTriggered.value = true
  // 重置猜你喜欢
  guessRef.value?.resetData()
  // 加载数据
  await Promise.all([
    getHomeBannerData(),
    getCategoryData(),
    getHomeHotData(),
    guessRef.value?.getMore(),
  ])
  // 关闭动画
  isTriggered.value = false
}
onLoad(async () => {
  isloading.value = true
  await Promise.all([getHomeBannerData(), getCategoryData(), getHomeHotData()])
  isloading.value = false
})
</script>

<template>
  <!-- 自定义导航条 -->
  <CustomNavbar />
  <scroll-view
    refresher-enabled
    :refresher-triggered="isTriggered"
    @refresherrefresh="onRefresherrefresh"
    @scrolltolower="onScrolltoLower"
    class="scroll-view"
    scroll-y
  >
    <!-- 骨架屏 -->
    <PageSkeleton v-if="isloading" />
    <template v-else>
      <!-- 自定义轮播图 -->
      <XtxSwiper :list="bannerList" />
      <!-- 分类面板 -->
      <CategoryPanel :list="categoryList" />
      <!-- 热门推荐 -->
      <HotPanel :list="hotList" />
      <!-- 猜你喜欢 -->
      <XtxGuess ref="guessRef" />
    </template>
  </scroll-view>
</template>

<style lang="scss">
page {
  background-color: #f7f7f7;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.scroll-view {
  flex: 1;
}
</style>
