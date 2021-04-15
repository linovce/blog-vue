<template>
  <div>
    <div style="width: 100%;padding-bottom: 50px">
      <div style="width: 30%;float: right;margin-bottom: 15px" >
        <el-input placeholder="请输入内容" >
          <el-button slot="append" icon="el-icon-search" @click="searchArticle()"></el-button>
        </el-input>
      </div>
      <div style="width: 30%;float: left;margin-bottom: 15px;margin-left: 50px" >
        <el-button type="primary" icon="el-icon-edit">新增博客</el-button>
      </div>
    </div>
    <div>
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
            <el-button type="primary" icon="el-icon-edit" circle size="mini" @click="editArticle(scope.row)"></el-button>
            <el-button type="danger" icon="el-icon-delete" circle size="mini"></el-button>
            <el-button type="success" icon="el-icon-view" circle size="mini" @click="viewArticle(scope.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div style="float: right;padding-top: 10px">
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
  name: "ArticleManage",
  data() {
    return {
      tableData: [],
      isComments: true,
      value1: true,
      page: {
        total:100,
        pageSize:5,
        pageSizes:[5,10,20,30,40,50],
        currentPage:1
      }
    }

  },
  methods:{
    viewArticle(row){
      this.$router.push({path:'/articleShow',query: {articleId:row.articleId}})
    },
    editArticle(row){
      this.$router.push({path:'/articleEditor',query: {articleId:row.articleId}})
    },
    searchArticle(){
      console.log("chafgsdfgg")
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
          __this.tableData = response.data.list;
          __this.page.total = response.data.total;
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