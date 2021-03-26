<template>
    <div class="m-container">
        <div class="m-content">
            <el-form ref="editForm" status-icon :model="editForm" :rules="rules" label-width="80px">
                <el-form-item label="标题" prop="title">
                    <el-input v-model="editForm.title"></el-input>
                </el-form-item>
                <el-form-item label="摘要" prop="description">
                    <el-input type="textarea" v-model="editForm.description"></el-input>
                </el-form-item>
                <el-form-item label="内容" prop="content">
                    <mavon-editor v-model="editForm.content"/>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submit()">立即创建</el-button>
                    <el-button>取消</el-button>
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
                editForm: {
                    id: null,
                    title: '',
                    description: '',
                    content: ''
                },
                rules: {
                    title: [
                        {required: true, message: '请输入标题', trigger: 'blur'},
                        {min: 3, max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur'}
                    ],
                    description: [
                        {required: true, message: '请输入摘要', trigger: 'blur'}
                    ]
                }
            }
        },
        methods:{
            submit(){
                console.log(this.editForm.content)
            }
        }
    }
</script>