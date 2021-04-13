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
                    <div style="float: right">
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
        name: "ArticleEditor",
        data() {
            return {
                tags: ['标签一', '标签二', '标签三'],
                classifys:['分类一', '分类二', '分类三'],
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
                var __this = this;
                const params = {
                    articleName:__this.editForm.articleName,
                    content:__this.editForm.content,
                    // home_picture
                    labels:__this.tags,
                    classifications:__this.classifys,
                    // original
                    // is_comments
                    // is_copyright
                    // is_publish
                    // create_date
                    // done_date
                    summary:__this.editForm.summary,

                }

                var __this = this;
                this.axios({
                    method:'post',
                    url:'http://127.0.0.1:8082/insertArticle',
                    data:params,
                }).then(function (response) {
                    console.log(response.data);
                })
            }
        }
    }
</script>