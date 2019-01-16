<template>
    <div id="appUI">
        <el-template-module>

            <div class="content">
                <div id="left">
                    <el-card-tree title="Список контрагентов">
                        <template slot="card-tree-header-actions">
                            <el-button type="primary" icon="mdi mdi-plus" @click="$router.push('/create')">Создать
                            </el-button>
                        </template>
                        <el-tree
                                :data="tree"
                                node-key="id"
                                :indent="26"
                                :expand-on-click-node="false"
                                @node-click="select"
                                :filter-node-method="filter"
                                ref="tree">
                            <span class="custom-tree-node" slot-scope="{ node, data }">
                            <span>{{ data.name_short }}</span>
                            <div class="treeButtons">
                                <!--<el-button-->
                                    <!--type="text"-->
                                    <!--size="mini"-->
                                    <!--@click="editContragent(data.id)"-->
                                <!--&gt;-->
                                    <!--<i class="mdi mdi-pencil"></i>-->
                                <!--</el-button>-->
                                <!--<el-button-->
                                    <!--type="text"-->
                                    <!--size="mini"-->
                                    <!--@click="goBack"-->
                                <!--&gt;-->
                                        <!--<i class="mdi mdi-folder-plus"></i>-->
                                <!--</el-button>-->
                            </div>
                            </span>
                        </el-tree>
                        <template slot="card-tree-footer">
                            <el-input placeholder="Название или ИНН" prefix-icon="el-icon-search" v-model="filterText"/>
                        </template>
                    </el-card-tree>
                </div>
                <div id="right">
                    <router-view ></router-view>
                    <!--@deleteTreeItem="deleteOne"-->
                </div>
            </div>

        </el-template-module>
    </div>
</template>

<script>
    import arrayToTree from 'array-to-tree'

    export default {
        name: 'app',
        components: {},
        watch: {
            filterText(val) {
                this.$refs.tree.filter(val);
            }
        },
        data() {
            return {
                tree: [],


                filterText: '',

                defaultProps: {
                    children: 'children',
                    label: 'label'
                }
            };
        },
        created() {
            this.$store.dispatch('contr/getList').then((data) => {
                this.tree = arrayToTree(data);
            });
        },
        mounted() {
            upoint.module.ready();

            this.$split(['#left', '#right'], {
                sizes: [30, 70],
                minSize: [350, 600],
                gutterSize: 8,
            });

            r.table("counterparties").changes().run(conn, (err, cursor) => {
                cursor.each((err, data) => {
                    if(data){
                        if(data.new_val && !data.old_val){
                            console.log('CONTR CREATE', data.new_val);
                            if(data.new_val.parent_id){
                                this.$refs.tree.append(data.new_val, data.new_val.parent_id);
                            }
                            else{
                                this.tree.push(data.new_val);
                                this.tree.sort((a, b) => {
                                    if (a.name_short > b.name_short) {
                                        return 1;
                                    }
                                    if (a.name_short < b.name_short) {
                                        return -1;
                                    }
                                    return 0;
                                });
                            }
                            this.$store.commit('contr/setListOneItem', data.new_val)
                        }else if(data.new_val && data.old_val){
                            if(data.new_val.deletedAt !== null){
                                this.$refs.tree.remove(data.new_val);

                                this.$store.dispatch('contr/getList').then((data) => {
                                    this.tree = arrayToTree(data);
                                });
                            }else{
                                this.$store.dispatch('contr/getList').then((data) => {
                                    this.tree = arrayToTree(data);
                                });
                            }
                        }
                    }
                });
            });
        },
        methods: {
            deleteOne(model){
                let list = this.$store.state.contr.list;
                // for(let i in list){
                //     if(model.id === )
                // }

            },
            editContragent(id){
                this.$router.push('/info/' + id + '/main/edit');
            },
            goBack() {
                console.log('click back btn')
            },
            select(data) {
                this.$router.push('/info/' + data.id)
            },
            filter(value, data) {
                if (!value) return true;
                let str = data.name_short.toLowerCase();

                if(data.inn){
                    return str.indexOf(value.toLowerCase()) !== -1 || data.inn.indexOf(value) !== -1;
                }
                else{
                    return str.indexOf(value.toLowerCase()) !== -1;
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .content {
        display: flex;
        flex-grow: 2;
    }

    #left, #right {
        display: flex;
        flex-direction: column;
        flex-grow: 2;
    }
</style>
