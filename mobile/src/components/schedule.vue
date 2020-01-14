<template>
    <div class="schedule">
        <van-sticky>
            <header>
                <h1 @click="back">
                    <i class="iconfont">&#xe611;</i>
                    审批轨迹
                </h1>
            </header>
        </van-sticky>
        <van-steps direction="vertical" :active="0">
            <van-step v-for="item in progressNode" :key='item.id'>
                <h3>{{ item.taskName }}</h3>
                <p>审批人姓名：{{ item.userName }}</p>
                <p>审批状态：{{ item.approveCode }}</p>
                <p>审批开始时间：{{ item.startDate }}</p>
                <p>审批结束时间：{{ item.finishDate }}</p>
                <van-cell title="审批详情" @click="check(item.id)" value="查看" />
            </van-step>
        </van-steps>
        <van-popup
                v-model="show"
                position="right"
                :style="{ width: '80%',height: '100%' }"
        >
            <van-cell-group title="审批轨迹详情">
                <van-cell title="流程名称" :label="QueryProgressDetails.procName" />
                <van-cell title="审批备忘" :label="QueryProgressDetails.memo" />
<!--                <van-cell title="上一流程节点名称" :value="QueryProgressDetails.preTaskName" />-->
                <van-cell title="流程节点名称" :value="QueryProgressDetails.taskName" />
                <van-cell title="审批人姓名" :value="QueryProgressDetails.userName" />
<!--                <van-cell title="审批人机构" :value="QueryProgressDetails.branchCode" />-->
<!--                <van-cell title="拒绝原因代码" :value="QueryProgressDetails.refuseCode" />-->
                <van-cell title="审批金额(元)" :value="QueryProgressDetails.approveAmt" />
                <van-cell title="审批利率(%)" :value="QueryProgressDetails.approveRate" />
                <van-cell title="审批贷款期限" :value="QueryProgressDetails.approveLoanTerm" />
                <van-cell title="审批贷款期限单位" :value="QueryProgressDetails.approveTermUnit" />
                <van-cell title="审批开始日期" :value="QueryProgressDetails.startDate" />
                <van-cell title="审批结束日期" :value="QueryProgressDetails.finishDate" />
<!--                <van-cell title="创建日期" :value="QueryProgressDetails.createDate" />-->
<!--                <van-cell title="创建人" :value="QueryProgressDetails.createBy" />-->
            </van-cell-group>
        </van-popup>
    </div>
</template>

<script>
    import { InterfaceCode, AssembleRequestData, Request, PublicMethods } from '@/assets/js/config'
    import {Dictionaries} from '@/assets/js/dictionaries'

    export default {
        name: 'schedule',
        data() {
            return {
                progressNode: [],
                QueryProgressDetails: {},
                show: false

            }
        },
        created() {
            let params = {
                businessCode: this.$store.state.business.businessCode
            };
            Request({
                method: 'post',
                data: AssembleRequestData(InterfaceCode.QueryProgress, params)
            }).then(res => {
                this.progressNode = res.response;
                for (let i = 0;i < this.progressNode.length;i++) {
                    this.progressNode[i].approveCode = Dictionaries.approvalStatus[this.progressNode[i].approveCode];
                    this.progressNode[i].startDate = PublicMethods['formatDate'](this.progressNode[i].startDate);
                    this.progressNode[i].finishDate = PublicMethods['formatDate'](this.progressNode[i].finishDate);
                }
            });
        },
        methods: {
            back() {
                this.$store.commit('changeNav', {
                    url: 'flow',
                });
                this.$router.push({path: '/'})
            },
            check(e) {
                let params = {
                    id: e
                };
                Request({
                    method: 'post',
                    data: AssembleRequestData(InterfaceCode.QueryProgressDetails, params)
                }).then(res => {
                    this.show = true;
                    this.QueryProgressDetails = res.response;
                    this.QueryProgressDetails.approveTermUnit = Dictionaries.deadlineUnit[this.QueryProgressDetails.approveTermUnit];
                    this.QueryProgressDetails.startDate = PublicMethods['formatDate'](this.QueryProgressDetails.startDate);
                    this.QueryProgressDetails.finishDate = PublicMethods['formatDate'](this.QueryProgressDetails.finishDate);

                });
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .schedule {
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
        .van-steps {
            .van-cell {
                background-color: #F5F7FA;
            }
        }
    }

</style>
