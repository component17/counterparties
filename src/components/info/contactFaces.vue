<template>
    <el-card-module class="contanctFaces" showFooter>
        <template slot="card-header-actions">
            <el-input placeholder="Поиск"/>
            <el-button plain><i class="mdi mdi-delete"></i>Удалить выбранные</el-button>
        </template>
        <div class="contanctFaces__table">
            <el-table
                ref="multipleTable"
                :data="data"
                style="width: 100%"
                border
                :loading="is_loading_data"
            >
                <!--<el-table-column-->
                        <!--type="selection"-->
                        <!--width="55">-->
                <!--</el-table-column>-->
                <el-table-column
                        label="ФИО"
                        sortable
                        show-overflow-tooltip>
                    <template slot-scope="scope"><span class="contanctFacesName" @click="selectFace(scope.$index)">{{ scope.row.name.full }}</span></template>
                </el-table-column>
                <el-table-column
                        property="staff"
                        label="Должность"
                        show-overflow-tooltip>
                    <template slot-scope="scope">
                        <span :class="{'empty__text': !scope.row.staff.length }">
                            {{ scope.row.staff.length ? scope.row.staff : 'Не указанно' }}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="E-mail"
                        show-overflow-tooltip>
                    <template slot-scope="scope">
                        <span :class="{'empty__text': !scope.row.emails.length }">
                            {{ scope.row.emails.length ? scope.row.emails[0].value : 'Не указанно' }}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="Действия"
                        width="80"
                        align="center">
                    <template slot-scope="scope">
                        <div class="cell-buttons">
                            <el-button type="text" @click="$router.push(`/info/${scope.row.id}/contact-faces/edit`)"><i class="mdi mdi-pencil"></i></el-button>
                            <el-button type="text" @click="deleteContact(scope.$index)"><i class="mdi mdi-delete"></i></el-button>
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
            <el-button type="primary" @click="$router.push('/info/' + id + '/contact-faces/create')"><i class="mdi mdi-account-plus"></i>Создать новое контактное лицо</el-button>
        </template>
        <!--Информация о сотруднике-->
        <el-dialog
                :title="currentFace ? currentFace.name.full : ''"
                :visible.sync="dialogVisible"
                width="520px"
                top="calc(50vh - 200px)"
                class="contanctFaces__dialog">
            <div class="contanctFaces__dialog-info">

                <div v-if="currentFace && currentFace.staff !== ''"><i class="mdi mdi-account"></i>{{ currentFace ? currentFace.staff : '' }}</div>

                <div v-for="(item, index) in currentFace ? currentFace.emails : []"><i class="mdi mdi-email"></i> {{ item.value }} <span v-if="item.desc !== ''">({{ item.desc }})</span></div>

                <div v-for="(item, index) in currentFace ? currentFace.phones : []"><i class="mdi mdi-phone"></i>{{ item.value }} <span v-if="item.desc !== ''">({{ item.desc }})</span></div>

                <div v-for="(item, index) in currentFace ? currentFace.address : []"><i class="mdi mdi-map-marker"></i>{{ item.value }}</div>

                <div v-for="(item, index) in currentFace ? currentFace.customsContacts : []"><i class="mdi mdi-dots-horizontal"></i>{{ item.value }} <span v-if="item.desc !== ''">({{ item.desc }})</span></div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button plain @click="$router.push(`/info/${currentFace.id}/contact-faces/edit`)"><i class="mdi mdi-pencil"></i>Редактировать</el-button>
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

                currentFace: null,

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
        },
        methods: {
            deleteContact(index){
                this.is_loading_data = true;

                this.$confirm(`Вы действительно хотите удалить контакное лицо (${this.data[index].name.full})?`, 'Удаление', {
                    confirmButtonText: 'Удалить',
                    cancelButtonText: 'Отмена',
                }).then(() => {
                    this.deleteMethod(this.data[index]).then(res => {
                        console.log(res);
                        this.$notify.success({
                            title: 'Успешно',
                            message: 'Контактное лицо было удалено',
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
            selectFace(index){
                this.currentFace = this.data[index];
                this.dialogVisible = true;
            },
            deleteMethod(object){
                return new Promise((resolve, reject) => {
                    r.table("counterparties_faces").get(object.id).delete().run(conn, (err, data) => {
                        if(err) reject(err);
                        resolve(data);
                    });
                });
            },
            // update
        }
    }
</script>

<style lang="scss">
    .empty__text{
        color: #9b9b9b;
    }
</style>