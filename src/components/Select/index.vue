<template>
  <el-select v-model="search_key" placeholder="请选择" @change="handleChange">
    <el-option v-for="item in currentOption" :key="item.value" :label="item.label" :value="item.value">
    </el-option>
  </el-select>
</template>
<script>

export default {
  name: "SelectVue",
  components: {

  },
  data () {
    return {
      search_key: '',
      currentOption: [],
      options:
        [{ value: 'name', label: '姓名' },
        { value: 'phone', label: '手机号' },
        { value: 'email', label: '邮箱' },
        { value: 'id', label: 'ID' },
        { value: 'title', label: '标题' }],
    }
  },
  //单向数据流，父级向子级单向传值
  props: {
    selectOptions: {
      type: Array,
      default: () => []
    },
    selectData: {
      type: Object,
      default: () => { }
    }
  },
  watch: {
    selectData: {
      handler (newValue, oldValue) {
      }
    }
  },
  created () {
    this.initOption()
  },
  beforeMount () { },
  //挂载完成后自动执行的
  mounted () {

  },
  methods: {
    initOption () {
      if (!this.$props.selectOptions) {
        console.log('传值为空');
        return false;
      }
      let optionArr = [];
      this.$props.selectOptions.forEach(item => {
        let arr = this.options.filter(elem => elem.value === item);
        if (arr.length > 0) {
          optionArr.push(arr[0]);
        }
      });
      if (optionArr.length === 0) {
        return false;
      }
      this.currentOption = optionArr;
      this.$emit("update:selectData", optionArr[0]);
      this.search_key = optionArr[0].value;
    },
    handleChange (val) {
      let filterData = this.options.filter(item => item.value == val);
      this.$emit("update:selectData", filterData[0])
    }
  }
};
</script>
<style lang="scss" scoped>
.el-input--suffix .el-input__inner {
  width: 140px !important;
  margin-left: 4px;
}
</style>
