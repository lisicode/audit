<template>
    <van-row>
        <van-col span="24">
            <div class="banner">
                <van-icon name="wap-nav"/>
                <h1 @click="switchUser" v-html="text"></h1>
                <p>信贷移动审批系统</p>
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
                <van-popup v-model="userNameInput" position="top" :style="{ width: '100%' }">
                    <van-cell-group>
                        <van-field v-model="userName" placeholder="请输入用户名">
                            <van-button slot="button" size="small" type="info" @click="confirmUserName">确认</van-button>
                        </van-field>
                    </van-cell-group>
                </van-popup>
            </div>
        </van-col>
        <transition name="van-slide-up">
            <van-col span="24" v-show="userPasswordInput">
                <van-password-input
                        :value="password"
                        :length="5"
                        info="验证密码"
                        :focused="showKeyboard"
                        @focus="showKeyboard = true"
                />
                <van-number-keyboard
                        :show="showKeyboard"
                        @blur="showKeyboard = false"
                        @input="confirmLogin"
                        @delete="onDelete"
                />
            </van-col>
        </transition>
    </van-row>
</template>

<script>
    import {interfaceMod, headRequestMod, requestMod} from '../assets/js/config'

    export default {
        name: 'login',
        load: {
            dom() {

            },
            plus() {
                // console.log(plus.device.imei)
            }
        },
        data() {
            return {
                userName: '李思',
                password: '',
                userNameInput: false,
                userPasswordInput: false,
                showKeyboard: false,
                text: '请登录，<span class="animated flash infinite">__</span>',
            }
        },

        created() {
            // console.log(this.$store.state.count)
            // this.$store.commit('increment', {
            //     amount: 2
            // })
            // console.log(this.$store.getters.doneTodos)
            // this.$store.commit('changeTodos', {
            //     newTodos: this.$store.getters.doneTodos
            // })
            // console.log(this.$store.state.todos)

            //
            this.$emit('childData', false)

            // 检查登陆
            this.confirmUserName();


            let params = {
                userName: 'li'
            };
            console.log(headRequestMod(interfaceMod.userLogin, params))
        },

        methods: {
            // 用户切换
            switchUser() {
                this.userNameInput = true;
                this.password = ''
            },
            // 确认用户名
            confirmUserName() {
                let _this = this;
                if (this.userName != '') {
                    this.userNameInput = false;
                    this.userPasswordInput = true;
                    this.text = '欢迎，' + this.userName;
                    setTimeout(function () {
                        _this.showKeyboard = true
                    }, 500)
                }
            },
            // 确认登录
            confirmLogin(key) {
                this.password = (this.password + key).slice(0, 5);
                if (this.password.length == 5) {
                    console.log(this.password)
                    console.log(this.userName)

                    this.$notify({
                        type: 'success',
                        duration: 1000,
                        message: '登陆成功'
                    });

                    this.$router.push({path: '/home',})
                }
            },
            // 删除
            onDelete() {
                this.password = this.password.slice(0, this.password.length - 1);
            },
        }
    }
</script>

<style scoped lang="scss">
    @import '../assets/css/animate.css';
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
            font-size: 30px;
            font-weight: 400;
        }
        p {
            font-size: 20px;
            margin-left: 20px;
        }
        .van-icon {
            position: absolute;
            top: 10px;
            right: 10px;
            font-size: 20px;
        }
    }
    .van-password-input {
        margin-top: 30px;
    }
</style>