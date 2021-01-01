<template>
  <div id="main-wrap">
    <div class="main-content">
      <div class="content">
        <router-view />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'infoIndex',
  data () {
    return {
    }
  },
  created () {
  },
  //挂载完成后自动执行的
  mounted () {
  },
  methods: {

  }
};
</script>
<style lang="scss" scoped>
#main-wrap {
  width: 100%;
  height: 100vh;
  padding: $layoutHeader + 30 30px 0 $navMenu + 30;
  box-sizing: border-box;
  transition: all 0.3s ease 0s;
}
.open {
  #main-wrap {
    padding: $layoutHeader + 30 30px 0 $navMenu + 30;
  }
}
.close {
  #main-wrap {
    padding: $layoutHeader + 30 30px 0 $navMenuMin + 30;
  }
}
.main-content {
  background-color: #ffffff;
  height: 100%;
}
.content {
  width: 100%;
  height: 100%;
  padding: 30px 0 0 30px;
  box-sizing: border-box;
  background-color: #ffffff;
}
</style>
