<template>
  <div>
    <el-dialog :title="title[0]" :visible.sync="addFormVisible" @close="close('userform')" @open="open">
      <el-form :model="userform" ref="userform">
        <el-form-item label="用户名:" :label-width="formLabelWidth" prop="email">
          <el-input v-model="userform.email" autocomplete="off" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="姓名:" :label-width="formLabelWidth" prop="userName">
          <el-input v-model="userform.userName" autocomplete="off" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="手机号:" :label-width="formLabelWidth" prop="phone">
          <el-input v-model="userform.phone" autocomplete="off" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="地区:" :label-width="formLabelWidth" prop="address">
          <el-cascader v-model="userform.address" :options="address" :props="addressProps" @change="handleChange" @focus="current" clearable></el-cascader>
        </el-form-item>
        <el-form-item label="是否启用:" :label-width="formLabelWidth" prop="enable">
          <el-radio-group v-model="userform.switchvalue">
            <el-radio :label=false>禁用</el-radio>
            <el-radio :label=true>启用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="角色:" :label-width="formLabelWidth" prop="checkList">
          <el-checkbox-group v-model="userform.checkList">
            <el-checkbox label="A">系统管理员</el-checkbox>
            <el-checkbox label="B">信息管理员</el-checkbox>
            <el-checkbox label="C">用户管理员</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close('userform')">取 消</el-button>
        <el-button type="primary" @click="submit('userform')" :loading="submitLoading">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { AddInfo, GetCity } from "../../../api/news"
