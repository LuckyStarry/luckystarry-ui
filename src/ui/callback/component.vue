<template>
  <div class="signup-callback">
    <div class="callback-tips">
      <h1 class="tips" v-if="hasError">{{ $t('login.reading-error') }}</h1>
      <h1 class="tips" v-else>{{ $t('login.reading-callback') }}</h1>
      <el-link v-if="hasError" @click="backToHome">{{ $t('login.back-to-home') }}</el-link>
    </div>
  </div>
</template>
<script lang="ts" src="./component.ts" />
<style lang="scss" src="./component.scss" />
