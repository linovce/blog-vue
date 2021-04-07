<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="articleId" label="日期" width="180"> </el-table-column>
    <el-table-column prop="articleName" label="姓名" width="180"> </el-table-column>
    <el-table-column prop="content" label="地址"> </el-table-column>
  </el-table>
</template>
<script>
export default {
  name: "ArticleManage",
  data() {
    return {
      tableData: []
    };
  },
  methods:{
    registbtn(){
        var __this = this;
      this.axios({
        method:'get',
        url:'http://127.0.0.1:8081/listArticle',
      })
        .then(function (response) {
            
          console.log(response.data);
          console.log(__this.tableData);
          __this.tableData=response.data
        })
    }
  },
  
mounted:function(){
      this.registbtn();//需要触发的函数
    }
};
</script>
<style>
</style>