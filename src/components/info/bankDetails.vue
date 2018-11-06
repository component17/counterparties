<template>
    <el-card-module class="banksInfo" showFooter>
        <!--<template slot="card-header-actions">-->
            <!--<el-input placeholder="Поиск"/>-->
            <!--<el-button plain><i class="mdi mdi-delete"></i>Удалить выбранные</el-button>-->
        <!--</template>-->
        <div class="banksInfo__table">
            <el-table
                    ref="multipleTable"
                    :data="data"
                    style="width: 100%"
                    border>
                <!--<el-table-column-->
                <!--type="selection"-->
                <!--width="55">-->
                <!--</el-table-column>-->
                <el-table-column
                        label="Банк"
                        sortable
                        show-overflow-tooltip>
                    <template slot-scope="scope"><span>{{ scope.row.name.full }}</span></template>
                </el-table-column>
                <el-table-column
                        property="checking_account"
                        label="Номер счета"
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
            <el-button type="primary" @click="$router.push('/info/' + id + '/bank-details/create')"><i
                    class="mdi mdi-account-plus"></i>Создать новый расчетный счет
            </el-button>
        </template>
    </el-card-module>
</template>

<script>
    export default {
        props: ['data', 'id'],
        data() {
            return {


                dialogVisible: false,
                tableData3: [{
                    bank: 'ФИЛИАЛ N 11 ПАО МОСОБЛБАНК',
                    number: ' 40841002500000003146',
                }, {
                    bank: 'ФИЛИАЛ "ЕКАТЕРИНБУРГСКИЙ" АО "АЛЬФА-БАНК"',
                    number: '40702810799991396393',
                }, {
                    bank: 'ДАЛЬНЕВОСТОЧНЫЙ БАНК ПАО СБЕРБАНК',
                    number: '40801000000000000052',
                }],
                multipleSelection: [],
            }
        }
    }
</script>

<style scoped>

</style>
