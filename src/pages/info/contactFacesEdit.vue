<template>
    <el-card-module
            showHeader
            title="Редактирование контактного лица"
            btnBack
            @goBack="goBack"
            showFooter
            class="cardNewContacts"
    >
        <el-col style="width: 100%; height: 100vh;" v-if="is_loading_data" v-loading="true"></el-col>

        <div class="newContacts" v-else>
            <div class="newContacts__search" style="background: none;"></div>
            <div class="newContacts__form">
                <el-form label-width="200px" label-position="left" :disabled="is_loading_action">
                    <el-form-item label="ФИО" required>
                        <div class="form__inputsGroup">
                            <el-input placeholder="Имя" v-model="model.name.name" class="name" @blur="checkName('name')"/>
                            <span class="form__inputs_error name__error">Имя должно быть минимум в 2 символа</span>
                            <el-input placeholder="Фамилия" v-model="model.name.surname" class="surname" @blur="checkName('surname')"/>
                            <span class="form__inputs_error surname__error">Фамилия должна быть минимум в 2 символа</span>
                            <el-input placeholder="Отчество" v-model="model.name.patronymic"/>
                        </div>
                    </el-form-item>
                    <el-form-item label="Пол" required>
                        <el-select placeholder="Select" value="MALE" v-model="model.gender">
                            <el-option
                                    label="Мужской"
                                    value="MALE">
                            </el-option>
                            <el-option
                                    label="Женский"
                                    value="FEMALE">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="Должность">
                        <el-input v-model="model.staff"/>
                    </el-form-item>

                    <el-form-item label="E-mail" >
                        <div class="formItem__add">
                            <div class="formItem__add-inputs" v-for="(item, index) in emails" :key="index">
                                <div class="form__inputsGroup form__inputsGroupSmall">
                                    <el-input type="email" v-model="emails[index].value" placeholder="Введите email" @blur="checkEmail(emails[index].value)" class="emails"></el-input>
                                    <span class="form__inputs_error emails__error">Введите корретный email адрес</span>
                                    <el-input placeholder="Примечание" v-model="emails[index].desc"/>
                                </div>
                                <el-button plain @click.prevent="removeEmail(index)"><i class="mdi mdi-delete"></i></el-button>
                            </div>
                            <div class="formItem__add-button">
                                <el-button plain @click="addEmail"><i class="mdi mdi-plus"></i>Добавить</el-button>
                            </div>
                        </div>
                    </el-form-item>

                    <el-form-item label="Телефон рабочий">
                        <div class="formItem__add">
                            <div class="formItem__add-inputs" v-for="(item, index) in phones" :key="index">
                                <div class="form__inputsGroup form__inputsGroupSmall">
                                    <el-input
                                            type="tel"
                                            :minlength="4" :min="4"
                                            v-model="phones[index].value"
                                            v-mask="['+# (###) ###-##-##', '+## (###) ###-##-##', '+### (###) ###-##-##']"
                                            placeholder="8 (999) 999-99-99"
                                            @blur="checkPhone"
                                            class="phones"
                                    ></el-input>
                                    <span class="form__inputs_error phones__error">Введите корретный номер</span>
                                    <el-input type="number" placeholder="доб. номер" v-model="phones[index].ext"/>
                                    <el-input placeholder="Примечание" v-model="phones[index].desc"/>
                                </div>
                                <el-button plain @click.prevent="removePhone(index)"><i class="mdi mdi-delete"></i></el-button>
                            </div>
                            <div class="formItem__add-button">
                                <el-button plain @click="addPhone()"><i class="mdi mdi-plus"></i>Добавить</el-button>
                            </div>
                        </div>
                    </el-form-item>

                    <el-form-item label="Адрес">
                        <div class="formItem__add">
                            <div class="formItem__add-inputs" v-for="(item, index) in addresses" :key="index">
                                <el-input
                                        placeholder="Адрес"
                                        :minlength="3"
                                        :min="3"
                                        v-model="addresses[index].value"
                                        @blur="checkAddress"
                                        class="addresses"></el-input>
                                <span class="form__inputs_error addresses__error">Длина адреса должна быть минимум 3 символа</span>
                                <el-button plain @click.prevent="removeAddress(index)"><i class="mdi mdi-delete"></i></el-button>
                            </div>
                            <div class="formItem__add-button">
                                <el-button plain @click="addAddress"><i class="mdi mdi-plus"></i>Добавить</el-button>
                            </div>
                        </div>
                    </el-form-item>

                    <el-form-item label="Другое">
                        <div class="formItem__add">
                            <div class="formItem__add-inputs" v-for="(item, index) in customsContacts" :key="index">
                                <div class="form__inputsGroup form__inputsGroupSmall">
                                    <el-input
                                            placeholder="Значение"
                                            :minlength="1"
                                            :min="1"
                                            v-model="customsContacts[index].value"
                                            @blur="checkOther"
                                            class="customsContacts"
                                    ></el-input>
                                    <span class="form__inputs_error customsContacts__error">Поле не может быть пустым</span>
                                    <el-input placeholder="Примечание" v-model="customsContacts[index].desc"/>
                                </div>
                                <el-button plain @click.prevent="removeCustom(index)"><i class="mdi mdi-delete"></i></el-button>
                            </div>
                            <div class="formItem__add-button">
                                <el-button plain @click="addCustom()"><i class="mdi mdi-plus"></i>Добавить</el-button>
                            </div>
                        </div>
                    </el-form-item>

                </el-form>
            </div>
        </div>

        <template slot="card-footer-actions">
            <el-button type="primary" @click="save()" :disabled="is_loading_data" :loading="is_loading_action"><i class="mdi mdi-content-save"></i>Изменить контактное лицо</el-button>
        </template>

    </el-card-module>
