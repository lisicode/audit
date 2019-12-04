<template>
    <van-row>
        <header>
            <h1>流程列表</h1>
            <i class="iconfont" @click="showPopup">&#xe8b6;</i>
        </header>
        <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
        >
            <div class="container"
                 v-for="item in list"
                 :key="item"
            >
                <div class="item">
                    <b>合同签订</b>
                    <p>申请额度(元): <span>100,000</span></p>
                    <small>贷款期限(月): 36期<span>利率: 26.77</span></small>
                    <div>
                        <van-button color="#F8C448">按钮</van-button>
                        <van-button color="#52C797">按钮</van-button>
                    </div>
                </div>
            </div>
        </van-list>
        <van-popup
                v-model="show"
                position="right"
                :style="{ width: '70%', height: '100%' }"
        >
            <div>
                <h5>审核状态</h5>
                <span>全部</span>
                <span>待处理</span>
                <span>已处理</span>
            </div>
        </van-popup>
    </van-row>
</template>

<script>
    export default {
        name: 'flow',
        data() {
            return {
                list: [],
                loading: false,
                finished: false,
                show: false
            }
        },
        created() {

        },
        methods: {
            onLoad() {
                // 异步更新数据
                setTimeout(() => {
                    for (let i = 0; i < 10; i++) {
                        this.list.push(this.list.length + 1);
                    }
                    // 加载状态结束
                    this.loading = false;

                    // 数据全部加载完成
                    if (this.list.length >= 20) {
                        this.finished = true;
                    }
                }, 500);
            },
            showPopup() {
                this.show = true;
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    header {
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        padding: 20px 10px 10px 10px;
        h1 {
            color: #303133;
            font-size: 20px;
            font-weight: 500;
            margin: 0;
        }
        i {
            font-size: 20px;
            color: #606266;
        }
    }
    .container {
        box-sizing: border-box;
        width: 100%;
        padding: 10px;
        .item {
            box-sizing: border-box;
            width: 100%;
            padding: 10px;
            background-color: #fff;
            border-radius: 10px;
            box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
            b {
                font-weight: 400;

            }
            p {
                span {
                    font-weight: 400;
                    color: #F56B54;
                }
            }
            small {
                span {
                    margin-left: 15px;
                }
            }
            div {
                margin-top: 10px;
                padding-top: 10px;
                overflow: hidden;
                /*border-top: 1px solid #F8F9FA;*/
                .van-button {
                    float: right;
                    margin-left: 10px;
                    height: 30px;
                    line-height: 30px;
                }
            }
        }
    }
    .van-popup {
        box-sizing: border-box;
        padding: 10px;
        h5 {
            margin: 0;
            color: #303133;
            font-weight: 400;
            font-size: 15px;
        }
        span {
            display: inline-block;
            width: 60px;
            height: 30px;
            font-size: 13px;
            margin-right: 10px;
            margin-top: 10px;
            text-align: center;
            line-height: 30px;
            border-radius: 5px;
            background-color: #EDEFF2;
        }
    }
</style>
