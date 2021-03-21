<template>
  <main class="page-401">
    <span class="particle" v-for="item in particles(4)" :key="item.id" :style="item.style">{{ item.text }}</span>
    <span class="particle" v-for="item in particles(0)" :key="item.id" :style="item.style">{{ item.text }}</span>
    <span class="particle" v-for="item in particles(1)" :key="item.id" :style="item.style">{{ item.text }}</span>
    <article class="content">
      <p>OOPS!</p>
      <p><strong>401</strong> 您的操作权限不足。</p>
      <p>
        <el-link @click="backToHome">返回首页</el-link>
        <el-link :href="$route.redirectedFrom" v-if="$route.redirectedFrom">返回重试</el-link>
      </p>
    </article>
  </main>
</template>
<script lang="ts" src="./component.ts" />
<style lang="scss" src="./component.scss" />
