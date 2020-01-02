<template>
    <div class="signing">
        <van-sticky>
            <header>
                <h1 @click="back">
                    <i class="iconfont">&#xe611;</i>
                    放款流程
                </h1>
            </header>
        </van-sticky>
        <van-cell-group title="放款详情">
            <van-cell title="客户号" :value="details.custId" />
            <van-cell title="客户姓名" :value="details.custName" />
            <van-cell title="证件类型" :value="details.certificateType" />
            <van-cell title="证件号码" :value="details.certificateNo" />
            <van-cell title="借据金额(元)" :value="details.loanAmt" />
            <van-cell title="贷款种类" :value="details.creditType" />
            <van-cell title="担保方式" :value="details.guaranteeMode" />
            <van-cell title="计息周期" :value="details.interestCycle" />
            <van-cell title="结算账号" :value="details.settleAcct" />
            <van-cell title="入款账号" :value="details.acctNo" />
            <van-cell title="入款行号" :value="details.acctBank" />
            <van-cell title="入款户名" :value="details.acctName" />
            <van-cell title="贷款用途" :value="details.loanUse" />
            <van-cell title="贷款用途详述" :label="details.loanPurpose" />
        </van-cell-group>
        <section v-if="businessData.onMine == 'Y'">
            <van-cell-group title="放款审批">
<!--                <van-cell title="合同金额(元)" :value="details.contractAmt" />-->
<!--                <van-cell title="合同利率(%)" :value="details.contractRate" />-->
<!--                <van-cell title="合同期限" :value="details.contractTerm" />-->
<!--                <van-cell title="合同期限单位" :value="details.contractTermUnit" />-->
<!--                <van-cell title="合同起始日期" :value="details.validFrom" />-->
<!--                <van-cell title="合同到期日期" :value="details.validTo" />-->
<!--                <van-cell title="还款方式" :value="details.repaymentMethod" />-->

            </van-cell-group>
            <van-field
                    v-model="memo"
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
                    :value="value"
                    placeholder="请选择"
                    @click="picker = true"
            />
            <footer>
                <van-button color="#0061D9" :disabled="confirmDisabled" @click="confirmNext">提交</van-button>
            </footer>
        </section>
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
    import { InterfaceCode, AssembleRequestData, Request } from '@/assets/js/config'
    import { Dictionaries } from '@/assets/js/dictionaries'
    import { Role } from '@/assets/js/role'

    export default {
        name: 'signing',
        data() {
            return {
                businessData: {
                    businessCode: this.$store.state.business.businessCode,
                    onMine: this.$store.state.business.onMine,
                    nodeKey: this.$store.state.business.nodeKey
                },
                details: {},
                columns: [],
                value: '',
                memo: '',
                picker: false,
                confirmDisabled: false
            }
        },
        created() {
            let params = {
                businessCode: this.businessData.businessCode
            };
            Request({
                method: 'post',
                data: AssembleRequestData(InterfaceCode.QueryLoanDetails, params)
            }).then(res => {
                // 如果是待处理
                if (this.businessData.onMine == 'Y') {
                    // 根据节点配置审查动作
                    // console.log(this.businessData.nodeKey)
                    // console.log(Role[this.businessData.nodeKey]().modifyPermissions)
                    this.columns = Role[this.businessData.nodeKey]().approveColumns
                }
                this.details = res.response;
                this.details.creditType = Dictionaries.loanType[this.details.creditType];
                this.details.certificateType = Dictionaries.certificateType[this.details.certificateType];
                this.details.guaranteeMode = Dictionaries.guaranteeMode[this.details.guaranteeMode];
                this.details.interestCycle = Dictionaries.deadlineUnit[this.details.interestCycle];
                this.details.loanUse = Dictionaries.loanUse[this.details.loanUse];
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
                this.picker = false;
                this.value = value.text;
                this.details.approveCode = value.key;
            },
            // 提交下一岗
            confirmNext() {
                this.confirmDisabled = true;
                let params = {
                    businessCode: this.businessData.businessCode,
                    approveCode: this.details.approveCode,
                    memo: this.memo
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
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .signing {
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
                margin-top: 20px;
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
        .van-field {
            margin-top: 10px;
        }
    }
</style>
