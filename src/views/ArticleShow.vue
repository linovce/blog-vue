<template>
    <div >
        <div>
            <div id="title">{{article.articleName}}</div>
            <div style="text-align: center;padding-bottom: 5px">
                <span style="font-size: 14px;color: #999 !important;width: 18px;margin-right: 10px">作者：{{article.author}}</span>
                <template style="margin-right: 10px">
                    <el-tag v-if="article.original==true" type="success" size="small">
                        <span>原创</span>
                    </el-tag>
                    <el-tag v-else-if="article.original==false" effect="dark" size="mini">
                        <span>转载</span>
                    </el-tag>
                </template>
                <span style="font-size: 14px;color: #999 !important;margin-left: 10px">编辑时间：{{article.done_date}}</span>
                <i class="el-icon-view" style="margin-left: 10px"></i>
                <span style="font-size: 14px;color: #999 !important;">{{article.views}}</span>
            </div>
            <div id="labels">
                <div style="display:inline-block">
                    <div style="float: left">
                        <span style="font-size: 14px;color: #999 !important;">标签：</span>
                    </div>
                    <div v-for="label in article.labels" :key="label" style="float: left">
                        <el-tag>{{label}}</el-tag>
                    </div>
                </div>
            </div>
        </div>
        <el-divider style="height:5px;background-color:black !important"/>
        <div class="mymarkdown-body" v-html="compiledMarkdown"></div>
    </div>
<!--    <div style="margin-top: 10px;padding-bottom: 10px" class="main-detail">-->
<!--        <el-row type="flex" class="row-bg" justify="space-around">-->
<!--            <el-col :span="6" style="border-right-style:solid;border-right-width:1px;border-right-color: #4ea1db;">-->
<!--                <div style="padding-bottom: 10px">-->
<!--                    <div style="text-align: center;padding-bottom: 10px;padding-top:10px;">-->
<!--                        <el-avatar :size="60">-->
<!--                            <img src="../assets/head_picture.jpg"/>-->
<!--                        </el-avatar>-->
<!--                    </div>-->
<!--                    <div style="text-align: center;padding-bottom: 10px"><span-->
<!--                            style="font-weight: bolder;font-size: 20px">linovce</span></div>-->
<!--                    <div style="text-align: center;padding-bottom: 10px"><span>这是linovce的博客</span></div>-->
<!--                    <div>-->
<!--                        <el-card>-->
<!--                            <div style="margin-left: 60px">-->
<!--                                <i class="el-icon-message" style="width: 100%"><span style="margin-left: 5px">1076150551@qq.com</span></i>-->
<!--                                <i class="el-icon-s-home" style="width: 100%"><span-->
<!--                                        style="margin-left: 5px">广东省天河区</span></i>-->
<!--                                <i class="el-icon-school" style="width: 100%"><span-->
<!--                                        style="margin-left: 5px">NWSUAF</span></i>-->
<!--                                <i class="el-icon-s-custom" style="width: 100%"><span-->
<!--                                        style="margin-left: 5px">CMIT</span></i>-->
<!--                            </div>-->
<!--                        </el-card>-->
<!--                    </div>-->

<!--                </div>-->
<!--                <div style="padding-bottom: 10px">-->
<!--                    <el-input placeholder="搜博主文章">-->
<!--                        <el-button slot="append" icon="el-icon-search"></el-button>-->
<!--                    </el-input>-->
<!--                </div>-->

<!--                <div style="padding-bottom: 10px">-->
<!--                    <el-card>-->
<!--                        <div slot="header">-->
<!--                            <span>热门文章</span>-->
<!--                        </div>-->
<!--                        <div v-for="a in 4" :key="a">-->
<!--                            {{'列表内容 ' + a }}-->
<!--                        </div>-->
<!--                    </el-card>-->
<!--                </div>-->
<!--                <div style="padding-bottom: 10px">-->
<!--                    <el-card>-->
<!--                        <div slot="header">-->
<!--                            <span>最新评论</span>-->
<!--                        </div>-->
<!--                        <div v-for="b in 4" :key="b">-->
<!--                            {{'列表内容 ' + b }}-->
<!--                        </div>-->
<!--                    </el-card>-->
<!--                </div>-->
<!--                <div style="padding-bottom: 10px">-->
<!--                    <el-card>-->
<!--                        <div slot="header">-->
<!--                            <span>最新文章</span>-->
<!--                        </div>-->
<!--                        <div v-for="c in 4" :key="c">-->
<!--                            {{'列表内容 ' + c }}-->
<!--                        </div>-->
<!--                    </el-card>-->
<!--                </div>-->
<!--            </el-col>-->

