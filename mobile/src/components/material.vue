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
        <van-cell-group>
            <van-cell title="征信查询审批单" is-link value="查看" @click="preview" />
        </van-cell-group>

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
                this.$store.commit('change', {
                    nav: {
                        type: 'flow',
                        index: 1
                    }
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

    }
</style>
