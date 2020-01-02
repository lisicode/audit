<template>
    <div class="account">
        <transition name="van-slide-down">
            <div v-if="show">
                <van-sticky>
                    <header>
                        <h1 @click="back">
                            <i class="iconfont">&#xe611;</i>
                            账户设置
                        </h1>
                    </header>
                </van-sticky>
                <section>
                    <input type="text" placeholder="请输入新密码" v-model="password1">
                    <input type="text" placeholder="请确认新密码" v-model="password2">
                    <van-button size="large" color="linear-gradient(to right, #65BFFE, #0061D9)" @click="confirm">提 交</van-button>
                </section>
            </div>
        </transition>
    </div>
</template>

<script>
    import { InterfaceCode, AssembleRequestData, Request, PublicMethods } from '@/assets/js/config'

    export default {
        name: 'account',
        data() {
            return {
                show: false,

                password1: '',
                password2: ''
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
                    url: 'setting',
                });
                this.$router.push({path: '/'})
            },
            confirm() {
                let params = {
                    userNo: PublicMethods['getLocalStorage']('user').userNo,
                    password1: this.password1,
                    password2: this.password2
                };
                Request({
                    method: 'post',
                    data: AssembleRequestData(InterfaceCode.changePassword, params)
                }).then(res => {
                    if (res.head.code == '000000') {
                        this.$notify({
                            type: 'success',
                            duration: 1000,
                            message: '修改成功'
                        });
                    } else {
                        this.$notify({
                            type: 'danger',
                            duration: 1000,
                            message: res.head.desc
                        });
                    }
                });
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .account {
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
        section {
            width: 100%;
            box-sizing: border-box;
            padding: 50px;
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
