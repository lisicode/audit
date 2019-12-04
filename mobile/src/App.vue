<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>
    import { PublicMethods } from '@/assets/js/config'

    export default {
        data() {
            return {

            }
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
        font-weight: 300;
    }
</style>
