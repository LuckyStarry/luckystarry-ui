<template>
  <div id="header-search" :class="{'show': show}" class="header-search">
    <svg-icon class="search-icon" name="search" @click.stop="click" />
    <el-select
      ref="headerSearchSelect"
      v-model="search"
      :remote-method="querySearch"
      filterable
      default-first-option
      remote
      placeholder="Search"
      class="header-search-select"
      @change="change"
    >
      <el-option
        v-for="item in options"
        :key="item.path"
        :value="item"
        :label="item.meta.title.join(' > ')"
      />
    </el-select>
  </div>
</template>
<script lang="ts" src="./component.ts" />
<style lang="scss" src="./component.scss" />