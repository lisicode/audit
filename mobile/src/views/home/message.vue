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
                <van-list
                        v-model="loading"
                        :finished="finished"
                        finished-text="没有更多了"
                        @load="onLoad"
                >
                    <div class="container"
                         v-for="item in list"
                         :key="item"
                    >
                        <van-swipe-cell>
                            <van-cell title="单元格" value="内容" />
                            <template slot="right">
                                <van-button square type="danger" text="删除" />
                                <van-button square type="primary" text="查看"/>
                            </template>
                        </van-swipe-cell>
                    </div>
                </van-list>
            </div>
        </transition>
    </div>
</template>

<script>
    export default {
        name: 'message',
        data() {
            return {
                list: [],
                loading: false,
                finished: false,
                show: false,
            }
        },
        created() {
            let _this = this;
            setTimeout(function () {
                _this.show = true;
            },600)
        },
        methods: {
            onLoad() {
                // 异步更新数据
                setTimeout(() => {
                    for (let i = 0; i < 10; i++) {
                        this.list.push(this.list.length + 1);
                    }
                    // 加载状态结束
                    this.loading = false;

                    // 数据全部加载完成
                    if (this.list.length >= 10) {
                        this.finished = true;
                    }
                }, 500);
            },
            back() {
                this.$store.commit('changeNav', {
                    url: 'home',
                });
                this.$router.push({path: '/'})
            },
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

    }
</style>
