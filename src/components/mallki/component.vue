<template>
  <a :class="className" class="link--mallki" href="#">
    {{ text }}
    <span :data-letters="text" />
    <span :data-letters="text" />
  </a>
</template>
<script lang="ts" src="./component.ts" />
<style lang="scss" src="./component.scss" />
