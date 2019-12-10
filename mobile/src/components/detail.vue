<template>
    <div class="detail">
        <van-sticky>
            <header>
                <h1 @click="back">
                    <i class="iconfont">&#xe611;</i>
                    客户详情
                </h1>
            </header>
        </van-sticky>
        <van-tabs v-model="active" color="#0061D9" title-active-color="#303133" swipeable animated>
            <van-tab title="主要信息">
                <van-cell-group>
                    <van-cell title="单元格" value="内容" />
                    <van-cell title="单元格" value="内容" />
                    <van-cell title="单元格" value="内容" />
                    <van-cell title="单元格" value="内容" />
                    <van-cell title="单元格" value="内容" />
                    <van-cell title="单元格" value="内容" />
                    <van-cell title="单元格" value="内容" />
                    <van-cell title="单元格" value="内容" />
                </van-cell-group>
            </van-tab>
            <van-tab title="基本信息">
                <van-cell-group>
                    <van-cell title="单元格" value="内容" />
                    <van-cell title="单元格" value="内容" />
                    <van-cell title="单元格" value="内容" />
                </van-cell-group>
            </van-tab>
            <van-tab title="简历">
                <van-cell-group>
                    <van-cell title="单元格" value="内容" />
                    <van-cell title="单元格" value="内容" />
                    <van-cell title="单元格" value="内容" />
                </van-cell-group>
            </van-tab>
            <van-tab title="社会关系">
                <van-cell-group>
                    <van-cell title="单元格" value="内容" />
                    <van-cell title="单元格" value="内容" />
                    <van-cell title="单元格" value="内容" />
                </van-cell-group>
            </van-tab>
            <van-tab title="主要财产共有人">
                <van-cell-group>
                    <van-cell title="单元格" value="内容" />
                    <van-cell title="单元格" value="内容" />
                    <van-cell title="单元格" value="内容" />
                </van-cell-group>
            </van-tab>
            <van-tab title="经营情况">
                <van-cell-group>
                    <van-cell title="单元格" value="内容" />
                    <van-cell title="单元格" value="内容" />
                    <van-cell title="单元格" value="内容" />
                </van-cell-group>
            </van-tab>
            <van-tab title="家庭财产情况">
                <van-cell-group>
                    <van-cell title="单元格" value="内容" />
                    <van-cell title="单元格" value="内容" />
                    <van-cell title="单元格" value="内容" />
                </van-cell-group>
            </van-tab>
            <van-tab title="家庭收支情况">
                <van-cell-group>
                    <van-cell title="单元格" value="内容" />
                    <van-cell title="单元格" value="内容" />
                    <van-cell title="单元格" value="内容" />
                </van-cell-group>
            </van-tab>
            <van-tab title="银行开户信息">
                <van-cell-group>
                    <van-cell title="单元格" value="内容" />
                    <van-cell title="单元格" value="内容" />
                    <van-cell title="单元格" value="内容" />
                </van-cell-group>
            </van-tab>
            <van-tab title="征信报告-信用概况">
                <van-cell-group>
                    <van-cell title="单元格" value="内容" />
                    <van-cell title="单元格" value="内容" />
                    <van-cell title="单元格" value="内容" />
                </van-cell-group>
            </van-tab>
            <van-tab title="征信报告-未结清贷款">
                <van-cell-group>
                    <van-cell title="单元格" value="内容" />
                    <van-cell title="单元格" value="内容" />
                    <van-cell title="单元格" value="内容" />
                </van-cell-group>
            </van-tab>
            <van-tab title="征信报告-逾期及偿还说明">
                <van-cell-group>
                    <van-cell title="单元格" value="内容" />
                    <van-cell title="单元格" value="内容" />
                    <van-cell title="单元格" value="内容" />
                </van-cell-group>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
    export default {
        name: 'detail',
        data() {
            return {
                active: 0,
            }
        },
        created() {

        },
        methods: {
            back() {
                this.$store.commit('change', {
                    url: 'flow',
                });
                this.$router.push({path: '/'})
            },
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .detail {
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
        h5 {
            margin: 0;
            line-height: 50px;
            box-sizing: border-box;
            padding-left: 10px;
            font-size: 15px;
            a {
                font-weight: 400;
                display: inline-block;
                width: 100%;
                height: 100%;
            }
        }
        .van-tabbar-item {
            font-size: 13px;
        }
        .van-hairline--top-bottom::after, .van-hairline-unset--top-bottom::after {
            border: none;
        }
    }

</style>
