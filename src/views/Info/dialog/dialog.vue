<template>
  <div>
    <el-dialog title="新增" :visible.sync="addFormVisible" @close="close('form')" @open="open">
      <el-form :model="form" ref="form">
        <el-form-item label="类型:" :label-width="formLabelWidth" prop="options">
          <el-select v-model="form.options" placeholder="请选择类型">
            <el-option :label="item.label" :value="item.value" v-for="item in categoryOptions" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标题:" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" autocomplete="off" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="概况:" :label-width="formLabelWidth" prop="content">
          <el-input v-model="form.content" autocomplete="off" type="textarea" placeholder="请输入内容"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close('form')">取 消</el-button>
        <el-button type="primary" @click="submit('form')" :loading="submitLoading">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { AddInfo } from "../../../api/news"
export default {
  name: 'DialogInfo',
  data () {
    return {
      addFormVisible: false,
      form: {
        name: '',
        options: '',
        content: ''
      },
      categoryOptions: [],
      submitLoading: false,
      formLabelWidth: '80px'
    }
  },
  //单向数据流，父级向子级单向传值
  props: {
    addForm: {
      type: Boolean,
      default: false
    },
    options: {
      type: Array,
      default: () => []
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
  },
  //挂载完成后自动执行的
  mounted () {
  },
  methods: {
    //取消提交表单，并且关闭弹窗
    close (form) {
      this.addFormVisible = false;
      //子级向父级传值，用.sync 修饰符
      this.$emit('update:addForm', false);
      // 重置表单
      this.$refs[form].resetFields();
    },
    //打开弹窗
    open () {
      this.categoryOptions = this.$props.options
    },
    submit (form) {
      if (this.form.options == '') {
        console.log(111)
        this.$message.error('分类不能为空！');
        return false;
      } else if (this.form.name == '') {
        this.$message.error('标题不能为空！');
        return false;
      } else if (this.form.content == '') {
        this.$message.error('内容不能为空！');
        return false;
      }
      this.addFormVisible = false;
      this.submitLoading = true;
      let requestData = {
        categoryId: this.form.options,
        title: this.form.name,
        imgUrl: '链接',
        createDate: ' 日期',
        content: this.form.content
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
    }
  }
}
</script>
<style lang="scss" scoped>
</style>