let id = 0;
export default {
  name: 'DialogInfo',
  data () {
    return {
      addFormVisible: false,
      title: ['新增用户', '编辑用户'],
      userData: {},
      userform: {
        email: '',
        userName: '',
        phone: '',
        address: '',
        switchvalue: true,
        checkList: ['A']
      },
      submitLoading: false,
      formLabelWidth: '80px',
      addressProps: {
        lazy: true,
        expandTrigger: 'hover',
        lazyLoad (node, resolve) {
          const { level } = node;
          setTimeout(() => {
            const nodes = Array.from({ length: level + 1 })
              .map(item => ({
                value: ++id,
                label: `选项${id}`,
                leaf: level >= 2
              }));
            // 通过调用resolve将子节点数据返回，通知组件数据加载完成
            resolve(nodes);
          }, 1000);
        }
      },
      address: [
        {
          value: 'zhinan',
          label: '指南',
          children: [{
            value: 'shejiyuanze', label: '设计原则',
            children: [{
              value: 'yizhi', label: '一致'
            }, {
              value: 'fankui', label: '反馈'
            }, {
              value: 'xiaolv', label: '效率'
            }, { value: 'kekong', label: '可控' }]
          }, {
            value: 'daohang', label: '导航',
            children: [{
              value: 'cexiangdaohang',
              label: '侧向导航'
            }, {
              value: 'dingbudaohang',
              label: '顶部导航'
            }]
          }]
        },
        {
          value: 'zujian', label: '组件',
          children: [{
            value: 'basic', label: 'Basic',
            children: [{
              value: 'layout', label: 'Layout 布局'
            }, {
              value: 'color', label: 'Color 色彩'
            }, {
              value: 'typography', label: 'Typography 字体'
            }, {
              value: 'icon', label: 'Icon 图标'
            }, {
              value: 'button', label: 'Button 按钮'
            }]
          },
          {
            value: 'form', label: 'Form',
            children: [{
              value: 'radio', label: 'Radio 单选框'
            }, {
              value: 'checkbox', label: 'Checkbox 多选框'
            }, {
              value: 'input', label: 'Input 输入框'
            }, {
              value: 'input-number', label: 'InputNumber 计数器'
            }, {
              value: 'select', label: 'Select 选择器'
            }, {
              value: 'cascader', label: 'Cascader 级联选择器'
            }, {
              value: 'switch', label: 'Switch 开关'
            }, {
              value: 'slider', label: 'Slider 滑块'
            }, {
              value: 'time-picker', label: 'TimePicker 时间选择器'
            }, {
              value: 'date-picker', label: 'DatePicker 日期选择器'
            }, {
              value: 'datetime-picker', label: 'DateTimePicker 日期时间选择器'
            }, {
              value: 'upload', label: 'Upload 上传'
            }, {
              value: 'rate', label: 'Rate 评分'
            }, {
              value: 'form', label: 'Form 表单'
            }]
          },
          {
            value: 'data', label: 'Data',
            children: [{
              value: 'table', label: 'Table 表格'
            }, {
              value: 'tag', label: 'Tag 标签'
            }, {
              value: 'progress', label: 'Progress 进度条'
            }, {
              value: 'tree', label: 'Tree 树形控件'
            }, {
              value: 'pagination', label: 'Pagination 分页'
            }, {
              value: 'badge', label: 'Badge 标记'
            }]
          },
          {
            value: 'notice', label: 'Notice',
            children: [{
              value: 'alert', label: 'Alert 警告'
            }, {
              value: 'loading', label: 'Loading 加载'
            }, {
              value: 'message', label: 'Message 消息提示'
            }, {
              value: 'message-box', label: 'MessageBox 弹框'
            }, {
              value: 'notification', label: 'Notification 通知'
            }]
          },
          {
            value: 'navigation', label: 'Navigation',
            children: [{
              value: 'menu', label: 'NavMenu 导航菜单'
            }, {
              value: 'tabs', label: 'Tabs 标签页'
            }, {
              value: 'breadcrumb', label: 'Breadcrumb 面包屑'
            }, {
              value: 'dropdown', label: 'Dropdown 下拉菜单'
            }, {
              value: 'steps', label: 'Steps 步骤条'
            }]
          },
          {
            value: 'others', label: 'Others',
            children: [{
              value: 'dialog', label: 'Dialog 对话框'
            }, {
              value: 'tooltip', label: 'Tooltip 文字提示'
            }, {
              value: 'popover', label: 'Popover 弹出框'
            }, {
              value: 'card', label: 'Card 卡片'
            }, {
              value: 'carousel', label: 'Carousel 走马灯'
            }, {
              value: 'collapse', label: 'Collapse 折叠面板'
            }]
          }]
        },
        {
          value: 'ziyuan', label: '资源',
          children: [{
            value: 'axure', label: 'Axure Components'
          }, {
            value: 'sketch', label: 'Sketch Templates'
          }, {
            value: 'jiaohu', label: '组件交互文档'
          }]
        }]
    }
  },
  //单向数据流，父级向子级单向传值
  props: {
    addForm: {
      type: Boolean,
      default: false
    },
    Edit: {
      type: Object,
      default: () => { }
    }
  },
  watch: {
    addForm: {
      handler (newValue, oldValue) {
        this.addFormVisible = newValue
      }
    }
  },
  created () {
    this.addFormVisible = true;
  },
  beforeMount () {
    if (this.$props.Edit.buttonType === 'add') {
    } else if (this.$props.Edit.buttonType === 'edit') {
      let data = this.$props.Edit;
      this.userform = JSON.parse(JSON.stringify(data));
    }
  },
  //挂载完成后自动执行的
  mounted () {
    this.getCityList()

  },
  methods: {
    //取消提交表单，并且关闭弹窗
    close (form) {
      this.addFormVisible = false;
      // 重置表单
      this.$refs[form].resetFields();
      //子级向父级传值，用.sync 修饰符
      this.$emit('update:addForm', false);
    },
    //打开弹窗
    open () {
      // if (this.$props.Edit.buttonType === 'add') {
      // } else if (this.$props.Edit.buttonType === 'edit') {
      //   let data = this.$props.Edit;
      //   this.userform = JSON.parse(JSON.stringify(data));
      // }
    },
    submit (form) {
      if (this.userform.email == '') {
        this.$message.error('邮箱不能为空！');
        return false;
      } else if (this.userform.userName == '') {
        this.$message.error('标题不能为空！');
        return false;
      } else if (this.userform.phone == '') {
        this.$message.error('内容不能为空！');
        return false;
      }
      this.addFormVisible = false;
      this.submitLoading = true;
      let requestData = {
        // categoryId: this.form.options,
        // title: this.form.name,
        // imgUrl: '链接',
        // createDate: ' 日期',
        // content: this.form.content
      }
      AddInfo(requestData).then(Response => {
        this.$message({
          message: '恭喜你，添加成功',
          type: 'success'
        });
        this.submitLoading = false;
      }).catch(error => {
        this.submitLoading = false;
        this.$message.error('错误消息，添加失败');
      });
      // //重置表单
      this.$refs[form].resetFields();
    },
    handleChange (value) {
      console.log(value);
    },
    getCityList () {
      let requestData = {
        type: "province",
        // type: "city",
        // province_code: 省份编码,
        // type: "area",
        // city_code: 城市编码,
        // type: "street",
        // area_code: 区县编码
      }
      GetCity(requestData).then(Response => {
        this.$message({
          message: '恭喜你，添加成功',
          type: 'success'
        });
        this.submitLoading = false;
      }).catch(error => {
        this.submitLoading = false;
        this.$message.error('错误消息，添加失败');
      });
    },
    current (event) {

    }
  }
}
</script>
<style lang="scss" scoped>
.el-input {
  width: 250px !important;
  margin-right: 15px;
}
</style>