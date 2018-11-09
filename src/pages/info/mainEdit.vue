<template>
    <el-card-module
            showHeader
            title="Редактировать данные контрагента"
            btnBack
            @goBack="goBack"
            showFooter
    >
        <el-col style="width: 100%; height: 100vh;" v-if="is_loading_data" v-loading="true"></el-col>
        <div class="newCompany" v-else>
            <div class="newCompany__search" style="background: none;">
                <!--<div class="newCompany__search-title">-->
                    <!--<h2>Автоматическое заполнение реквизитов контрагента</h2>-->
                <!--</div>-->
                <!--<div class="newCompany__search-input">-->
                    <!--<el-input placeholder="Введите название в свободной форме, адрес, ИНН или ОГРН" :disabled="is_loading_action"/>-->
                <!--</div>-->
            </div>
            <div class="newCompany__form">
                <el-form label-width="200px" label-position="left" :model="model" :rules="rules" :disabled="is_loading_action">

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
                                :value="item.id"
                                v-if="item.id !== model.id"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="Тип контрагента" required prop="type">
                        <el-select v-model="model.type" placeholder="Тип контрагента">
                            <el-option value="LEGAL" label="Юридическое лицо">
                                <!--Юридическое лицо-->
                            </el-option>
                            <el-option value="INDIVIDUAL" label="Физическое лицо">
                                <!--Физическое лицо-->
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="Сокращенное наименование" required prop="name_short">
                        <el-input v-model="model.name_short"/>
                    </el-form-item>

                    <el-form-item label="Юридическое наименование">
                        <el-input v-model="model.name_full"/>
                    </el-form-item>

                    <el-form-item label="Юридический адрес">
                        <el-input v-model="model.address"/>
                    </el-form-item>

                    <el-form-item label="ОГРН / ИНН / КПП" >
                        <div class="form__inputsGroup">
                            <el-input placeholder="ОГРН" v-model="model.ogrn"/>
                            <el-input placeholder="ИНН" v-model="model.inn"/>
                            <el-input placeholder="КПП" v-model="model.kpp" v-if="model.type !== 'INDIVIDUAL'"/>
                        </div>
                        <span class="formInfo" v-if="completed">Cв-во о регистрации № 77 015267558 от 20.12.2013, ИФНС 7746</span>
                    </el-form-item>

                    <el-form-item label="Генеральный директор" v-if="model.type !== 'INDIVIDUAL'">
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

                    <el-form-item v-if="$isDeveloper">
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
            <!--<el-button type="primary" icon="mdi mdi-content-save">Создать контрагента</el-button>-->
            <el-button
                type="primary"
                icon="mdi mdi-content-save"
                :loading="is_loading_action"
                :disabled="is_loading_data || !model.type.length || model.name_short.length < 2"
                @click="updateInfo"
            >Сохранить изменения</el-button>
        </template>

    </el-card-module>
</template>

<script>
    export default {
        data() {
            return {
                dateRegister: '',
                typeContractor: 'entity',
                dynamicTags: [],
                inputVisible: false,
                inputValue: '',
                completed: true,
                showSearch: false,

                is_loading_data: false,
                is_loading_action: false,
                model: null,

                rules: {
                    type: [
                        { required: true, message: 'Выберите тип контрагента', trigger: 'blur' }
                    ],
                    name_short: [
                        { required: true, message: 'Введите наименование', trigger: ['change' ,'blur'] },
                        { min: 2, message: 'Сокращенное наименование должно быть минимум в 2 символа', trigger: 'blur' }
                    ]
                }
            }
        },
        created(){
            this.is_loading_data = true;
            this.getInfo(this.$route.params.id).then(res => {
                this.model = res;
                this.is_loading_data = false;
            }).then(() => {
                let get_parrent = null;

                for(let i in this.$store.state.contr.list){
                    if(this.$store.state.contr.list[i].id === this.model.parent_id){
                        get_parrent = this.model
                    }
                }
                if(get_parrent === null){
                    this.model.parent_id = null
                }
            });
        },
        methods: {
            /**
             * Метод получения данных по контерагенту
             * @param id - ID контрагента
             * @return {Promise<any>}
             */
            getInfo(id){
                return new Promise((resolve, reject) => {
                    r.table('counterparties').get(id).run(conn, (err, data) => {
                        if(err) reject(err);
                        resolve(data);
                    });
                })
            },
            updateInfo(){
                this.is_loading_action = true;

                if(this.model.type === 'INDIVIDUAL'){
                    this.model.kpp = this.model.management.name = this.model.management.post = '';
                }

                this.sendData(this.model).then(res => {
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
                    this.$router.push('/info/' + this.model.id);
                });
            },
            sendData(object){
                return new Promise((resolve, reject) => {
                    r.table('counterparties').get(object.id).update(object).run(conn, (err, data) => {
                        if(err) reject(err);
                        resolve(data);
                    });
                })
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