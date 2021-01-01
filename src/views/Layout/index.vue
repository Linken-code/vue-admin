<template>
  <div id="layout"
       :class="[menuSatus?'close':'open']">
    <LayoutHeader />
    <LayoutMain />
    <LayoutNav />
  </div>
</template>
<script>
import LayoutHeader from "./Componemts/Header";
import LayoutMain from "./Componemts/Main";
import LayoutNav from "./Componemts/Nav";
export default {
  name: "layout",
  components: {
    LayoutHeader,
    LayoutMain,
    LayoutNav
  },
  data () {
    return {
    }
  },
  created () {
  },
  //挂载完成后自动执行的
  mounted () {
  },
  //computed监听是否折叠
  computed: {
    menuSatus () {
      return this.isCollapse = this.$store.state.isCollapse
    }
  },
  watch: {
    menuSatus (curval, oldval) {
    }
  },
  methods: {

  }
};
</script>
<style lang="scss" scoped>
#layout {
  background-color: #f7f7f7;
}
</style>
