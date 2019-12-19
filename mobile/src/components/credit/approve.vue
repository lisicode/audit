<template>
    <div class="approve">
        <van-sticky>
            <header>
                <h1 @click="back">
                    <i class="iconfont">&#xe611;</i>
                    授信审批
                </h1>
            </header>
        </van-sticky>
        <van-tabs v-model="active" color="#0061D9" title-active-color="#303133" swipeable animated>
            <van-tab title="审批信息">
                <h5>申请信息</h5>
                <van-cell-group>
                    <van-cell title="申请金额(元)" :value="details.creditValue" />
                    <van-cell title="执行年利率(%)" :value="details.executionRate" />
                    <van-cell title="还款方式" :value="details.repaymentMethod" />
                    <van-cell title="贷款期限" :value="details.loanYears" />
                    <van-cell title="贷款期限单位" :value="details.loanYearsUnit" />
                </van-cell-group>
                <h5>审批信息</h5>
                <van-cell-group>
                    <van-cell title="审批金额(元)" :value="details.approveAmt" />
                    <van-cell title="审批期限" :value="details.approveLoanTerm" />
                    <van-cell title="期限单位" :value="details.approveLoanUnit" />
                    <van-cell title="审批利率(%)" :value="details.approveRate" />
                    <van-cell title="还款方式" :value="details.approveRepaymentMethod" />
                </van-cell-group>
                <section>
                    <van-field
                            v-model="message"
                            rows="2"
                            autosize
                            label="处理意见"
                            type="textarea"
                            maxlength="50"
                            placeholder="请输入处理意见"
                            show-word-limit
                    />
                    <van-field
                            readonly
                            clickable
                            label="审批动作"
                            :value="value"
                            placeholder="请选择"
                            @click="picker = true"
                    />
                    <footer>
                        <van-button color="#0061D9">提交</van-button>
                    </footer>
                </section>
            </van-tab>
            <van-tab title="申请信息">
                <h5>客户信息</h5>
                <van-cell-group>
                    <van-cell title="客户姓名" :value="details.name" />
                    <van-cell title="客户证件类型" :value="details.certificateType" />
                    <van-cell title="客户证件号码" :value="details.certificateNo" />
                </van-cell-group>
                <h5>申请信息</h5>
                <van-cell-group>
                    <van-cell title="申请金额(元)" :value="details.creditValue" />
                    <van-cell title="贷款期限" :value="details.loanYears" />
                    <van-cell title="贷款期限单位" :value="details.loanYearsUnit" />
                    <van-cell title="申请发起时间" :value="details.preTime" />
                    <van-cell title="执行年利率(%)" :value="details.executionRate" />
                    <van-cell title="是否授信" :value="details.isCredit" />
                    <van-cell title="是否可循环" :value="details.isLoop" />
                    <van-cell title="授信期限" :value="details.creditYears" />
                    <van-cell title="授信期限单位" :value="details.creditYearsUnit" />
                    <van-cell title="贷款用途" :value="details.loanUse" />
                    <van-cell title="贷款用途说明" :value="details.loanUse" />
                    <van-cell title="用途证明" :value="details.purposeProve" />
                    <van-cell title="贷款种类" :value="details.creditType" />
                    <van-cell title="还款方式" :value="details.repaymentMethod" />
                    <van-cell title="贷款共同借款人" :value="details.coBorrower" />
                    <van-cell title="结息周期" :value="details.interestCycle" />
                    <van-cell title="担保方式" :value="details.guaranteeMode" />
                    <van-cell title="支付方式" :value="details.payMode" />
                    <van-cell title="风险分类结果" :value="details.riskGrade" />
                    <van-cell title="第一还款来源分析" :label="details.firstPayment" />
                    <van-cell title="风险因素分析" :label="details.riskAnalysis" />
                    <van-cell title="管户人ID" :value="details.manageUser" />
                    <van-cell title="管户人姓名" :value="details.manageUser" />
                    <van-cell title="管户开始时间" :value="details.manageTime" />
                    <van-cell title="借款人情况概述及管户方案" :value="details.managePlan" />
                    <van-cell title="调查意见" :label="details.investOpinion" />
                </van-cell-group>
                <h5>审批信息</h5>
                <van-cell-group>
                    <van-cell title="审批金额(元)" :value="details.approveAmt" />
                    <van-cell title="审批期限" :value="details.approveLoanTerm" />
                    <van-cell title="期限单位" :value="details.approveLoanUnit" />
                    <van-cell title="审批利率(%)" :value="details.approveRate" />
                    <van-cell title="还款方式" :value="details.approveRepaymentMethod" />
                    <van-cell title="前处理意见" :value="details.loanResult" />
                </van-cell-group>
            </van-tab>
        </van-tabs>
        <van-popup v-model="picker" position="bottom">
            <van-picker
                    show-toolbar
                    :columns="columns"
                    @cancel="picker = false"
                    @confirm="onConfirm"
            />
        </van-popup>
    </div>
</template>

<script>
    import { InterfaceCode, AssembleRequestData, Request, PublicMethods } from '@/assets/js/config'

    export default {
        name: 'approve',
        data() {
            return {
                active: 0,
                message: '',
                value: '',
                picker: false,
                columns: ['同意', '有条件同意', '否决'],
                businessData: {
                    code: this.$store.state.business.code,
                    status: this.$store.state.business.status
                },
                details: {}
            }
        },
        created() {
            let _this = this;
            let params = {
                businessCode: this.businessData.code
            };
            Request({
                method: 'post',
                data: AssembleRequestData(InterfaceCode.QueryApplyDetails, params)
            }).then(res => {
                _this.details = res.response
            });
        },
        methods: {
            back() {
                this.$store.commit('changeNav', {
                    url: 'flow',
                });
                this.$router.push({path: '/'})
            },
            onConfirm(value) {

                console.log(value)

                this.value = value;
                this.picker = false;
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .approve {
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
        section {
            footer {
                padding: 10px 16px;
                .van-button {
                    width: 100%;
                }
            }
        }
        .van-tabbar-item {
            font-size: 13px;
        }
        .van-hairline--top-bottom::after, .van-hairline-unset--top-bottom::after {
            border: none;
        }
        .van-field {
            margin-top: 10px;
        }
    }
</style>
