<template>
    <el-card-module
            showHeader
            title="Новый контрагент/Редактировать данные контрагента"
            btnBack
            @goBack="goBack"
            showFooter
    >
        <div class="newCompany">
            <div class="newCompany__search">
                <div class="newCompany__search-title">
                    <h2>Автоматическое заполнение реквизитов контрагента</h2>
                </div>
                <div class="newCompany__search-input">
                    <!--<el-input placeholder="Введите название в свободной форме, адрес, ИНН или ОГРН"/>-->

                    <el-autocomplete
                            class="inline-input"
                            v-model="autocomplete"
                            :fetch-suggestions="querySearch"
                            placeholder="Введите название в свободной форме, адрес, ИНН или ОГРН"
                            :trigger-on-focus="false"
                            @select="handleSelect"
                            style="width: 100%"
                    ></el-autocomplete>

                </div>
            </div>
            <div class="newCompany__form">
                <el-form label-width="200px" label-position="left">

                    <el-form-item label="Родитель">
                        <el-select v-model="model.parent_id" filterable :default-first-option="false">
                            <el-option
                                    label="Без родителя"
                                    :value="null">
                            </el-option>
                            <el-option
                                    v-for="item in $store.state.contr.list"
                                    :key="item.id"
                                    :label="item.name_short"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="Тип контрагента" required>
                        <el-select v-model="model.type" placeholder="Тип контрагента">
                            <el-option value="LEGAL" label="Юридическое лицо">
                                <!--Юридическое лицо-->
                            </el-option>
                            <el-option value="INDIVIDUAL" label="Физическое лицо">
                                <!--Физическое лицо-->
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="Сокращенное наименование"  required>
                        <el-input v-model="model.name_short"/>
                    </el-form-item>

                    <el-form-item label="Юридическое наименование">
                        <el-input v-model="model.name_full"/>
                    </el-form-item>

                    <el-form-item label="Юридический адрес">
                        <el-input v-model="model.address"/>
                    </el-form-item>

                    <el-form-item label="ОГРН / ИНН / КПП">
                        <div class="form__inputsGroup">
                            <el-input placeholder="ОГРН" v-model="model.ogrn"/>
                            <el-input placeholder="ИНН" v-model="model.inn"/>
                            <el-input placeholder="КПП" v-model="model.kpp"/>
                        </div>
                        <span class="formInfo" v-if="completed">Cв-во о регистрации № 77 015267558 от 20.12.2013, ИФНС 7746</span>
                    </el-form-item>

                    <el-form-item label="Генеральный директор">
                        <el-input v-model="model.management.name"/>
                        <span class="formInfo" v-if="completed">ИНН 325003630515</span>
                    </el-form-item>

                    <el-form-item label="Дата регистрации">
                        <div class="form__smallInput">
                            <el-date-picker
                                    v-model="model.register"
                                    type="date"
                                    format="dd.MM.yyyy"
                                    placeholder="Выберите дату">
                            </el-date-picker>
                        </div>
                        <span class="formInfo" v-if="completed">Действующая организация</span>
                    </el-form-item>

                    <!--<el-form-item label="Уставной капитал">-->
                        <!--<div class="form__smallInput">-->
                            <!--<el-input/>-->
                            <!--<i class="mdi mdi-currency-rub"></i>-->
                        <!--</div>-->
                    <!--</el-form-item>-->

                    <el-form-item>
                        <template slot="label">
                            Теги
                            <el-tooltip content="Теги используются для быстрой идентификации вида деятельности компании" placement="top">
                                <i class="mdi mdi-help-circle"></i>
                            </el-tooltip>
                        </template>
                        <div class="form__tags">
                            <el-tag
                                    :key="tag"
                                    v-for="tag in dynamicTags"
                                    closable
                                    :disable-transitions="false"
                                    @close="handleClose(tag)">
                                {{tag}}
                            </el-tag>
                            <el-input
                                    class="input-new-tag"
                                    v-if="inputVisible"
                                    v-model="inputValue"
                                    ref="saveTagInput"
                                    size="mini"
                                    @keyup.enter.native="handleInputConfirm"
                                    @blur="handleInputConfirm"
                            >
                            </el-input>
                            <el-button v-else class="button-new-tag" @click="showInput" plain><i class="mdi mdi-plus"></i>Добавить тег</el-button>
                        </div>
                    </el-form-item>

                </el-form>

            </div>
            <div class="newCompany__formInfo" v-if="completed">
                <h2>Дополнительная информация:</h2>
                <el-form label-width="150px" label-position="left">
                    <el-form-item label="Учредители">
                        Аскаров Эльшан Бинамин Оглы (325003630515)
                    </el-form-item>
                    <el-form-item label="Налоговая инспекция">
                        Межрайонная инспекция Федеральной налоговой службы №5 по Московской области
                        код 5074
                    </el-form-item>
                    <el-form-item label="Пенс. фонд">
                        Государственное учреждение - Главное Управление Пенсионного фонда РФ №4 Управление №4 г. Подольск Московской области
                        код 060036
                    </el-form-item>
                    <el-form-item label="ФСС">
                        Филиал №18 Государственное учреждение - регионального отделения Фонда социального страхования Российской Федерации по Московской области
                        код 5018
                    </el-form-item>
                    <el-form-item label="ОКВЭД">
                        Торговля розничная преимущественно пищевыми продуктами, включая напитки, и табачными изделиями в неспециализированных магазинах
                        код 47.11 по справочнику 2014 года
                    </el-form-item>
                    <el-form-item label="ОПФ">
                        Общество с ограниченной ответственностью (ООО) код 12300 по справочнику 2014 года
                    </el-form-item>
                </el-form>
            </div>
        </div>

        <template slot="card-footer-actions">
            <el-button type="primary" icon="mdi mdi-content-save" @click="save()">Создать контрагента</el-button>
        </template>

    </el-card-module>
