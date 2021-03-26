<template>
    <el-container>
        <el-header style="height: 100%">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="全部" name="first">
                    <el-row>
                        <el-col :span="16">
                            <ArticleConditions></ArticleConditions>
                        </el-col>
                        <el-col :span="8">
                            <el-button type="info" plain icon="el-icon-search">搜索</el-button>
                        </el-col>
                    </el-row>
                </el-tab-pane>
                <el-tab-pane label="公开" name="second">
                    <el-row>
                        <el-col :span="16">
                            <ArticleConditions></ArticleConditions>
                        </el-col>
                        <el-col :span="8">
                            <el-button type="info" plain icon="el-icon-search">搜索</el-button>
                        </el-col>
                    </el-row>
                </el-tab-pane>
                <el-tab-pane label="私密" name="third">
                    <el-row>
                        <el-col :span="16">
                            <ArticleConditions></ArticleConditions>
                        </el-col>
                        <el-col :span="8">
                            <el-button type="info" plain icon="el-icon-search">搜索</el-button>
                        </el-col>
                    </el-row>
                </el-tab-pane>
                <el-tab-pane label="草稿箱" name="fourth">
                    <el-row>
                        <el-col :span="16">
                            <ArticleConditions></ArticleConditions>
                        </el-col>
                        <el-col :span="8">
                            <el-button type="info" plain icon="el-icon-search">搜索</el-button>
                        </el-col>
                    </el-row>
                </el-tab-pane>
                <el-tab-pane label="回收站" name="five">
                    <el-row>
                        <el-col :span="16">
                            <ArticleConditions></ArticleConditions>
                        </el-col>
                        <el-col :span="8">
                            <el-button type="info" plain icon="el-icon-search">搜索</el-button>
                        </el-col>
                    </el-row>
                </el-tab-pane>
            </el-tabs>
        </el-header>
        <el-main style="height: 100%">
            <el-table
                    :data="tableData"
                    :show-header="false"
                    stripe
                    style="width: 100%">

                <el-table-column
                        prop="tag"
                        label="标签"
                        style="width: 10%">
                    <template slot-scope="scope">
                        <el-row justify="center" type="flex">
                            <el-col :span="4">
                                <el-tag :type="scope.row.tag === '原创' ? 'primary' : 'success'" disable-transitions>
                                    {{scope.row.tag}}
                                </el-tag>
                            </el-col>
                            <el-col :span="2" ></el-col>
                            <el-col :span="18">{{scope.row.name}}</el-col>
                        </el-row>

                    </template>
                </el-table-column>
                <el-table-column
                        prop="dataInfo"
                        label="数据"
                        width="250">
                    <template slot-scope="scope">
                        <el-tooltip class="item" effect="dark" placement="top-start">
                            <div slot="content">{{scope.row.view}}</div>
                            <el-tag primary disable-transitions class="el-icon-view"></el-tag>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" placement="top-start">
                            <div slot="content">{{scope.row.view}}</div>
                            <el-tag primary disable-transitions class="el-icon-star-off"></el-tag>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" placement="top-start">
                            <div slot="content">{{scope.row.view}}</div>
                            <el-tag primary disable-transitions class="el-icon-chat-line-square"></el-tag>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="date"
                        label="日期"
                        style="width: 10%">
                </el-table-column>
                <el-table-column
                        label="操作"
                        style="width: 30%">
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                        <el-button type="text" size="small">编辑</el-button>
                        <el-button @click="handleClick(scope.row)" type="text" size="small">置顶</el-button>
                        <el-button type="text" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <br/>
            <el-pagination
                    background
                    :page-size="10"
                    :pager-count="7"
                    layout="prev, pager, next"
                    :total="100">
            </el-pagination>
        </el-main>
    </el-container>
</template>
<script>
    import ArticleConditions from '../components/ArticleConditions.vue'
    export default {
        name: "ArticleManagement",
        components:{
            ArticleConditions
        },
        data() {
            return {
                activeName: 'first',
                tableData: [{
                    date: '2016-05-02',
                    name: 'Java从入门到放弃',
                    address: '上海市普陀区金沙江路 1518 弄',
                    tag: '转载',
                    view: '15793'
                }, {
                    date: '2016-05-04',
                    name: 'Java从入门到放弃',
                    address: '上海市普陀区金沙江路 1517 弄',
                    tag: '原创',
                    view: '15793'
                }, {
                    date: '2016-05-01',
                    name: 'Java从入门到放弃',
                    address: '上海市普陀区金沙江路 1519 弄',
                    tag: '转载',
                    view: '15793'
                }, {
                    date: '2016-05-03',
                    name: 'Java从入门到放弃',
                    address: '上海市普陀区金沙江路 1516 弄',
                    tag: '原创',
                    view: '15793'
                }]
            };
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            },
            handleEdit(index, row) {
                console.log(index, row);
            },
            handleDelete(index, row) {
                console.log(index, row);
            }
        }
    };
</script>
<style>
  .bg-purple-dark {
    background: #99a9bf;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
</style>