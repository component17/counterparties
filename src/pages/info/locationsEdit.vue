<template>
    <el-card-module
            showHeader
            title="Редактировать локацию"
            btnBack
            @goBack="goBack"
            showFooter
            class="newLocationCard"
    >
        <el-col style="width: 100%; height: 100vh;" v-if="is_loading_data" v-loading="true"></el-col>
        <div class="newLocation" v-else>
            <!--<div class="newLocation__search">-->
            <!--<div class="newLocation__search-title">-->
            <!--<h2>Автоматическое заполнение реквизитов контрагента</h2>-->
            <!--</div>-->
            <!--<div class="newLocation__search-input">-->
            <!--<el-input placeholder="Введите название в свободной форме, адрес, ИНН или ОГРН"/>-->
            <!--</div>-->
            <!--</div>-->
            <div class="newLocation__form" style="margin-top: 15px">
                <el-form label-width="200px" label-position="left" :model="model" :rules="rules" :disabled="is_loading_action">

                    <el-form-item label="Название" required prop="name">
                        <el-input v-model="model.name" :min="3" :minlength="3" placeholder="Введите название локации"/>
                    </el-form-item>

                    <el-form-item label="Адрес" required prop="address">
                        <el-autocomplete
                                style="width: 100%"
                                v-model="model.address"
                                :fetch-suggestions="querySearch"
                                placeholder="Начните вводить адрес"
                                :trigger-on-focus="false"
                        ></el-autocomplete>
                    </el-form-item>

                    <el-form-item label="Комментарий">
                        <el-input type="textarea" v-model="model.comment" :max="255" :maxlength="255" rows="3" placeholder="Введите комментарий"/>
                        <span class="location__comment_count">{{ comment_count }}/255</span>
                    </el-form-item>
                </el-form>
            </div>
        </div>

        <template slot="card-footer-actions" v-if="!is_loading_data">
            <el-button
                    type="primary"
                    :disabled="model.address.length < 3 || model.name.length < 3"
                    :loading="is_loading_action"
                    @click="save"><i class="mdi mdi-content-save"></i>Создать локацию</el-button>
            <!--<el-button type="primary"><i class="mdi mdi-content-save"></i>Сохранить изменения</el-button>-->
        </template>

    </el-card-module>
</template>

<script>
    export default {
        data() {
            return {
                is_loading_action: false,
                is_loading_data: true,

                model: {
                    name: '',
                    address: '',
                    comment: ''
                },
                rules: {
                    name: [
                        { required: true, message: 'Укажите наименование', trigger: ['change' ,'blur'] },
                        { min: 3, message: 'Наименование должно быть минимум 3 символа', trigger: ['change' ,'blur'] }
                    ],
                    address: [
                        { required: true, message: 'Введите адрес', trigger: ['change' ,'blur'] },
                        { min: 3, message: 'Необходимо указать адрес', trigger: ['change' ,'blur'] }
                    ],
                },
            }
        },
        computed: {
            comment_count(){
                return this.model.comment.length;
            }
        },
        created(){
            this.getLocation(this.$route.params.id).then(res => {
                this.model = res;
            }).then(() => {
                this.is_loading_data = false;
            });
        },
        methods: {
            getLocation(id){
                return new Promise((resolve, reject) => {
                    r.table("counterparties_locations").get(id).run(conn, (err, data) => {
                        if(err) reject(err);
                        resolve(data);
                    });
                })
            },
            sendData(object){
                return new Promise((resolve, reject) => {
                    r.table("counterparties_locations").get(object.id).update(object).run(conn, (err, data) => {
                        if(err) reject(err);

                        resolve(data);
                    });
                })
            },
            async save(){
                this.is_loading_action = true;

                let geo = await upoint.map.geodecoder.toСoordinates(this.model.address);

                this.model.geo = geo.length ? geo[0] : null;

                this.sendData(this.model).then(result => {
                    this.$notify.success({
                        title: 'Успешно',
                        message: 'Локация была изменена',
                        duration: 1750
                    });

                    this.$router.push('/info/' + this.model.counterparties_id);
                }).catch(error => {
                    this.$notify.error({
                        title: 'Ошибка',
                        message: 'Произошла ошибка, повторите операцию позже',
                        duration: 1750
                    });
                }).then(() => {
                    this.is_loading_action = false;
                });
            },
            querySearch(queryString, cb) {
                upoint.dadata.sug.address(queryString).then((data) => {
                    cb(data);
                });
            },

            handleSelect(item){
                console.log(item)
            },

            goBack() {
                this.$router.go(-1)
            },
        }
    }
</script>

<style lang="scss">
    .location__comment_count{
        color: #8c939d;
        position: absolute;
        right: 0;
        font-size: 12px;
    }
</style>