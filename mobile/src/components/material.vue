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
            <van-cell
                    v-for="item in materialsClassification"
                    :key="item.id"
                    :title="item.dirsName"
                    :value="item.dirsSize == 0 ? '空' : '打开'"
                    @click="open(item.dirsNo,item.businessCode,item.dirsSize)"
            />
        </van-cell-group>

        <van-popup
                v-model="popup"
                position="right"
                :style="{ width: '80%',height: '100%' }"
        >
            <van-cell-group title="影像件列表">
                <van-cell
                        v-for="item in materialsList"
                        :key="item.id"
                        :clickable="true"
                        title-class="title van-ellipsis"
                        value-class="value"
                        :title="item.fileName"
                        :label="item.businessCode"
                        @click="examine(item)"
                        value="查看"
                />
            </van-cell-group>
        </van-popup>

        <van-image-preview
                v-model="imagePreview"
                :images="images"
                @change="onChange"
        >
            <template v-slot:index>第{{ index }}页</template>
        </van-image-preview>
    </div>
</template>

<script>
    import {InterfaceCode, AssembleRequestData, Request, Environment} from '@/assets/js/config'

    export default {
        name: 'material',
        data() {
            return {
                activeNames: ['0'],
                imagePreview: false,
                popup: false,
                index: 1,
                images: [],
                pdf: '',
                materialsClassification: [],
                materialsList: []
            }
        },
        created() {
            let params = {
                businessCode: this.$store.state.business.businessCode
            };
            Request({
                method: 'post',
                data: AssembleRequestData(InterfaceCode.QueryMaterialsClassification, params)
            }).then(res => {
                this.materialsClassification = res.response;
            });
        },
        methods: {
            back() {
                this.$store.commit('changeNav', {
                    url: 'flow',
                });
                this.$router.push({path: '/'})
            },


            onChange(index) {
                this.index = index + 1;
            },

            // 打开资料列表
            open(dirsNo,businessCode,dirsSize) {
                if (dirsSize) {
                    this.popup = true;
                    let params = {
                        dirsNo: dirsNo,
                        businessCode: businessCode
                    };
                    Request({
                        method: 'post',
                        data: AssembleRequestData(InterfaceCode.QueryMaterialsList, params)
                    }).then(res => {
                        this.materialsList = res.response;
                        if(res.response.length) {
                            this.images = [];
                            let imagesUrl = res.response.filter(item => item.fileType === 'jpg');
                            for(let i = 0;i < imagesUrl.length;i++) {
                                this.images.push(Environment.getFiles + imagesUrl[i].urlPrefix + imagesUrl[i].urlSuffix)
                            }
                        }
                    });
                }
            },
            // 查看资料
            examine(e) {
                this.popup = false;
                if(e.fileType == 'jpg') {
                    this.imagePreview = true
                } else {
                    let dtask = plus.downloader.createDownload(Environment.getFiles + e.urlPrefix + e.urlSuffix, {}, function (d, status) {
                        if (status == 200) {
                            var fileUrl = d.filename;
                            plus.runtime.openFile(fileUrl, {}, function (e) {
                                alert('打开失败');
                            });
                        } else {
                            alert("Download failed: " + status);
                        }
                    });
                    dtask.start();
                }
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

        .title {
            width: 100px;
        }
        .value {
            line-height: 45px;
        }
    }
</style>
