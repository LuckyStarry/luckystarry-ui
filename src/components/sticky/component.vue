<template>
  <div :style="{ height: height, zIndex: zIndex }" class="sticky">
    <div
      :class="className"
      :style="{
        top: isSticky ? stickyTop + 'px' : '',
        zIndex: zIndex,
        position: position,
        width: width,
        height: height
      }"
    >
      <slot></slot>
    </div>
  </div>
</template>
<script lang="ts" src="./component.ts" />
