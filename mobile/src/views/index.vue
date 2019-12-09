<template>
    <div>
        <transition name="van-slide-down">
            <component :is="currentComponent" v-show="tabBar"></component>
        </transition>
        <transition name="van-slide-up">
            <van-tabbar v-model="active" active-color="#409EFF" inactive-color="#303133" v-show="tabBar">
                <van-tabbar-item @click="to('home')">
                    <i class="iconfont">&#xec24;</i>
                    <span>首页</span>
                </van-tabbar-item>
                <van-tabbar-item @click="to('flow')">
                    <i class="iconfont">&#xec23;</i>
                    <span>流程</span>
                </van-tabbar-item>
                <van-tabbar-item @click="to('statistics')">
                    <i class="iconfont">&#xeb95;</i>
                    <span>统计</span>
                </van-tabbar-item>
                <van-tabbar-item @click="to('setting')">
                    <i class="iconfont">&#xeb8d;</i>
                    <span>设置</span>
                </van-tabbar-item>
            </van-tabbar>
        </transition>
    </div>
</template>

<script>
    const home = resolve => require(['@/components/home/home.vue'],resolve);
    const flow = resolve => require(['@/components/home/flow.vue'],resolve);
    const statistics = resolve => require(['@/components/home/statistics.vue'],resolve);
    const setting = resolve => require(['@/components/home/setting.vue'],resolve);

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
                _this.tabBar = true;
                _this.currentComponent = _this.$store.state.nav.type;
                _this.active = _this.$store.state.nav.index;
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
