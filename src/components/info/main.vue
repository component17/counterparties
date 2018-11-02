<template>
    <el-card-module hiddenHeader showFooter>
        <div class="mainInfo">
            <!--<div class="mainInfo__actions">-->
                <!---->
            <!--</div>-->
            <div class="mainInfo__info">
                <div class="mainInfo__info-item">
                    <h2>Тип контрагента:</h2>
                    <p>{{ data.type === 'LEGAL' ? 'Юридическое лицо' : 'Физическое лицо' }}</p>
                </div>
                <div class="mainInfo__info-item">
                    <h2>Юридическое наименование:</h2>
                    <p>{{ data.name_full }}</p>
                </div>
                <div class="mainInfo__info-item">
                    <h2>Юридический адрес:</h2>
                    <p>{{ data.address }}</p>
                    <span class="pointMap"><i class="mdi mdi-map-marker-radius"></i></span>
                </div>
                <div class="mainInfo__info-item">
                    <h2>ОГРН:</h2>
                    <p>{{ data.ogrn }}</p>
                </div>
                <div class="mainInfo__info-item">
                    <h2>ИНН:</h2>
                    <p>{{ data.inn }}</p>
                </div>
                <div class="mainInfo__info-item">
                    <h2>КПП:</h2>
                    <p>{{ data.inn }}</p>
                </div>
                <div class="mainInfo__info-item">
                    <h2>Руководитель:</h2>
                    <p>{{ data.management.name }} ({{ data.management.post }})</p>
                </div>
                <div class="mainInfo__info-item">
                    <h2>Дата регистрации:</h2>
                    <p>{{ getTime(data.register) }}</p>
                </div>
                <!--<div class="mainInfo__info-item">-->
                    <!--<h2>Уставной капитал:</h2>-->
                    <!--<p>-</p>-->
                <!--</div>-->

                <!--<div class="mainInfo__info-item">-->
                    <!--<h2>Метки:</h2>-->
                    <!--<div class="form__tags">-->
                        <!--<el-tag>Продукты питания</el-tag>-->
                        <!--<el-tag>Прочее</el-tag>-->
                        <!--<el-tag>Электроника</el-tag>-->
                        <!--<el-tag>Очень длинный тег</el-tag>-->
                        <!--<el-tag>Прочее</el-tag>-->
                        <!--<el-tag>Продукты питания</el-tag>-->
                        <!--<el-tag>Очень длинный тег</el-tag>-->
                    <!--</div>-->
                <!--</div>-->
            </div>
        </div>

        <template slot="card-footer">
            <el-button type="info" @click="print()"><i class="mdi mdi-printer"></i>Распечатать</el-button>
            <el-button type="info"><i class="mdi mdi-email-outline"></i>Отправить по почте</el-button>
        </template>

        <template slot="card-footer-actions">
            <el-button type="primary" @click="$router.push('/info/' + $route.params.id + '/main/edit')"><i class="mdi mdi-pencil"></i>Редактировать</el-button>
        </template>
    </el-card-module>
</template>

<script>
    const moment = require('moment');
    moment.locale('ru');

    export default {
        props: ['data'],
        data(){
            return{

            }
        },
        methods: {
            getTime(timestamp){
                return `${moment(timestamp).format('DD.MM.YYYY')} (${moment(timestamp).fromNow()})`;
            },
            print(){
                window.print()
            }
        }
    }
</script>

<style scoped>

</style>