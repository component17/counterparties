<template>
    <el-card-module>

        <el-button plain @click="$router.push('/info/' + $route.params.id + '/main/edit')">Редактировать</el-button>

        Основное информация

    </el-card-module>
</template>

<script>
    export default {

    }
</script>

<style scoped>

</style>