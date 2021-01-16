<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="信息分类:">
        <el-select v-model="form.category" placeholder="请选择">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <div style="width:300px">
        <el-form-item label="新闻标题:">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
      </div>
      <el-form-item label="缩略图:">
        <el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-success="handleAvatarSuccess" :on-remove="handleRemove" :before-upload="beforeAvatarUpload">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" v-if="form.dialogImageUrl" :src="form.dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>
      <el-form-item label="发布日期:">
        <el-date-picker v-model="form.date" type="date" placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="详细内容:">
        <TinymceEdit v-model="form.content" />
      </el-form-item>
      <el-form-item size="large">
        <el-button type="primary" @click="onSubmit('form')" :loading="submitLoading">保存</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import TinymceEdit from '../../tinymce/index';
import { EditInfo } from "../../api/news";
export default {
  name: "infoDetails",
  components: {
    TinymceEdit
  },
  data () {
    return {
      options: [{
        value: '选项1',
        label: '国内信息'
      }, {
        value: '选项2',
        label: '国际信息'
      }, {
        value: '选项3',
        label: '军事信息'
      }, {
        value: '选项4',
        label: '科技信息'
      }, {
        value: '选项5',
        label: '金融信息'
      }],
      form: {
        title: '',
        category: '',
        date: '',
        content: '',
        dialogImageUrl: ''
      },
      submitLoading: false,
      dialogVisible: false
    }
  },
  created () {

  },
  //挂载完成后自动执行的
  mounted () {
    let data = this.$route.params.data
    this.form.category = data.category;
    this.form.title = data.title;
  },
  methods: {
    handleAvatarSuccess (res, file) {
      this.form.dialogImageUrl = URL.createObjectURL(file.raw);
    },
    handleRemove (file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview (file) {
      this.form.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 5;

      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 5MB!');
      }
      return isJPG && isLt2M;
    },
    //提交保存
    onSubmit (form) {
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
      EditInfo(requestData).then(Response => {
        this.$message({
          message: '恭喜你，添加成功',
          type: 'success'
        });
      }).catch(error => {
        this.$message.error('错误消息，添加失败');
      });
      this.submitLoading = false;
      //子级向父级传值,刷新数据
      this.$emit('getListEdit');
      // //重置表单
      this.$refs[form].resetFields();
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
