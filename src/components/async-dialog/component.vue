<template>
  <el-dialog
    class="async-dialog"
    :title="title"
    :visible.sync="visible"
    :width="width"
    @close="close"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <slot :ok="ok" :close="close"></slot>
  </el-dialog>
</template>
<script lang="ts" src="./component.ts" />
<style lang="scss" src="./component.scss" />
