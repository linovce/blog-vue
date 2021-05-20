<template>
    <div class="m-container">
        <div class="m-content">
            <el-form ref="editForm" status-icon :model="editForm" :rules="rules" label-width="80px">
                <el-form-item>
                    <div style="float: left;width: 550px">
                        <span>标签：</span>
                        <el-tag
                                :key="tag"
                                v-for="tag in tags"
                                closable
                                hit
                                :disable-transitions="false"
                                @close="deleteTag(tag)">
                            {{tag}}
                        </el-tag>
                        <el-input
                                v-if="tagInputVisible"
                                v-model="tagValue"
                                ref="saveTagInput"
                                size="small"
                                @keyup.enter.native="handleTagConfirm"
                                @blur="handleTagConfirm"
                                maxlength="5"
                                style="width: 100px"
                        >
                        </el-input>
                        <el-button v-else-if="tagAddVisible" size="small" @click="addTag()">+新增标签</el-button>
                    </div>
                    <div style="float: left">
                        <span>分类：</span>
                        <el-tag
                                :key="classify"
                                v-for="classify in classifys"
                                closable
                                hit
                                :disable-transitions="false"
                                @close="deleteClassify(classify)">
                            {{classify}}
                        </el-tag>
                        <el-input
                                class="input-new-tag"
                                v-if="classifyInputVisible"
                                v-model="classifyValue"
                                ref="saveClassifyInput"
                                size="small"
                                @keyup.enter.native="handleClassifyConfirm"
                                @blur="handleClassifyConfirm"
                                maxlength="5"
                                style="width: 100px"
                        >
                        </el-input>
                        <el-button v-else-if="classifyAddVisible" size="small" @click="addClassify()">+新增分类</el-button>
                    </div>
                    <div style="float: right;margin-right: 50px">
                        <el-button type="primary" @click="submit()">立即创建</el-button>
                    </div>
                </el-form-item>
                <el-form-item label="标题" prop="articleName">
                    <el-input v-model="editForm.articleName"></el-input>
                </el-form-item>
                <el-form-item label="摘要" prop="summary">
                    <el-input type="textarea" v-model="editForm.summary"></el-input>
                </el-form-item>
                <el-form-item label="内容" prop="content">
                    <mavon-editor v-model="editForm.content"/>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        created() {
            console.log(this.$route)
            this.init();
        },
        name: "ArticleEditor",
        data() {
            return {
                copyright:true,
                comments:true,
                publish:true,
                original:true,
                tags: [],
                classifys:[],
                classifyInputVisible: false,
                classifyValue: '',
                classifyAddVisible:true,
                tagInputVisible: false,
                tagValue: '',
                tagAddVisible:true,
                editForm: {
                    articleName:'',
                    content:'',
                    summary:''
                },
                rules: {
                    articleName: [
                        {required: true, message: '请输入标题', trigger: 'blur'},
                        {min: 3, max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur'}
                    ],
                    summary: [
                        {required: true, message: '请输入摘要', trigger: 'blur'}
                    ]
                }
            }
        },
        methods:{
            init(){
                var __this = this;
                var articleId = this.$route.query.articleId;
                if(articleId!=null&&articleId!=""){
                    this.axios({
                        method:'get',
                        url:'http://127.0.0.1:8081/selectArticle',
                        params:{
                            articleId:articleId
                        }
                    }).then(function (response) {
                        console.log(response.data)
                        __this.editForm.articleName = response.data.articleName;
                        __this.editForm.summary = response.data.summary;
                        __this.editForm.content = response.data.content;
                        __this.tags = response.data.labels.split(",");
                        __this.classifys = response.data.classifications.split(",");
                        __this.copyright=response.data.copyright,
                        __this.comments=response.data.comments,
                        __this.publish=response.data.publish,
                        __this.original=rresponse.data.original
                    })
                }
            },
            deleteClassify(tag) {
                this.classifys.splice(this.classifys.indexOf(tag), 1);
                if(this.classifys.length==5){
                    this.classifyAddVisible = false;
                }else{
                    this.classifyAddVisible = true;
                }
            },
            addClassify() {
                this.classifyInputVisible = true;
                this.classifyAddVisible = false;
                this.$nextTick(_ => {
                    this.$refs.saveClassifyInput.$refs.input.focus();
                });
            },

            handleClassifyConfirm() {
                let inputValue = this.classifyValue;
                if (inputValue) {
                    this.classifys.push(inputValue);
                }
                this.classifyInputVisible = false;
                if(this.classifys.length==5){
                    this.classifyAddVisible = false;
                }else{
                    this.classifyAddVisible = true;
                }


                this.classifyValue = '';
            },
            deleteTag(tag) {
                this.tags.splice(this.tags.indexOf(tag), 1);
                if(this.tags.length==5){
                    this.tagAddVisible = false;
                }else{
                    this.tagAddVisible = true;
                }
            },

            addTag() {
                this.tagInputVisible = true;
                this.tagAddVisible = false;
                this.$nextTick(_ => {
                    this.$refs.saveTagInput.$refs.input.focus();
                });
            },

            handleTagConfirm() {
                let inputValue = this.tagValue;
                if (inputValue) {
                    this.tags.push(inputValue);
                }
                this.tagInputVisible = false;
                if(this.tags.length==5){
                    this.tagAddVisible = false;
                }else{
                    this.tagAddVisible = true;
                }


                this.tagValue = '';
            },
            submit(){
                var __this = this
                var articleId = this.$route.query.articleId;
                const params = {
                    articleName:__this.editForm.articleName,
                    content:__this.editForm.content,
                    labels:__this.tags.toString(),
                    classifications:__this.classifys.toString(),
                    summary:__this.editForm.summary,
                    copyright:__this.copyright,
                    comments:__this.comments,
                    publish:__this.publish,
                    original:__this.original,
                }

                if(articleId==null||articleId==""){
                    this.axios({
                        method:'post',
                        url:'http://127.0.0.1:8081/insertArticle',
                        data:params,
                    }).then(function (response) {
                        __this.$router.push({path:'/articleManagement'})
                    })
                }else{
                    params["articleId"]=articleId;
                    console.log(params);
                    this.axios({
                        method:'post',
                        url:'http://127.0.0.1:8081/updateArticle',
                        data:params,
                    }).then(function (response) {
                        __this.$router.push({path:'/articleManagement'})
                    })
                }

            }
        }
    }
</script>