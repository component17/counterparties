<template>
    <el-col style="width: 100%; height: 100vh;" v-if="is_loading_data" v-loading="true"></el-col>
    <el-card-module
            v-else
            showHeader
            :title="model.name_short"
            btnBack
            @goBack="goBack">

        <template slot="card-header-actions">
            <el-button plain @click="deleteContr"><i class="mdi mdi-delete"></i>Удалить контрагента</el-button>
            <el-button plain @click="$router.push('/create')"><i class="mdi mdi-plus"></i>Добавить филиал</el-button>
        </template>

        <el-tabs type="border-card">

            <el-tab-pane label="Основные">
                <mainInfo :data="model"></mainInfo>
            </el-tab-pane>

            <el-tab-pane label="Контактные лица">
                <contactFaces :data="model.faces" :id="model.id"></contactFaces>
            </el-tab-pane>

            <el-tab-pane label="Банковские реквизиты">
                <bankDetails :data="model.banks" :id="model.id"></bankDetails>
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
                is_loading_data: false,
                id: '',
                model: {
                    name_full: '',
                    name_short: '',
                    type: 'LEGAL',

                    address: '',

                    inn: '',
                    kpp: '',
                    ogrn: '',

                    management: {
                        name: '',
                        post: ''
                    },

                    ogrn_date: '',

                },
            }
        },
        watch: {
            '$route' (to, from) {
                if(to.name === 'info'){
                    this.id = to.params.id;
                    this.getInfo();
                }
            }
        },
        created(){
            this.id = this.$route.params.id;
            this.getInfo();
        },
        methods: {
            getInfo(){
                let interval = setTimeout(() => {
                    this.is_loading_data = true;
                }, 500);

                r.table('counterparties').get(this.id).merge((contr) => {
                    return {
                        faces: r.table("counterparties_faces").getAll(contr('id'), {index: 'counterparties_id'}).coerceTo('array'),
                        banks: r.table("counterparties_bank_details").getAll(contr('id'), {index: 'counterparties_id'}).coerceTo('array'),
                        locations: r.table("counterparties_locations").getAll(contr('id'), {index: 'counterparties_id'}).coerceTo('array'),
                    }
                }).run(conn, (err, data) => {
                    if(interval){
                        clearTimeout(interval);
                    }

                    this.model = data;
                    this.is_loading_data = false;
                });
            },

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