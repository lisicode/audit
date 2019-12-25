<template>
    <div class="guarantee">
        <van-sticky>
            <header>
                <h1 @click="back">
                    <i class="iconfont">&#xe611;</i>
                    保证人详情
                </h1>
            </header>
        </van-sticky>
        <div class="item">
            <van-panel title="保证人姓名" desc="内容" status="内容">
                <van-cell title="单元格" value="内容" />
            </van-panel>
            <van-collapse v-model="activeNames">
                <van-collapse-item title="保证人" name="1">内容</van-collapse-item>
                <van-collapse-item title="保证人" name="2">内容</van-collapse-item>
                <van-collapse-item title="保证人" name="3">内容</van-collapse-item>
            </van-collapse>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'guarantee',
        data() {
            return {
                activeNames: []
            }
        },
        created() {

        },
        methods: {
            back() {
                this.$store.commit('changeNav', {
                    url: 'flow',
                });
                this.$router.push({path: '/'})
            },
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .guarantee {
        padding-bottom: 70px;
        header {
            box-sizing: border-box;
            padding: 10px;
            width: 100%;
            background-color: #0061D9;
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
    }
</style>
