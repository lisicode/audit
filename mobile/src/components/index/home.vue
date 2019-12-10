<template>
    <div class="home">
        <header>
            <h1>开封新东方村镇银行</h1>
            <small>NEW ORIENTAL COUNTRY BANK OF KAIFENG</small>
            <van-row>
                <van-col span="8">
                    <p>累计放款</p>
                    <b>56笔</b>
                </van-col>
                <van-col span="8">
                    <p>累计金额</p>
                    <b>26,812.51</b>
                </van-col>
                <van-col span="8">
                    <p>已处理</p>
                    <b>26笔</b>
                </van-col>
            </van-row>
        </header>
        <section>
            <van-row>
                <van-col span="6">
                    <i class="iconfont">&#xeba4;</i>
                    <span>授信审批</span>
                </van-col>
                <van-col span="6">
                    <i class="iconfont">&#xebab;</i>
                    <span>合同签订</span>
                </van-col>
                <van-col span="6">
                    <i class="iconfont">&#xeba8;</i>
                    <span>放款审批</span>
                </van-col>
                <van-col span="6">
                    <i class="iconfont">&#xeba5;</i>
                    <span>消息列表</span>
                </van-col>
            </van-row>

        </section>

        <van-cell-group>
            <van-cell title="授信审批流程" value="内容" label="描述信息" />
            <van-cell title="合同审批流程" value="内容" label="描述信息" />
            <van-cell title="放款审批流程" value="内容" label="描述信息" />
        </van-cell-group>
    </div>
</template>

<script>
    export default {
        name: 'home',
        data() {
            return {

            }
        },
        created() {

        },
        methods: {}
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .home {
        header {
            position: relative;
            box-sizing: border-box;
            padding: 20px;
            color: #fff;
            background-color: #0061D9;
            h1 {
                font-size: 20px;
                font-weight: 500;
                margin-top: 0;
                margin-bottom: 5px;
            }
            small {
                font-weight: normal;
                display: block;
                font-size: 12px;
            }
            .van-row {
                margin-top: 70px;
                .van-col {
                    p {
                        margin: 0 0 5px 0;
                        font-size: 18px;
                        font-weight: 300;
                    }

                    b {
                        font-size: 16px;
                        font-weight: 500;
                    }
                }

            }
        }
        section {
            margin-top: 10px;
            margin-bottom: 10px;
            box-sizing: border-box;
            padding-top: 10px;
            padding-bottom: 10px;
            background-color: #0061D9;
            .van-row {
                .van-col {
                    color: #fff;
                    text-align: center;
                    i {
                        font-size: 20px;
                    }
                    span {
                        display: block;
                        font-size: 15px;
                        font-weight: 300;
                    }
                }

            }
        }
        button {
            height: 100%;
        }
    }
</style>
