<template>
    <div class="signing">
        <van-sticky>
            <header>
                <h1 @click="back">
                    <i class="iconfont">&#xe611;</i>
                    合同签订
                </h1>
            </header>
        </van-sticky>
        <h5>合同信息</h5>
        <van-cell-group>
            <van-cell title="单元格" value="内容" />
            <van-cell title="单元格" value="内容" />
            <van-cell title="单元格" value="内容" />
        </van-cell-group>
        <h5>合同审批</h5>
        <van-cell-group>
            <van-cell title="单元格" value="内容" />
            <van-cell title="单元格" value="内容" />
            <van-cell title="单元格" value="内容" />
        </van-cell-group>
        <van-field
                v-model="message"
                rows="2"
                autosize
                label="处理意见"
                type="textarea"
                maxlength="50"
                placeholder="请输入处理意见"
                show-word-limit
        />
        <van-field
                readonly
                clickable
                label="审批动作"
                :value="value"
                placeholder="请选择"
                @click="picker = true"
        />
        <van-popup v-model="picker" position="bottom">
            <van-picker
                    show-toolbar
                    :columns="columns"
                    @cancel="picker = false"
                    @confirm="onConfirm"
            />
        </van-popup>
    </div>
</template>

<script>
    export default {
        name: 'signing',
        data() {
            return {
                message: '',
                value: '',
                picker: false,
                columns: ['同意', '有条件同意', '否决']
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
            onConfirm(value) {

                console.log(value)

                this.value = value;
                this.picker = false;
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .signing {
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
        h5 {
            margin: 0;
            line-height: 50px;
            box-sizing: border-box;
            padding-left: 10px;
            font-size: 15px;
            a {
                font-weight: 400;
                display: inline-block;
                width: 100%;
                height: 100%;
            }
        }
        .van-tabbar-item {
            font-size: 13px;
        }
        .van-hairline--top-bottom::after, .van-hairline-unset--top-bottom::after {
            border: none;
        }
        .van-field {
            margin-top: 10px;
        }
    }
</style>
