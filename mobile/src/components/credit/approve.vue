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
                    <van-cell title="贷款期限" :value="details.loanYears" />
                    <van-cell title="贷款期限单位" :value="details.loanYearsUnit" />
                    <van-cell title="还款方式" :value="details.repaymentMethod" />
                </van-cell-group>
                <section v-if="businessData.onMine == 'Y'">
                    <h5>审批信息</h5>
                    <van-cell-group>
                        <van-field label="审批金额(元)" v-model="details.approveAmt" :disabled="roleDisabled" />
                        <van-field label="审批利率(%)" v-model="details.approveRate" :disabled="roleDisabled" />
                        <van-field label="审批期限" v-model="details.approveLoanTerm" :disabled="roleDisabled" />
                        <van-field
                                readonly
                                clickable
                                label="期限单位"
                                :value="unitValue"
                                :placeholder="changeUnit"
                                @click="onPicker('unit')"
                        />
                        <van-field
                                readonly
                                clickable
                                label="还款方式"
                                :value="modeValue"
                                :placeholder="changeMethod"
                                @click="onPicker('mode')"
                        />
                    </van-cell-group>
                    <van-cell-group>
                        <van-field
                                v-model="details.memo"
                                rows="2"
                                autosize
                                label="处理意见"
                                type="textarea"
                                maxlength="100"
                                placeholder="请输入处理意见"
                                show-word-limit
                        />
                        <van-field
                                readonly
                                clickable
                                label="审批动作"
                                :value="resultValue"
                                placeholder="请选择"
                                @click="onPickerApprove"
                        />
                    </van-cell-group>
                    <footer>
                        <van-button color="#0061D9" @click="nextConfirm">提交</van-button>
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
                <h5>贷款申请信息</h5>
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
                    <van-cell title="贷款用途说明" :label="details.loanPurpose" />
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
<!--                    <van-cell title="管户人ID" :value="details.manageUser" />-->
                    <van-cell title="管户人姓名" :value="details.manageName" />
                    <van-cell title="管户开始时间" :value="details.manageTime" />
                    <van-cell title="借款人情况概述及管户方案" :label="details.managePlan" />
                    <van-cell title="调查意见" :label="details.investOpinion" />
                </van-cell-group>
                <h5>审批信息</h5>
                <van-cell-group>
                    <van-cell title="审批金额(元)" :value="details.approveAmt" />
                    <van-cell title="审批期限" :value="details.approveLoanTerm" />
                    <van-cell title="期限单位" :value="changeUnit" />
                    <van-cell title="审批利率(%)" :value="details.approveRate" />
                    <van-cell title="还款方式" :value="changeMethod" />
                    <van-cell title="前处理意见" :label="details.loanResult" />
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
    import { InterfaceCode, AssembleRequestData, Request } from '@/assets/js/config'
    import { Dictionaries } from '@/assets/js/dictionaries'

    export default {
        name: 'approve',
        data() {
            return {
                active: 0,
                resultValue: '',
                unitValue: '',
                modeValue: '',
                picker: false,
                columns: [],
                pickerApprove: false,
                columnsApprove: [],
                roleDisabled: true,
                details: {},
                changeUnit: '',
                changeMethod: '',
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
            Request({
                method: 'post',
                data: AssembleRequestData(InterfaceCode.QueryApplyDetails, params)
            }).then(res => {
                // 如果是待处理
                if (this.$store.state.business.onMine == 'Y') {
                    // 根据节点判断是否可修改
                    if (this.processNode()) {
                        this.roleDisabled = false
                    }
                }
                this.details = res.response;
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

            // 节点配置
            processNode() {
                // 会后秘书 授信部负责人 审查人
                if (this.businessData.nodeKey == 'countersignSecretaryTask' || this.businessData.nodeKey == 'grantingCreditTask' || this.businessData.nodeKey == 'creditCheckerTask') {
                    return true;
                } else {
                    return false;
                }
            },

            // 打开审批动作菜单
            onPickerApprove() {
                this.pickerApprove = true;
                this.columnsApprove = [
                    {"keyId": 'OK', "text": "同意", "type": 'result'},
                    {"keyId": 'OC', "text": "有条件同意", "type": 'result'},
                    {"keyId": 'FL', "text": "遵循贷审会决议", "type": 'result'},
                    {"keyId": 'RE', "text": "补件", "type": 'result'},
                    {"keyId": 'RJ', "text": "拒绝", "type": 'result'}
                ];
            },

            // 确认审批动作
            onConfirmApprove(value) {
                this.pickerApprove = false;
                this.resultValue = value.text;
                this.details.approveCode = value.keyId;
            },

            // 打开期限单位/还款方式菜单
            onPicker(e) {
                if (this.processNode()) {
                    this.picker = true;
                    if (e == 'unit') {
                        this.columns = [
                            {"keyId": 'D', "text": "日", "type": 'unit'},
                            {"keyId": 'M', "text": "月", "type": 'unit'},
                            {"keyId": 'S', "text": "季", "type": 'unit'},
                            {"keyId": 'Y', "text": "年", "type": 'unit'},
                        ];
                    } else if (e == 'mode') {
                        this.columns = [
                            {"keyId": '1', "text": "等额本金", "type": 'mode'},
                            {"keyId": '2', "text": "等额本息", "type": 'mode'},
                            {"keyId": '3', "text": "定期还息，到期还本", "type": 'mode'},
                            {"keyId": '4', "text": "到期还本付息", "type": 'mode'},
                        ];
                    }
                }
            },

            // 确认期限单位/还款方式
            onConfirm(value) {
                this.picker = false;
                if (value.type == 'unit') { // 期限单位
                    this.unitValue = value.text;
                    this.details.approveLoanUnit = value.keyId;
                } else if (value.type == 'mode') { // 还款方式
                    this.modeValue = value.text;
                    this.details.approveRepaymentMethod = value.keyId;
                }
            },

            // 提交下一岗
            nextConfirm() {
                if (this.processNode()) {
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
            .van-cell-group {
                margin-bottom: 10px;
            }
            footer {
                padding: 0 16px;
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
    }
</style>
