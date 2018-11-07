<template>
    <el-card-module
            showHeader
            title="Новая локация"
            btnBack
            @goBack="goBack"
            showFooter
            class="newLocationCard"
    >
        <div class="newLocation">
            <!--<div class="newLocation__search">-->
                <!--<div class="newLocation__search-title">-->
                    <!--<h2>Автоматическое заполнение реквизитов контрагента</h2>-->
                <!--</div>-->
                <!--<div class="newLocation__search-input">-->
                    <!--<el-input placeholder="Введите название в свободной форме, адрес, ИНН или ОГРН"/>-->
                <!--</div>-->
            <!--</div>-->
            <div class="newLocation__form" style="margin-top: 15px">
                <el-form label-width="200px" label-position="left">

                    <el-form-item label="Название" required>
                        <el-input v-model="name"/>
                    </el-form-item>

                    <el-form-item label="Адрес" required>
                        <el-autocomplete
                                style="width: 100%"
                                v-model="address"
                                :fetch-suggestions="querySearch"
                                placeholder="Начните вводить адрес"
                                :trigger-on-focus="false"
                        ></el-autocomplete>
                    </el-form-item>

                    <el-form-item label="Комментарий">
                        <el-input type="textarea" v-model="comment" rows="3"/>
                    </el-form-item>
                </el-form>
            </div>
        </div>

        <template slot="card-footer-actions">
            <el-button type="primary" @click="save()"><i class="mdi mdi-content-save"></i>Создать локацию</el-button>
            <!--<el-button type="primary"><i class="mdi mdi-content-save"></i>Сохранить изменения</el-button>-->
        </template>

    </el-card-module>
</template>

<script>
    export default {
        data() {
            return {
                name: '',
                address: '',
                comment: '',
            }
        },
        methods: {
            async save(){
                let res = {
                    name: this.name,
                    address: this.address,
                    comment: this.comment,
                    counterparties_id: this.$route.params.id
                };

                let coordinate = await upoint.map.geodecoder.toСoordinates(res.address);

                console.log(coordinate)

                // r.table("counterparties_locations").insert(res).run(conn, (err, data) => {
                //     this.$router.push('/info/' + this.$route.params.id)
                // });
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

<style scoped>

</style>