<template>
    <el-card-module
            showHeader
            :title="`Новый рассчетный счет контрагента ${counterparties_name}`"
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
                    <el-autocomplete
                            :disabled="is_loading_action"
                            class="inline-input"
                            v-model="autocomplete"
                            :fetch-suggestions="querySearch"
                            placeholder="Введите Название, БИК, SWIFT в свободной форме"
                            :trigger-on-focus="false"
                            @select="handleSelect"
                            style="width: 100%"
                    ></el-autocomplete>
                </div>
            </div>
            <div class="newBanks__form">
                <el-form label-width="200px" label-position="left" :rules="rules" :model="model" :disabled="is_loading_action">

                    <el-form-item label="Наименование" required prop="name.payment">
                        <el-input v-model="model.name.payment" placeholder="Наименование банка"/>
                    </el-form-item>

                    <el-form-item label="Адрес" required prop="address">
                        <el-input v-model="model.address" placeholder="Адрес банка"/>
                    </el-form-item>

                    <el-form-item label="БИК / SWIFT">
                        <div class="form__inputsGroup">
                            <el-input placeholder="БИК" v-model="model.bik"/>
                            <el-input placeholder="SWIFT" v-model="model.swift"/>
                        </div>
                    </el-form-item>

                    <el-form-item label="Корсчет" required prop="correspondent_account">
                        <div class="form__inputsOne">
                            <el-input :min="20" :minlength="20" v-model="model.correspondent_account" class="form__field_number" placeholder="Корсчет банка"/>
                        </div>
                    </el-form-item>

                    <el-form-item label="Рег. номер ЦБ РФ">
                        <div class="form__inputsOne">
                            <el-input v-model="model.registration_number" placeholder="Регестрационный номер ЦБ"/>
                        </div>
                        <span class="formInfo formInfo-red" style="cursor: pointer" @click="cbrf(model.registration_number)" v-if="model.registration_number !== ''">на сайте ЦБ РФ</span>
                    </el-form-item>

                    <el-form-item label="Рассчетный счет" required prop="checking_account">
                        <div class="form__inputsOne">
                            <el-input :min="20" :minlength="20" v-model="model.checking_account" class="form__field_number" placeholder="Рассчетный счет"/>
                        </div>
                    </el-form-item>

                    <!--<el-form-item label="Валюта">-->
                        <!--<div class="form__inputsOne">-->
                            <!--<el-select v-model="testVal">-->
                                <!--<el-option value="test1" label="USD">-->
                                    <!--USD-->
                                <!--</el-option>-->
                                <!--<el-option value="test2" label="RUB">-->
                                    <!--RUB-->
                                <!--</el-option>-->
                            <!--</el-select>-->
                        <!--</div>-->
                    <!--</el-form-item>-->
                </el-form>
            </div>
        </div>

        <template slot="card-footer-actions">
            <el-button type="primary" @click="save"
                :disabled="
                    model.name.payment.length < 5 ||
                    model.address.length < 3 ||
                    model.correspondent_account.length < 20 ||
                    model.checking_account.length < 20
                "
                :loading="is_loading_action"
            ><i class="mdi mdi-content-save"></i>Создать</el-button>
            <!--<el-button type="primary"><i class="mdi mdi-content-save"></i>Сохранить изменения</el-button>-->
        </template>

    </el-card-module>
</template>

<script>
    export default {
        data() {
            return {
                is_loading_action: false,

                counterparties_name: '',
                autocomplete: '',

                model: {
                    name: {
                        full: '',
                        payment: '',
                        short: '',
                    },

                    address: '',
                    bik: '',
                    swift: '',
                    correspondent_account: '',
                    registration_number: '',

                    checking_account: ''
                },
                rules: {
                    name: {payment: [
                        { required: true, message: 'Укажите наименование банка', trigger: ['change' ,'blur'] },
                        { min: 5, message: 'Наименование должно быть минимум 5 символов', trigger: ['change' ,'blur'] }
                    ]},
                    address: [
                        { required: true, message: 'Введите адрес', trigger: ['change' ,'blur'] },
                        { min: 3, message: 'Адрес должен быть минимум 3 символа', trigger: ['change' ,'blur'] }
                    ],
                    correspondent_account: [
                        { required: true, message: 'Введите корреспондентский счет', trigger: ['change' ,'blur'] },
                        { min: 20, message: 'Корсчет должен быть минимум 20 символов', trigger: ['change' ,'blur'] }
                    ],
                    checking_account: [
                        { required: true, message: 'Введите рассчетный счет', trigger: ['change' ,'blur'] },
                        { min: 20, message: 'Рассчетный счет должен быть минимум 20 символов', trigger: ['change' ,'blur'] }
                    ]
                },

                completed: true,
                testVal: '',
                dateRegister: '',
                dynamicTags: [],
                inputVisible: false,
                inputValue: '',
                showSearch: false,
            }
        },
        computed: { },
        watch: { },
        created(){
            r.table('counterparties').get(this.$route.params.id).run(conn, (err, data) => {
                if(err) this.counterparties_name = '';
                console.log(data);
                this.counterparties_name = data.name_short;
            });
        },
        methods: {
            sendData(object){
                return new Promise((resolve, reject) => {
                    r.table("counterparties_bank_details").insert(object).run(conn, (err, data) => {
                        if(err) reject(err);

                        resolve(data);
                    })
                })
            },
            save(){
                this.is_loading_action = true;

                let res = this.model;
                res.counterparties_id = this.$route.params.id;

                this.sendData(res).then(result => {
                    this.$notify.success({
                        title: 'Успешно',
                        message: 'Рассчетный счет был создан',
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
                    this.$router.push('/info/' + this.$route.params.id)
                });
            },
            cbrf(id){
                upoint.shell.openLink(`http://www.cbr.ru/credit/colist.asp?find=${id}&how=rnum`)
            },

            goBack() {
                this.$router.go(-1)
            },

            querySearch(queryString, cb) {
                upoint.dadata.sug.bank(this.autocomplete).then((data) => {
                    cb(data);
                });
            },

            handleSelect(item) {
                let val = item.data;
                console.log(val);
                this.$nextTick(() => {

                    this.model = {
                        name: {
                            full: val.name.full,
                            payment: val.name.payment,
                            short: val.name.short,
                        },

                        address: val.address.value,
                        bik: val.bic,
                        swift: val.swift,
                        correspondent_account: val.correspondent_account,
                        registration_number: val.registration_number,

                        checking_account: this.model.checking_account
                    };
                });
            }
        }
    }
</script>

<style lang="scss">
    .form__field_number{
        & > input {
            &::-webkit-outer-spin-button,
            &::-webkit-inner-spin-button {
                /* display: none; <- Crashes Chrome on hover */
                -webkit-appearance: none;
                margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
            }
        }
    }
</style>