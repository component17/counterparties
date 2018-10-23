<template>
    <div id="appUI">
        <el-template-module>

            <div class="content">
                <div id="left">
                    <el-card-tree title="Список контрагентов">
                        <template slot="card-tree-header-actions">
                            <el-button type="primary">Добавить</el-button>
                        </template>
                        <el-tree
                                :data="data6"
                                node-key="id"
                                :indent="26"
                                @node-drag-start="handleDragStart"
                                @node-drag-enter="handleDragEnter"
                                @node-drag-leave="handleDragLeave"
                                @node-drag-over="handleDragOver"
                                @node-drag-end="handleDragEnd"
                                @node-drop="handleDrop"
                                draggable
                                :allow-drop="allowDrop"
                                :allow-drag="allowDrag">
                        </el-tree>
                        <template slot="card-tree-footer">
                            <el-input placehoder="Поиск" prefix-icon="el-icon-search"/>
                        </template>
                    </el-card-tree>
                </div>
                <div id="right">
                    <el-card-module
                            title="Заголовок карточки"
                            btnBack
                            @goBack="goBack"
                    >
                        <template slot="card-header-actions">
                            <el-button plain>Default</el-button>
                            <el-button type="primary">Primary</el-button>
                        </template>

                        <div class="test" v-for="item in 80" :key="item.id">1</div>

                        <template slot="card-footer">
                            <el-pagination
                                    :page-sizes="[100, 200, 300, 400]"
                                    :page-size="100"
                                    layout="sizes, prev, pager, next"
                                    :total="400">
                            </el-pagination>
                        </template>

                        <template slot="card-footer-actions">
                            <el-button plain>Default</el-button>
                            <el-button type="primary">Primary</el-button>
                        </template>

                    </el-card-module>
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
        data(){
            return{
                data6: [{
                    label: 'Level one 1',
                    children: [{
                        label: 'Level two 1-1',
                        children: [{
                            label: 'Level three 1-1-1'
                        }]
                    }]
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
            handleDragStart(node, ev) {
                console.log('drag start', node);
            },
            handleDragEnter(draggingNode, dropNode, ev) {
                console.log('tree drag enter: ', dropNode.label);
            },
            handleDragLeave(draggingNode, dropNode, ev) {
                console.log('tree drag leave: ', dropNode.label);
            },
            handleDragOver(draggingNode, dropNode, ev) {
                console.log('tree drag over: ', dropNode.label);
            },
            handleDragEnd(draggingNode, dropNode, dropType, ev) {
                console.log('tree drag end: ', dropNode && dropNode.label, dropType);
            },
            handleDrop(draggingNode, dropNode, dropType, ev) {
                console.log('tree drop: ', dropNode.label, dropType);
            },
            allowDrop(draggingNode, dropNode, type) {
                if (dropNode.data.label === 'Level two 3-1') {
                    return type !== 'inner';
                } else {
                    return true;
                }
            },
            allowDrag(draggingNode) {
                return draggingNode.data.label.indexOf('Level three 3-1-1') === -1;
            },
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
