<template>
    <div class="pledge">
        <van-sticky>
            <header>
                <h1 @click="back">
                    <i class="iconfont">&#xe611;</i>
                    抵质押详情
                </h1>
            </header>
        </van-sticky>

        <div class="item" v-for="item in pledgeList" :key='item.id'>
            <van-cell-group :title="'抵质押人信息' + '（' + item.mortgagorName + '）'">
                <van-cell title="抵质押人客户号" :value="item.mortgagorCode"/>
                <van-cell title="抵质押人姓名" :value="item.mortgagorName"/>
                <van-cell title="抵质押人性别" :value="item.mortgagorSex"/>
                <van-cell title="与借款人关系" :value="item.relawithManager"/>
                <van-cell title="有无抵质押承诺书" :value="item.haveBook"/>
                <van-cell title="抵质押物是否出租" :value="item.isRentOut"/>
                <van-cell title="抵质押物有无财产共有人" :value="item.haveOwner"/>
                <van-cell title="是否取得承租人承诺" :value="item.havaPromise"/>
                <van-cell title="对抵质押物调查方式" :value="item.examMode"/>
                <van-cell title="抵质押率" :value="item.mortgageRate"/>
                <van-cell title="抵质押人情况概述" :value="item.researchResult"/>
            </van-cell-group>
            <van-cell-group :title="'抵质押物列表' + '（' + item.mortgagorName + '）'">
                <van-cell v-for="items in item.list" :key='items.id' :title="items.mortgageName"
                          @click="check(items.id)" value="查看" />
            </van-cell-group>
        </div>

        <van-popup
                v-model="show"
                position="right"
                :style="{ width: '80%',height: '100%' }"
        >
            <van-cell-group title="抵质押物详情">
                <van-cell title="抵押物名称" :value="guarantee.mortgageName"/>
                <van-cell title="抵质押物性质" :value="guarantee.mortgageType"/>
                <van-cell title="权属证明" :value="guarantee.certifyType"/>
                <van-cell title="权属证号" :value="guarantee.certifyNum"/>
                <van-cell title="持有目的" :value="guarantee.holdPurpose"/>
                <van-cell title="使用年限，单位年" :value="guarantee.holdYears"/>
                <van-cell title="使用状况" :value="guarantee.holdStatus"/>
                <van-cell title="查询冻结扣押情况" :value="guarantee.frozenStatus"/>
                <van-cell title="发票价值，单位元" :value="guarantee.invoiceValue"/>
                <van-cell title="市场价值，单位元" :value="guarantee.marketValue"/>
                <van-cell title="内部评估价值，单位元" :value="guarantee.innerValue"/>
                <van-cell title="外部评估价值，单位元" :value="guarantee.outerValue"/>
                <van-cell title="评估依据" :value="guarantee.assessmentBasis"/>
                <van-cell title="对抵质物情况说明" :value="guarantee.mortgageDes"/>
                <van-cell title="抵质押物状态" :value="guarantee.mortgageStatus"/>
            </van-cell-group>
        </van-popup>

    </div>
</template>

<script>
    import {InterfaceCode, AssembleRequestData, Request} from '@/assets/js/config'
    import {Dictionaries} from '@/assets/js/dictionaries'

    export default {
        name: 'pledge',
        data() {
            return {
                active: 2,
                show: false,
                pledgeList: [],
                guarantee: {}
            }
        },
        created() {
            let params = {
                businessCode: this.$store.state.business.businessCode
            };
            Request({
                method: 'post',
                data: AssembleRequestData(InterfaceCode.QueryPledge, params)
            }).then(res => {
                this.pledgeList = res.response.list;
                for (let i = 0; i < this.pledgeList.length; i++) {
                    this.pledgeList[i].mortgagorSex = Dictionaries.sex[this.pledgeList[i].mortgagorSex];
                    this.pledgeList[i].relawithManager = Dictionaries.custMortgagorResult_relawithManager[this.pledgeList[i].relawithManager];
                    this.pledgeList[i].haveBook = Dictionaries.custMortgagorResult_haveBook[this.pledgeList[i].haveBook];
                    this.pledgeList[i].isRentOut = Dictionaries.custMortgagorResult_isRentOut[this.pledgeList[i].isRentOut];
                    this.pledgeList[i].haveOwner = Dictionaries.custMortgagorResult_haveOwner[this.pledgeList[i].haveOwner];
                    this.pledgeList[i].havaPromise = Dictionaries.custMortgagorResult_havePromise[this.pledgeList[i].havaPromise];
                    this.pledgeList[i].examMode = Dictionaries.custMortgagorResult_examMode[this.pledgeList[i].examMode];
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
                    mortgageId: e
                };
                Request({
                    method: 'post',
                    data: AssembleRequestData(InterfaceCode.QueryGuarantee, params)
                }).then(res => {
                    this.show = true;
                    this.guarantee = res.response;
                    this.guarantee.mortgageType = Dictionaries.mortgageInfo_mortgageType[this.guarantee.mortgageType];
                    this.guarantee.certifyType = Dictionaries.mortgageInfo_certifyType[this.guarantee.certifyType];
                    this.guarantee.holdPurpose = Dictionaries.mortgageInfo_holdPurpose[this.guarantee.holdPurpose];
                    this.guarantee.holdStatus = Dictionaries.mortgageInfo_holdStatus[this.guarantee.holdStatus];
                    this.guarantee.frozenStatus = Dictionaries.mortgageInfo_frozenStatus[this.guarantee.frozenStatus];
                    this.guarantee.mortgageStatus = Dictionaries.mortgageInfo_mortgageStatus[this.guarantee.mortgageStatus];
                });
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .pledge {
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


    }
</style>
