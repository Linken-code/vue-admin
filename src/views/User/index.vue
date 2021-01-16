<template>
  <div>
    <!-- 表头 -->
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-row :gutter="10">
        <el-col :span="4">
          <el-form-item label="关键字:">
            <div class="input_style">
              <SelectVue :selectOptions="options" :selectData.sync="selectData" />
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <el-input v-model="formInline.searchkeyWord" placeholder="请输入内容"></el-input>
          <el-button type="danger" size="small" @click="search">搜索</el-button>
        </el-col>
        <el-col :span="4">
          <el-button type="danger" size="small" class="right" @click="addUserButtom">新增用户</el-button>
        </el-col>
      </el-row>
    </el-form>
    <!-- 新增弹窗 -->
    <div v-if='AddUser'>
      <DialogAddUser :addForm.sync="AddUser" :Edit="currentEditData" />
    </div>
    <!-- 表格数据 -->
    <TableVue :config="tableData" :checkBoxgroup.sync="checkboxId">
      <template v-slot:switchStatus="slotData">
        <el-switch v-model="slotData.data.switchvalue" active-color="#13ce66" inactive-color="#ff4949" @change="handleswitch">
        </el-switch>
      </template>
      <template v-slot:operation="slotData">
        <el-button size="mini" type="danger" @click="handleDelete(slotData.data)">删除</el-button>
        <el-button size="mini" type="success" @click="handleEdit(slotData.data)">编辑</el-button>
      </template>
      <!-- 批量删除 -->
      <template v-slot:DeleteAllSlot>
        <el-button size="small" @click="handleDeleteAll()">批量删除</el-button>
      </template>
    </TableVue>
  </div>
</template>
<script>
import DialogAddUser from "./dialog/addUser";
import SelectVue from "../../components/Select/index";
import TableVue from "../../components/Table/index";
import { message, getInfoCategory } from "../../utils/global";
import { GetList, DeleteInfo } from "../../api/news";
export default {
  name: 'UserIndex',
  components: {
    DialogAddUser,
    SelectVue,
    TableVue
  },
  data () {
    return {
      formInline: {
        searchkey: 'name',
        searchkeyWord: ''
      },
      selectData: {},
      options: ['name', 'phone', 'email'],
      //table配置项
      checkboxId: [],
      currentEditData: {},
      tableData: {
        //表头
        thead: [
          { label: "邮箱/用户名", prop: "email" },
          { label: "真实姓名", prop: "userName" },
          { label: "手机号", prop: "phone" },
          { label: "地区", prop: "address" },
          { label: "角色", prop: "role" },
          { label: "禁用状态", prop: "switchStatus", columnType: "slot", slotName: "switchStatus" },
          { label: "操作", prop: "operation", columnType: "slot", slotName: "operation" }
        ]
      },
      AddUser: false,
      dialogshow: false,
      dialogEdit: false,
      categoryEdit: {},
      categoryid: [],
      page: {
        pageSize: 1,
        currentPageNumber: 10
      }
    }
  },
  created () {

  },
  //挂载完成后自动执行的
  mounted () {
  },
  methods: {
    handleswitch (val) {

    },
    addUserButtom () {
      this.AddUser = true;
      let buttonType = 'add';
      this.currentEditData = { buttonType };
    },
    //编辑按钮
    handleEdit (row) {
      this.AddUser = true;
      let userData = row;
      let buttonType = 'edit';
      this.currentEditData = { ...userData, buttonType };
    },
    handleDelete (row) {
      this.categoryid = [row.category]
      message({
        content: '此操作将永久删除该文件, 是否继续?',
        fn: DeleteInfo,
        data: this.categoryid
      })
      this.categoryid = [];
      this.getlist()
    },
    handleDeleteAll () {
      if (!this.checkboxId || this.checkboxId.length == 0) {
        this.$message.error('请选择要删除的数据');
        return false;
      }
      message({
        content: '此操作将永久删除该文件, 是否继续?',
        fn: DeleteInfo,
        data: this.checkboxId
      });
      this.categoryid = [];
      this.getlist()
    },
    search () {
      this.formInline.searchkeyWord = this.selectData.value
      // let requestData = this.formData(val)
      // this.getlist(requestData)
    },
    //搜索条件处理
    formData (formInline) {
      if (formInline) {
        let requestData = {
          // categoryId: this.categoryid,
          // startTiem: this.formInline.data[0],
          // endTime: this.formInline.data[1],
          // title: this.formInline.title,
          // id: this.formInline.search_keyWork,
          // pageNumber: this.page.currentPageNumber,
          // pageSize: this.page.pageSize,
        };
        return requestData
      }
    },
    //获取列表
    getlist () {
      let requestData = this.formData()
      GetList(requestData).then(Response => {
        let data = Response.data;
        this.tableData = data;
        this.$message({
          message: '获取信息成功',
          type: 'success'
        });
      }).catch(error => {
        this.$message.error('错误消息，获取失败');
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.input_style {
  .el-select {
    width: 110px !important;

    .el-input__icon {
      height: 116%;
    }
  }
  .el-form-item {
    .el-form-item__label {
      padding-right: 0 0 0 0 !important;
    }
    .el-form-item__content {
      width: 60% !important;
      .el-range-input {
        width: 80px !important;
      }
    }
  }
}
.el-input {
  width: 150px !important;
  margin-right: 15px;
}
.right {
  float: right;
  margin-right: 40px;
}
</style>