<template>
  <main class="container">
    <span
      class="particle"
      v-for="item in particles(4)"
      :key="item.id"
      :style="item.style"
    >{{item.text}}</span>
    <span
      class="particle"
      v-for="item in particles(0)"
      :key="item.id"
      :style="item.style"
    >{{item.text}}</span>
    <article class="content">
      <p>OOPS!</p>
      <p>
        <strong>404</strong> Page not found。
      </p>
      <p>
        <a href="/">
          <button>返回主页</button>
        </a>
      </p>
    </article>
  </main>
</template>
<script lang="ts" src="./component.ts" />
<style lang="scss" src="./component.scss" />
