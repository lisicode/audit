<template>
    <div class="material">
        <van-sticky>
            <header>
                <h1 @click="back">
                    <i class="iconfont">&#xe611;</i>
                    影像材料
                </h1>
            </header>
        </van-sticky>
        <van-collapse v-model="activeNames">
            <van-collapse-item title="征信查询审批单" name="1">
                <div class="item">
                    <span>征信查询审批单</span>
                    <van-button color="#0061D9" size="small">查看</van-button>
                </div>
                <div class="item">
                    <span>征信查询审批单</span>
                    <van-button color="#0061D9" size="small">查看</van-button>
                </div>
                <div class="item">
                    <span>征信查询审批单</span>
                    <van-button color="#0061D9" size="small">查看</van-button>
                </div>
            </van-collapse-item>
        </van-collapse>
        <van-image-preview
                v-model="show"
                :images="images"
                @change="onChange"
        >
            <template v-slot:index>第{{ index }}页</template>
        </van-image-preview>
    </div>
</template>

<script>
    export default {
        name: 'material',
        data() {
            return {
                activeNames: ['1'],
                show: false,
                index: 1,
                images: [
                    'https://reviveimg.hellorf.com/www/images/4227145d3701174b83a50379c83a35b4.jpg',
                    'https://reviveimg.hellorf.com/www/images/f89729b009c73f65382e92853a6c96b9.jpg'
                ]
            }
        },
        created() {

        },
        methods: {
            back() {
                this.$store.commit('changeNav', {
                    url: 'flow',
                });
                this.$router.push({path: '/'})
            },
            preview() {
              this.show = true
            },
            onChange(index) {
                this.index = index + 1;
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .material {
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

        .item {
            padding: 5px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            span {
                font-size: 13px;
            }
        }
    }
</style>
