<template>
  <div>
    <!-- 给个容器，待会用来盛放编辑器，**很重要很重要很重要**！！！ -->
    <div id="mySelection">
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import "./tinymce.min.js";               //入口文件  
import "./themes/silver/theme.min.js";  //主题文件，不引入你在界面上看不到编辑器，浏览器会把它隐
//藏，不相信你就别引入看看界面效果就知道了
import "./langs/zh_CN.js";				//语言文件
import "./icons/default/icons.min.js"	//图标文件
// ----以上四个文件必须引入-----          //下面引入的这些文件不知道什么用没关系，继续往下看
// 编辑器插件plugins
import './plugins/advlist'
import './plugins/autolink'
import './plugins/lists'
import './plugins/link'
import './plugins/image'
import './plugins/charmap'
import './plugins/print'
import './plugins/preview'
import './plugins/anchor'
import './plugins/searchreplace'
import './plugins/visualblocks'
import './plugins/fullscreen'
import './plugins/insertdatetime'
import './plugins/media'
import './plugins/table'


export default {
  name: 'Index',
  props: { //props用来接收父组件传递过来的数据
    value: {
      type: String,
      default: ''
    }
  },
  watch: {
    value (val) {  //父子组建双向绑定
      this.content = val
    },
    content (val) {
      this.$emit('input', val)
    }
  },
  data () {
    return {
      content: this.value,
    }
  },

  // created () {
  //   this.initEdit()
  // },
  // beforeMount () {
  //   this.initEdit()
  // },
  mounted () {
    this.initEdit()  //DOM挂载完毕后就初始化它 
  },
  // updated () {
  //   this.initEdit()
  // },
  methods: {
    initEdit () {
      tinymce.init({          //tinymce是我们导入进来的，里面有个init初始化方法，调用进行初始化
        selector: '#mySelection',  //slelector用来指向容器
        language: 'zh_CN',			 //指定语言，这个语言也是被我们导入进来的，最上面有导入过程
        auto_focus: true,        //auto_focus为true打开自定聚焦，即一进入鼠标焦点就存在
        // readonly: true,        //只读属性    true可以禁用编辑功能，只能看
        branding: false,          //隐藏右下角技术支持，这个可以自行切换true/false看看到底是什么    
        draggable_modal: true,    //模态框可拖动，这里的模态框指的是点击工具栏里面
        //自带的弹框才有的拖动效果
        elementpath: false,       //隐藏元素路径，不明白的可以切换true/false观察页面
        height: 150,				//初始化富文本编辑器的高度
        width: 500,				//初始化富文本编辑器的宽度
        // statusbar: false,       //隐藏最下边DOM信息，不明白的切换true/false观察页面

        // ------------菜单栏配置----------(什么是菜单栏什么是工具栏请看下面一幅图)
        menubar: 'bar1 bar2',
        menu: {			//这里就类似大家常用的下拉菜单组件一样，里面肯定要写相应的items项
          bar1: { title: '菜单1', items: 'copy paste' }, //此items为添加复制与剪切功能
          bar2: { title: '菜单2', items: 'print code' }  //此items为添加打印与查看源代码功能
        },
        // ------------工具栏配置-------------
        //工具栏的写法有很多种，可以直接在后面跟字符串，多个工具用空格隔开，如
        toolbar: 'undo redo | insert | styleselect | fontselect bold italic forecolor backcolor | alignleft aligncenter alignright | bullist numlist outdent indent | link image media | fullscreen',
        //我这种写法多了个分割线'|' 到时候页面上工具栏也会有相应分割线隔开(真的太舒服了书写方式简单粗暴)
        // toolbar: ['newdocument | undo redo | selectall cut | table visualaid | bold italic   underline',
        //   'strikethrough subscript superscript | align formats image | preview | fullscreen | bdmap'],
        // toolbar: false,              //隐藏工具栏（整个菜单栏不想要直接隐藏）
        // menubar: false,              //隐藏菜单栏（整个工具栏不想要直接隐藏）

        // ----------- 插件配置项----------
        /*这里举个例子：什么叫插件，比如想给我的富文本编辑器调取某些功能，
        我就得引入相应的插件，这时就能明白一开始页面最上面引入一些含有plugin的文件的作用了
        比如我想给富文本编辑器调取打印的功能，我就得从plugins包里引入打印的插件，
        然后才能使用这个功能。plugins里面内置了许多写好的插件
        具体有哪些插件供使用，自己点进plugins 包里查看，需要哪个功能就引入哪个插件*/
        //  --使用插件--
        /*引入了插件后需要在plugins配置项写我们引入插件的名称，书写方式同样简单粗暴，你懂的
       大家可以看下，这里plugins配置项写的插件我在最上方都有引入*/
        plugins: ['advlist autolink lists link image charmap print preview anchor',
          'searchreplace visualblocks fullscreen',
          'insertdatetime media table']
        ,
        font_formats:
          ['Andale Mono=andale mono,times; Arial=arial,helvetica,sans-serif; 黑体=arial black,avant garde; Book Antiqua=book antiqua,palatino; Comic Sans MS=comic sans ms,sans-serif; Courier New=courier new,courier; Georgia=georgia,palatino; Helvetica=helvetica; Impact=impact,chicago; Symbol=symbol; 宋体=tahoma,arial,helvetica,sans-serif; Terminal=terminal,monaco; Times New Roman=times new roman,times; Trebuchet MS=trebuchet ms,geneva; Verdana=verdana,geneva; Webdings=webdings; Wingdings=wingdings,zapf dingbats'],
        //到此为止最基本的配置完成
        // --------- 富文本编辑器的事件--------
        //监听tinymce初始化完成事件
        setup: (editor) => {
          editor.on('init', e => {
            editor.setContent(this.value)
          });
        },
        /*监听input和change事件,实时更新value，意思是当我们在富文本编辑器里面修改内容时，
        我在父组件可以监听到修改事件并且拿到修改过后的值*/
        init_instance_callback: (editor) => {  //init_instance_callback为回调配置项
          editor.on('input', e => {
            this.$emit('input', e.target.innerHTML)
          });
          editor.on('change', e => {
            this.$emit('change', e.level.content)
          })
        },
        //这个括号是回调配置项结束的括号
        //上传图片
        images_upload_handler: (blobInfo, success, failure) => {
          this.handleImageAdded(blobInfo, success, failure)
        }
      });       //这个是初始化结束的括号
    },	      //这个是我封装的initEdit方法结束括号
    //上传图片消息弹窗
    handleImageAdded (blobInfo, success, failure) {
      let file = blobInfo.blob()
      const isLt8M = file.size / 1024 / 1024 < 20
      if (!isLt8M) {
        this.$message.error('图片大小不能超过 20MB!')
        return
      }
      let params = new FormData()
      params.append('file', file)

      let headers = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: getToken()
        }
      } // 添加请求头
      axios
        .post('/upload/picture', params, headers)
        .then(({ data }) => {
          if (data.code == 200) {
            let url = config.basePreFileUrl + data.data.relativeFileUrl
            success(url)
          } else {
            failure(data.message)
            this.$message.error(data.message)
          }
        })
        .catch(e => {
          failure(e.message)
          this.$message.error(e.message)
        })
    },
    async info () {  //回显内容
      console.log(this.mubanId)
      let { data } = await getDetail({
        templateId: this.mubanId
      })
      this.content = data
    }
  }
}
</script>
  
<style scoped>
@import url("./skins/ui/oxide/skin.min.css"); /**这里是插件的基本css文件，记得引入**/
</style>

