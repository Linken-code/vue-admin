<template>
  <div id="header-wrap">
    <div class="left icon" @click="navMenuState"><i class="el-icon-tickets"></i></div>
    <div class="right icon">
      <div class="user-info">{{username}}</div>
      <div @click="exit"><i class="el-icon-switch-button"></i></div>
    </div>
  </div>
</template>
<script>
import { removeUserName } from "../../../utils/token"
export default {
  name: 'infoIndex',

  data () {
    return {
      username: '',
    }
  },
  created () {

  },
  //挂载完成后自动执行的
  mounted () {
  },
  //computed监听是否折叠
  computed: {
    changce_username () {
      return this.username = this.$store.state.username
    }
  },
  watch: {
    changce_username (curval, oldval) {
    }
  },
  methods: {
    //收起侧边导航栏
    navMenuState () {
      this.$store.commit('set_isCollapse')
    },
    //退出账号
    exit () {
      removeUserName()
      this.$router.push({
        name: 'Login'
      })
    }
  }
};
</script>
<style lang="scss" scoped>
#header-wrap {
  position: fixed;
  top: 0;
  right: 0;
  left: $navMenu;
  height: 75px;
  background-color: #ffffff;
  box-shadow: 0 3px 16px 0 rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  transition: all 0.3s ease 0s;
}
.open {
  #header-wrap {
    left: $navMenu;
  }
}
.close {
  #header-wrap {
    left: $navMenuMin;
  }
}
.icon {
  font-size: 40px;
  line-height: 75px;
  padding: 0 30px;
  cursor: pointer;
}
.right {
  display: flex;
  .user-info {
    font-size: 0.9rem;
    padding: 0 10px;
  }
}
</style>
