<template>
    <div class="guarantor">
        <van-sticky>
            <header>
                <h1 @click="back">
                    <i class="iconfont">&#xe611;</i>
                    保证人详情
                </h1>
            </header>
        </van-sticky>
        <div class="item" v-for="item in guarantorList" :key='item.id'>
            <van-cell-group :title="'保证人信息' + '（' + item.guarantorName + '）'">
                <van-cell title="业务申请编号" :value="item.businessCode"/>
                <van-cell title="保证人客户号" :value="item.guarantorCode"/>
                <van-cell title="保证人姓名" :value="item.guarantorName"/>
                <van-cell title="保证人与借款人关系" :value="item.relawithManager"/>
                <van-cell title="有无保证人承诺书" :value="item.haveBook"/>
                <van-cell title="保证人是否在申请表上签字" :value="item.haveSign"/>
                <van-cell title="对保证人调查方式" :value="item.examMode"/>
                <van-cell title="有无工资账户流水" :value="item.haveWagesWater"/>
                <van-cell title="是否核实保证人的职业信息" :value="item.checkInfo"/>
                <van-cell title="担保能力理论测算值（元）" :value="item.guaranteeAbility"/>
                <van-cell title="调查结论" :value="item.researchResult"/>
            </van-cell-group>
        </div>
    </div>
</template>

<script>
    import {InterfaceCode, AssembleRequestData, Request} from '@/assets/js/config'
    import {Dictionaries} from '@/assets/js/dictionaries'

    export default {
        name: 'guarantor',
        data() {
            return {
                guarantorList: []
            }
        },
        created() {
            let params = {
                businessCode: this.$store.state.business.businessCode
            };
            Request({
                method: 'post',
                data: AssembleRequestData(InterfaceCode.QueryGuarantor, params)
            }).then(res => {
                this.guarantorList = res.response;
                for (let i = 0; i < this.guarantorList.length; i++) {
                    this.guarantorList[i].relawithManager = Dictionaries.custGuarantorResult_relawithManager[this.guarantorList[i].relawithManager];
                    this.guarantorList[i].haveBook = Dictionaries.custGuarantorResult_haveBook[this.guarantorList[i].haveBook];
                    this.guarantorList[i].haveSign = Dictionaries.custGuarantorResult_haveSign[this.guarantorList[i].haveSign];
                    this.guarantorList[i].examMode = Dictionaries.custGuarantorResult_examMode[this.guarantorList[i].examMode];
                    this.guarantorList[i].haveWagesWater = Dictionaries.custGuarantorResult_haveWagesWater[this.guarantorList[i].haveWagesWater];
                    this.guarantorList[i].checkInfo = Dictionaries.custGuarantorResult_checkInfo[this.guarantorList[i].checkInfo];
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
    .guarantor {
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

        .van-hairline--top-bottom::after, .van-hairline-unset--top-bottom::after {
            border: none;
        }
    }
</style>
