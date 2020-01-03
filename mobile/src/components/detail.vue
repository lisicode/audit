<template>
    <div class="detail">
        <van-sticky>
            <header>
                <h1 @click="back">
                    <i class="iconfont">&#xe611;</i>
                    客户详情
                </h1>
            </header>
        </van-sticky>
        <van-tabs v-model="active" color="#0061D9" title-active-color="#303133" swipeable animated>
            <van-tab title="基本信息">
                <van-cell-group>
                    <van-cell title="客户号" :value="custMain.custId" />
                    <van-cell title="客户名称" :value="custMain.name" />
                    <van-cell title="证件类型" :value="custMain.certificateType" />
                    <van-cell title="证件号码" :value="custMain.certificateNum" />
                    <van-cell title="管户人" :value="custMain.manageUser" />
                    <van-cell title="性别" :value="custBasicInfo.sex" />
                    <van-cell title="婚姻状况" :value="custBasicInfo.marriage" />
                    <van-cell title="文化程度" :value="custBasicInfo.highestEdu" />
                    <van-cell title="手机号码" :value="custBasicInfo.mobilePhone" />
                    <van-cell title="家庭人口数" :value="custBasicInfo.familyPopulation" />
                    <van-cell title="现居住地址" :label="custBasicInfo.mailingAddress" />
                    <van-cell title="居住时间(年)" :value="custBasicInfo.residenceTime" />
                    <van-cell title="住宅状况" :value="custBasicInfo.liveInfo" />
                    <van-cell title="工作单位" :value="custBasicInfo.jobName" />
                    <van-cell title="工作年限(年)" :value="custBasicInfo.workingLife" />
                    <van-cell title="职务" :value="custBasicInfo.jobLevel" />
                    <van-cell title="单位地址" :label="custBasicInfo.jobAddr" />
                    <van-cell title="行业" :value="custBasicInfo.jobIndustry" />
                    <van-cell title="职业" :value="custBasicInfo.occupation" />
                </van-cell-group>
            </van-tab>
            <van-tab title="工作简历">
                <van-cell-group class="item" v-for="item in custResume" :key='item.id'>
                    <van-cell title="工作单位" :value="item.jobName" />
                    <van-cell title="岗位" :value="item.jobLevel" />
                    <van-cell title="工作成绩" :value="item.performance" />
                    <van-cell title="证明人" :value="item.witness" />
                    <van-cell title="证明人手机" :value="item.witnessPhone" />
                    <van-cell title="开始日期" :value="item.startDate" />
                    <van-cell title="截止日期" :value="item.endDate" />
                </van-cell-group>
                <van-divider>暂无更多</van-divider>
            </van-tab>
            <van-tab title="社会关系">
                <van-cell-group class="item" v-for="item in custRelationShip" :key='item.id'>
                    <van-cell title="称谓" :value="item.relawithManager" />
                    <van-cell title="姓名" :value="item.name" />
                    <van-cell title="工作单位" :value="item.jobName" />
                    <van-cell title="健康状况" :value="item.health" />
                    <van-cell title="职业" :value="item.working" />
                    <van-cell title="年龄" :value="item.age" />
                    <van-cell title="手机" :value="item.mobilPhone" />
                </van-cell-group>
                <van-divider>暂无更多</van-divider>
            </van-tab>
            <van-tab title="财产共有人情况">
                <van-cell-group>
                    <van-cell title="称谓" :value="custAssetOwner.relawithManager" />
                    <van-cell title="姓名" :value="custAssetOwner.name" />
                    <van-cell title="证件类型" :value="custAssetOwner.certificateType" />
                    <van-cell title="证件号码" :value="custAssetOwner.certificateNum" />
                    <van-cell title="婚姻状况" :value="custAssetOwner.marriage" />
                    <van-cell title="文化程度" :value="custAssetOwner.highestEdu" />
                    <van-cell title="手机" :value="custAssetOwner.mobilePhone" />
                    <van-cell title="户籍所在地" :value="custAssetOwner.permAddress" />
                    <van-cell title="现居住地地址" :value="custAssetOwner.address" />
                    <van-cell title="居住时间" :value="custAssetOwner.residenceTime" />
                    <van-cell title="居住房产来源" :value="custAssetOwner.liveInfo" />
                    <van-cell title="信用情况" :value="custAssetOwner.creditSituation" />
                    <van-cell title="其他情况" :value="custAssetOwner.otherSituation" />
                </van-cell-group>
            </van-tab>
            <van-tab title="经营情况">
                <van-cell-group>
                    <van-cell title="经营字号" :label="custBusiness.businessName" />
                    <van-cell title="地址" :label="custBusiness.address" />
                    <van-cell title="经营期限" :value="custBusiness.operatingPeriod" />
                    <van-cell title="经营场所性质" :value="custBusiness.placeNature" />
                    <van-cell title="经营场所面积" :value="custBusiness.area" />
                    <van-cell title="经营规模" :value="custBusiness.businessScale" />
                    <van-cell title="经营范围" :label="custBusiness.businessScope" />
                    <van-cell title="经营模式" :value="custBusiness.businessModel" />
                    <van-cell title="雇工人数" :value="custBusiness.peoples" />
                    <van-cell title="其他证照名称及号码" :value="custBusiness.otherIdentify" />
                    <van-cell title="营业执照号码" :value="custBusiness.businessLicense" />
                    <van-cell title="税务登记证号码" :value="custBusiness.taxationNum" />
                    <van-cell title="进货渠道" :value="custBusiness.goodsChannel" />
                    <van-cell title="销售渠道" :value="custBusiness.saleChannel" />
                    <van-cell title="经营固定资产种类" :value="custBusiness.assetsType" />
                    <van-cell title="经营固定资产价值" :value="custBusiness.assetsValue" />
                    <van-cell title="库存存货种类" :value="custBusiness.stockType" />
                    <van-cell title="库存存货价值" :value="custBusiness.stockValue" />
                    <van-cell title="旺季月份" :value="custBusiness.peakMonth" />
                    <van-cell title="旺季每月营业收入" :value="custBusiness.peakMonthlyIncome" />
                    <van-cell title="淡季月份" :value="custBusiness.lowMonth" />
                    <van-cell title="淡季月营业收入" :value="custBusiness.lowMonthlyIncome" />
                    <van-cell title="平均每月收入" :value="custBusiness.avgMonthlyIncome" />
                    <van-cell title="行业平均毛利率" :value="custBusiness.avgGrossProfitRate" />
                    <van-cell title="每月经营毛利" :value="custBusiness.monthlyProfit" />
                    <van-cell title="所附单据种类" :value="custBusiness.attacheType" />
                    <van-cell title="平均月房租费" :value="custBusiness.monthlyRent" />
                    <van-cell title="平均月水电费" :value="custBusiness.monthlyWaterAndEle" />
                    <van-cell title="月税费" :value="custBusiness.monthlyTaxation" />
                    <van-cell title="月通讯费" :value="custBusiness.monthlyCom" />
                    <van-cell title="月燃油车费" :value="custBusiness.monthlyOil" />
                    <van-cell title="每月工人工资总计" :value="custBusiness.monthlySumWage" />
                    <van-cell title="费用合计" :value="custBusiness.totalCost" />
                    <van-cell title="费用单证种类" :value="custBusiness.feeType" />
                </van-cell-group>
            </van-tab>
            <van-tab title="财产情况">
                <van-cell-group class="item" v-for="item in custAssetInfo" :key='item.id'>
                    <van-cell title="财产项目" :value="item.assetsType" />
                    <van-cell title="权属证件名称" :value="item.certifyType" />
                    <van-cell title="权属证号" :value="item.certifyNum" />
                    <van-cell title="原始价值" :value="item.originalValue" />
                    <van-cell title="现市场价值" :value="item.presentValue" />
                    <van-cell title="财产详情描述" :label="item.assetsDetail" />
                </van-cell-group>
                <van-divider>暂无更多</van-divider>
            </van-tab>
            <van-tab title="收支情况">
                <van-cell-group>
                    <van-cell title="月经营收入" :value="custIncome.manageIncome" />
                    <van-cell title="月工资收入" :value="custIncome.wages" />
                    <van-cell title="月租赁收入" :value="custIncome.lease" />
                    <van-cell title="其他月收入" :value="custIncome.otherIncome" />
                    <van-cell title="收入合计" :value="custIncome.totalIncome" />
                    <van-cell title="收入计算依据说明" :value="custIncome.incomeDes" />
                    <van-cell title="月还贷支出" :value="custIncome.loanExpend" />
                    <van-cell title="月生活必须支出" :value="custIncome.lifeExpend" />
                    <van-cell title="月租赁支出" :value="custIncome.leaseExpend" />
                    <van-cell title="月供应学生支出" :value="custIncome.studyExpend" />
                    <van-cell title="月赡养老人支出" :value="custIncome.oldExpend" />
                    <van-cell title="月其他支出" :value="custIncome.otherExpend" />
                    <van-cell title="月支出合计" :value="custIncome.totalExpend" />
                </van-cell-group>
            </van-tab>
            <van-tab title="信用概况">
                <van-cell-group class="item" v-for="item in custCreditReport" :key='item.id'>
                    <van-cell title="征信报告属主" :value="item.reportType" />
                    <van-cell title="属主姓名" :value="item.name" />
                    <van-cell title="贷记卡账户数" :value="item.accountNumber" />
                    <van-cell title="贷记卡授信总额" :value="item.totalLimit" />
                    <van-cell title="透支额度" :value="item.overdraft" />
                    <van-cell title="逾期情况" :value="item.overdue" />
                    <van-cell title="未结清贷款余额" :value="item.unclearedBalance" />
                    <van-cell title="已结清贷款金额" :value="item.clearedBalance" />
                    <van-cell title="对外担保额度" :value="item.guaranteeBalance" />
                </van-cell-group>
                <van-divider>暂无更多</van-divider>
            </van-tab>
            <van-tab title="未结清贷款">
                <van-cell-group class="item" v-for="item in custCreditLoan" :key='item.id'>
                    <van-cell title="贷款种类" :value="item.loanType" />
                    <van-cell title="贷款期限单位" :value="item.loanDueUnit" />
                    <van-cell title="贷款期限" :value="item.loanDue" />
                    <van-cell title="到期日" :value="item.expireDate" />
                    <van-cell title="金额" :value="item.loanAmount" />
                    <van-cell title="余额" :value="item.loanBalance" />
                    <van-cell title="贷款行" :value="item.loanBank" />
                    <van-cell title="担保方式" :value="item.guaranteeMode" />
                </van-cell-group>
                <van-divider>暂无更多</van-divider>
            </van-tab>
            <van-tab title="逾期偿还说明">
                <van-cell-group>
                    <van-cell title="贷记卡逾期情况说明" :value="custCreditAddition.debitCardOverdue" />
                    <van-cell title="贷款偿还情况说明" :value="custCreditAddition.loanRepayDes" />
                    <van-cell title="信用评价" :value="custCreditAddition.creditEvaluate" />
                </van-cell-group>
            </van-tab>
            <van-tab title="银行账户情况">
                <van-cell-group class="item" v-for="item in custBankAccount" :key='item.id'>
                    <van-cell title="账户属主类型" :value="item.accountType" />
                    <van-cell title="账户属主(姓名)" :value="item.name" />
                    <van-cell title="开户行" :value="item.accountBank" />
                    <van-cell title="银行卡号" :value="item.accountNo" />
                    <van-cell title="账户余额(元)" :value="item.balance" />
                </van-cell-group>
                <van-divider>暂无更多</van-divider>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
    import { InterfaceCode, AssembleRequestData, Request } from '@/assets/js/config'
    import { Dictionaries } from '@/assets/js/dictionaries'

    export default {
        name: 'detail',
        data() {
            return {
                active: 0,
                custMain: {},
                custBasicInfo: {},
                custResume: [],
                custRelationShip: [],
                custAssetOwner: {},
                custBusiness: {},
                custAssetInfo: [],
                custIncome: {},
                custCreditReport: [],
                custCreditLoan: [],
                custCreditAddition: {},
                custBankAccount: []
            }
        },
        created() {
            let params = {
                custId: this.$store.state.custId,
                modelKeys: ''
            };
            Request({
                method: 'post',
                data: AssembleRequestData(InterfaceCode.QueryUserDetails, params)
            }).then(res => {
                // 基本信息
                this.custMain = res.response.custMain;
                this.custMain.certificateType = Dictionaries.certificateType[this.custMain.certificateType];

                // 基本信息
                this.custBasicInfo = res.response.custBasicInfo;
                this.custBasicInfo.sex = Dictionaries.sex[this.custBasicInfo.sex];
                this.custBasicInfo.marriage = Dictionaries.marriage[this.custBasicInfo.marriage];
                this.custBasicInfo.highestEdu = Dictionaries.highestEdu[this.custBasicInfo.highestEdu];
                this.custBasicInfo.liveInfo = Dictionaries.liveInfo[this.custBasicInfo.liveInfo];
                this.custBasicInfo.jobLevel = Dictionaries.jobLevel[this.custBasicInfo.jobLevel];
                this.custBasicInfo.jobIndustry = Dictionaries.jobIndustry[this.custBasicInfo.jobIndustry];
                this.custBasicInfo.occupation = Dictionaries.occupation[this.custBasicInfo.occupation];

                // 工作简历
                this.custResume = res.response.custResume;
                for (let i = 0;i < this.custResume.length;i++) {
                    this.custResume[i].jobLevel = Dictionaries.jobLevel[this.custResume[i].jobLevel];
                    this.custResume[i].performance = Dictionaries.performance[this.custResume[i].performance];
                }

                // 社会关系
                this.custRelationShip = res.response.custRelationShip;
                for (let i = 0;i < this.custRelationShip.length;i++) {
                    this.custRelationShip[i].relawithManager = Dictionaries.custRelationShip_relawithManager[this.custRelationShip[i].relawithManager];
                    this.custRelationShip[i].health = Dictionaries.health[this.custRelationShip[i].health];
                }

                // 财产共有人情况
                this.custAssetOwner = res.response.custAssetOwner;
                this.custAssetOwner.relawithManager = Dictionaries.custAssetOwner_relawithManager[this.custAssetOwner.relawithManager];
                this.custAssetOwner.certificateType = Dictionaries.certificateType[this.custAssetOwner.certificateType];
                this.custAssetOwner.marriage = Dictionaries.marriage[this.custAssetOwner.marriage];
                this.custAssetOwner.highestEdu = Dictionaries.highestEdu[this.custAssetOwner.highestEdu];
                this.custAssetOwner.liveInfo = Dictionaries.liveInfo[this.custAssetOwner.liveInfo];
                this.custAssetOwner.creditSituation = Dictionaries.creditSituation[this.custAssetOwner.creditSituation];

                // 经营情况
                this.custBusiness = res.response.custBusiness;
                this.custBusiness.placeNature = Dictionaries.placeNature[this.custBusiness.placeNature];
                this.custBusiness.businessScale = Dictionaries.businessScale[this.custBusiness.businessScale];
                this.custBusiness.businessModel = Dictionaries.businessModel[this.custBusiness.businessModel];
                this.custBusiness.assetsType = Dictionaries.assetsType[this.custBusiness.assetsType];
                this.custBusiness.stockType = Dictionaries.stockType[this.custBusiness.stockType];

                // 财产情况
                this.custAssetInfo = res.response.custAssetInfo;
                for (let i = 0;i < this.custAssetInfo.length;i++) {
                    this.custAssetInfo[i].assetsType = Dictionaries.custAssetInfo_assetsType[this.custAssetInfo[i].assetsType];
                    this.custAssetInfo[i].certifyType = Dictionaries.custAssetInfo_certifyType[this.custAssetInfo[i].certifyType];
                }

                // 收支情况
                this.custIncome = res.response.custIncome;

                // 申请人及配偶征信：信用概况
                this.custCreditReport = res.response.custCreditReport;
                for (let i = 0;i < this.custCreditReport.length;i++) {
                    this.custCreditReport[i].reportType = Dictionaries.custCreditReport_reportType[this.custCreditReport[i].reportType];
                }

                // 申请人及配偶征信：未结清贷款明细
                this.custCreditLoan = res.response.custCreditLoan;
                for (let i = 0;i < this.custCreditLoan.length;i++) {
                    this.custCreditLoan[i].loanType = Dictionaries.custCreditLoan_loanType[this.custCreditLoan[i].loanType];
                    this.custCreditLoan[i].loanDueUnit = Dictionaries.deadlineUnit[this.custCreditLoan[i].loanDueUnit];
                    this.custCreditLoan[i].guaranteeMode = Dictionaries.guaranteeMode[this.custCreditLoan[i].guaranteeMode];
                }

                // 申请人及配偶征信：逾期偿还说明
                this.custCreditAddition = res.response.custCreditAddition;
                this.custCreditAddition.creditEvaluate = Dictionaries.creditEvaluate[this.custCreditAddition.creditEvaluate];

                // 银行账户情况
                this.custBankAccount = res.response.custBankAccount;
                for (let i = 0;i < this.custBankAccount.length;i++) {
                    this.custBankAccount[i].accountType = Dictionaries.accountOwnerType[this.custBankAccount[i].accountType];
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
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .detail {
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
        .item {
            margin-bottom: 20px;
        }
        .van-tabbar-item {
            font-size: 13px;
        }
        .van-hairline--top-bottom::after, .van-hairline-unset--top-bottom::after {
            border: none;
        }
    }

</style>
