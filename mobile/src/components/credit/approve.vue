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
        <van-cell-group title="客户信息">
            <van-cell title="客户姓名" :value="details.name" />
            <van-cell title="客户证件类型" :value="details.certificateType" />
            <van-cell title="客户证件号码" :value="details.certificateNo" />
            <van-cell title="贷款共同借款人" :label="details.coBorrower" />
            <van-cell title="管户人姓名" :value="details.manageName" />
        </van-cell-group>
        <van-cell-group title="贷款详情">
            <van-cell title="调查意见" :label="details.investOpinion" />

            <van-cell title="申请金额（元）" :value="details.creditValue" />
            <van-cell title="贷款期限" :value="details.loanYears" />
            <van-cell title="贷款期限单位" :value="details.loanYearsUnit" />
<!--            <van-cell title="申请发起时间" :value="details.preTime" />-->
            <van-cell title="执行年利率（%）" :value="details.executionRate" />
            <van-cell title="是否授信" :value="details.isCredit" />
            <van-cell title="是否可循环" :value="details.isLoop" />
            <van-cell title="授信期限" :value="details.creditYears" />
            <van-cell title="授信期限单位" :value="details.creditYearsUnit" />
            <van-cell title="贷款用途" :value="details.loanUse" />
            <van-cell title="贷款用途说明" :label="details.loanPurpose" />
<!--            <van-cell title="用途证明" :value="details.purposeProve" />-->
<!--            <van-cell title="贷款种类" :value="details.creditType" />-->
<!--            <van-cell title="还款方式" :value="details.repaymentMethod" />-->
<!--            <van-cell title="结息周期" :value="details.interestCycle" />-->
<!--            <van-cell title="担保方式" :value="details.guaranteeMode" />-->
<!--            <van-cell title="支付方式" :value="details.payMode" />-->
<!--            <van-cell title="风险分类结果" :value="details.riskGrade" />-->
            <van-cell title="第一还款来源分析" :label="details.firstPayment" />
            <van-cell title="风险因素分析" :label="details.riskAnalysis" />
<!--            <van-cell title="管户开始时间" :value="details.manageTime" />-->
            <van-cell title="借款人情况概述及管户方案" :label="details.managePlan" />
<!--            <van-cell title="前处理意见" :label="details.loanResult" />-->
        </van-cell-group>
        <section v-if="businessData.onMine == 'Y'">
            <van-cell-group title="审批信息" v-if="roleDisabled">
                <van-field label="审批金额(元)" v-model="details.approveAmt" :disabled="!roleDisabled" />
                <van-field label="审批利率(%)" v-model="details.approveRate" :disabled="!roleDisabled" />
                <van-field label="审批期限" v-model="details.approveLoanTerm" :disabled="!roleDisabled" />
                <van-field
                        readonly
                        clickable
                        label="期限单位"
                        :value="unitValue"
                        :placeholder="changeUnit"
                        @click="onPickerUnit"
                />
                <van-field
                        readonly
                        clickable
                        label="还款方式"
                        :value="modeValue"
                        :placeholder="changeMethod"
                        @click="onPickerMethod"
                />
            </van-cell-group>
            <van-cell-group title="操作">
                <van-field
                        v-model="details.memo"
                        rows="2"
                        autosize
                        label="处理意见"
                        type="textarea"
                        placeholder="请输入处理意见"
                        show-word-limit
                />
                <van-field
                        readonly
                        clickable
                        label="审批动作"
                        :value="resultValue"
                        placeholder="请选择"
                        @click="pickerApprove = true"
                />
            </van-cell-group>
            <footer>
                <van-button color="#0061D9" :disabled="confirmDisabled" @click="confirmNext">提交</van-button>
            </footer>
        </section>
        <van-cell-group v-else title="审批信息">
            <van-cell title="审批金额（元）" :value="details.approveAmt" />
            <van-cell title="审批期限" :value="details.approveLoanTerm" />
            <van-cell title="期限单位" :value="changeUnit" />
            <van-cell title="审批利率（%）" :value="details.approveRate" />
            <van-cell title="还款方式" :value="changeMethod" />
        </van-cell-group>
        <van-popup v-model="pickerUnit" position="bottom">
            <van-picker
                    show-toolbar
                    :columns="columnsUnit"
                    @cancel="pickerUnit = false"
                    @confirm="onConfirmUnit"
            />
        </van-popup>
        <van-popup v-model="pickerMethod" position="bottom">
            <van-picker
                    show-toolbar
                    :columns="columnsMethod"
                    @cancel="pickerMethod = false"
                    @confirm="onConfirmMethod"
            />
        </van-popup>
        <van-popup v-model="pickerApprove" position="bottom">
            <van-picker
                    show-toolbar
                    :columns="columnsApprove"
                    @cancel="pickerApprove = false"
                    @confirm="onConfirmApprove"
            />
        </van-popup>
    </div>
