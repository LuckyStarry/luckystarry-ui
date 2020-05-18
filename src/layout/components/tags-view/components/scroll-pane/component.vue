<template>
  <el-scrollbar
    ref="scrollContainer"
    :vertical="false"
    class="scroll-container"
    @wheel.native.prevent="handleScroll"
  >
    <slot />
  </el-scrollbar>
</template>
<script lang="ts" src="./component.ts" />
<style lang="scss" src="./component.scss"></style>
<style lang="scss" src="./component-scoped.scss" scoped/>