<template>
  <main class="page-404">
    <span class="particle" v-for="item in particles(4)" :key="item.id" :style="item.style">{{ item.text }}</span>
    <span class="particle" v-for="item in particles(0)" :key="item.id" :style="item.style">{{ item.text }}</span>
    <article class="content">
      <p>OOPS!</p>
      <p><strong>404</strong> Page not found。</p>
      <p>
        <el-link @click="backToHome">{{ $t('login.back-to-home') }}</el-link>
      </p>
    </article>
  </main>
</template>
<script lang="ts" src="./component.ts" />
<style lang="scss" src="./component.scss" />
