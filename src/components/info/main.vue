<template>
    <el-card-module hiddenHeader>
        <div class="mainInfo">
            <div class="mainInfo__actions">
                <el-button type="info"><i class="mdi mdi-printer"></i>Распечатать</el-button>
                <el-button type="info" @click="$router.push('/info/' + $route.params.id + '/main/edit')"><i class="mdi mdi-pencil"></i>Редактировать</el-button>
                <el-button type="info"><i class="mdi mdi-email-outline"></i>Отправить по почте</el-button>
            </div>
            <div class="mainInfo__info">
                <div class="mainInfo__info-item">
                    <h2>Тип контрагента:</h2>
                    <p>Юридическое лицо</p>
                </div>
                <div class="mainInfo__info-item">
                    <h2>Юридическое наименование:</h2>
                    <p>ОБЩЕСТВО С ОГРАНИЧЕННОЙ ОТВЕТСТВЕННОСТЬЮ "АГЕНТ 01"</p>
                </div>
                <div class="mainInfo__info-item">
                    <h2>Юридический адрес:</h2>
                    <p>142100, Московская обл, г Подольск, пр-кт Ленина, д 144</p>
                    <span class="pointMap"><i class="mdi mdi-map-marker-radius"></i></span>
                </div>
                <div class="mainInfo__info-item">
                    <h2>ОГРН:</h2>
                    <p>5137746213017</p>
                </div>
                <div class="mainInfo__info-item">
                    <h2>ИНН:</h2>
                    <p>7751517268</p>
                </div>
                <div class="mainInfo__info-item">
                    <h2>КПП:</h2>
                    <p>503601001</p>
                </div>
                <div class="mainInfo__info-item">
                    <h2>Генеральный директор:</h2>
                    <p> Аскаров Эльшан Бинамин Оглы (325003630515)</p>
                </div>
                <div class="mainInfo__info-item">
                    <h2>Дата регистрации:</h2>
                    <p>19.12.2013</p>
                </div>
                <div class="mainInfo__info-item">
                    <h2>Уставной капитал:</h2>
                    <p>-</p>
                </div>
                <div class="mainInfo__info-item">
                    <h2>Метки:</h2>
                    <div class="form__tags">
                        <el-tag>Продукты питания</el-tag>
                        <el-tag>Прочее</el-tag>
                        <el-tag>Электроника</el-tag>
                        <el-tag>Очень длинный тег</el-tag>
                        <el-tag>Прочее</el-tag>
                        <el-tag>Продукты питания</el-tag>
                        <el-tag>Очень длинный тег</el-tag>
                    </div>
                </div>
            </div>
        </div>
    </el-card-module>
</template>

<script>
    export default {
        data(){
            return{

            }
        }
    }
</script>

<style scoped>

</style>