<!--            <el-col :span="18" class="main-detail">-->
<!--                <div >-->
<!--                    <div>-->
<!--                        <div id="title">{{article.articleName}}</div>-->
<!--                        <div style="text-align: center;padding-bottom: 5px">-->
<!--                            <span style="font-size: 14px;color: #999 !important;width: 18px;margin-right: 10px">作者：{{article.author}}</span>-->
<!--                            <template style="margin-right: 10px">-->
<!--                                <el-tag v-if="article.original==true" type="success" size="small">-->
<!--                                    <span>原创</span>-->
<!--                                </el-tag>-->
<!--                                <el-tag v-else-if="article.original==false" effect="dark" size="mini">-->
<!--                                    <span>转载</span>-->
<!--                                </el-tag>-->
<!--                            </template>-->
<!--                            <span style="font-size: 14px;color: #999 !important;margin-left: 10px">编辑时间：{{article.done_date}}</span>-->
<!--                            <i class="el-icon-view" style="margin-left: 10px"></i>-->
<!--                            <span style="font-size: 14px;color: #999 !important;">{{article.views}}</span>-->
<!--                        </div>-->
<!--                        <div id="labels">-->
<!--                            <div style="display:inline-block">-->
<!--                                <div style="float: left">-->
<!--                                    <span style="font-size: 14px;color: #999 !important;">标签：</span>-->
<!--                                </div>-->
<!--                                <div v-for="label in article.labels" :key="label" style="float: left">-->
<!--                                    <el-tag>{{label}}</el-tag>-->
<!--                                </div>-->
<!--                            </div>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                    <el-divider style="height:5px;background-color:black !important"/>-->
<!--                    <div class="mymarkdown-body" v-html="compiledMarkdown"></div>-->
<!--                </div>-->
<!--            </el-col>-->
<!--        </el-row>-->
<!--    </div>-->


</template>
<script>
    import marked from 'marked'
    import hljs from "highlight.js"; // 引入 highlight.js
    import "highlight.js/styles/monokai-sublime.css"; // 引入高亮样式 这里我用的是sublime样式
    import "../assets/css/markdown-body.css"

    var rendererMD = new marked.Renderer()
    marked.setOptions({
        renderer: rendererMD,
        highlight: function (code) {
            return hljs.highlightAuto(code).value;
        },
        gfm: true,
        tables: true,
        breaks: false,
        pedantic: false,
        sanitize: false,
        smartLists: true,
        smartypants: false,
        xhtml: false
    })
    export default {
        created() {
            this.init()
        },

        name: 'ArticleShow',
        data() {
            return {
                article: {
                    articleName: "出错了",
                    original: null,
                    author: "linovce",
                    content: "请联系管理员！",
                    done_date: "2021-4-15",
                    labels: [],
                    views: 0
                }
            }
        },
        computed: {
            compiledMarkdown: function () {
                return marked(this.article.content,)
            }
        },
        methods: {
            init() {
                var __this = this;
                var articleId = this.$route.query.articleId;
                if (articleId != null && articleId != "") {
                    this.axios({
                        method: 'get',
                        url: 'http://127.0.0.1:8081/selectArticle',
                        params: {
                            articleId: articleId
                        }
                    }).then(function (response) {
                        console.log(response.data)
                        console.log(__this.article)
                        __this.article.articleName = response.data.articleName;
                        __this.article.labels = response.data.labels.split(",");
                        // __this.article.original = response.data.original;
                        __this.article.done_date = response.data.done_date;
                        __this.article.content = response.data.content;
                        __this.article.views = response.data.views;
                        console.log(__this.article)
                    })
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    .main-detail {
        background-color: azure;
        padding-top: 10px;
        padding-bottom: 20px;
        padding-left: 10px;
        padding-right: 10px;
    }

    #labels {
        text-align: center;
    }

    #title {
        font-size: 28px;
        word-wrap: break-word;
        color: #222226;
        font-weight: 600;
        margin: 0;
        word-break: break-all;
        text-align: center;
        padding-bottom: 10px;
    }

    .el-divider {
        background-color: #4ea1db;
        position: relative;
    }

    .el-divider--horizontal {
        display: block;
        height: 2px;
        width: 100%;
        margin: 12px 0;
    }
</style>