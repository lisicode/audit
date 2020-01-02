<template>
    <div class="setting">
        <header>
            <span></span>
            <div>
                <p>{{ realName }}</p>
                <b>{{ orgName }}</b>
            </div>
        </header>
        <van-cell title="修改密码" is-link to="account" />
        <van-cell title="退出登录" is-link @click="logOut" />

    </div>
</template>

<script>
    import { InterfaceCode, AssembleRequestData, Request, PublicMethods } from '@/assets/js/config'
    import { Dialog } from 'vant';

    export default {
        name: 'setting',
        data() {
            return {
                realName: PublicMethods['getLocalStorage']('user').realName,
                orgName: PublicMethods['getLocalStorage']('user').orgName
            }
        },
        created() {},
        methods: {
            logOut() {
                Dialog.confirm({
                    title: '退出登录',
                    message: '您确定要退出登录吗'
                }).then(() => {
                    let params = {
                        userNo: PublicMethods['getLocalStorage']('user').userNo
                    };
                    Request({
                        method: 'post',
                        data: AssembleRequestData(InterfaceCode.logOut, params)
                    }).then(res => {
                        if (res.head.code == '000000') {
                            PublicMethods['setLocalStorage']('tokenNo', '');
                        }
                    });
                }).catch(() => {
                    // on cancel
                });
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .setting {
        header {
            box-sizing: border-box;
            padding: 20px;
            color: #fff;
            background-color: #0061D9;
            div {
                p {
                    font-size: 20px;
                    font-weight: 300;
                }
                b {
                    font-size: 25px;
                    font-weight: 300;
                }
            }
        }
    }
</style>