</template>

<script>
    import { InterfaceCode, AssembleRequestData, Request, PublicMethods } from '@/assets/js/config'
    import { Dictionaries } from '@/assets/js/dictionaries'
    import { Role } from '@/assets/js/role'

    export default {
        name: 'approve',
        data() {
            return {
                resultValue: '',
                unitValue: '',
                modeValue: '',
                pickerUnit: false,
                columnsUnit: [],
                changeUnit: '',
                pickerMethod: false,
                columnsMethod: [],
                changeMethod: '',
                pickerApprove: false,
                columnsApprove: [],
                roleDisabled: false,
                confirmDisabled: false,
                details: {},
                businessData: {
                    businessCode: this.$store.state.business.businessCode,
                    onMine: this.$store.state.business.onMine,
                    nodeKey: this.$store.state.business.nodeKey
                }
            }
        },
        created() {
            let params = {
                businessCode: this.businessData.businessCode
            };
            let interfaceCode;
            // 如果是待处理
            if (this.businessData.onMine == 'Y') {
                // 抢占式
                interfaceCode = InterfaceCode.QueryApplyDetails;
                // 根据节点判断是否可修改/配置审查动作
                // console.log(this.businessData.nodeKey)
                // console.log(Role[this.businessData.nodeKey]().modifyPermissions)
                this.roleDisabled = Role[this.businessData.nodeKey]().modifyPermissions;
                this.columnsApprove = Role[this.businessData.nodeKey]().approveColumns;
                this.columnsUnit = Role[this.businessData.nodeKey]().columnsUnit;
                this.columnsMethod = Role[this.businessData.nodeKey]().columnsMethod;
            } else {
                // 非抢占式
                interfaceCode = InterfaceCode.QueryAlreadyApplyDetails;
            }
            Request({
                method: 'post',
                data: AssembleRequestData(interfaceCode, params)
            }).then(res => {
                this.details = res.response;
                this.$store.commit('changeGuaranteeMode', res.response.guaranteeMode);
                // this.details.creditValue = this.details.creditValue.toLocaleString();
                this.details.loanYearsUnit = Dictionaries.deadlineUnit[this.details.loanYearsUnit];
                this.details.repaymentMethod = Dictionaries.reimbursementMeans[this.details.repaymentMethod];
                this.details.creditYearsUnit = Dictionaries.deadlineUnit[this.details.creditYearsUnit];
                this.details.certificateType = Dictionaries.certificateType[this.details.certificateType];
                this.details.isCredit = Dictionaries.isCredit[this.details.isCredit];
                this.details.isLoop = Dictionaries.isLoop[this.details.isLoop];
                this.details.loanUse = Dictionaries.loanUse[this.details.loanUse];
                this.details.creditType = Dictionaries.loanType[this.details.creditType];
                this.details.interestCycle = Dictionaries.deadlineUnit[this.details.interestCycle];
                this.details.guaranteeMode = Dictionaries.guaranteeMode[this.details.guaranteeMode];
                this.details.payMode = Dictionaries.payMode[this.details.payMode];
                this.details.riskGrade = Dictionaries.riskGrade[this.details.riskGrade];
                this.changeUnit = Dictionaries.deadlineUnit[this.details.approveLoanUnit];
                this.changeMethod = Dictionaries.reimbursementMeans[this.details.approveRepaymentMethod];
                this.details.preTime = PublicMethods['TimeFormat'](this.details.preTime);
                this.details.manageTime = PublicMethods['TimeFormat'](this.details.manageTime);
            });
        },
        methods: {
            // 返回
            back() {
                this.$store.commit('changeNav', {
                    url: 'flow',
                });
                this.$router.push({path: '/'})
            },

            // 打开期限单位
            onPickerUnit() {
                if (this.roleDisabled) {
                    this.pickerUnit = true;
                }
            },

            // 确认期限单位
            onConfirmUnit(value) {
                this.pickerUnit = false;
                this.unitValue = value.text;
                this.details.approveLoanUnit = value.key;
            },

            // 打开还款方式
            onPickerMethod() {
                if (this.roleDisabled) {
                    this.pickerMethod = true;
                }
            },

            // 确认还款方式
            onConfirmMethod(value) {
                this.pickerMethod = false;
                this.changeMethod = value.text;
                this.details.approveRepaymentMethod = value.key;
            },

            // 确认审批动作
            onConfirmApprove(value) {
                this.pickerApprove = false;
                this.resultValue = value.text;
                this.details.approveCode = value.key;
            },

            // 提交下一岗
            confirmNext() {
                if (this.roleDisabled) {
                    if(this.details.approveAmt > this.details.creditValue) {
                        this.$notify({
                            type: 'danger',
                            duration: 1000,
                            message: '审批金额不能大于申请金额'
                        });
                    } else if(this.details.approveRate < this.details.executionRate) {
                        this.$notify({
                            type: 'danger',
                            duration: 1000,
                            message: '审批利率不能小于执行利率'
                        });
                    } else {
                        this.confirmDisabled = true;
                        let params = {
                            businessCode: this.details.businessCode,
                            approveCode: this.details.approveCode,
                            memo: this.details.memo,
                            approveAmt: this.details.approveAmt,
                            approveRate: this.details.approveRate,
                            approveLoanTerm: this.details.approveLoanTerm,
                            approveLoanUnit: this.details.approveLoanUnit,
                            approveRepaymentMethod: this.details.approveRepaymentMethod
                        };
                        Request({
                            method: 'post',
                            data: AssembleRequestData(InterfaceCode.ChangeProcessSubmit, params)
                        }).then(res => {
                            this.confirmDisabled = false;
                            if (res.head.code == '000000') {
                                this.$notify({
                                    type: 'success',
                                    duration: 1000,
                                    message: '审批成功'
                                });
                                this.back();
                            } else {
                                this.$notify({
                                    type: 'danger',
                                    duration: 1000,
                                    message: res.head.desc
                                });
                            }
                        });
                    }
                } else {
                    let params = {
                        businessCode: this.details.businessCode,
                        approveCode: this.details.approveCode,
                        memo: this.details.memo
                    };
                    Request({
                        method: 'post',
                        data: AssembleRequestData(InterfaceCode.ProcessSubmit, params)
                    }).then(res => {
                        this.confirmDisabled = false;
                        if (res.head.code == '000000') {
                            this.$notify({
                                type: 'success',
                                duration: 1000,
                                message: '审批成功'
                            });
                            this.back();
                        } else {
                            this.$notify({
                                type: 'danger',
                                duration: 1000,
                                message: res.head.desc
                            });
                        }
                    });
                }
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
        section {
            footer {
                padding: 0 16px;
                .van-button {
                    width: 100%;
                    margin-top: 10px;
                }
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
