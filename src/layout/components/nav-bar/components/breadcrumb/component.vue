<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in breadcrumbs" :key="item.path">
        <span
          v-if="item.redirect === 'noredirect' || index === breadcrumbs.length-1"
          class="no-redirect"
        >{{ $t('route.' + item.meta.title) }}</span>
        <a v-else @click.prevent="handleLink(item)">{{ $t('route.' + item.meta.title) }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>
<script lang="ts" src="./component.ts" />
<style lang="scss" src="./component.scss" />