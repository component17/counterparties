<template>
    <el-card-module
            showHeader
            title="Новый рассчетный счет контрагента  ООО АГЕНТ 01"
            btnBack
            @goBack="goBack"
            showFooter
            class="cardNewContacts"
    >
        <div class="newBanks">
            <div class="newBanks__search">
                <div class="newBanks__search-title">
                    <h2>Автоматическое заполнение банковких реквизитов</h2>
                </div>
                <div class="newBanks__search-input">
                    <el-input placeholder="Введите название, БИК или SWIFT"/>
                </div>
            </div>
            <div class="newBanks__form">
                <el-form label-width="200px" label-position="left">
                    <el-form-item label="Наименование" required>
                        <el-input/>
                    </el-form-item>
                    <el-form-item label="Адрес" required>
                        <el-input/>
                    </el-form-item>
                    <el-form-item label="БИК / SWIFT">
                        <div class="form__inputsGroup">
                            <el-input placeholder="БИК"/>
                            <el-input placeholder="SWIFT"/>
                        </div>
                    </el-form-item>
                    <el-form-item label="Корсчет" required>
                        <div class="form__inputsOne">
                            <el-input/>
                        </div>
                        <span class="formInfo" v-if="completed">в ОНБ ОТДЕЛЕНИЕ КЕМЕРОВО</span>
                    </el-form-item>
                    <el-form-item label="Рег. номер">
                        <div class="form__inputsOne">
                            <el-input/>
                        </div>
                        <span class="formInfo formInfo-red" v-if="completed">на сайте ЦБ РФ</span>
                    </el-form-item>
                    <el-form-item label="Рассчетный счет">
                        <div class="form__inputsOne">
                            <el-input/>
                        </div>
                    </el-form-item>
                    <el-form-item label="Валюта">
                        <div class="form__inputsOne">
                            <el-select v-model="testVal">
                                <el-option value="test1" label="USD">
                                    USD
                                </el-option>
                                <el-option value="test2" label="RUB">
                                    RUB
                                </el-option>
                            </el-select>
                        </div>
                    </el-form-item>
                </el-form>
            </div>
        </div>

        <template slot="card-footer-actions">
            <el-button type="primary"><i class="mdi mdi-content-save"></i>Создать счет</el-button>
            <el-button type="primary"><i class="mdi mdi-content-save"></i>Сохранить изменения</el-button>
        </template>

    </el-card-module>
</template>

<script>
    export default {
        data() {
            return {
                completed: true,
                testVal: '',
                dateRegister: '',
                dynamicTags: [],
                inputVisible: false,
                inputValue: '',
                showSearch: false,
            }
        },
        methods: {
            goBack() {
                this.$router.go(-1)
            },
            handleClose(tag) {
                this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
            },

            showInput() {
                this.inputVisible = true;
                this.$nextTick(_ => {
                    this.$refs.saveTagInput.$refs.input.focus();
                });
            },

            handleInputConfirm() {
                let inputValue = this.inputValue;
                if (inputValue) {
                    this.dynamicTags.push(inputValue);
                }
                this.inputVisible = false;
                this.inputValue = '';
            }
        }
    }
</script>

<style scoped>

</style>