<template>
  <div ref="rightPanel" :class="{ show: show }" class="rightPanel-container">
    <div class="rightPanel-background" />
    <div class="rightPanel">
      <div class="handle-button" :style="{ top: buttonTop + 'px' }" @click="show = !show">
        <i :class="show ? 'el-icon-close' : 'el-icon-setting'" />
      </div>
      <div class="rightPanel-items">
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./component.ts" />
<style lang="scss" src="./component.scss"></style>
<style lang="scss" src="./component-scoped.scss" scoped />
