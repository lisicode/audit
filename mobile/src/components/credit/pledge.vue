<template>
    <div>
        <van-sticky>
            <header>
                <h1 @click="back">
                    <i class="iconfont">&#xeb99;</i>
                    抵质押详情
                </h1>
            </header>
        </van-sticky>
        <div class="item">
            <van-panel title="抵质押人姓名" desc="内容" status="内容">
                <van-cell title="单元格" value="内容" />
                <van-cell title="单元格" value="内容" />
            </van-panel>
            <van-panel title="抵质押物名称" desc="内容" status="内容">
                <van-cell title="单元格" value="内容" />
                <van-cell title="单元格" value="内容" />
            </van-panel>
            <van-panel title="抵质押物名称" desc="内容" status="内容">
                <van-cell title="单元格" value="内容" />
                <van-cell title="单元格" value="内容" />
            </van-panel>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'pledge',
        data() {
            return {

            }
        },
        created() {

        },
        methods: {
            back() {
                this.$store.commit('change', {
                    nav: {
                        type: 'flow',
                        index: 1
                    }
                });
                this.$router.push({path: '/'})
            },
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    header {
        box-sizing: border-box;
        padding: 10px;
        width: 100%;
        background-color: #65BFFE;
        h1 {
            margin: 0;
            color: #fff;
            font-size: 20px;
            font-weight: 400;
        }
    }
    .item {
        margin-bottom: 20px;
    }
    .van-hairline--top-bottom::after, .van-hairline-unset--top-bottom::after {
        border: none;
    }
</style>
