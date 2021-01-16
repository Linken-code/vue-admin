<template>
  <div>
    <el-table :data="tableData" border style="width: 100%" @selection-change="handleSelectionChange">
      <!-- 多选框 -->
      <el-table-column type="selection" width="45" align="center"></el-table-column>
      <template v-for="item in configTable.thead">
        <el-table-column :key="item.prop" :prop="item.prop" :label="item.label" align="center" v-if="item.columnType==='slot'">
          <!-- 插槽 -->
          <template slot-scope="scope">
            <slot :data="scope.row" :name="item.slotName"> </slot>
          </template>
        </el-table-column>
        <!-- 文本渲染 -->
        <el-table-column :key="item.prop" :prop="item.prop" :label="item.label" align="center" v-else></el-table-column>
      </template>
    </el-table>
    <!-- 底部分页 -->
    <el-row class="space">
      <el-col :span="9">
        <slot name="DeleteAllSlot"></slot>
      </el-col>
      <el-col :span="15">
        <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[10, 20, 50, 100]" layout="total,sizes, prev, pager, next,jumper" :total="1000">
        </el-pagination>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { getUserList } from "../../api/news";
export default {
  name: 'tableVue',
  components: {},
  data () {
    return {
      configTable: {
        thead: [],
      },
      tableData: [
        {
          id: "1",
          phone: '6561',
          address: '国内信息',
          role: '2016-05-02',
          userName: '小虎111',
          email: '王小虎1111',
          switchvalue: true,
          checkList: ['A', 'B']
        },
        {
          id: "2",
          phone: '6561',
          address: '国内信息',
          role: '2016-05-02',
          userName: '小虎2',
          email: '王小虎2',
          switchvalue: false,
          checkList: ['A', 'C']
        },
        {
          id: "3",
          phone: '6561',
          address: '国内信息',
          role: '2016-05-02',
          userName: '小虎3',
          email: '王小虎3',
          switchvalue: true,
          checkList: ['A', 'C']
        },
        {
          id: "4",
          phone: '6561',
          address: '国内信息',
          role: '2016-05-02',
          userName: '小虎4',
          email: '王小虎4',
          switchvalue: false,
          checkList: ['B', 'C']
        },
      ],
    }
  },
  props: {
    //props用来接收父组件传递过来的数据
    // value: {
    //   type: String,
    //   default: ''
    // }
    config: {
      type: Object,
      default: () => { },
    },
    checkBoxgroup: {
      type: Array,
      default: () => [],
    }
  },
  watch: {
    // value (val) {  //父子组建双向绑定
    //   this.content = val
    // },
    // content (val) {
    //   this.$emit('input', val)
    // }
  },
  created () {
    this.configTable.thead = this.$props.config.thead
    this.getList()
  },
  beforeMount () {

  },
  //挂载完成后自动执行的
  mounted () { },
  methods: {
    handleSelectionChange (val) {
      let checkBoxID = val.map(item => item.id);
      this.$emit("update:checkBoxgroup", checkBoxID);
    },
    getList () {
      let data = {
        username: "",
        truename: "",
        phone: "",
        pageNumber: 1,
        pageSize: 10
      }
      getUserList(data).then(Response => {
        let data = Response.data;
        this.tableData = data;
        this.$message({
          message: '获取信息成功',
          type: 'success'
        });
      }).catch(error => {
        this.$message.error('错误消息，获取失败');
      })
    },
    handleSizeChange (val) {
      this.page.pageSize = val;
      getlist()
    },
    handleCurrentChange (val) {
      this.page.currentPageNumber = val;
      getlist()
    },
  },
}
</script>
<style lang="scss" scoped>
.space {
  margin-top: 30px;
}
</style>
