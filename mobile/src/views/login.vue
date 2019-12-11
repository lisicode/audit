<template>
    <div class="login">
        <header>
            <h1>开封新东方村镇银行</h1>
            <small>信贷移动审批系统</small>
        </header>
        <div>
            <input type="text" placeholder="请输入用户名" v-model="userName">
            <input type="password" placeholder="请输入密码" v-model="password">
            <van-button size="large" color="linear-gradient(to right, #65BFFE, #0061D9)" @click="confirmLogin">登 录</van-button>
        </div>
    </div>
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
            }
        },
        created() {
            // localStorage.removeItem('user');
        },
        methods: {
            // 确认登录
            confirmLogin() {
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
                        this.$router.push({path: '/'})
                    } else {
                        this.$notify({
                            type: 'danger',
                            duration: 1000,
                            message: '登陆失败'
                        });
                    }
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .login {
        box-sizing: border-box;
        width: 100%;
        padding: 50px;
        header {
            width: 100%;
            overflow: hidden;
            h1 {
                color: #303133;
                margin: 0;
                font-weight: 500;
                font-size: 20px;
                line-height: 50px;
            }
            small {
                color: #606266;
                font-size: 12px;
            }
        }
        div {
            margin: 50px auto;
            input {
                margin-top: 30px;
                width: 100%;
                height: 40px;
                font-size: 15px;
                text-indent: 20px;
                border-radius: 10px;
                border: none;
                outline: none;
                background-color: #F3F4F6;
            }
            button {
                margin-top: 60px;
            }
        }
    }
</style>