<template>
    <el-card-module class="location" showFooter>
        <template slot="card-header-actions">
            <el-input placeholder="Поиск"/>
            <el-button plain><i class="mdi mdi-delete"></i>Удалить выбранные</el-button>
            <el-button plain @click="dialogVisible = true"><i class="mdi mdi-map-marker"></i>Показать все на карте</el-button>
        </template>
        <div class="location__table">
            <el-table
                    ref="multipleTable"
                    :data="tableData3"
                    style="width: 100%"
                    border>
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column
                        label="Название"
                        sortable
                        show-overflow-tooltip>
                    <template slot-scope="scope"><span>{{ scope.row.name }}</span></template>
                </el-table-column>
                <el-table-column
                        property="location"
                        label="Адрес"
                        show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                        label="Действия"
                        width="80"
                        align="center">
                    <template slot-scope="scope">
                        <div class="cell-buttons">
                            <el-button type="text"><i class="mdi mdi-pencil"></i></el-button>
                            <el-button type="text"><i class="mdi mdi-delete"></i></el-button>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <template slot="card-footer">
            <el-pagination
                    :page-sizes="[100, 200, 300, 400]"
                    :page-size="100"
                    layout="sizes, prev, pager, next"
                    :total="400">
            </el-pagination>
        </template>
        <template slot="card-footer-actions">
            <el-button type="primary" @click="$router.push('/info/:id/locations/create')"><i class="mdi mdi-account-plus"></i>Создать новую локацию</el-button>
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
        data() {
            return {
                dialogVisible: false,
                tableData3: [{
                    name: 'Самый большой склад',
                    location: '663100, с Казачинское, ул Горького, д 10 ',
                }, {
                    name: 'Головной офис',
                    location: '399608, г Новомичуринск, ул Автозаводская, д 14, кв/оф 231',
                }, {
                    name: 'Склад интернет-магазина',
                    location: '412645, г Киров, ул Абрамцевская, д 69, кв/оф 97',
                }],
                multipleSelection: [],
            }
        }
    }
</script>

<style scoped>

</style>