<template>
    <el-card-module showHeader>

        <template slot="card-header-actions">
            <el-button plain @click="$router.push('/info/' + $route.params.id + '/main/edit')">Редактировать</el-button>
        </template>

        Основное информация

    </el-card-module>
</template>

<script>
    export default {

    }
</script>

<style scoped>

</style>