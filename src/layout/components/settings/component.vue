<template>
  <div class="drawer-container">
    <div>
      <h3 class="drawer-title">{{ $t('settings.title') }}</h3>
      <div class="drawer-item">
        <span>{{ $t('settings.showTagsView') }}</span>
        <el-switch v-model="showTagsView" class="drawer-switch" />
      </div>
      <div class="drawer-item">
        <span>{{ $t('settings.showSidebarLogo') }}</span>
        <el-switch v-model="showSidebarLogo" class="drawer-switch" />
      </div>
      <div class="drawer-item">
        <span>{{ $t('settings.fixedHeader') }}</span>
        <el-switch v-model="fixedHeader" class="drawer-switch" />
      </div>
      <div class="drawer-item">
        <span>{{ $t('settings.sidebarTextTheme') }}</span>
        <el-switch v-model="sidebarTextTheme" class="drawer-switch" />
      </div>
    </div>
  </div>
</template>
<script lang="ts" src="./component.ts" />
<style lang="scss" src="./component.scss" />