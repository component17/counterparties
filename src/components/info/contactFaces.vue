<template>
    <el-card-module class="contanctFaces" showFooter>
        <template slot="card-header-actions">
            <el-input placeholder="Поиск"/>
            <el-button plain><i class="mdi mdi-delete"></i>Удалить выбранные</el-button>
        </template>
        <div class="contanctFaces__table">
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
                        label="Имя"
                        sortable
                        show-overflow-tooltip>
                    <template slot-scope="scope"><span class="contanctFacesName" @click="dialogVisible = true">{{ scope.row.name }}</span></template>
                </el-table-column>
                <el-table-column
                        property="position"
                        label="Должность"
                        show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                        property="mail"
                        label="E-mail"
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
            <el-button type="primary" @click="$router.push('/info/:id/contact-faces/create')"><i class="mdi mdi-account-plus"></i>Создать новое контактное лицо</el-button>
        </template>
        <!--Информация о сотруднике-->
        <el-dialog
                title="Иванов Иван Иванович"
                :visible.sync="dialogVisible"
                width="520px"
                top="calc(50vh - 200px)"
                class="contanctFaces__dialog">
            <div class="contanctFaces__dialog-info">
                <div><i class="mdi mdi-account"></i>Старший менеджер</div>
                <div><i class="mdi mdi-email"></i> iii@mail.ru <span>(Личная почта)</span></div>
                <div><i class="mdi mdi-email"></i>iIvanovii@agent01.com</div>
                <div><i class="mdi mdi-phone"></i>+74953335236 доб. 001</div>
                <div><i class="mdi mdi-phone"></i>+79693332255 <span>(Личный, звонить с 9 до 18)</span></div>
                <div><i class="mdi mdi-map-marker"></i>Москва, ул Железнодорожная 12/2 кв 47</div>
                <div><i class="mdi mdi-dots-horizontal"></i>ivan_ivan <span>(Skype с 9 до 18)</span></div>
            </div>
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
                    name: 'Петров Сергей',
                    position: 'Директор данного заведения',
                    mail: ' great80@gmail.com'
                }, {
                    name: 'Алексеева Светлана Николаевна',
                    position: 'Менеджер по закупкам',
                    mail: 'valentin.runolfsson@erdman.net'
                }, {
                    name: 'Корабельников Анатолий Аристархович',
                    position: 'Старший менеджер',
                    mail: 'madilyn_hagenes@hotmail.com'
                }],
                multipleSelection: [],
            }
        }
    }
</script>

<style scoped>

</style>