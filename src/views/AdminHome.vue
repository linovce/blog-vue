<template>
  <el-container class="home-container" style="padding: 0">
    <!-- 头部 -->
    <el-header>
      <div style="height: 100%">
        <img src="../assets/logo.png" alt="此处应该有图片" style="max-height: 100%"/>
        <span>linovce的博客</span>
      </div>
      <el-button type="primary">退出</el-button>
    </el-header>
    <!-- 主体 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200px">
        <el-menu background-color="#333744"
          text-color="#fff"
          active-text-color="#fff">
          <!-- 一级菜单 -->
          <el-submenu index="1">
            <!-- 一级菜单模板 -->
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>基础</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item index="1-1">
              <!-- 二级菜单模板 -->
              <i class="el-icon-location"></i>
              <span><router-link to="/login">登录页面</router-link></span>
<!--              <span>登录页面</span>-->
            </el-menu-item>

            <!-- 二级菜单 -->
            <el-menu-item index="1-2">
              <!-- 二级菜单模板 -->
              <i class="el-icon-s-home"></i>
              <span><router-link to="/home_page">个人主页</router-link></span>
              <!--              <span>登录页面</span>-->
            </el-menu-item>
          </el-submenu>

          <el-submenu index="2">
            <!-- 一级菜单模板 -->
            <template slot="title">
              <i class="el-icon-s-finance"></i>
              <span>内容管理</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item index="2-1">
              <!-- 二级菜单模板 -->
              <template slot="title">
                <i class="el-icon-notebook-1"></i>
                <span><router-link to="/articleManagement">文章管理</router-link></span>
              </template>
            </el-menu-item>

            <!-- 二级菜单 -->
            <el-menu-item index="2-2">
              <!-- 二级菜单模板 -->
              <template slot="title">
                <i class="el-icon-edit-outline"></i>
                <span><router-link to="/articleEditor">文章编辑</router-link></span>
              </template>
            </el-menu-item>

            <!-- 二级菜单 -->
            <el-menu-item index="2-3">
              <!-- 二级菜单模板 -->
              <template slot="title">
                <i class="el-icon-view"></i>
                <span><router-link to="/articleShow">文章预览</router-link></span>
              </template>
            </el-menu-item>

            <!-- 二级菜单 -->
            <el-menu-item index="2-3">
              <!-- 二级菜单模板 -->
              <template slot="title">
                <i class="el-icon-chat-line-square"></i>
                <span><router-link to="/about">评论管理</router-link></span>
              </template>
            </el-menu-item>
          </el-submenu>

        </el-menu>
      </el-aside>
      <!-- 内容 -->
      <el-main><router-view></router-view></el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "AdminHome",
};
</script>

<style lang="less" scoped>
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #FFF;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
  }
}

.el-aside {
  background-color: #333744;
  > .el-menu {
    border-right: none;
  }
}
.el-main {
  background-color: #eaedf1;
}
.home-container {
  height: 100%;
}
.router-link-active{
  color: aliceblue;
  text-decoration: none;
}
a{
  text-decoration: none;
  color: aliceblue;
}
</style>
