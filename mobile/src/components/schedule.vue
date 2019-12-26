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
                <p>审批开始时间：{{ item.startDate }}</p>
                <p>审批结束时间：{{ item.finishDate }}</p>
                <van-cell title="审批人姓名" :value="item.userName" />
                <van-cell title="审批状态" :value="item.approveCode" />
                <van-cell title="审批详情" @click="check()" value="查看" is-link/>
            </van-step>
        </van-steps>
    </div>
</template>

<script>
    import {InterfaceCode, AssembleRequestData, Request} from '@/assets/js/config'
    import {Dictionaries} from '@/assets/js/dictionaries'

    export default {
        name: 'schedule',
        data() {
            return {
                progressNode: []

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
                console.log(e)
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
        .van-cell {
            background-color: #F5F7FA;
        }
    }

</style>
