<template>
    <div class="flow">
        <header>
<!--            <h1>流程列表<small>已处理(10条)</small><small>未处理(5条)</small></h1>-->
            <h1>流程列表</h1>
            <div @click="show = true">
                <i class="iconfont">&#xec6b;</i>
                <small>筛选</small>
            </div>
        </header>
        <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
        >
            <van-cell-group v-for="item in list" :key='item.id'>
                <van-cell
                        :title="item.flowType == 'A' ? '征信查询'
                        : item.flowType == 'B' ? '一般授信'
                        : item.flowType == 'C' ? '低风险'
                        : item.flowType == 'D' ? '合同流程'
                        : item.flowType == 'E' ? '放款流程'
                        : item.flowType"
                        title-class="title"
                        value-class="value"
                        :value="item.businessCode"
                />
                <div class="item">流程状态：<small>{{ item.flowStatusValue }}</small></div>
                <div class="item">客户姓名：<small>{{ item.custName }}</small></div>
                <div class="item">管户人：<small>{{ item.manageName }}</small></div>
                <div class="item">处理状态：<small>{{ item.onMine == 'Y' ? '待处理' : '已处理' }}</small></div>
                <div class="item">当前岗位：<small>{{ item.nodeName }}</small></div>
                <div class="item">流程发起时间：<small>{{ item.startTime }}</small></div>
                <div class="item">流程结束时间：<small>{{ item.endTime == '' ? '无' : item.endTime }}</small></div>
                <div class="item">当前任务处理时间：<small>{{ item.thisNodeTime }}</small></div>
                <van-cell
                        @click="to(item)"
                        :clickable="true"
                        title="操作"
                        :value-class="item.onMine == 'Y' ? 'value-2' : 'value-1'"
                        :value="item.onMine == 'Y' ? '处理' : '查看'"
                        :style="item.onMine == 'Y' ? 'background-color: #FEF0F0;' : 'background-color: #D9ECFF;'"
                />
            </van-cell-group>
        </van-list>
        <van-popup
                v-model="show"
                position="right"
                :style="{ width: '70%', height: '100%' }"
        >
            <h5>流程筛选</h5>
            <div>
                <span @click="flowType = 'B'" :class="flowType == 'B' ? 'status-2' : 'status-1'">一般授信</span>
                <span @click="flowType = 'D'" :class="flowType == 'D' ? 'status-2' : 'status-1'">合同流程</span>
                <span @click="flowType = 'E'" :class="flowType == 'E' ? 'status-2' : 'status-1'">放款流程</span>
            </div>
            <div>
<!--                <span @click="dealflag = '1'" :class="dealflag == '1' ? 'status-2' : 'status-1'">全部</span>-->
                <span @click="dealflag = '2'" :class="dealflag == '2' ? 'status-2' : 'status-1'">待处理</span>
                <span @click="dealflag = '3'" :class="dealflag == '3' ? 'status-2' : 'status-1'">已处理</span>
            </div>
            <section>
                <van-button plain color="#0061D9" @click="all">待处理筛选</van-button>
                <van-button color="#0061D9" @click="confirm">确认</van-button>
            </section>
        </van-popup>
    </div>
</template>

<script>
    import { InterfaceCode, AssembleRequestData, Request, PublicMethods } from '@/assets/js/config'

    export default {
        name: 'flow',
        data() {
            return {
                loading: false,
                finished: false,
                show: false,
                list: [],
                currentPage: 1,
                flowType: this.$store.state.screening.flowType,
                dealflag: this.$store.state.screening.dealflag,
            }
        },
        created() {},
        methods: {
            // 滑动加载
            onLoad() {
                setTimeout(() => {
                    let params = {
                        currentPage: this.currentPage,
                        pageSize: 10,
                        flowType: this.flowType,
                        dealflag: this.dealflag
                    };
                    this.requestLoad(params, InterfaceCode.QueryFlow)
                }, 500);
            },
            // 请求加载
            requestLoad(params, interfaceCode) {
                Request({
                    method: 'post',
                    data: AssembleRequestData(interfaceCode, params)
                }).then(res => {
                    for (let i = 0; i < res.response.length; i++) {
                        this.list.push(res.response[i]);
                    }
                    this.currentPage += 1;
                    this.loading = false;
                    if (res.head.code == '000001') {
                        this.finished = true;
                    }
                });
            },
            // 页面跳转
            to(e) {
                this.$store.commit('changeBusiness', {
                    businessCode: e.businessCode,
                    onMine: e.onMine,
                    nodeKey: e.nodeKey
                });
                this.$store.commit('changeCustId', e.custId);
                let url = {
                    'B': {
                        path: '/credit'
                    },
                    'D': {
                        path: '/contract'
                    },
                    'E': {
                        path: '/lending'
                    },
                };
                this.$router.push({path: url[e.flowType].path})
            },
            // 确认筛选
            confirm() {
                this.list = [];
                this.show = false;
                this.finished = false;
                let params = {
                    currentPage: 1,
                    pageSize: 10,
                    flowType: this.flowType,
                    dealflag: this.dealflag
                };
                this.requestLoad(params, InterfaceCode.QueryFlow)
            },
            // 筛选全部待处理
            all() {
                this.list = [];
                this.show = false;
                this.finished = false;
                let params = {
                    currentPage: 1,
                    pageSize: 10,
                    flowType: this.flowType,
                    dealflag: this.dealflag
                };
                this.requestLoad(params, InterfaceCode.QueryAllUntreated)
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .flow {
        padding-bottom: 50px;
        header {
            box-sizing: border-box;
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            padding: 10px;
            background-color: #0061D9;
            color: #fff;
            h1 {
                font-size: 20px;
                font-weight: 500;
                margin: 0;
                small {
                    margin-left: 10px;
                    font-size: 12px;
                }
            }
            div {
                text-align: center;
                i {
                    font-size: 15px;
                    margin-right: 5px;
                }
                small {
                    font-size: 15px;
                }
            }
        }
        .van-cell-group {
            color: #606266;
            margin-bottom: 20px;
            .van-cell {
                padding: 10px 15px;
            }
            .title,
            .value {
                font-size: 16px;
                font-weight: 500;
            }
            .value-1 {
                color: #0061D9;
            }
            .value-2 {
                color: #F74D2E;
            }
            .item {
                padding: 3px 15px;
                color: #303133;
                font-size: 13px;
                box-sizing: border-box;
                overflow: hidden;
                small {
                    font-size: 13px;
                    color: #606266;
                    float: right;
                }
            }
        }
        .van-popup {
            box-sizing: border-box;
            padding: 10px;
            h5 {
                margin-top: 10px;
                margin-bottom: 20px;
                color: #303133;
                font-weight: 400;
                font-size: 20px;
            }
            div {
                display: flex;
                /*justify-content: space-between;*/
                span {
                    display: inline-block;
                    width: 70px;
                    height: 40px;
                    font-size: 13px;
                    margin-right: 10px;
                    margin-bottom: 10px;
                    text-align: center;
                    line-height: 40px;
                    border-radius: 5px;
                }
            }
            section {
                display: flex;
                margin-top: 20px;
                .van-button {
                    width: 100%;
                    margin-right: 10px;
                }
            }
            .status-1 {
                background-color: #EDEFF2;
            }
            .status-2 {
                color: #fff;
                background-color: #0061D9;
            }
        }
    }
</style>
