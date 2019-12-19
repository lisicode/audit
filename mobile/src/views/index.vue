<template>
    <div>
        <transition name="van-slide-down">
            <component :is="currentComponent" v-on:childEvent="to" v-show="show"></component>
        </transition>
        <transition name="van-slide-up">
            <van-tabbar v-model="currentComponent" active-color="#0061D9" inactive-color="#303133" v-show="show">
                <van-tabbar-item name="home" @click="to('home')">
                    <i class="iconfont">&#xec24;</i>
                    <span>首页</span>
                </van-tabbar-item>
                <van-tabbar-item name="flow" @click="to('flow')">
                    <i class="iconfont">&#xec23;</i>
                    <span>流程</span>
                </van-tabbar-item>
<!--                <van-tabbar-item name="statistics" @click="to('statistics')">-->
<!--                    <i class="iconfont">&#xeb95;</i>-->
<!--                    <span>统计</span>-->
<!--                </van-tabbar-item>-->
                <van-tabbar-item name="setting" @click="to('setting')">
                    <i class="iconfont">&#xeb8d;</i>
                    <span>设置</span>
                </van-tabbar-item>
            </van-tabbar>
        </transition>
    </div>
</template>

<script>
    const home = resolve => require(['@/components/index/home.vue'],resolve);
    const flow = resolve => require(['@/components/index/flow.vue'],resolve);
    const statistics = resolve => require(['@/components/index/statistics.vue'],resolve);
    const setting = resolve => require(['@/components/index/setting.vue'],resolve);

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
                show: false,
                currentComponent: 'home'
            }
        },
        created() {
            // localStorage.removeItem('user');

            let _this = this;
            setTimeout(function () {
                _this.show = true;
                _this.currentComponent = _this.$store.state.nav.url;
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
