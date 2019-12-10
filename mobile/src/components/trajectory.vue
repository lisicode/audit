<template>
    <div class="trajectory">
        <van-sticky>
            <header>
                <h1 @click="back">
                    <i class="iconfont">&#xe611;</i>
                    审批轨迹
                </h1>
            </header>
        </van-sticky>
        <van-steps direction="vertical" :active="0">
            <van-step>
                <h3>授信有权审批人</h3>
                <p>2016-07-10 09:30</p>
                <van-cell title="单元格" value="内容" />
                <van-cell title="单元格" value="内容" size="large" label="描述信息" />
            </van-step>
            <van-step>
                <h3>授信部负责人</h3>
                <p>2016-07-10 09:30</p>
                <van-cell title="单元格" value="内容" />
                <van-cell title="单元格" value="内容" size="large" label="描述信息" />
            </van-step>
            <van-step>
                <h3>授信审查人</h3>
                <p>2016-07-10 09:30</p>
                <van-cell title="单元格" value="内容" />
                <van-cell title="单元格" value="内容" size="large" label="描述信息" />
            </van-step>
            <van-step>
                <h3>授信支行行长</h3>
                <p>2016-07-10 09:30</p>

                <van-cell title="单元格" value="内容" />
                <van-cell title="单元格" value="内容" size="large" label="描述信息" />
            </van-step>
            <van-step>
                <h3>客户经理发起岗</h3>
                <p>2016-07-10 09:30</p>
            </van-step>
        </van-steps>
    </div>
</template>

<script>
    export default {
        name: 'trajectory',
        data() {
            return {
                activeName: '1'

            }
        },
        created() {

        },
        methods: {
            back() {
                this.$store.commit('change', {
                    url: 'flow',
                });
                this.$router.push({path: '/'})
            },
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .trajectory {
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
    }

</style>
