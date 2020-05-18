<template>
  <div :class="{'has-logo': showLogo}">
    <sidebar-logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :active-text-color="menuActiveTextColor"
        :unique-opened="false"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="route in routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
          :is-collapse="isCollapse"
          :show-children-icon="true"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>
<script lang="ts" src="./component.ts" />
<style lang="scss" src="./component.scss"></style>
<style lang="scss" src="./component-scoped.scss" scoped/>