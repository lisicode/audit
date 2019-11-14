<template>
    <van-row>
        <van-col span="24">
            <div class="banner">
                <van-icon name="wap-nav" @click="showPopup" />
                <h1>您好，李思</h1>
                <p>移动信贷审批系统</p>
                <svg viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
                    <defs>
                        <path id="gentle-wave"
                              d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"></path>
                    </defs>
                    <g>
                        <use xlink:href="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7"></use>
                        <use xlink:href="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)"></use>
                        <use xlink:href="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)"></use>
                        <use xlink:href="#gentle-wave" x="48" y="7" fill="#fff"></use>
                    </g>
                </svg>
            </div>
        </van-col>
        <van-col span="24">
            <!-- 密码输入框 -->
            <van-password-input
                    :value="password"
                    :length="5"
                    info="请输入密码"
                    :focused="showKeyboard"
                    @focus="showKeyboard = true"
            />
            <!-- 数字键盘 -->
            <van-number-keyboard
                    :show="showKeyboard"
                    @input="onInput"
                    @delete="onDelete"
                    @blur="showKeyboard = false"
            />
            <!--弹出层-->
            <van-popup
                    v-model="popup"
                    position="right"
                    :style="{ width: '20%',height: '100%' }"
            />
        </van-col>
    </van-row>
</template>

<script>

    export default {
        name: 'login',
        data() {
            return {
                userName: '',
                password: '',
                showKeyboard: true,
                popup: false
            }
        },

        created() {
            console.log(this.$store.state.count)

            this.$store.commit('increment', {
                amount: 2
            })

            console.log(this.$store.getters.doneTodos)

            this.$store.commit('changeTodos', {
                newTodos: this.$store.getters.doneTodos
            })

            console.log(this.$store.state.todos)
        },

        methods: {
            onInput(key) {
                this.password = (this.password + key).slice(0, 5);
                if (this.password.length == 5) {
                    console.log(this.password)
                }
            },
            onDelete() {
                this.password = this.password.slice(0, this.password.length - 1);
            },
            showPopup() {
                this.popup = true;
            }
        }
    }
</script>

<style scoped lang="scss">
    .banner {
        position: relative;
        color: white;
        overflow: hidden;
        background: linear-gradient(60deg, #409EFF 0%, #409EFF 100%);
        svg {
            position: relative;
            width: 100%;
            height: 15vh;
            margin-bottom: -7px;
            min-height: 100px;
            max-height: 150px;
            g {
                use {
                    animation: move-forever 25s cubic-bezier(.55, .5, .45, .5) infinite;
                }
                use:nth-child(1) {
                    animation-delay: -2s;
                    animation-duration: 7s;
                }
                use:nth-child(2) {
                    animation-delay: -3s;
                    animation-duration: 10s;
                }
                use:nth-child(3) {
                    animation-delay: -4s;
                    animation-duration: 13s;
                }
                use:nth-child(4) {
                    animation-delay: -5s;
                    animation-duration: 20s;
                }
                @keyframes move-forever {
                    0% {
                        transform: translate3d(-90px, 0, 0);
                    }
                    100% {
                        transform: translate3d(85px, 0, 0);
                    }
                }
            }
        }
        h1 {
            margin-top: 60px;
            margin-left: 20px;
            margin-bottom: 0;
            font: 30px arial;
            font-weight: 400;
            animation: fadeIn 1s 1 0s;
            @-webkit-keyframes fadeIn {
                0% {
                    opacity: 0;
                }
                50% {
                    opacity: 0.5;
                }
                100% {
                    opacity: 1;
                }
            }
        }
        p {
            margin-left: 20px;
        }
        .van-icon {
            position: absolute;
            top: 10px;
            right: 10px;
        }
    }

    .van-password-input {
        margin-top: 30px;
    }

</style>