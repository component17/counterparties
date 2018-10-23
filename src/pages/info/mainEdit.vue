<template>
    <el-card-module
            showHeader
            title="Редактирование контрагента"
            btnBack
            @goBack="goBack"
            showFooter
    >


        <template slot="card-footer-actions">
            <el-button plain>Отмена</el-button>
            <el-button type="primary">Сохранить</el-button>
        </template>

    </el-card-module>
</template>

<script>
    export default {
        methods: {
            goBack(){
                this.$router.go(-1)
            }
        }
    }
</script>

<style scoped>

</style>