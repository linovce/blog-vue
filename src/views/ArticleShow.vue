<template>
    <div class="mymarkdown-body" v-html= "compiledMarkdown"></div>
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
        name: 'ArticleShow',
        data () {
            return {
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
    }
</script>

<style lang="less" scoped>
    body{
        text-align: center;
    }
</style>

<!--<template>-->
<!--    <mavon-editor-->
<!--            class="md"-->
<!--            :value="opts.api_doc"-->
<!--            :subfield="false"-->
<!--            :boxShadow="false"-->
<!--            defaultOpen="preview"-->
<!--            :toolbarsFlag="false"-->
<!--    />-->
<!--</template>-->
<!--<script>-->
<!--    export default {-->
<!--        name: "ArticleShow",-->
<!--        data () {-->
<!--            return {-->
<!--                // opts.api_doc 即为md文档内容-->
<!--                opts: {-->
<!--                    api_doc: "# idea2020.1踩坑：找不到程序包和符号(冷门解决)\n" +-->
<!--                        "我下好idea2020.1和maven之后，在maven的setting.xml加上了localRepository修改仓库位置，然后在idea的setting里面设置maven地址为我修改到的那个地址**(这也是我以前在多台电脑上的做法，都没有出现过现在这种情况)**。\n" +-->
<!--                        "\n" +-->
<!--                        "在使用idea2020.1版本创建maven项目编译时提示找不到程序包和符号之类的错误。\n" +-->
<!--                        "![在这里插入图片描述](https://img-blog.csdnimg.cn/20200430184847545.png)\n" +-->
<!--                        "我试了网上很多解决办法，包括重新编译、设置编码、检查版本、检查maven等等。因为这些解决方式网上很多，我就不写了，可以见下面这个博主的博文(写的时候随手找的，基本上就这些方式)。\n" +-->
<!--                        "\n" +-->
<!--                        "> [idea找不到程序包和符号常见的解决方式](https://www.cnblogs.com/yswyzh/p/9808878.html)\n" +-->
<!--                        "\n" +-->
<!--                        "上面这些方法我都试过，都没能解决，因为idea是破解的，所以一度怀疑是不是破解jar包的问题，或者是新版idea在防盗版上又做了什么设计。\n" +-->
<!--                        "\n" +-->
<!--                        "后来问了下我一位用了同版本idea，同一个破解jar包的朋友，发现他的没问题，但是他的maven仓库是默认的，在C盘，因此我想是不是这个原因。\n" +-->
<!--                        "\n" +-->
<!--                        "我把idea的maven设置还原成默认的，然后再跑，终于成功了，但jar下在C盘也不是办法，后来百度翻了七八页才翻到跟我有同样问题的兄弟(说明这种情况可能确实少，搜半天才一篇)，**要把maven自己加的localRepository删掉，用默认的，如果不想下在C盘，就在idea手动修改本地仓库的配置。**\n" +-->
<!--                        "\n" +-->
<!--                        "到此终于解决了找不到程序包和符号的问题，也解决了默认仓库占用系统盘的问题。至于原因，暂时不知道，以前都是修改maven的setting.xml添加localRepository，然后idea直接就用了，这次idea2020.1为什么不能就不清楚了。\n" +-->
<!--                        "\n" +-->
<!--                        "我本来是懒得写这种博文的，而且这种情况很多博客都写了，但是这种解决方法确实不多，像我，翻了好几页，换了无数种关键词搜索才找到一篇，所以我才写这篇博文，希望对遇到同样问题的人有所帮助。"-->
<!--                },-->
<!--            }-->
<!--        }-->
<!--    }-->
<!--</script>-->
<!--<style lang="less" scoped>-->
<!--    h1 {color:#00ff00;}-->
<!--</style>-->