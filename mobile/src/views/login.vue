<template>
    <van-row>
        <van-col span="24">
            <div class="banner">
                <h1 @click="switchUser" v-html="text"></h1>
                <p>信贷移动审批系统</p>
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
    import { InterfaceCode, AssembleRequestData, Request, PublicMethods } from '@/assets/js/config'


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
                userName: PublicMethods['getUserNo'](),
                password: '',
                userNameInput: false,
                userPasswordInput: false,
                showKeyboard: false,
                text: '请登录',
            }
        },
        created() {
            // 检查登陆
            this.confirmUserName();

            // localStorage.removeItem('user');
        },
        methods: {
            // 用户切换
            switchUser() {
                this.userNameInput = true;
                this.password = ''
            },
            // 确认用户名
            confirmUserName() {

                console.log(PublicMethods['getLocalStorage']('user'))

                let _this = this;
                if (this.userName != '') {
                    this.userNameInput = false;
                    this.userPasswordInput = true;
                    this.text = '欢迎，' + this.userName;
                    setTimeout(function () {
                        _this.showKeyboard = true
                    }, 600)
                }
            },
            // 确认登录
            confirmLogin(key) {
                this.password = (this.password + key).slice(0, 5);
                if (this.password.length == 5) {
                    let params = {
                        userNo: this.userName,
                        passwordType: 'string',
                        password: this.password
                    };
                    Request({
                        method: 'post',
                        data: AssembleRequestData(InterfaceCode.userLogin, params)
                    }).then(res => {
                        if (res.head.code == '000000') {
                            PublicMethods['setLocalStorage']('user', res);
                            this.$router.push({path: '/index'})
                        } else {
                            this.$notify({
                                type: 'danger',
                                duration: 1000,
                                message: '登陆失败'
                            });
                        }
                    })
                }
            },
            // 键盘事件
            onDelete() {
                this.password = this.password.slice(0, this.password.length - 1);
            },
        }
    }
</script>

<style scoped lang="scss">
    .banner {
        width: 100%;
        margin-bottom: 30px;
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
    }
</style>