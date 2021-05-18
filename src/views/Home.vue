<template>
    <div style="margin-top: 10px;padding-bottom: 10px">
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="6" style="border-right-style:solid;border-right-width:1px;border-right-color: #4ea1db;">
                <div style="padding-bottom: 10px">
                    <div style="text-align: center;padding-bottom: 10px;padding-top:10px;">
                        <el-avatar :size="60">
                            <img src="../assets/head_picture.jpg"/>
                        </el-avatar>
                    </div>
                    <div style="text-align: center;padding-bottom: 10px"><span
                            style="font-weight: bolder;font-size: 20px">linovce</span></div>
                    <div style="text-align: center;padding-bottom: 10px"><span>这是linovce的博客</span></div>
                    <div>
                        <el-card>
                            <div style="margin-left: 60px">
                                <i class="el-icon-message" style="width: 100%"><span style="margin-left: 5px">1076150551@qq.com</span></i>
                                <i class="el-icon-s-home" style="width: 100%"><span
                                        style="margin-left: 5px">广东省天河区</span></i>
                                <i class="el-icon-school" style="width: 100%"><span
                                        style="margin-left: 5px">NWSUAF</span></i>
                                <i class="el-icon-s-custom" style="width: 100%"><span
                                        style="margin-left: 5px">CMIT</span></i>
                            </div>
                        </el-card>
                    </div>

                </div>
                <div style="padding-bottom: 10px">
                    <el-input placeholder="搜博主文章">
                        <el-button slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                </div>

                <div style="padding-bottom: 10px">
                    <el-card>
                        <div slot="header">
                            <span>热门文章</span>
                        </div>
                        <div v-for="a in 4" :key="a">
                            {{'列表内容 ' + a }}
                        </div>
                    </el-card>
                </div>
                <div style="padding-bottom: 10px">
                    <el-card>
                        <div slot="header">
                            <span>最新评论</span>
                        </div>
                        <div v-for="b in 4" :key="b">
                            {{'列表内容 ' + b }}
                        </div>
                    </el-card>
                </div>
                <div style="padding-bottom: 10px">
                    <el-card>
                        <div slot="header">
                            <span>最新文章</span>
                        </div>
                        <div v-for="c in 4" :key="c">
                            {{'列表内容 ' + c }}
                        </div>
                    </el-card>
                </div>
            </el-col>

            <el-col :span="18" class="main-detail">
                <router-view></router-view>
<!--                <div style="padding-right:30px;padding-left:30px;height: 40px;border-bottom-style:solid;border-bottom-width:2px;border-color:deepskyblue">-->
<!--                    <el-button style="float: left;" type="text">按时间排序</el-button>-->
<!--                    <el-button style="float: right;" type="text">只看原创</el-button>-->
<!--                    <el-button style="float: left;" type="text">按访问量排序</el-button>-->
<!--                    <el-button style="float: left;" type="text">按热度排序</el-button>-->
<!--                </div>-->
<!--                <div v-for="(article,index) in  articleList" :key="index" style="padding-bottom:5px;">-->
<!--                    <el-card>-->
<!--                        <div slot="header" style="height: 8px">-->
<!--&lt;!&ndash;                            <el-button style="float: left;" type="text" size="medium"><span>{{article.articleName}}</span></el-button>&ndash;&gt;-->
<!--                            <span v-text="article.articleName" @click="viewArticle(article.articleId)"></span>-->
<!--                        </div>-->
<!--                        <div style="padding-bottom:15px;height: 60px">-->
<!--                            <span>{{article.summary}}</span>-->
<!--                        </div>-->
<!--                        <div style="padding-bottom:20px;">-->

<!--                            <div style="width: 10%;float: left">-->
<!--                                <el-tag v-if="article.original" type="success" effect="dark">-->
<!--                                    <span>原创</span>-->
<!--                                </el-tag>-->
<!--                                <el-tag v-else effect="dark">-->
<!--                                    <span>转载</span>-->
<!--                                </el-tag>-->
<!--                            </div>-->
<!--                            <div style="width: 15%;float: left">-->
<!--                                <el-tag primary disable-transitions class="el-icon-view">12456</el-tag>-->
<!--                            </div>-->
<!--                            <div style="width: 15%;float: left">-->
<!--                                <el-tag primary disable-transitions class="el-icon-star-off">1454</el-tag>-->
<!--                            </div>-->
<!--                            <div style="width: 15%;float: left">-->
<!--                                <el-tag primary disable-transitions class="el-icon-chat-line-square">98988</el-tag>-->
<!--                            </div>-->
<!--                        </div>-->
<!--                    </el-card>-->
<!--                </div>-->
<!--                <div style="float: right">-->
<!--                    <el-pagination-->
<!--                            @size-change="handleSizeChange"-->
<!--                            @current-change="handleCurrentChange"-->
<!--                            :current-page="page.currentPage"-->
<!--                            :page-sizes="page.pageSizes"-->
<!--                            :page-size="page.pageSize"-->
<!--                            layout="total, sizes, prev, pager, next, jumper"-->
<!--                            :total="page.total">-->
<!--                    </el-pagination>-->
<!--                </div>-->
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "Home",
        data() {
            // return {
            //     articleList: [],
            //     page: {
            //         total:100,
            //         pageSize:5,
            //         pageSizes:[5,10,20,30,40,50],
            //         currentPage:1
            //     }
            // }
        },
        // mounted: function () {
        //     this.selectAll();//需要触发的函数
        // },
        // methods: {
        //     viewArticle(articleId){
        //         this.$router.push({path:'/articleDetail',query: {articleId:articleId}})
        //     },
        //     handleSizeChange(val){
        //         var __this = this;
        //         __this.page.pageSize=val;
        //         console.log(__this.page.pageSize)
        //         __this.selectAll();
        //     },
        //     handleCurrentChange(val){
        //         var __this = this;
        //         __this.page.currentPage=val;
        //         console.log(__this.page.currentPage)
        //         __this.selectAll();
        //     },
        //     selectAll(){
        //         var __this = this;
        //         const page = {
        //             pageNum:__this.page.currentPage,
        //             pageSize:__this.page.pageSize
        //         }
        //         console.log(page)
        //         this.axios({
        //             method:'get',
        //             url:'http://127.0.0.1:8081/pagingArticle',
        //             params:{
        //                 pageNum:__this.page.currentPage,
        //                 pageSize:__this.page.pageSize
        //             }
        //         })
        //             .then(function (response) {
        //                 console.log(response.data);
        //                 __this.articleList = response.data.list;
        //                 __this.page.total = response.data.total;
        //             })
        //     }
        // }
    }
</script>

<style lang="less" scoped>
    .el-row {
        /*margin-bottom: 20px;*/
        /*&:last-child {*/
        /*    margin-bottom: 0;*/
        /*}*/
    }

    .el-col {
        border-radius: 4px;
    }

    .bg-purple-dark {
        background: #99a9bf;
    }

    .bg-purple {
        background: #d3dce6;
    }

    .bg-purple-light {
        background: #e5e9f2;
    }

    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }

    .row-bg {
        background-color: #f9fafc;
        margin-left: 50px;
    }
    .main-detail {
        background-color: azure;
        padding-top: 10px;
        padding-bottom: 20px;
        padding-left: 10px;
        padding-right: 10px;
    }
</style>