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
                <el-form label-width="200px" label-position="left" v-if="typeContractor === 'LEGAL'">
                    <el-form-item label="Тип контрагента" required>
                        <el-select v-model="typeContractor" placeholder="Тип контрагента">
                            <el-option value="LEGAL" label="Юридическое лицо">
                                <!--Юридическое лицо-->
                            </el-option>
                            <el-option value="INDIVIDUAL" label="Физическое лицо">
                                <!--Физическое лицо-->
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="Сокращенное наименование" required>
                        <el-input/>
                    </el-form-item>
                    <el-form-item label="Юридическое наименование" required>
                        <el-input/>
                    </el-form-item>
                    <el-form-item label="Юридический адрес" required>
                        <el-input/>
                    </el-form-item>
                    <el-form-item label="ОГРН / ИНН / КПП" required>
                        <div class="form__inputsGroup">
                            <el-input placeholder="ОГРН"/>
                            <el-input placeholder="ИНН"/>
                            <el-input placeholder="КПП"/>
                        </div>
                        <span class="formInfo" v-if="completed">Cв-во о регистрации № 77 015267558 от 20.12.2013, ИФНС 7746</span>
                    </el-form-item>
                    <el-form-item label="Генеральный директор">
                        <el-input/>
                        <span class="formInfo" v-if="completed">ИНН 325003630515</span>
                    </el-form-item>
                    <el-form-item label="Дата регистрации">
                        <div class="form__smallInput">
                            <el-date-picker
                                    v-model="dateRegister"
                                    type="date"
                                    placeholder="Выберите дату">
                            </el-date-picker>
                        </div>
                        <span class="formInfo" v-if="completed">Действующая организация</span>
                    </el-form-item>
                    <el-form-item label="Уставной капитал">
                        <div class="form__smallInput">
                            <el-input/>
                            <i class="mdi mdi-currency-rub"></i>
                        </div>
                    </el-form-item>
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
                <el-form label-width="200px" label-position="left" v-if="typeContractor === 'INDIVIDUAL'">
                    <el-form-item label="Тип контрагента" required>
                        <el-select v-model="typeContractor" placeholder="Тип контрагента">
                            <el-option value="LEGAL" label="Юридическое лицо">
                                Юридическое лицо
                            </el-option>
                            <el-option value="INDIVIDUAL" label="Физическое лицо">
                                Физическое лицо
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="Наименование или ФИО" required>
                        <el-input/>
                    </el-form-item>
                    <el-form-item label="Юридическое наименование">
                        <el-input/>
                    </el-form-item>
                    <el-form-item label="Адрес">
                        <el-input/>
                    </el-form-item>
                    <el-form-item label="ОГРН / ИНН / КПП">
                        <div class="form__inputsGroup">
                            <el-input placeholder="ОГРН"/>
                            <el-input placeholder="ИНН"/>
                            <el-input placeholder="КПП"/>
                        </div>
                        <span class="formInfo" v-if="completed">Cв-во о регистрации № 77 015267558 от 20.12.2013, ИФНС 7746</span>
                    </el-form-item>
                    <el-form-item label="Дата регистрации">
                        <div class="form__smallInput">
                            <el-date-picker
                                    v-model="dateRegister"
                                    type="date"
                                    placeholder="Выберите дату">
                            </el-date-picker>
                        </div>
                        <span class="formInfo" v-if="completed">Действующая организация</span>
                    </el-form-item>
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
            <el-button type="primary" icon="mdi mdi-content-save">Создать контрагента</el-button>
            <el-button type="primary" icon="mdi mdi-content-save">Сохранить изменения</el-button>
        </template>

    </el-card-module>
</template>

<script>
    export default {
        computed: {
            model: {
                get(){
                    return this.$store.state.contr.model
                },
                set(val){

                }
            }
        },
        data() {
            return {
                autocomplete: '',

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
            querySearch(queryString, cb) {
                upoint.dadata.sug.party(this.autocomplete).then((data) => {
                    cb(data);
                });
            },
            handleSelect(item) {
                console.log(item);
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