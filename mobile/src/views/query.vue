<template>
    <van-row>
        query
    </van-row>
</template>

<script>
    export default {
        name: 'query',
        data() {
            return {

            }
        },

        created() {
            //
            this.$emit('childData', true)

        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
