<template>
  <div class="luckystarry-list" v-loading="loading">
    <el-card class="filter-container" shadow="hover">
      <el-form class="filter-form" inline @submit.native.prevent>
        <slot name="criteria" :search="search" :loading="loading" />
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="search">{{ $t('common.filter.search') }}</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-table :data="decorated" border fit highlight-current-row>
      <slot name="columns" />
    </el-table>
    <pagination v-show="count > 0" :total="count" :page.sync="criteria.index" :limit.sync="criteria.size" @pagination="search" />
  </div>
</template>
<script lang="ts" src="./component.ts" />
<style lang="scss" src="./component.scss" />
