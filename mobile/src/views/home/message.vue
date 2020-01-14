<template>
    <div class="message">
        <transition name="van-slide-down">
            <div v-if="show">
                <van-sticky>
                    <header>
                        <h1 @click="back">
                            <i class="iconfont">&#xe611;</i>
                            消息列表
                        </h1>
                    </header>
                </van-sticky>
                <p @click="allDel">全部已读</p>
                <van-list
                        v-model="loading"
                        :finished="finished"
                        finished-text="没有更多了"
                        @load="onLoad"
                >
                    <div class="container">
                        <van-swipe-cell v-for="item in list" :key="item.id">
                            <van-cell
                                    center
                                    :border="false"
                                    :title="item.messageTitle"
                                    :label="'产生时间：' + item.createTime + item.messageContent"
                                    :title-class="item.messageStatus == 'H' ? 'title' : ''"
                            />
                            <template slot="right">
                                <van-button square type="danger" @click="del(item.id)" text="标记为已读" />
                            </template>
                        </van-swipe-cell>
                    </div>
                </van-list>
            </div>
        </transition>

    </div>
</template>

<script>
    import { InterfaceCode, AssembleRequestData, Request, PublicMethods } from '@/assets/js/config'
    import { Dialog } from 'vant';

    export default {
        name: 'message',
        data() {
            return {
                loading: false,
                finished: false,
                show: false,
                currentPage: 1,
                newsStatus: '',
                newsType: '',
                flowFlag: '',
                list: [],
                details: {}
            }
        },
        created() {
            let _this = this;
            setTimeout(function () {
                _this.show = true;
            },600)
        },
        methods: {
            back() {
                this.$store.commit('changeNav', {
                    url: 'home',
                });
                this.$router.push({path: '/'})
            },
            onLoad() {
                // 异步更新数据
                setTimeout(() => {
                    let params = {
                        currentPage: this.currentPage,
                        pageSize: 10,
                        newsStatus: this.newsStatus,
                        newsType: this.newsType,
                        flowFlag: this.flowFlag
                    };
                    this.requestLoad(params, InterfaceCode.messageList)
                }, 500);
            },
            requestLoad(params, interfaceCode) {
                Request({
                    method: 'post',
                    data: AssembleRequestData(interfaceCode, params)
                }).then(res => {
                    for (let i = 0; i < res.response.length; i++) {
                        this.list.push(res.response[i]);
                    }
                    this.currentPage += 1;
                    this.loading = false;
                    if (res.head.code == '000001') {
                        this.finished = true;
                    }
                });
            },
            del(e) {
                let params = {
                    id: e
                };
                Request({
                    method: 'post',
                    data: AssembleRequestData(InterfaceCode.messageDel, params)
                }).then(res => {
                    let params = {
                        currentPage: this.currentPage,
                        pageSize: 10,
                        newsStatus: this.newsStatus,
                        newsType: this.newsType,
                        flowFlag: this.flowFlag
                    };
                    this.requestLoad(params, InterfaceCode.messageList)
                });
            },
            allDel() {
                let params = {};
                Request({
                    method: 'post',
                    data: AssembleRequestData(InterfaceCode.allMessageDel, params)
                }).then(res => {
                    let params = {
                        currentPage: this.currentPage,
                        pageSize: 10,
                        newsStatus: this.newsStatus,
                        newsType: this.newsType,
                        flowFlag: this.flowFlag
                    };
                    this.requestLoad(params, InterfaceCode.messageList)
                });
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .message {
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
        .van-swipe-cell {
            margin-top: 10px;
        }
        p {
            box-sizing: border-box;
            color: #969799;
            font-size: 14px;
            padding-left: 20px;
        }
        button {
            height: 100%;
        }
        .title {
            color: #969799;
        }
    }
</style>
