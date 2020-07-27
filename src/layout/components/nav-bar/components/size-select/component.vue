<template>
  <el-dropdown id="size-select" trigger="click" @command="handleSetSize">
    <div>
      <svg-icon class="size-icon" name="size" />
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item v-for="item of sizeOptions" :key="item.value" :disabled="size === item.value" :command="item.value">
        {{ item.label }}
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>
<script lang="ts" src="./component.ts" />
