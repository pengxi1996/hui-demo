<template>
  <div>
    <h-menu theme="dark" active-name="1-2" :open-names="['1']" :collapse="isCollapse ==='true'">
      <h-submenu name="1">
        <template slot="title">
          <h-icon name="computer"></h-icon>
          <span slot="title">内容管理</span>
        </template>
        <h-menu-item name="1-1">文章管理</h-menu-item>
        <h-menu-item name="1-2">评论管理
        </h-menu-item>
        <h-submenu name="1-3">
          <template slot="title">
            <h-icon name="computer"></h-icon>
            <span slot="title">举报管理</span>
          </template>
          <h-menu-item name="1-3-1">文章管理11</h-menu-item>
          <h-menu-item name="1-3-2">评论管理22</h-menu-item>
          <h-menu-item name="1-3-3">举报管理33</h-menu-item>
        </h-submenu>
      </h-submenu>
      <h-submenu name="2">
        <template slot="title">
          <h-icon name="computer"></h-icon>
          <span slot="title">用户管理</span>
        </template>
        <h-menu-item name="2-1">新增用户</h-menu-item>
        <h-menu-item name="2-2">活跃用户</h-menu-item>
      </h-submenu>
      <h-submenu name="3">
        <template slot="title">
          <h-icon name="computer"></h-icon>
          <span slot="title">统计分析</span>
        </template>
        <h-menu-group title="使用">
          <h-menu-item name="3-1">新增和启动</h-menu-item>
          <h-menu-item name="3-2">活跃分析</h-menu-item>
          <h-menu-item name="3-3">时段分析</h-menu-item>
        </h-menu-group>
        <h-menu-group title="留存">
          <h-menu-item name="3-4">用户留存</h-menu-item>
          <h-menu-item name="3-5">流失用户</h-menu-item>
        </h-menu-group>
      </h-submenu>
    </h-menu>
    <br />
    <p>展开/收缩</p>
    <h-radio-group v-model="isCollapse">
      <h-radio label="false">展开</h-radio>
      <h-radio label="true">收缩</h-radio>
    </h-radio-group>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isCollapse: "false"
    };
  }
};
</script>