</template>

<script>
    import {mask} from 'vue-the-mask'

    export default {
        directives: {mask},
        data() {
            return {
                is_loading_data: true,

                autocomplete: '',

                model: {
                    name: {
                        patronymic: '',
                        surname: '',
                        name: ''
                    },

                    gender: 'MALE',

                    staff: '',
                },

                emails: [],
                phones: [],
                addresses: [],
                customsContacts: [],

                is_valid_form: false,
                is_loading_action: false
            }
        },
        computed: { },
        watch: { },
        created(){
            this.getContact(this.$route.params.id).then(res => {
                this.model = {
                    name: res.name,
                    gender: res.gender,
                    staff: res.staff,
                    id: res.id,
                    counterparties_id: res.counterparties_id
                };

                this.emails = res.emails;
                this.phones = res.phones;
                this.addresses = res.addresses;
                this.customsContacts = res.customsContacts;
            }).then(() => {
                this.is_loading_data = false;
            });
        },
        methods: {
            getContact(id){
                return new Promise((resolve, reject) => {
                    r.table("counterparties_faces").get(id).run(conn, (err, data) => {
                        if(err) reject(err);
                        resolve(data);
                    });
                })
            },

            checkName(field){
                if(this.model.name[field].length >= 2){
                    this.showHideError(field, 0, true);
                    return true;
                }else{
                    this.showHideError(field, 0, false);
                    return false;
                }

            },
            checkEmail(){
                let regexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                let length = this.emails.length;
                let passed = 0;

                for(let i in this.emails){
                    if(regexp.test(String(this.emails[i].value).toLowerCase())){
                        this.showHideError('emails', i, true);
                        passed = passed + 1;
                    }else{
                        this.showHideError('emails', i, false);
                    }
                }

                return passed === length;
            },
            checkPhone(){
                let passed = 0;
                let length = this.phones.length;

                for(let i in this.phones){
                    if(this.phones[i].value.length >= 18){
                        this.showHideError('phones', i, true);
                        passed = passed + 1;
                    }else{
                        this.showHideError('phones', i, false);
                    }
                }

                return passed === length;
            },
            checkAddress(){
                let passed = 0;
                let length = this.addresses.length;

                for(let i in this.addresses){
                    if(this.addresses[i].value.length >= 3){
                        this.showHideError('addresses', i, true);
                        passed = passed + 1;
                    }else{
                        this.showHideError('addresses', i, false);
                    }
                }

                return passed === length;
            },
            checkOther(){
                let passed = 0;
                let length = this.customsContacts.length;

                for(let i in this.customsContacts){
                    if(this.customsContacts[i].value.length >= 1){
                        this.showHideError('customsContacts', i, true);
                        passed = passed + 1;
                    }else{
                        this.showHideError('customsContacts', i, false);
                    }
                }

                return passed === length;
            },

            showHideError(name, index, passed = false){
                let input = document.querySelectorAll(`.${name}`)[index].children[0];
                let error = document.querySelectorAll(`.${name}__error`)[index];

                if(passed){
                    input.style.borderColor = '#12c461';
                    error.style.opacity = 0;
                }else{
                    if(name === 'name' || name === 'surname'){
                        if(name === 'name'){
                            input.style.borderColor = '#bc0000';
                            error.style.opacity = 1;
                            document.querySelectorAll(`.surname__error`)[0].style.opacity = 0;
                        }else{
                            input.style.borderColor = '#bc0000';
                            error.style.opacity = 1;
                            document.querySelectorAll(`.name__error`)[0].style.opacity = 0;
                        }
                    }else{
                        input.style.borderColor = '#bc0000';
                        error.style.opacity = 1;
                    }
                }
            },
            sendData(object){
                return new Promise((resolve, reject) => {
                    r.table('counterparties_faces').get(object.id).update(object).run(conn, (err, data) => {
                        if(err) reject(err);
                        resolve(data);
                    });
                })
            },

            save(){
                this.is_loading_action = true;

                if(
                    this.checkName('name') &&
                    this.checkName('surname') &&
                    this.checkEmail() &&
                    this.checkPhone() &&
                    this.checkAddress() &&
                    this.checkOther())
                {
                    let req = {
                        emails: this.emails,
                        phones: this.phones,
                        addresses: this.addresses,
                        customsContacts: this.customsContacts,
                        counterparties_id: this.$route.params.id
                    };

                    let res = Object.assign(req, this.model);

                    res.name.full = `${res.name.surname} ${res.name.name}${res.name.patronymic.length ? ' ' + res.name.patronymic : ''}`;

                    this.sendData(res).then(res => {
                        this.$notify.success({
                            title: 'Успешно',
                            message: 'Данные были изменены',
                            duration: 1750
                        });
                    }).catch(error => {
                        this.$notify.error({
                            title: 'Ошибка',
                            message: 'Произошла ошибка, повторите операцию позже',
                            duration: 1750
                        });
                    }).then(() => {
                        this.is_loading_action = false;
                        this.$router.push('/info/' + this.model.counterparties_id);
                    });
                }else{
                    this.is_loading_action = false;
                }
            },

            addEmail(){
                this.emails.push({
                    value: '',
                    desc: ''
                })
            },

            removeEmail(index){
                this.emails.splice(index, 1);
            },

            addPhone(){
                this.phones.push({
                    value: '',
                    ext: '',
                    desc: ''
                })
            },

            removePhone(index){
                this.phones.splice(index, 1);
            },

            addAddress(){
                this.addresses.push({
                    value: '',
                    desc: ''
                })
            },

            removeAddress(index){
                this.addresses.splice(index, 1);
            },

            addCustom(){
                this.customsContacts.push({
                    value: '',
                    desc: ''
                })
            },

            removeCustom(index){
                this.customsContacts.splice(index, 1);
            },

            querySearch(queryString, cb) {
                upoint.dadata.sug.fio(this.autocomplete).then((data) => {
                    cb(data);
                });
            },

            handleSelect(item) {
                let val = item.data;
                console.log(val);
                this.$nextTick(() => {

                    this.model = {
                        name: {
                            patronymic: val.patronymic,
                            surname: val.surname,
                            name: val.name
                        },

                        gender: val.gender,

                        staff: this.model.staff,
                    };
                });
            },

            goBack() {
                this.$router.go(-1)
            },
        }
    }
</script>

<style lang="scss">
    input {
        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
            /* display: none; <- Crashes Chrome on hover */
            -webkit-appearance: none;
            margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
        }
    }
    .phone-code {
        min-width: 60px;
        width: 60px;
        & > input {
            width: 60px;
            &::-webkit-outer-spin-button,
            &::-webkit-inner-spin-button {
                /* display: none; <- Crashes Chrome on hover */
                -webkit-appearance: none;
                margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
            }
        }
    }
    .form__inputs_error{
        display: block;
        color: #bc0000;

        font-size: 11px;
        position: absolute;
        top: 25px;
        left: 15px;

        opacity: 0;

        transition: 0.3s ease;
    }

</style>