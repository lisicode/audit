<template>
    <div class="setting">
        <header>
            <span></span>
            <div>
                <p>姓名</p>
                <b>职务</b>
            </div>
        </header>
        <van-cell title="账户设置" is-link to="account" />
    </div>
</template>

<script>
    export default {
        name: 'setting',
        data() {
            return {
                
            }
        },
        created() {

        },
        methods: {

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
