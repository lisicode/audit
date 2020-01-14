<template>
    <div class="flow">
        <header>
            <h1>流程列表</h1>
            <div @click="show = true">
                <i class="iconfont">&#xec6b;</i>
            </div>
        </header>
        <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
        >
            <van-cell-group v-for="item in list" :key='item.id'>
                <van-cell title="流程类型" :value="item.flowType == 'A' ? '征信查询' : item.flowType == 'B' ? '一般授信' : item.flowType == 'C' ? '低风险' : item.flowType == 'D' ? '合同流程' : item.flowType == 'E' ? '放款流程' : item.flowType" />
<!--                <van-cell title="流程编号" :value="item.businessCode" />-->
<!--                <van-cell title="流程状态" :value="item.flowStatusValue" />-->
                <van-cell title="客户姓名" :value="item.custName" />
                <van-cell title="管户人" :value="item.manageName" />
<!--                <van-cell title="处理状态" :value="item.onMine == 'Y' ? '待处理' : '已处理'" />-->
                <van-cell title="当前岗位" :value="item.nodeName == '' ? '已完结' : item.nodeName" />
                <van-cell title="流程发起时间" :value="item.startTime" />
                <van-cell title="流程结束时间" v-if="item.onMine == 'Y' ? false : true" :value="item.endTime" />
                <van-cell title="当前任务处理时间" v-else :value="item.thisNodeTime" />
                <van-cell
                        @click="to(item)"
                        :clickable="true"
                        title="操作"
                        :value-class="item.onMine == 'Y' ? 'value-2' : 'value-1'"
                        :value="item.onMine == 'Y' ? '处理' : '查看'"
                />
            </van-cell-group>
        </van-list>
        <van-popup
                v-model="show"
                position="right"
                :style="{ width: '70%', height: '100%' }"
        >
            <h5>流程筛选</h5>
            <van-row>
                <van-col offset="1" span="7" @click="flowType = 'B'" :class="flowType == 'B' ? 'status-2' : 'status-1'">一般授信</van-col>
                <van-col offset="1" span="7" @click="flowType = 'D'" :class="flowType == 'D' ? 'status-2' : 'status-1'">合同流程</van-col>
                <van-col offset="1" span="7" @click="flowType = 'E'" :class="flowType == 'E' ? 'status-2' : 'status-1'">放款流程</van-col>
                <van-col offset="1" span="7" @click="dealflag = '2'" :class="dealflag == '2' ? 'status-2' : 'status-1'">待处理</van-col>
                <van-col offset="1" span="7" @click="dealflag = '3'" :class="dealflag == '3' ? 'status-2' : 'status-1'">已处理</van-col>
            </van-row>
            <van-row>
                <van-col offset="1" span="11">
                    <van-button plain color="#0061D9" size="small" @click="all">待处理筛选</van-button>
                </van-col>
                <van-col offset="1" span="11">
                    <van-button color="#0061D9" size="small" @click="confirm">确认</van-button>
                </van-col>
            </van-row>
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
                        res.response[i].startTime = PublicMethods['TimeFormat'](res.response[i].startTime);
                        res.response[i].endTime = PublicMethods['TimeFormat'](res.response[i].endTime);
                        res.response[i].thisNodeTime = PublicMethods['TimeFormat'](res.response[i].thisNodeTime);
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
                    dealflag: '2'
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
                i {
                    font-size: 20px;
                }
            }
        }
        .van-list {
            box-sizing: border-box;
            padding: 0 10px;
        }
        .van-cell-group {
            box-sizing: border-box;
            padding: 5px;
            margin-top: 10px;
            color: #606266;
            box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
            .value-1 {
                color: #0061D9;
            }
            .value-2 {
                color: #F74D2E;
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
                font-size: 14px;
            }
            .van-row {
                .van-col {
                    display: inline-block;
                    height: 40px;
                    font-size: 12px;
                    margin-bottom: 10px;
                    text-align: center;
                    line-height: 40px;
                    border-radius: 5px;
                }
                .van-button {
                    width: 100%;
                    margin-top: 30px;
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
