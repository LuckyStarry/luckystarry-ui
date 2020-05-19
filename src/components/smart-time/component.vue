<template>
  <el-tooltip :content="value|timestamp">
    <span>
      <i class="far fa-clock"></i>
      {{value|smarttime}}
    </span>
  </el-tooltip>
</template>
<script lang="ts" src="./component.ts" />
<style lang="scss" src="./component.scss" />
