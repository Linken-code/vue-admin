<template>
  <div>
    <!-- 表头 -->
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-row :gutter="10">
        <el-col :span="4">
          <el-form-item label="分类:">
            <div class="input_style">
              <el-select v-model="formInline.category" placeholder="请选择">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="日期:">
            <div class="input_style">
              <el-date-picker v-model="formInline.date" type="datetimerange" :picker-options="pickerOptions" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="left" value-format="yyyy-MM-dd HH:mm:ss">
              </el-date-picker>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="关键字:">
            <div class="input_style">
              <SelectVue :selectOptions="optionskey" />
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-input v-model="formInline.search_keyWork" placeholder="请输入内容"></el-input>
        </el-col>
        <el-button type="danger" size="small" @click="search">搜索</el-button>
        <el-button type="danger" size="small" class="right" @click="dialog =true">新增</el-button>
      </el-row>
    </el-form>
    <!-- 新增弹窗 -->
    <DialogInfo :addForm.sync="dialog" :options="options" />
    <!-- 表格数据 -->
    <TableVue :config="tableData">
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
    <!-- 编辑弹窗 -->
    <DialogEditInfo :addForm.sync="dialogEdit" :categoryEdit="categoryEdit" :options="options" :getListEdit="getlist" />
  </div>
</template>
<script>
import DialogInfo from "./dialog/dialog";
import DialogEditInfo from "./dialog/edit";
import SelectVue from "../../components/Select/index";
import TableVue from "../../components/Table/index";
import { message, getInfoCategory } from "../../utils/global";
import { GetList, DeleteInfo } from "../../api/news";
export default {
  name: 'infoIndex',
  components: {
    DialogInfo,
    DialogEditInfo,
    SelectVue,
    TableVue
  },
  data () {
    return {
      formInline: {
        category: '',
        date: '',
        search_key: 'id',
        search_keyWork: ''
      },
      //table配置项
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
      optionskey: ['id', 'title'],
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      dialog: false,
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
    // let data = getInfoCategory()
    // this.options = data
    //获取列表
    this.getlist()
  },
  methods: {
    handleDeleteAll () {
      if (!this.categoryid || this.categoryid.length == 0) {
        this.$message.error('请选择要删除的数据');
        return false;
      }
      message({
        content: '此操作将永久删除该文件, 是否继续?',
        fn: DeleteInfo,
        data: this.categoryid
      });
      this.categoryid = [];
      this.getlist()
    },
    handleSizeChange (val) {
      this.page.pageSize = val;
      getlist()
    },
    handleCurrentChange (val) {
      this.page.currentPageNumber = val;
      getlist()
    },

    search () {
      let requestData = this.formData(val)
      this.getlist(requestData)
    },
    //搜索条件处理
    formData (formInline) {
      if (formInline) {
        let requestData = {
          categoryId: this.categoryid,
          startTiem: this.formInline.data[0],
          endTime: this.formInline.data[1],
          title: this.formInline.title,
          id: this.formInline.search_keyWork,
          pageNumber: this.page.currentPageNumber,
          pageSize: this.page.pageSize,
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
    .el-input {
      width: 100% !important;
      margin-left: 4px;
    }
    .el-input__inner {
      width: 120px !important;
      margin-left: 4px;
    }
    .el-input--suffix .el-input__inner {
      width: 140px !important;
      margin-left: 4px;
    }
    .el-input__icon {
      height: 116%;
    }
  }
  .el-date-editor--datetimerange.el-input,
  .el-date-editor--datetimerange.el-input__inner {
    width: 270px !important;
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

.right {
  float: right;
  margin-right: 40px;
}
.space {
  margin-top: 30px;
}
</style>