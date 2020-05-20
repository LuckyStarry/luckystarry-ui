<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="classObj.mobile && sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <side-bar class="sidebar-container" />
    <div :class="{hasTagsView: showTagsView}" class="main-container">
      <div :class="{'fixed-header': fixedHeader}">
        <nav-bar />
        <tags-view v-if="showTagsView" />
      </div>
      <app-main />
      <right-panel v-if="showSettings">
        <settings />
      </right-panel>
    </div>
  </div>
</template>
<script lang="ts" src="./component.ts" />
<style lang="scss" src="./component.scss" />