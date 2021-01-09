<template>
  <div id="category">
    <el-button type="danger"
               @click="addCategory({type:'add'})">添加一级分类</el-button>
    <div>
      <el-row :gutter="30">
        <el-col :span="9">
          <div class="category"
               v-for="item in Category"
               :key="item.id">
            <h4>
              <!-- 一级分类 -->
              <el-button type="primary"
                         size="mini"
                         circle><i class="el-icon-plus"></i></el-button>
              {{item.CategoryName}}
              <div class="button-group">
                <el-button-group>
                  <el-button type="primary"
                             icon="el-icon-edit"
                             size="mini"
                             round
                             @click="editCategory({data:item,type:'firstEdit'})">编辑</el-button>
                  <el-button type="primary"
                             icon="el-icon-circle-plus"
                             size="mini"
                             round
                             @click="AddChildren({data:item,type:'secondEdit'})">添加子级</el-button>
                  <el-button type="primary"
                             icon="el-icon-delete"
                             size="mini"
                             round
                             @click="deleteCategory(item.id)">删除</el-button>
                </el-button-group>
              </div>
            </h4>
            <!-- 二级分类 -->
            <ul v-if="item.Children">
              <li v-for="children in item.Children"
                  :key="children.id">{{children.CategoryName}}
                <div class="button-group">
                  <el-button-group>
                    <el-button type="primary"
                               icon="el-icon-edit"
                               size="mini"
                               round
                               @click="editCategory({data:children,type:'secondEdit'})">编辑</el-button>
                    <el-button type="primary"
                               icon="el-icon-delete"
                               size="mini"
                               round
                               @click="deleteCategory(children.id)">删除</el-button>
                  </el-button-group>
                </div>
              </li>
            </ul>
          </div>
        </el-col>
        <el-col :span="15">
          <h4 class="menu-title">一级分类编辑</h4>
          <el-form :label-position="labelPosition"
                   label-width="140px"
                   class="fromwidth"
                   ref="categoryForm"
                   :model="categoryForm">
            <el-form-item label="一级分类名称:"
                          v-if="CategoryShow.first"
                          prop="CategoryName">
              <el-input v-model="categoryForm.CategoryName"
                        :disabled="categoryForm.disabled"></el-input>
            </el-form-item>
            <el-form-item label="二级分类名称:"
                          v-if="CategoryShow.second"
                          prop="ChildrenCategory">
              <el-input v-model="categoryForm.ChildrenCategory"
                        :disabled="categoryForm.ChildrenDisabled"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="danger"
                         @click="submitForm('categoryForm')"
                         size="mini"
                         :loading="button_loading"
                         :disabled="submit_disabled">提交</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import { AddFirstCategory, GetCategory, DeleteCategory, SendEditCategory } from "../../api/news"
