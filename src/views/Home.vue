<template>
    <div style="margin-top: 10px;padding-bottom: 10px">
<!--        <div style=" border-bottom-style:solid;border-bottom-width:2px;border-color:deepskyblue">-->
<!--            <el-row align="bottom">-->
<!--                <el-col :span="24">-->
<!--                    <div style="text-align: center">-->
<!--                        <el-avatar :size="60">-->
<!--                            <img-->
<!--                                    src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"-->
<!--                            />-->
<!--                        </el-avatar>-->
<!--                    </div>-->
<!--                </el-col>-->
<!--            </el-row>-->
<!--        <el-row>-->
<!--            <el-col :span="24">-->
<!--                <div style="text-align: center">linovce</div>-->
<!--            </el-col>-->
<!--        </el-row>-->

<!--        <el-row>-->
<!--            <el-col :span="24">-->
<!--                <div style="text-align: center">这是linovce的博客</div></el-col-->
<!--            >-->
<!--        </el-row>-->
<!--        </div>-->
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="6">
                <div style="padding-bottom: 10px">
                    <div style="text-align: center;padding-bottom: 10px;padding-top:10px;">
                        <el-avatar :size="60">
                            <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
                        </el-avatar>
                    </div>
                    <div style="text-align: center;padding-bottom: 10px"><span style="font-weight: bolder;font-size: 20px">linovce</span></div>
                    <div style="text-align: center;padding-bottom: 10px"><span>这是linovce的博客</span></div>
                    <div >
                        <el-card>
                            <div style="margin-left: 60px">
                                <i class="el-icon-message" style="width: 100%"><span style="margin-left: 5px">1076150551@qq.com</span></i>
                                <i class="el-icon-s-home" style="width: 100%"><span style="margin-left: 5px">广东省天河区</span></i>
                                <i class="el-icon-school" style="width: 100%"><span style="margin-left: 5px">NWSUAF</span></i>
                                <i class="el-icon-s-custom" style="width: 100%"><span style="margin-left: 5px">CMIT</span></i>
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
                        <div v-for="o in 4" :key="o">
                            {{'列表内容 ' + o }}
                        </div>
                    </el-card>
                </div>
                <div style="padding-bottom: 10px">
                    <el-card>
                        <div slot="header">
                            <span>最新评论</span>
                        </div>
                        <div v-for="o in 4" :key="o">
                            {{'列表内容 ' + o }}
                        </div>
                    </el-card>
                </div>
                <div style="padding-bottom: 10px">
                    <el-card>
                        <div slot="header">
                            <span>最新文章</span>
                        </div>
                        <div v-for="o in 4" :key="o">
                            {{'列表内容 ' + o }}
                        </div>
                    </el-card>
                </div>
            </el-col>

            <el-col :span="18" style="margin-right:50px;margin-left:30px;">
                <div style="padding-right:30px;padding-left:30px;height: 40px;border-bottom-style:solid;border-bottom-width:2px;border-color:deepskyblue">
                    <el-button style="float: left;" type="text">按时间排序</el-button>
                    <el-button style="float: right;" type="text">只看原创</el-button>
                    <el-button style="float: left;" type="text">按访问量排序</el-button>
                    <el-button style="float: left;" type="text">按热度排序</el-button>
                </div>
                <div v-for="o in 5" :key="o" style="padding-bottom:5px;">
                    <el-card>
                        <div slot="header" style="height: 8px">
                            <span>SpringAOP不生效的情况</span>
                        </div>
                        <div style="padding-bottom:15px;height: 60px">
                            <span>
在使用SpringAOP的过程中不知道大家有没有遇到这样一个问题，就是我对一个方法做了AOP的增强，但是在内部方法的调用过程中，却发现它并没有按照预期设定的那样执行AOP的增强。下面我通过一个例子来说明这种情况。首先先在数据库中建一个表，这个表只有两列，如图。然后写一个DataService类，在这个类</span>
                        </div>
                        <div style="padding-bottom:20px;">
                            <div style="width: 10%;float: left"><el-tag type="success">原创</el-tag></div>
                            <div style="width: 15%;float: left"><el-tag primary disable-transitions class="el-icon-view">12456</el-tag></div>
                            <div style="width: 15%;float: left"><el-tag primary disable-transitions class="el-icon-star-off">1454</el-tag></div>
                            <div style="width: 15%;float: left"><el-tag primary disable-transitions class="el-icon-chat-line-square">98988</el-tag></div>
                        </div>
                    </el-card>
                </div>
                <div style="float: right">
                    <el-pagination
                            background
                            layout="prev, pager, next"
                            :total="1000">
                    </el-pagination>
                </div>
                </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "Home"
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
        margin-left:50px;
    }
</style>