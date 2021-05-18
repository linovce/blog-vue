<template>
    <div>
        <div style="padding-right:30px;padding-left:30px;height: 40px;border-bottom-style:solid;border-bottom-width:2px;border-color:deepskyblue">
            <el-button style="float: left;" type="text">按时间排序</el-button>
            <el-button style="float: right;" type="text">只看原创</el-button>
            <el-button style="float: left;" type="text">按访问量排序</el-button>
            <el-button style="float: left;" type="text">按热度排序</el-button>
        </div>
        <div v-for="(article,index) in  articleList" :key="index" style="padding-bottom:5px;">
            <el-card>
                <div slot="header" style="height: 8px">
                    <!--                            <el-button style="float: left;" type="text" size="medium"><span>{{article.articleName}}</span></el-button>-->
                    <span v-text="article.articleName" @click="viewArticle(article.articleId)"></span>
                </div>
                <div style="padding-bottom:15px;height: 60px">
                    <span>{{article.summary}}</span>
                </div>
                <div style="padding-bottom:20px;">

                    <div style="width: 10%;float: left">
                        <el-tag v-if="article.original" type="success" effect="dark">
                            <span>原创</span>
                        </el-tag>
                        <el-tag v-else effect="dark">
                            <span>转载</span>
                        </el-tag>
                    </div>
                    <div style="width: 15%;float: left">
                        <el-tag primary disable-transitions class="el-icon-view">12456</el-tag>
                    </div>
                    <div style="width: 15%;float: left">
                        <el-tag primary disable-transitions class="el-icon-star-off">1454</el-tag>
                    </div>
                    <div style="width: 15%;float: left">
                        <el-tag primary disable-transitions class="el-icon-chat-line-square">98988</el-tag>
                    </div>
                </div>
            </el-card>
        </div>
        <div style="float: right">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="page.currentPage"
                    :page-sizes="page.pageSizes"
                    :page-size="page.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="page.total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ArticleList",
        data() {
            return {
                articleList: [],
                page: {
                    total:100,
                    pageSize:5,
                    pageSizes:[5,10,20,30,40,50],
                    currentPage:1
                }
            }
        },
        mounted: function () {
            this.selectAll();//需要触发的函数
        },
        methods: {
            viewArticle(articleId){
                this.$router.push({path:'/articleDetail',query: {articleId:articleId}})
            },
            handleSizeChange(val){
                var __this = this;
                __this.page.pageSize=val;
                console.log(__this.page.pageSize)
                __this.selectAll();
            },
            handleCurrentChange(val){
                var __this = this;
                __this.page.currentPage=val;
                console.log(__this.page.currentPage)
                __this.selectAll();
            },
            selectAll(){
                var __this = this;
                const page = {
                    pageNum:__this.page.currentPage,
                    pageSize:__this.page.pageSize
                }
                console.log(page)
                this.axios({
                    method:'get',
                    url:'http://127.0.0.1:8081/pagingArticle',
                    params:{
                        pageNum:__this.page.currentPage,
                        pageSize:__this.page.pageSize
                    }
                })
                    .then(function (response) {
                        console.log(response.data);
                        __this.articleList = response.data.list;
                        __this.page.total = response.data.total;
                    })
            }
        }
    }
</script>

<style scoped>

</style>