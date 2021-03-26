<template>
    <el-row :gutter="10">
        <el-col :span="3">
            <el-select v-model="value" placeholder="年">
                <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
        </el-col>
        <el-col :span="3">
            <el-select v-model="value" placeholder="月">
                <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
        </el-col>
        <el-col :span="5">
            <el-select v-model="value" placeholder="文章类型">
                <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
        </el-col>
        <el-col :span="5">
            <el-select v-model="value" placeholder="分类专栏">
                <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
        </el-col>
        <el-col :span="5">
            <el-input v-model="input" placeholder="关键字"></el-input>
        </el-col>
    </el-row>
</template>

<script>
    export default {
        name: "ArticleConditions",
        data() {
            return {
                options: [{
                    value: '选项1',
                    label: '黄金糕'
                }, {
                    value: '选项2',
                    label: '双皮奶'
                }, {
                    value: '选项3',
                    label: '蚵仔煎'
                }, {
                    value: '选项4',
                    label: '龙须面'
                }, {
                    value: '选项5',
                    label: '北京烤鸭'
                }],
                value: '',
                input: ''
            }
        }
    }
</script>