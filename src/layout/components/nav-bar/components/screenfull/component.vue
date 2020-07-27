<template>
  <div id="screenfull">
    <svg-icon :name="isFullscreen ? 'exit-fullscreen' : 'fullscreen'" @click="click" />
  </div>
</template>
<script lang="ts" src="./component.ts" />
