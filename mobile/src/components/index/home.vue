<template>
    <div class="home">
        <header>
            <h1>开封新东方村镇银行</h1>
            <small>NEW ORIENTAL COUNTRY BANK OF KAIFENG</small>
        </header>
        <van-row class="i-1">
            <van-col span="6" style="opacity: 0.5;">
                <i class="iconfont">&#xeba6;</i>
                <span>征信查询</span>
            </van-col>
            <van-col span="6" @click="to('B')">
                <div v-if="num.yibanshouxin">{{ num.yibanshouxin }}</div>
                <i class="iconfont">&#xeba4;</i>
                <span>授信审批</span>
            </van-col>
            <van-col span="6" @click="to('D')">
                <div v-if="num.hetong">{{ num.hetong }}</div>
                <i class="iconfont">&#xebab;</i>
                <span>合同签订</span>
            </van-col>
            <van-col span="6" style="opacity: 0.5;">
                <div v-if="num.fangkuan">{{ num.fangkuan }}</div>
                <i class="iconfont">&#xeba8;</i>
                <span>放款审批</span>
            </van-col>
        </van-row>
        <van-cell-group>
            <van-cell title="消息列表" value="打开" @click="openMessage" />
        </van-cell-group>
        <van-cell-group title="流程分类">
            <van-cell title="授信审批流程" value="查看" :label="'待处理：' + num.yibanshouxin" @click="to('B')" />
            <van-cell title="合同审批流程" value="查看" :label="'待处理：' + num.hetong" @click="to('D')" />
            <van-cell title="放款审批流程" value="查看" :label="'待处理：' + num.fangkuan" @click="to('E')" />
        </van-cell-group>
    </div>
</template>

<script>
    import { InterfaceCode, AssembleRequestData, Request, PublicMethods } from '@/assets/js/config'

    export default {
        name: 'home',
        data() {
            return {
                num: {}
            }
        },
        created() {
            let params = {
                businessCode: 'B'
            };
            Request({
                method: 'post',
                data: AssembleRequestData(InterfaceCode.QueryCurrentTaskNum, params)
            }).then(res => {
                this.num = res.response
            });
        },
        methods: {
            to(e) {
                this.$store.commit('changeScreening', {
                    flowType: e,
                    dealflag: '2',
                });
                this.$emit('childEvent', 'flow')
            },
            openMessage() {
                this.$router.push({path: '/message',})
            }
        }
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
        }
        .i-1 {
            box-sizing: border-box;
            padding-top: 10px;
            padding-bottom: 10px;
            background-color: #0061D9;
            .van-col {
                position: relative;
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
                div {
                    position: absolute;
                    top: -5px;
                    right: 20px;
                    width: 16px;
                    height: 16px;
                    line-height: 16px;
                    border-radius: 8px;
                    font-size: 12px;
                    color: #fff;
                    text-align: center;
                    background-color: #ee0a24;
                }
            }

        }
    }
</style>
