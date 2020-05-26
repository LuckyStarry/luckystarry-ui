<template>
  <el-select
    ref="draggableSelect"
    v-model="selectVal"
    v-bind="$attrs"
    class="draggable-select"
    multiple
    :filterable="filterable"
    :remote="remote"
    :remote-method="remoteMethod"
    :reserve-keyword="reserveKeyword"
    v-on="$listeners"
  >
    <slot />
  </el-select>
</template>
<script lang="ts" src="./component.ts" />
<style lang="scss" src="./component.scss" />
