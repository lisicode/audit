<template>
    <div>
        <transition name="van-slide-down">
            <component :is="currentComponent" v-show="tabBar"></component>
        </transition>

        <transition name="van-slide-up">
            <van-tabbar v-model="active" active-color="#409EFF" inactive-color="#303133" v-show="tabBar">
                <van-tabbar-item @click="to('application')">
                    <i class="iconfont">&#xeb96;</i>
                    <span>申请详情</span>
                </van-tabbar-item>
                <van-tabbar-item @click="to('detail')">
                    <i class="iconfont">&#xeb94;</i>
                    <span>客户详情</span>
                </van-tabbar-item>
                <van-tabbar-item @click="to('pledge')">
                    <i class="iconfont">&#xeb97;</i>
                    <span>抵质押人</span>
                </van-tabbar-item>
                <van-tabbar-item @click="to('trajectory')">
                    <i class="iconfont">&#xeb9d;</i>
                    <span>审批轨迹</span>
                </van-tabbar-item>
                <van-tabbar-item @click="to('material')">
                    <i class="iconfont">&#xeb9d;</i>
                    <span>影像材料</span>
                </van-tabbar-item>
            </van-tabbar>
        </transition>
    </div>
</template>

<script>
    const application = resolve => require(['@/components/credit/application.vue'],resolve);
    const detail = resolve => require(['@/components/credit/detail.vue'],resolve);
    const pledge = resolve => require(['@/components/credit/pledge.vue'],resolve);
    const trajectory = resolve => require(['@/components/credit/trajectory.vue'],resolve);
    const material = resolve => require(['@/components/credit/material.vue'],resolve);

    export default {
        name: 'credit',
        components: {
            application,
            detail,
            pledge,
            trajectory,
            material
        },
        data() {
            return {
                tabBar: false,
                active: 0,
                currentComponent: 'application',
            }
        },
        created() {
            let _this = this;
            setTimeout(function () {
                _this.tabBar = true;
            },600)
        },
        methods: {
            to(name) {
                this.currentComponent = name;
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