import { message, getInfoCategory } from "../../utils/global"
export default {
  name: 'category',
  data () {
    return {
      labelPosition: 'right',
      categoryForm: {
        CategoryName: '',
        ChildrenCategory: '',
        disabled: true,
        ChildrenDisabled: true
      },
      CategoryShow: {
        first: true,
        second: true
      },
      current: [],
      submit_type: '',
      submit_disabled: true,
      button_loading: false,
      Category: [{
        id: "11",
        CategoryName: "国际信息",
        Children: [{
          id: "11",
          CategoryName: "国际信息"
        }]
      },
      {
        id: "12",
        CategoryName: "国际信息",
        Children: [{
          id: "12",
          CategoryName: "国际信息"
        }]
      }]
    }
  },

  created () {

  },
  //挂载完成后自动执行的
  mounted () {
    // let data = getInfoCategory()
    // this.Category = data
    GetCategory()
  },
  methods: {
    //添加一级分类，按钮加载
    addCategory (params) {
      this.CategoryShow.first = true;
      this.categoryForm.disabled = false;
      this.submit_disabled = false;
      this.submit_type = params.type;
    },
    //点击删除函数
    deleteCategory (id) {
      message({
        content: '此操作将永久删除该文件, 是否继续?',
        //把确认删除函数传进去
        fn: this.comfirmDelete,
        data: {
          categoryId: id
        }
      })
    },
    //确认删除函数
    comfirmDelete (data) {
      DeleteCategory(data).then(Response => {
        let index = this.Category.findIndex(item => { item.id == data.categoryId })
        //数组方法对原数组进行改变，返回值为删除的元素.splice(指定起始位置，删除的个数长度，在删除位置添加的元素)
        //删除指定元素
        this.Category.splice(index, 1)
      }).catch(error => {
        console.log(error)
      })
    },
    //点击编辑
    editCategory (params) {
      this.categoryForm.disabled = false;
      this.submit_disabled = false;
      this.submit_type = params.type;
      this.current = params.data
      if (params.childrenIndex) {
        this.CategoryShow.second = true
        this.categoryForm.ChildrenCategory = params.data.CategoryName
      } else {
        this.CategoryShow.first = true
        this.categoryForm.CategoryName = params.data.CategoryName
      }
    },
    //添加子级
    AddChildren (params) {
      this.submit_disabled = false;
      this.categoryForm.CategoryName = params.data.CategoryName
      this.categoryForm.ChildrenDisabled = false;
    },
    //提交分类
    submitForm () {
      this.button_loading = true;
      if (this.submit_type == 'add') {
        this.addForm()
      } else if (this.submit_type == 'firstEdit') {
        this.sendCategory()
      } else if (this.submit_type == 'secondEdit') {
        this.sendCategory()
      }
      this.button_loading = false;
    },
    //发送添加接口
    addForm () {
      if (!this.categoryForm.CategoryName) {
        this.$message.error('分类名称不能为空');
        this.button_loading = false;
        // return false;
      }
      AddFirstCategory({ categoryName: this.form.CategoryName }).then(Response => {
        this.$message({
          message: '恭喜你，添加成功',
          type: 'success'
        });
        //添加到分类列表
        this.Category.push(Response.data)
        this.button_loading = false;
        this.$refs[categoryForm].resetFields();
      }).catch(error => {
        this.$message.error('错误消息，添加失败');
        this.button_loading = false;
        this.$refs[categoryForm].resetFields();
      })
    },
    //发送编辑接口
    sendCategory () {
      if (this.current.length == 0) {
        this.$message.error('未添加分类名称');
        this.submit_disabled = true;
        return false;
      }
      let Data = {
        id: this.current.id,
        categoryName: this.categoryForm.CategoryName
      }
      SendEditCategory(Data).then(Response => {
        this.$message({
          message: '恭喜你，修改成功',
          type: 'success'
        });
        // let data = Category.filter(item => item.id == this.current.id);
        // data[0].CategoryName = Response.data.data.CategoryName;
        this.current.CategoryName = Response.data.data.CategoryName;
        this.button_loading = false;
        //清空输入框
        this.categoryForm.CategoryName = '';
        this.current = [];
      }).catch(error => {
        this.$message.error('错误消息，添加失败');
        this.button_loading = false;
        this.categoryForm.CategoryName = '';
        this.current = [];
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.category {
  position: relative;
  line-height: 44px;
  &:before {
    content: "";
    position: absolute;
    left: 22px;
    top: 40px;
    bottom: 22px;
    width: 32px;
    border-left: 1px dotted #000000;
  }
  h4 {
    padding-left: 7px;
  }
  ul {
    list-style-type: none;
    li {
      position: relative;
      margin-left: 20px;
      &:before {
        content: "";
        position: absolute;
        left: -38px;
        top: 22px;
        width: 30px;
        border-bottom: 1px dotted #000000;
      }
    }
  }
  li,
  h4 {
    &:hover {
      background-color: #f3f3f3;
      transition: all 0.5s ease 0s;
      .button-group {
        display: inline;
      }
    }
  }
  .button-group {
    display: none;
    position: absolute;
    top: -1px;
    right: 11px;
    button {
      font-size: 12px;
    }
  }
}
.menu-title {
  line-height: 44px;
  padding-left: 20px;
  background-color: #f3f3f3;
}
.fromwidth {
  width: 450px;
}
</style>