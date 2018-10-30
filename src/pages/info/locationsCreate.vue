<template>
    <el-card-module
            showHeader
            title="Новая локация"
            btnBack
            @goBack="goBack"
            showFooter
            class="newLocationCard"
    >
        <div class="newLocation">
            <div class="newLocation__search">
                <div class="newLocation__search-title">
                    <h2>Автоматическое заполнение реквизитов контрагента</h2>
                </div>
                <div class="newLocation__search-input">
                    <el-input placeholder="Введите название в свободной форме, адрес, ИНН или ОГРН"/>
                </div>
            </div>
            <div class="newLocation__form">
                <el-form label-width="200px" label-position="left">
                    <el-form-item label="Название" required>
                        <el-input/>
                    </el-form-item>
                    <el-form-item label="Индекс" required>
                        <el-input/>
                    </el-form-item>
                    <el-form-item label="Регион / район">
                        <el-input/>
                    </el-form-item>
                    <el-form-item label="Город / н.п.">
                        <el-input/>
                    </el-form-item>
                    <el-form-item label="Улица">
                        <el-input/>
                    </el-form-item>
                    <el-form-item label="Дом">
                        <el-input/>
                    </el-form-item>
                    <el-form-item label="Квартира">
                        <el-input/>
                    </el-form-item>
                    <el-form-item label="Комментарий">
                        <el-input type="textarea" rows="3"/>
                    </el-form-item>
                </el-form>
            </div>
        </div>

        <template slot="card-footer-actions">
            <el-button type="primary"><i class="mdi mdi-content-save"></i>Создать локацию</el-button>
            <el-button type="primary"><i class="mdi mdi-content-save"></i>Сохранить изменения</el-button>
        </template>

    </el-card-module>
</template>

<script>
    export default {
        data() {
            return {
                dateRegister: '',
                typeContractor: 'entity',
                inputValue: '',
                completed: true,
                showSearch: false,
            }
        },
        methods: {
            goBack() {
                this.$router.go(-1)
            },
        }
    }
</script>

<style scoped>

</style>