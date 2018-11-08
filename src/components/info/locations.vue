<template>
    <el-card-module class="location" showFooter>
        <template slot="card-header-actions">
            <el-input placeholder="Поиск"/>
            <el-button plain><i class="mdi mdi-delete"></i>Удалить выбранные</el-button>
            <el-button plain @click="dialogVisible = true"><i class="mdi mdi-map-marker"></i>Показать все на карте</el-button>
        </template>
        <div class="location__table">
            <el-table
                    :data="data"
                    style="width: 100%"
                    border
                    :loading="is_loading_data"
            >
                <el-table-column
                        label="Название"
                        sortable
                        show-overflow-tooltip>
                    <template slot-scope="scope"><span>{{ scope.row.name }}</span></template>
                </el-table-column>
                <el-table-column
                        property="address"
                        label="Адрес"
                        show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                        label="Действия"
                        width="80"
                        align="center">
                    <template slot-scope="scope">
                        <div class="cell-buttons">
                            <el-button type="text" @click="$router.push(`/info/${scope.row.id}/locations/edit`)"><i class="mdi mdi-pencil"></i></el-button>
                            <el-button type="text" @click="deleteLocation(scope.$index)"><i class="mdi mdi-delete"></i></el-button>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <template slot="card-footer-actions">
            <el-button type="primary" @click="$router.push('/info/' + id + '/locations/create')"><i class="mdi mdi-account-plus"></i>Создать новую локацию</el-button>
        </template>
        <!--Показать все на карте-->
        <el-dialog
                title="Иванов Иван Иванович"
                :visible.sync="dialogVisible"
                width="520px"
                top="calc(50vh - 200px)"
                class="contanctFaces__dialog">
            <span>1111</span>
            <span slot="footer" class="dialog-footer">
                <el-button plain @click="dialogVisible = false"><i class="mdi mdi-pencil"></i>Редактировать</el-button>
            </span>
        </el-dialog>
    </el-card-module>
</template>

<script>
    export default {
        props: ['data', 'id'],
        data() {
            return {
                is_loading_data: false,
                dialogVisible: false,
                multipleSelection: [],
            }
        },
        methods: {
            deleteLocation(index){
                this.is_loading_data = true;

                this.$confirm(`Вы действительно хотите удалить локацию?`, 'Удаление', {
                    confirmButtonText: 'Удалить',
                    cancelButtonText: 'Отмена',
                }).then(() => {
                    this.deleteMethod(this.data[index]).then(res => {
                        this.$notify.success({
                            title: 'Успешно',
                            message: 'Локация была удалена',
                            duration: 1750
                        });

                        this.data.splice(index, 1);
                    }).catch(error => {
                        this.$notify.error({
                            title: 'Ошибка',
                            message: 'Произошла ошибка, повторите операцию позже',
                            duration: 1750
                        });
                    }).then(() => {
                        this.is_loading_data = false;
                    });
                });
            },
            deleteMethod(object){
                return new Promise((resolve, reject) => {
                    r.table("counterparties_locations").get(object.id).update({deletedAt: r.now()}).run(conn, (err, data) => {
                        if(err) reject(err);
                        resolve(data);
                    });
                });
            }
        }
    }
</script>

<style scoped>

</style>