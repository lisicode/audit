<template>
    <div id="app">
        <router-view v-on:childData="childEvent" />
        <component :is="module" v-if="active"></component>
    </div>
</template>

<script>
    // @ is an alias to /src
    import common from '@/components/common.vue'

    export default {
        components: {
            common,
        },
        data() {
            return {
                active: true,
                module: 'common',
            }
        },
        methods: {
            childEvent(e) {
                this.active = e
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
