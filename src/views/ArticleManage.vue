<template>
  <el-table :data="tableData" border style="width: 100%">
    <el-table-column prop="articleId" label="文章编号"v-if="false"> </el-table-column>
    <el-table-column width="320" prop="articleName" label="标题" >
      <template slot-scope="scope">
        <el-tag v-if="scope.row.original" type="success" effect="dark" size="mini">
          <span>原创</span>
        </el-tag>
        <el-tag v-else effect="dark" size="mini">
          <span>转载</span>
        </el-tag>
        <span style="margin-left: 10px">{{ scope.row.articleName }}</span>
      </template>
    </el-table-column>
    <el-table-column width="80" prop="views" label="浏览"> </el-table-column>
    <el-table-column width="80" prop="appreciate" label="点赞" > </el-table-column>
    <el-table-column label="评论开启">
      <template slot-scope="scope">
        <el-switch
                v-model="scope.row.comments"
                active-text="开启"
                @change="updateComment(scope.row)">
        </el-switch>
      </template>
    </el-table-column>
    <el-table-column label="版权显示">
      <template slot-scope="scope">
        <el-switch
                v-model="scope.row.copyright"
                active-text="开启"
                @change="updateCopyright(scope.row)">
        </el-switch>
      </template>
    </el-table-column>
    <el-table-column label="发布">
      <template slot-scope="scope">
        <el-switch
                v-model="scope.row.publish"
                active-text="发布"
                @change="updatePublish(scope.row)">
        </el-switch>
      </template>
    </el-table-column>
    <el-table-column prop="createDate" label="发布时间" > </el-table-column>
    <el-table-column prop="doneDate" label="操作时间" > </el-table-column>
    <el-table-column label="操作" width="180">
      <template slot-scope="scope">
        <el-button type="primary" icon="el-icon-edit" circle size="mini"></el-button>
        <el-button type="danger" icon="el-icon-delete" circle size="mini"></el-button>
        <el-button type="success" icon="el-icon-view" circle size="mini"></el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
export default {
  name: "ArticleManage",
  data() {
    return {
      tableData: [{
        articleId:1,
        articleName:'测试1',
        views:100,
        appreciate:100,
        createDate:'2021-04-09',
        doneDate:'2021-04-09',
        type: 'success',
        type_text:true
      },
        {
          articleId:1,
          articleName:'测试1',
          views:100,
          appreciate:100,
          createDate:'2021-04-09',
          doneDate:'2021-04-09',
          type: '',
          type_text:false
        }],
      isComments: true,
      value1: true
    }

  },
  methods:{
    selectAll(){
      var __this = this;
      this.axios({
        method:'get',
        url:'http://127.0.0.1:8081/listArticle',
      })
        .then(function (response) {
          console.log(response.data);
          __this.tableData=response.data
        })
    },
    updateComment(row){
      var __this = this;
      this.axios({
        method:'post',
        url:'http://127.0.0.1:8081/updateArticle',
        data: {
          articleId:row.articleId,
          comments:row.comments,
          copyright:row.copyright,
          publish:row.publish,
        }
      }).then(function (response) {
        __this.selectAll();
              })
    },
    updatePublish(row){
      var __this = this;
      this.axios({
        method:'post',
        url:'http://127.0.0.1:8081/updateArticle',
        data: {
          articleId:row.articleId,
          publish:row.publish,
          comments:row.comments,
          copyright:row.copyright,
        }
      }).then(function (response) {
        __this.selectAll();
      })
    },
    updateCopyright(row){
      var __this = this;
      this.axios({
        method:'post',
        url:'http://127.0.0.1:8081/updateArticle',
        data: {
          articleId:row.articleId,
          copyright:row.copyright,
          comments:row.comments,
          publish:row.publish,
        }
      }).then(function (response) {
        __this.selectAll();
      })
    }
  },
  
  mounted:function(){
      this.selectAll();//需要触发的函数
    }
};
</script>
<style>
</style>