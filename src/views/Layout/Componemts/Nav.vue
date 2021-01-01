<template>
  <div id="nav-wrap">
    <h1 class="logo"> <img src="../../../assets/logo.png"
           alt=""></h1>
    <el-menu default-active="1-4-1"
             class="el-menu-vertical-demo"
             :collapse="isCollapse"
             background-color="transparent"
             text-color="#fff"
             active-text-color="#409EFF"
             router>
      <template v-for="(item,index) in routers">
        <el-submenu v-if="!item.hidden"
                    :key="item.id"
                    :index="index+ ''">
          <!-- 一级菜单 -->
          <template slot="title">
            <i :class="item.meta.icon"></i>
            <span slot="title">{{item.meta.name}}</span>
          </template>
          <!-- 二级菜单 -->
          <template v-for="subItem in item.children">
            <el-menu-item :key="subItem.id"
                          :index="subItem.path">
              <i :class="subItem.meta.icon"></i>
              {{subItem.meta.name}}
            </el-menu-item>
          </template>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>
<script>
export default {
  name: 'navMenu',
  data () {
    return {
      isCollapse: false,
      routers: []
    }
  },
  created () {
    this.routers = this.$router.options.routes
  },
  //computed监听是否折叠
  computed: {
    changce () {
      return this.isCollapse = this.$store.state.isCollapse
    }
  },
  watch: {
    changce (curval, oldval) {
    }
  },
  //挂载完成后自动执行的
  mounted () {
  },
  methods: {

  }
};
</script>
<style lang="scss" scoped>
#nav-wrap {
  position: fixed;
  top: 0;
  left: 0;
  transition: all 0.3s ease 0s;
  height: 100vh;
  background-color: #344a5f;
}
.logo {
  text-align: center;
  img {
    width: 100px;
    margin: 30px auto;
    transition: all 0.3s ease 0s;
  }
}
.el-menu-vertical-demo {
  border: 0;
}
.open {
  #nav-wrap {
    width: $navMenu;
  }
}
.close {
  #nav-wrap {
    width: $navMenuMin;
  }
  .logo img {
    margin: auto;
    width: 70%;
  }
}
</style>
