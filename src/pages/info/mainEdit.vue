<template>
    <el-card-module
            showHeader
            title="Редактирование контрагента"
            btnBack
            @goBack="goBack"
            showFooter
            class="cardNewContacts"
    >
        <div class="newContacts">
            <div class="newContacts__search">
                <div class="newContacts__search-title">
                    <h2>Автозаполнение ФИО</h2>
                </div>
                <div class="newContacts__search-input">
                    <el-input placeholder="Введите ФИО в свободной форме"/>
                </div>
            </div>
            <div class="newContacts__form">
                <el-form label-width="200px" label-position="left">
                    <el-form-item label="ФИО" required>
                        <div class="form__inputsGroup">
                            <el-input placeholder="Фамилия"/>
                            <el-input placeholder="Имя"/>
                            <el-input placeholder="Отчество"/>
                        </div>
                    </el-form-item>
                    <el-form-item label="Пол" required>
                        <el-select placeholder="Select" value="man">
                            <el-option
                                    label="Мужской"
                                    value="man">
                            </el-option>
                            <el-option
                                    label="Женский"
                                    value="woman">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="Должность">
                        <el-input/>
                    </el-form-item>
                    <el-form-item label="E-mail" required>
                        <div class="formItem__add">
                            <div class="form__inputsGroup form__inputsGroupSmall">
                                <el-input/>
                                <el-input placeholder="Примечание"/>
                            </div>
                            <div class="formItem__add-inputs" v-for="item in inputsMail" :key="item.key">
                                <div class="form__inputsGroup form__inputsGroupSmall">
                                    <el-input/>
                                    <el-input placeholder="Примечание"/>
                                </div>
                                <el-button plain @click.prevent="removeInputMail(item)"><i class="mdi mdi-delete"></i></el-button>
                            </div>
                            <div class="formItem__add-button">
                                <el-button plain @click="addInputMail"><i class="mdi mdi-plus"></i>Добавить</el-button>
                            </div>
                        </div>
                    </el-form-item>
                    <el-form-item label="Телефон рабочий">
                        <div class="formItem__add">
                            <div class="formItem__add-inputs" v-for="item in inputsPhoneWork" :key="item.key">
                                <div class="form__inputsGroup form__inputsGroupSmall">
                                    <el-input/>
                                    <el-input placeholder="доб. номер"/>
                                    <el-input placeholder="Примечание"/>
                                </div>
                                <el-button plain @click.prevent="removeInputPhoneWork(item)"><i class="mdi mdi-delete"></i></el-button>
                            </div>
                            <div class="formItem__add-button">
                                <el-button plain @click="addInputPhoneWork"><i class="mdi mdi-plus"></i>Добавить</el-button>
                            </div>
                        </div>
                    </el-form-item>
                    <el-form-item label="Адрес">
                        <div class="formItem__add">
                            <div class="formItem__add-inputs" v-for="item in inputsAddress" :key="item.key">
                                <el-input/>
                                <el-button plain @click.prevent="removeInputAddress(item)"><i class="mdi mdi-delete"></i></el-button>
                            </div>
                            <div class="formItem__add-button">
                                <el-button plain @click="addInputAddress"><i class="mdi mdi-plus"></i>Добавить</el-button>
                            </div>
                        </div>
                    </el-form-item>
                    <el-form-item label="Другое">
                        <div class="formItem__add">
                            <div class="formItem__add-inputs" v-for="item in inputsOther" :key="item.key">
                                <div class="form__inputsGroup form__inputsGroupSmall">
                                    <el-input placeholder="Способ связи"/>
                                    <el-input placeholder="Примечание"/>
                                </div>
                                <el-button plain @click.prevent="removeInputOther(item)"><i class="mdi mdi-delete"></i></el-button>
                            </div>
                            <div class="formItem__add-button">
                                <el-button plain @click="addInputOther"><i class="mdi mdi-plus"></i>Добавить</el-button>
                            </div>
                        </div>
                    </el-form-item>
                </el-form>
            </div>
        </div>

        <template slot="card-footer-actions">
            <el-button type="primary"><i class="mdi mdi-content-save"></i>Создать контактное лицо</el-button>
            <el-button type="primary"><i class="mdi mdi-content-save"></i>Сохранить изменения</el-button>
        </template>

    </el-card-module>
</template>

<script>
    export default {
        data() {
            return {
                inputsMail: [],
                inputsPhone: [],
                inputsPhoneWork: [],
                inputsAddress: [],
                inputsOther: [],
            }
        },
        methods: {
            goBack() {
                this.$router.go(-1)
            },
            removeInputMail(item) {
                let index = this.inputsMail.indexOf(item);
                if (index !== -1) {
                    this.inputsMail.splice(index, 1);
                }
            },
            removeInputPhone(item) {
                let index = this.inputsPhone.indexOf(item);
                if (index !== -1) {
                    this.inputsPhone.splice(index, 1);
                }
            },
            removeInputPhoneWork(item) {
                let index = this.inputsPhoneWork.indexOf(item);
                if (index !== -1) {
                    this.inputsPhoneWork.splice(index, 1);
                }
            },
            removeInputAddress(item) {
                let index = this.inputsAddress.indexOf(item);
                if (index !== -1) {
                    this.inputsAddress.splice(index, 1);
                }
            },
            removeInputOther(item) {
                let index = this.inputsOther.indexOf(item);
                if (index !== -1) {
                    this.inputsOther.splice(index, 1);
                }
            },
            addInputMail() {
                this.inputsMail.push({
                    key: Date.now(),
                    value: ''
                });
            },
            addInputPhone() {
                this.inputsPhone.push({
                    key: Date.now(),
                    value: ''
                });
            },
            addInputPhoneWork() {
                this.inputsPhoneWork.push({
                    key: Date.now(),
                    value: ''
                });
            },
            addInputAddress() {
                this.inputsAddress.push({
                    key: Date.now(),
                    value: ''
                });
            },
            addInputOther() {
                this.inputsOther.push({
                    key: Date.now(),
                    value: ''
                });
            },
        }
    }
</script>

<style scoped>

</style>