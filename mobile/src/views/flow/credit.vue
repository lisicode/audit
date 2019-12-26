<template>
    <div>
        <transition name="van-slide-down">
            <component :is="currentComponent" v-show="show"></component>
        </transition>

        <transition name="van-slide-up">
            <van-tabbar v-model="currentComponent" active-color="#0061D9" inactive-color="#303133" v-show="show">
                <van-tabbar-item name="approve" @click="to('approve')">
                    <i class="iconfont">&#xeb6b;</i>
                    <span>授信审批</span>
                </van-tabbar-item>
                <van-tabbar-item name="detail" @click="to('detail')">
                    <i class="iconfont">&#xeb69;</i>
                    <span>客户详情</span>
                </van-tabbar-item>
                <van-tabbar-item name="pledge" @click="to('pledge')" v-if="this.$store.state.guaranteeMode == '1' || this.$store.state.guaranteeMode == '2'">
                    <i class="iconfont">&#xeb67;</i>
                    <span>抵质押详情</span>
                </van-tabbar-item>
                <van-tabbar-item name="guarantor" @click="to('guarantor')" v-if="this.$store.state.guaranteeMode == '3'">
                    <i class="iconfont">&#xeb67;</i>
                    <span>保证人详情</span>
                </van-tabbar-item>
                <van-tabbar-item name="trajectory" @click="to('trajectory')">
                    <i class="iconfont">&#xeb68;</i>
                    <span>审批轨迹</span>
                </van-tabbar-item>
                <van-tabbar-item name="material" @click="to('material')">
                    <i class="iconfont">&#xec17;</i>
                    <span>影像材料</span>
                </van-tabbar-item>
            </van-tabbar>
        </transition>
    </div>
</template>

<script>
    const approve = resolve => require(['@/components/credit/approve.vue'],resolve);
    const detail = resolve => require(['@/components/detail.vue'],resolve);
    const pledge = resolve => require(['@/components/credit/pledge.vue'],resolve);
    const guarantor = resolve => require(['@/components/credit/guarantor.vue'],resolve);
    const trajectory = resolve => require(['@/components/trajectory.vue'],resolve);
    const material = resolve => require(['@/components/material.vue'],resolve);

    export default {
        name: 'credit',
        components: {
            approve,
            detail,
            pledge,
            guarantor,
            trajectory,
            material
        },
        data() {
            return {
                show: false,
                currentComponent: 'approve',
            }
        },
        created() {
            let _this = this;
            setTimeout(function () {
                _this.show = true;
            },600);
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
