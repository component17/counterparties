<template>
    <el-card-module
            showHeader
            :title="`Наименование контрагента ${id}`"
            btnBack
            @goBack="goBack">

        <template slot="card-header-actions">
            <el-button plain @click="deleteContr"><i class="mdi mdi-delete"></i>Удалить контрагента</el-button>
            <el-button plain @click="$router.push('/create')"><i class="mdi mdi-plus"></i>Добавить филиал</el-button>
        </template>

        <el-tabs type="border-card">

            <el-tab-pane label="Основные">
                <mainInfo></mainInfo>
            </el-tab-pane>

            <el-tab-pane label="Контактные лица">
                <contactFaces></contactFaces>
            </el-tab-pane>

            <el-tab-pane label="Банковские реквизиты">
                <bankDetails></bankDetails>
            </el-tab-pane>

            <el-tab-pane label="Локации">
                <locations></locations>
            </el-tab-pane>

        </el-tabs>

    </el-card-module>
</template>

<script>
    import mainInfo from '../components/info/main'
    import contactFaces from '../components/info/contactFaces'
    import bankDetails from '../components/info/bankDetails'
    import locations from '../components/info/locations'

    export default {
        components: {
            mainInfo,
            contactFaces,
            bankDetails,
            locations
        },
        data(){
            return {
                id: ''
            }
        },
        watch: {
            '$route' (to, from) {
                if(to.name === 'info'){
                    this.id = to.params.id
                }
            }
        },
        created(){
            this.id = this.$route.params.id;
        },
        methods: {
            goBack(){
                this.$router.go(-1)
            },
            deleteContr(){
                this.$confirm('Вы собираетесь удалить контрагента и все филиалы. Продолжить?', 'Внимание!', {
                    confirmButtonText: 'Удалить',
                    cancelButtonText: 'Отмена',
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: 'Delete completed'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: 'Delete canceled'
                    });
                });
            }
        }
    }
</script>

<style scoped>

</style>