</template>

<script>
    export default {
        computed: {

        },
        data() {
            return {
                autocomplete: '',

                model: {
                    parent_id: null,

                    name_full: '',
                    name_short: '',
                    type: 'LEGAL',

                    address: '',

                    inn: '',
                    kpp: '',
                    ogrn: '',

                    management: {
                        name: '',
                        post: ''
                    },

                    ogrn_date: '',

                },

                dateRegister: '',
                typeContractor: 'LEGAL',
                dynamicTags: [],
                inputVisible: false,
                inputValue: '',
                completed: true,
                showSearch: false,
            }
        },
        methods: {
            save(){
                if(this.model.name_short !== ''){

                    if(this.model.inn !== ''){
                        r.table("counterparties").filter({inn: this.model.inn}).count().run(conn, (err, data) => {
                            if(data > 0){
                                this.$alert('Данная компания уже добавленна!', 'Внимание!', {
                                    confirmButtonText: 'OK'
                                });
                            }
                            else{
                                this.addDb()
                            }
                        });
                    }
                    else{
                        this.addDb()
                    }
                }
            },

            addDb(){
                r.table("counterparties").insert(this.model).run(conn, (err, data) => {

                    this.$router.push('/info/' + data.generated_keys[0])
                })
            },

            querySearch(queryString, cb) {
                upoint.dadata.sug.party(this.autocomplete).then((data) => {

                    let res = data.map((i) => {
                        i.value = `${i.value} | ИНН: ${i.data.inn} | Адрес: ${i.data.address.value}`;
                        return i;
                    });

                    cb(res);
                });
            },
            handleSelect(item) {
                let val = item.data;
                console.log(val);
                this.$nextTick(() => {

                    this.model = {
                        parent_id: this.model.parent_id,

                        name_full: val.name.full_with_opf,
                        name_short: val.type === "LEGAL" ? val.name.short : val.name.full.toUpperCase(),
                        type: val.type,

                        address: val.address.value,

                        inn: val.inn,
                        kpp: val.type === "LEGAL" ? val.kpp : '',
                        ogrn: val.ogrn,

                        management: {
                            name: val.type === "LEGAL" ? val.management.name : '',
                            post: val.type === "LEGAL" ? val.management.post : '',
                        },

                        register: val.state.registration_date,
                        status: val.state.status
                    };
                });
            },
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