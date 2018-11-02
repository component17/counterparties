<template>
    <el-card-module
            showHeader
            title="Содание контактного лица"
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
                    <el-autocomplete
                            class="inline-input"
                            v-model="autocomplete"
                            :fetch-suggestions="querySearch"
                            placeholder="Введите ФИО в свободной форме"
                            :trigger-on-focus="false"
                            @select="handleSelect"
                            style="width: 100%"
                    ></el-autocomplete>
                </div>
            </div>
            <div class="newContacts__form">
                <el-form label-width="200px" label-position="left">
                    <el-form-item label="ФИО" required>
                        <div class="form__inputsGroup">
                            <el-input placeholder="Фамилия" v-model="model.name.surname"/>
                            <el-input placeholder="Имя" v-model="model.name.name"/>
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

                    <el-form-item label="E-mail">
                        <div class="formItem__add">
                            <div class="formItem__add-inputs" v-for="(item, index) in emails" :key="index">
                                <div class="form__inputsGroup form__inputsGroupSmall">
                                    <el-input v-model="emails[index].value"/>
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
                                    <el-input v-model="phones[index].value"/>
                                    <el-input placeholder="доб. номер" v-model="phones[index].ext"/>
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
                                <el-input placeholder="Адрес" v-model="addresses[index].value"/>
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
                                    <el-input placeholder="Значение" v-model="customsContacts[index].value"/>
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
            <el-button type="primary" @click="save()"><i class="mdi mdi-content-save"></i>Создать контактное лицо</el-button>
        </template>

    </el-card-module>
</template>

<script>
    export default {
        data() {
            return {
                autocomplete: '',

                model: {
                    name: {
                        full: '',
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
            }
        },
        created(){
        },
        methods: {
            save(){
                let req = {
                    emails: this.emails,
                    phones: this.phones,
                    addresses: this.addresses,
                    customsContacts: this.customsContacts,
                    counterparties_id: this.$route.params.id
                };

                let res = Object.assign(req, this.model);

                r.table("counterparties_faces").insert(res).run(conn, (err, data) => {
                    this.$router.push('/info/' + this.$route.params.id)
                });

                console.log(res)
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
                            full: `${val.surname} ${val.name} ${val.patronymic}`,
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

<style scoped>

</style>