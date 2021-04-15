<template>
    <div>
        <div>
            <div id="title">{{articleName}}</div>
            <div style="text-align: center;padding-bottom: 5px">
                <span style="font-size: 14px;color: #999 !important;width: 18px;margin-right: 10px">作者：linovce</span>
                <template style="margin-right: 10px">
                    <el-tag v-if="original" type="success"  size="small">
                        <span>原创</span>
                    </el-tag>
                    <el-tag v-else effect="dark" size="mini">
                        <span>转载</span>
                    </el-tag>
                </template>
                <span style="font-size: 14px;color: #999 !important;margin-left: 10px">编辑时间：2021-4-15</span>
                <iview class="el-icon-view" style="margin-left: 10px"></iview>
                <span style="font-size: 14px;color: #999 !important;">100</span>
            </div>
            <div id="labels">
                <span style="font-size: 14px;color: #999 !important;">标签：</span><el-tag>标签一</el-tag><el-tag>标签一</el-tag><el-tag>标签一</el-tag><el-tag>标签一</el-tag><el-tag>标签一</el-tag>
            </div>
        </div>
        <el-divider style="height:5px background-color:black !important"></el-divider>
        <div class="mymarkdown-body" v-html= "compiledMarkdown"></div>
    </div>

</template >
<script>
    import marked from 'marked'
    import hljs from "highlight.js"; // 引入 highlight.js
    import "highlight.js/styles/monokai-sublime.css"; // 引入高亮样式 这里我用的是sublime样式
    import "../assets/css/markdown-body.css"

    var rendererMD = new marked . Renderer ()
    marked.setOptions ({
        renderer: rendererMD ,
        highlight: function(code) {
            return hljs.highlightAuto(code).value;
        },
        gfm: true ,
        tables: true ,
        breaks: false ,
        pedantic: false ,
        sanitize: false ,
        smartLists: true ,
        smartypants: false,
        xhtml:false
    })
    export default {
        created() {
            this.init()
        },

        name: 'ArticleShow',
        data () {
            return {
                articleName:"使用Java生成思维导图",
                original:true,
                input:'# 使用Java生成思维导图\n' +
                    '### 前言\n' +
                    '最近因为一些原因需要做一些资料管理，准备建一个文件夹，然后对各种资料做一个分类，每个分类做一个文件夹。\n' +
                    '\n' +
                    '可以想象，随着资料数量和种类的增多，文件层级关系的增加，以后需要查一个文件在哪个位置的时候可能就不那么方便，Windows的资源管理器搜索在文件多的时候又不是很快，因此决定做一个资源地图，能够把所有的文件和文件夹以一种**树状图的方式展示出来**，首先想到的就是xmind了。\n' +
                    '\n' +
                    'xmind是我们日常工作学习中常用的思维导图工具之一。如果每次对文件的增删改查都对xmind文件做出相应的修改，那效率也太差了，而且也容易出错，好在官方提供了Java api来生成xmind文件，这样每次只要运行程序就可以自动生成最新的资源地图了。\n' +
                    '\n' +
                    '\n' +
                    '### xmind依赖\n' +
                    'xmind在github的仓库位置可以见文章末的链接。对xmind操作的api全在org.xmind.core包下，按照官方的使用说明把代码拉下来打个包引入就可以了，也可以引入maven依赖。\n' +
                    ' - pom.xml\n' +
                    '```java\n' +
                    '<dependency>\n' +
                    '  <groupId>com.github.eljah</groupId>\n' +
                    '  <artifactId>xmindjbehaveplugin</artifactId>\n' +
                    '  <version>0.8</version>\n' +
                    '</dependency>\n' +
                    '```\n' +
                    '### 数据准备\n' +
                    '要生成思维导图，首先要有数据，比如说我这里的数据就是某个目录底下的所有文件夹和文件，并且将他们按照包含或并列关系用合适的方式存储好。\n' +
                    '\n' +
                    '我用一个自定义的数据结构储存文件(夹)信息。\n' +
                    '\n' +
                    '```java\n' +
                    'public class FileNode {\n' +
                    '    private String fileName;//文件名\n' +
                    '    private ArrayList<FileNode> subFiles;//如果是文件，则值为null，如果是文件夹，则每个元素代表该文件夹下的文件(夹)名\n' +
                    '\n' +
                    '    public FileNode(String fileName){\n' +
                    '        this.fileName=fileName;\n' +
                    '        this.subFiles=null;\n' +
                    '    }\n' +
                    '\n' +
                    '    public String getFileName() {\n' +
                    '        return fileName;\n' +
                    '    }\n' +
                    '\n' +
                    '    public ArrayList<FileNode> getSubFiles() {\n' +
                    '        return subFiles;\n' +
                    '    }\n' +
                    '\n' +
                    '    public void setSubFiles(ArrayList<FileNode> subFiles) {\n' +
                    '        this.subFiles = subFiles;\n' +
                    '    }\n' +
                    '}\n' +
                    '```\n' +
                    '定义好了数据的存储方式，然后定义获取文件列表的方法。\n' +
                    '\n' +
                    '```java\n' +
                    '//获取path目录下的所有文件名\n' +
                    'public ArrayList<String> getFiles(String path){\n' +
                    '    ArrayList<String> files = new ArrayList<>();\n' +
                    '    File file = new File(path);\n' +
                    '    File[] tempList = file.listFiles();\n' +
                    '\n' +
                    '    for(int i=0;i<tempList.length;i++){\n' +
                    '        if(tempList[i].isFile()){\n' +
                    '            files.add(tempList[i].toString());\n' +
                    '        }\n' +
                    '    }\n' +
                    '\n' +
                    '    return files;\n' +
                    '}\n' +
                    '//获取path目录下的所有文件夹名\n' +
                    'public ArrayList<String> getFolder(String path){\n' +
                    '    ArrayList<String> directorys = new ArrayList<>();\n' +
                    '    File file = new File(path);\n' +
                    '    File[] tempList = file.listFiles();\n' +
                    '\n' +
                    '    for(int i=0;i<tempList.length;i++){\n' +
                    '        if(tempList[i].isDirectory()){\n' +
                    '            directorys.add(tempList[i].toString());\n' +
                    '        }\n' +
                    '    }\n' +
                    '\n' +
                    '    return directorys;\n' +
                    '}\n' +
                    '//将path目录下的所有文件(夹)根据它们的关系处理成存储节点，并返回根节点\n' +
                    'public FileNode getAll(String path){\n' +
                    '    FileNode root = new FileNode(path);\n' +
                    '    ArrayList<FileNode> subfiles = new ArrayList<>();\n' +
                    '    ArrayList<String> folders = getFolder(path);\n' +
                    '    ArrayList<String> files = getFiles(path);\n' +
                    '\n' +
                    '    for(String tempPath : folders){\n' +
                    '        if(tempPath.endsWith(".svn"))\n' +
                    '            continue;\n' +
                    '        FileNode folder = getAll(tempPath);\n' +
                    '        subfiles.add(folder);\n' +
                    '    }\n' +
                    '\n' +
                    '    for(String tempFile : files){\n' +
                    '        FileNode file = new FileNode(tempFile);\n' +
                    '        subfiles.add(file);\n' +
                    '    }\n' +
                    '    root.setSubFiles(subfiles);\n' +
                    '\n' +
                    '    return root;\n' +
                    '}\n' +
                    '```\n' +
                    '通过以上程序便完成了对需要画成思维导图的数据的处理。\n' +
                    '\n' +
                    '### 生成xmind\n' +
                    '平时使用xmind画时，首先要新建一个工作空间，得到一个没有任何节点的空白导图，然后在这个工作空间得到一个sheet，类似于excel表格的sheet。通过代码生成的方式如下。\n' +
                    '\n' +
                    '```java\n' +
                    '// 创建思维导图的工作空间\n' +
                    'IWorkbookBuilder workbookBuilder = Core.getWorkbookBuilder();\n' +
                    'IWorkbook workspace= workbookBuilder.createWorkbook();\n' +
                    '// 获得默认sheet\n' +
                    'ISheet primarySheet = workspace.getPrimarySheet();\n' +
                    '```\n' +
                    '这样我们便可以在工作空间上创建节点了，对于每一个节点，我们可以用下面代码生成。\n' +
                    '\n' +
                    '```java\n' +
                    '//生成一个节点\n' +
                    'ITopic topic = workspace.createTopic();\n' +
                    '//设置节点名称(name在我这里表示文件或文件夹的名字)\n' +
                    'topic.setTitleText(name);\n' +
                    '```\n' +
                    '生成多个节点之后，我们怎么设置节点之间的关系呢？\n' +
                    '\n' +
                    '```java\n' +
                    'topic.add(subTopic,ITopic.ATTACHED);\n' +
                    '```\n' +
                    '上面这行代码就是将subTopic的节点添加到topic节点上，**即subTopic是topic目录下的文件(夹)**。\n' +
                    '\n' +
                    '最后把第一级的节点，在我的程序里就是我的文件根目录的节点，设置为思维导图的根节点。\n' +
                    '\n' +
                    '```java\n' +
                    '// 获得根主题节点\n' +
                    'ITopic rootTopic = primarySheet.getRootTopic();\n' +
                    '// 设置根主题的标题\n' +
                    'rootTopic.setTitleText(bookName);\n' +
                    '\n' +
                    '//由于我已经得到了根目录的节点，所以只需要替换sheet的根节点，而不需要调用getRootTopic\n' +
                    'primarySheet.replaceRootTopic(rootTopic);\n' +
                    '```\n' +
                    '最后通过workspace的save方法把文件保存，文件后缀需要保存为“.xmind”，否则软件无法识别。\n' +
                    '\n' +
                    '打开xmind文件之后，效果如下：\n' +
                    '![结果示意图](https://img-blog.csdnimg.cn/20200501220242355.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM1NTI0MTU3,size_16,color_FFFFFF,t_70#pic_center)\n' +
                    '\n' +
                    '\n' +
                    '### 总结\n' +
                    '因为篇幅有限，如果需要我的完整代码作为参考例子，可以访问github地址：**基于xmind api的资源地图小工具**\n' +
                    '> [xmind 官方 github地址](https://github.com/xmindltd/xmind/wiki/UsingXmindAPI)\n' +
                    '> [基于xmind api的资源地图小工具](https://github.com/linovce/Java-Applications)\n' +
                    '\n' +
                    '文章主要以如何根据文件目录结构来通过Java画思维导图做使用xmind api的例子，但是也可以拓展到其他内容，只要得到数据的层级关系，便可以通过xmind api画出对应的思维导图，例如书的目录等等，根据实际情况来就行了。\n'
            }
        },
        computed: {
            compiledMarkdown : function () {
                return marked ( this.input, )
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
                        __this.input = response.data.content;
                        __this.articleName = response.data.articleName;
                    })
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    #labels{
        text-align: center;
    }
    #title{
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