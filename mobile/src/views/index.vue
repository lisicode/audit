<template>
    <van-row>
        <transition name="van-slide-down">
            <component :is="currentComponent" v-show="tabBar"></component>
        </transition>
        <transition name="van-slide-up">
            <van-tabbar v-model="active" active-color="#409EFF" inactive-color="#303133" v-show="tabBar">
                <van-tabbar-item @click="to('home')">
                    <i class="iconfont">&#xeb96;</i>
                    <span>首页</span>
                </van-tabbar-item>
                <van-tabbar-item @click="to('flow')">
                    <i class="iconfont">&#xeb94;</i>
                    <span>流程</span>
                </van-tabbar-item>
                <van-tabbar-item @click="to('statistics')">
                    <i class="iconfont">&#xeb97;</i>
                    <span>统计</span>
                </van-tabbar-item>
                <van-tabbar-item @click="to('setting')">
                    <i class="iconfont">&#xeb9d;</i>
                    <span>设置</span>
                </van-tabbar-item>
            </van-tabbar>
        </transition>
    </van-row>
</template>

<script>
    const home = resolve => require(['@/components/home.vue'],resolve);
    const flow = resolve => require(['@/components/flow.vue'],resolve);
    const statistics = resolve => require(['@/components/statistics.vue'],resolve);
    const setting = resolve => require(['@/components/setting.vue'],resolve);

    export default {
        name: 'index',
        components: {
            home,
            flow,
            statistics,
            setting
        },
        data() {
            return {
                active: 0,
                tabBar: false,
                currentComponent: 'home'
            }
        },
        created() {
            let _this = this;
            setTimeout(function () {
                _this.tabBar = true
            },600)

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
    .van-tabbar-item {
        text-align: center;
        font-size: 13px;
        i {
            font-size: 20px;
        }
        span {
            display: block;
            line-height: 20px;
        }
    }
</style>
