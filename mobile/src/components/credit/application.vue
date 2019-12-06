<template>
    <div class="application">
        <van-sticky v-show="show">
            <header>
                <h1 @click="back">
                    <i class="iconfont">&#xeb99;</i>
                    申请信息
                </h1>
            </header>
            <van-tabbar v-model="active" :fixed="false" :border="false" active-color="#409EFF" inactive-color="#303133">
                <van-tabbar-item url="#a">
                    客户信息
                </van-tabbar-item>
                <van-tabbar-item url="#b">
                    贷款信息
                </van-tabbar-item>
                <van-tabbar-item url="#c">
                    审批信息
                </van-tabbar-item>
                <van-tabbar-item url="#d">
                    操作
                </van-tabbar-item>
            </van-tabbar>
        </van-sticky>
        <h5>
            <a name="a">客户信息</a>
        </h5>
        <van-cell-group>
            <van-cell title="单元格" value="内容" />
            <van-cell title="单元格" value="内容" />
            <van-cell title="单元格" value="内容" />
        </van-cell-group>
        <h5>
            <a name="b">贷款信息</a>
        </h5>
        <van-cell-group>
            <van-cell title="单元格" value="内容" />
            <van-cell title="单元格" value="内容" />
            <van-cell title="单元格" value="内容" />
            <van-cell title="单元格" value="内容" />
            <van-cell title="单元格" value="内容" />
            <van-cell title="单元格" value="内容" />
            <van-cell title="单元格" value="内容" />
            <van-cell title="单元格" value="内容" />
            <van-cell title="单元格" value="内容" />
            <van-cell title="单元格" value="内容" />
            <van-cell title="单元格" value="内容" />
            <van-cell title="单元格" value="内容" />
            <van-cell title="单元格" value="内容" />
            <van-cell title="单元格" value="内容" />
            <van-cell title="单元格" value="内容" />
            <van-cell title="单元格" value="内容" />
            <van-cell title="单元格" value="内容" />
            <van-cell title="单元格" value="内容" />
            <van-cell title="单元格" value="内容" />
            <van-cell title="单元格" value="内容" />
            <van-cell title="单元格" value="内容" />
        </van-cell-group>
        <h5>
            <a name="c">审批信息</a>
        </h5>
        <van-cell-group>
            <van-cell title="单元格" value="内容" />
            <van-cell title="单元格" value="内容" />
            <van-cell title="单元格" value="内容" />
            <van-cell title="单元格" value="内容" />
            <van-cell title="单元格" value="内容" />
            <van-panel title="标题" desc="描述信息" status="状态"></van-panel>
        </van-cell-group>
        <h5>
            <a name="d">操作</a>
        </h5>


    </div>
</template>

<script>
    export default {
        name: 'application',
        data() {
            return {
                active: 0,
                show: true,
                num: 0

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
    .application {
        padding-bottom: 70px;
        header {
            box-sizing: border-box;
            padding: 10px;
            width: 100%;
            background-color: #65BFFE;
            h1 {
                margin: 0;
                color: #fff;
                font-size: 20px;
                font-weight: 500;
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
