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
                    <el-autocomplete
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
                <el-form label-width="200px" label-position="left">

                    <el-form-item label="Наименование" required>
                        <el-input v-model="model.name.payment"/>
                    </el-form-item>

                    <el-form-item label="Адрес" required>
                        <el-input v-model="model.address"/>
                    </el-form-item>

                    <el-form-item label="БИК / SWIFT">
                        <div class="form__inputsGroup">
                            <el-input placeholder="БИК" v-model="model.bik"/>
                            <el-input placeholder="SWIFT" v-model="model.swift"/>
                        </div>
                    </el-form-item>

                    <el-form-item label="Корсчет" required>
                        <div class="form__inputsOne">
                            <el-input v-model="model.correspondent_account"/>
                        </div>
                    </el-form-item>

                    <el-form-item label="Рег. номер ЦБ РФ">
                        <div class="form__inputsOne">
                            <el-input v-model="model.registration_number"/>
                        </div>
                        <span class="formInfo formInfo-red" style="cursor: pointer" @click="cbrf(model.registration_number)" v-if="model.registration_number !== ''">на сайте ЦБ РФ</span>
                    </el-form-item>

                    <el-form-item label="Рассчетный счет">
                        <div class="form__inputsOne">
                            <el-input v-model="model.checking_account"/>
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
            <el-button type="primary" @click="save"><i class="mdi mdi-content-save"></i>Создать</el-button>
            <!--<el-button type="primary"><i class="mdi mdi-content-save"></i>Сохранить изменения</el-button>-->
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
            save(){
                let res = this.model;
                res.counterparties_id = this.$route.params.id;
                r.table("counterparties_bank_details").insert(res).run(conn, (err, data) => {
                    this.$router.push('/info/' + this.id)
                })
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