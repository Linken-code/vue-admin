<template>
  <div>
    <!-- 表头 -->
    <el-form :inline="true"
             :model="formInline"
             class="demo-form-inline">
      <el-row :gutter="10">
        <el-col :span="4">
          <el-form-item label="分类:">
            <div class="input_style">
              <el-select v-model="formInline.category"
                         placeholder="请选择">
                <el-option v-for="item in options"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value">
                </el-option>
              </el-select>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="日期:">
            <div class="input_style">
              <el-date-picker v-model="formInline.date"
                              type="datetimerange"
                              :picker-options="pickerOptions"
                              range-separator="至"
                              start-placeholder="开始日期"
                              end-placeholder="结束日期"
                              align="left"
                              value-format="yyyy-MM-dd HH:mm:ss">
              </el-date-picker>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="关键字:">
            <div class="input_style">
              <el-select v-model="formInline.search_key"
                         placeholder="请选择">
                <el-option v-for="item in searchoptions"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value">
                </el-option>
              </el-select>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-input v-model="formInline.search_keyWork"
                    placeholder="请输入内容"></el-input>
        </el-col>
        <el-button type="danger"
                   size="small"
                   @click="search">搜索</el-button>
        <el-button type="danger"
                   size="small"
                   class="right"
                   @click="dialog =true">新增</el-button>
      </el-row>
    </el-form>
    <!-- 新增弹窗 -->
    <DialogInfo :addForm.sync="dialog"
                :options="options" />
    <!-- 表格数据 -->
    <el-table :data="tableData"
              border
              style="width: 100%"
              @selection-change="handleSelectionChange">
      <el-table-column type="selection"
                       width="45"
                       align="center">
      </el-table-column>
      <el-table-column prop="title"
                       label="标题"
                       width="450"
                       align="center">
      </el-table-column>
      <el-table-column prop="category"
                       label="类别"
                       width="130"
                       align="center">
      </el-table-column>
      <el-table-column prop="date"
                       label="日期"
                       width="240"
                       align="center">
      </el-table-column>
      <el-table-column prop="user"
                       label="管理员"
                       width="115"
                       align="center">
      </el-table-column>
      <el-table-column label="操作"
                       align="center">
        <template slot-scope="scope">
          <el-button size="mini"
                     type="danger"
                     @click="handleDelete(scope.row)">删除</el-button>
          <el-button size="mini"
                     type="success"
                     @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 编辑弹窗 -->
    <DialogEditInfo :addForm.sync="dialogEdit"
                    :categoryEdit="categoryEdit"
                    :options="options"
                    :getListEdit="getlist" />

    <!-- 分页 -->
    <el-row class="space">
      <el-col :span="9">
        <el-button size="small"
                   @click="handleDeleteAll()">批量删除</el-button>
      </el-col>
      <el-col :span="15">
        <el-pagination background
                       @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :page-sizes="[10, 20, 50, 100]"
                       layout="total,sizes, prev, pager, next,jumper"
                       :total="1000">
        </el-pagination>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import DialogInfo from "./dialog/dialog"
import DialogEditInfo from "./dialog/edit"
import { message, getInfoCategory } from "../../utils/global"
import { GetList, DeleteInfo } from "../../api/news"
export default {
  name: 'infoIndex',
  components: {
    DialogInfo,
    DialogEditInfo
  },
  data () {
    return {
      formInline: {
        category: '',
        date: '',
        search_key: 'id',
        search_keyWork: ''
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
      searchoptions: [{
        value: 'id',
        label: 'ID'
      }, {
        value: 'title',
        label: '标题'
      }],
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
      tableData: [{
        title: '6561',
        category: '国内信息',
        date: '2016-05-02',
        user: '王小虎'
      },
      {
        title: '654561',
        category: '金融信息',
        date: '2016-05-02',
        user: '王小虎'
      },
      {
        title: '465165',
        category: '军事信息',
        date: '2016-05-02',
        user: '王小虎'
      }],
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
    //编辑按钮
    handleEdit (index, row) {
      this.dialogEdit = true;
      this.categoryEdit = row;
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
    handleSelectionChange (val) {
      this.categoryid = val.map(item => item.categoryid)
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