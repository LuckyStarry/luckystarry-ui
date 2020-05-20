<template>
  <transition :name="transitionName">
    <div v-show="visible" :style="customStyle" class="back-to-ceiling" @click="backToTop">
      <svg-icon name="back-top" class="back-top-icon" />
    </div>
  </transition>
</template>
<script lang="ts" src="./component.ts" />
<style lang="scss" src="./component.scss" />
