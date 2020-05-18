<template>
  <div :class="[{'is-active': isActive}]" @click="toggleClick">
    <svg-icon name="hamburger" width="20" height="20" />
  </div>
</template>
<script lang="ts" src="./component.ts" />
<style lang="scss" src="./component.scss" scoped/>