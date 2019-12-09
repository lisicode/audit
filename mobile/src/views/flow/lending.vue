<template>
    <div>
        <transition name="van-slide-down">
            <component :is="currentComponent" v-show="tabBar"></component>
        </transition>

        <transition name="van-slide-up">
            <van-tabbar v-model="active" active-color="#409EFF" inactive-color="#303133" v-show="tabBar">
                <van-tabbar-item @click="to('signing')">
                    <i class="iconfont">&#xeb6a;</i>
                    <span>合同签订</span>
                </van-tabbar-item>
                <van-tabbar-item @click="to('detail')">
                    <i class="iconfont">&#xeb69;</i>
                    <span>客户详情</span>
                </van-tabbar-item>
                <van-tabbar-item @click="to('trajectory')">
                    <i class="iconfont">&#xeb68;</i>
                    <span>审批轨迹</span>
                </van-tabbar-item>
                <van-tabbar-item @click="to('material')">
                    <i class="iconfont">&#xec17;</i>
                    <span>影像材料</span>
                </van-tabbar-item>
            </van-tabbar>
        </transition>
    </div>
</template>

<script>
    const detail = resolve => require(['@/components/detail.vue'],resolve);
    const signing = resolve => require(['@/components/lending/signing.vue'],resolve);
    const trajectory = resolve => require(['@/components/trajectory.vue'],resolve);
    const material = resolve => require(['@/components/material.vue'],resolve);

    export default {
        name: 'contract',
        components: {
            detail,
            signing,
            trajectory,
            material
        },
        data() {
            return {
                tabBar: false,
                active: 0,
                currentComponent: 'signing',
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
            font-size: 22px;
        }
        span {
            display: block;
            line-height: 20px;
        }
    }
</style>
