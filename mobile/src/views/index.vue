<template>
    <van-row>
        <component :is="currentComponent"></component>
        <van-tabbar v-model="active" active-color="#409EFF" inactive-color="#303133">
            <van-tabbar-item @click="to('home')" icon="home-o">首页</van-tabbar-item>
            <van-tabbar-item @click="to('flow')" icon="description">流程</van-tabbar-item>
            <van-tabbar-item @click="to('query')" icon="search">查询</van-tabbar-item>
            <van-tabbar-item @click="to('setting')" icon="setting-o">设置</van-tabbar-item>
        </van-tabbar>
    </van-row>
</template>

<script>
    const home = resolve => require(['@/components/home.vue'],resolve);
    const flow = resolve => require(['@/components/flow.vue'],resolve);
    const query = resolve => require(['@/components/query.vue'],resolve);
    const setting = resolve => require(['@/components/setting.vue'],resolve);

    export default {
        name: 'index',
        components: {
            home,
            flow,
            query,
            setting
        },
        data() {
            return {
                active: 0,
                currentComponent: 'home'
            }
        },
        created() {

        },
        methods: {
            to(e) {
                this.currentComponent = e;
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
