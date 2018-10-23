<template>
    <div id="appUI">
        <el-template-module>

            <div class="content">
                <div id="left">
                    <el-card-tree title="Список контрагентов">
                        <template slot="card-tree-header-actions">
                            <el-button type="primary" @click="$router.push('/create')">Добавить</el-button>
                        </template>
                        <el-tree
                                :data="data6"
                                node-key="id"
                                :indent="26"
                                :expand-on-click-node="false"
                                @node-click="select"
                                :filter-node-method="filter"
                                ref="tree">
                        </el-tree>
                        <template slot="card-tree-footer">
                            <el-input placehoder="Поиск" prefix-icon="el-icon-search" v-model="filterText"/>
                        </template>
                    </el-card-tree>
                </div>
                <div id="right">
                    <router-view></router-view>
                </div>
            </div>

        </el-template-module>
    </div>
</template>

<script>
    export default {
        name: 'app',
        components: {
        },
        watch: {
            filterText(val) {
                this.$refs.tree.filter(val);
            }
        },
        data(){
            return{
                filterText: '',
                data6: [{
                    label: 'Level one 1',
                    children: [
                        {
                        label: 'Level two 1-1',
                        children: [
                            {
                            label: 'Level three 1-1-1'
                            }
                        ]
                        }
                    ]
                }, {
                    label: 'Level one 2',
                    children: [{
                        label: 'Level two 2-1',
                        children: [{
                            label: 'Level three 2-1-1'
                        }]
                    }, {
                        label: 'Level two 2-2',
                        children: [{
                            label: 'Level three 2-2-1'
                        },{
                            label: 'Level three 2-2-2'
                        }]
                    }]
                }, {
                    label: 'Level one 3',
                }, {
                    label: 'Level one 4',
                }, {
                    label: 'Level one 5',
                }, {
                    label: 'Level one 6',
                }],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                }
            };
        },
        mounted(){
            this.$split(['#left', '#right'], {
                sizes: [30, 70],
                minSize: [350, 600],
                gutterSize: 8,
            })
        },
        methods: {
            goBack(){
                console.log('click back btn')
            },
            select(data){
                this.$router.push('/info/' + data.$treeNodeId)
            },
            filter(value, data) {
                console.log(value, data);
                if (!value) return true;
                let str = data.label.toLowerCase();
                return str.indexOf(value.toLowerCase()) !== -1;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .content{
        display: flex;
        flex-grow: 2;
    }
    #left, #right{
        display: flex;
        flex-direction: column;
        flex-grow: 2;
    }
</style>
