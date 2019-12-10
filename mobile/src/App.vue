<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
    import {PublicMethods} from '@/assets/js/config'

    export default {
        data() {
            return {}
        },
        created() {
            if (PublicMethods['getLocalStorage']('user')) {
                if(this.$route.path != '/') {
                    this.$router.push({path:'/',})
                }
            } else {
                if(this.$route.path != '/login') {
                    this.$router.push({path:'/login',})
                }
            }

        }
    }
</script>

<style lang="scss">
    * {
        font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    }

    body {
        background-color: #F5F7FA;
    }

    @font-face {
        font-family: 'iconfont';
        src: url('./assets/icon/iconfont.eot');
        src: url('./assets/icon/iconfont.eot?#iefix') format('embedded-opentype'),
        url('./assets/icon/iconfont.woff2') format('woff2'),
        url('./assets/icon/iconfont.woff') format('woff'),
        url('./assets/icon/iconfont.ttf') format('truetype'),
        url('./assets/icon/iconfont.svg#iconfont') format('svg');
    }

    .iconfont {
        font-family: "iconfont" !important;
        font-style: normal;
    }
</style>
