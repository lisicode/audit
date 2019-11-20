<template>
    <van-row>
        <van-tabbar v-model="active" active-color="#409EFF" inactive-color="#303133">
            <van-tabbar-item to="/home" icon="home-o">首页</van-tabbar-item>
            <van-tabbar-item to="/flow" icon="description">流程</van-tabbar-item>
            <van-tabbar-item to="/query" icon="search">查询</van-tabbar-item>
            <van-tabbar-item to="/setting" icon="setting-o">设置</van-tabbar-item>
        </van-tabbar>
    </van-row>
</template>

<script>

    export default {
        data() {
            return {
                active: 0,
            }
        }
    }
</script>

<style scoped lang="scss">

</style>
