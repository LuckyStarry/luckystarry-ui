<template>
  <div class="luckystarry-list" v-loading="loading">
    <el-card class="filter-container" shadow="hover">
      <el-form class="filter-form" inline @submit.native.prevent>
        <slot name="criteria" :search="search" :loading="loading" />
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="search">{{ $t('common.filter.search') }}</el-button>
        </el-form-item>
        <slot name="criteria-buttons" :search="search" :loading="loading" />
      </el-form>
    </el-card>
    <el-card class="toolbar-container" shadow="hover" v-if="toolbar">
      <slot name="toolbar" :search="search" :loading="loading" />
    </el-card>
    <el-table
      :data="decorated"
      border
      fit
      highlight-current-row
      @selection-change="__selectionChange"
      @select-all="selection => $emit('table-select-all', selection)"
      @select="(selection, row) => $emit('table-select', selection, row)"
      @current-change="(currentRow, oldCurrentRow) => $emit('table-current-change', currentRow, oldCurrentRow)"
      @sort-change="({ column, prop, order }) => $emit('table-sort-change', { column, prop, order })"
      @filter-change="filters => $emit('table-filter-change', filters)"
    >
      <slot name="columns" />
    </el-table>
    <pagination v-show="count > 0" :total="count" :page.sync="criteria.index" :limit.sync="criteria.size" @pagination="search" />
  </div>
</template>
<script lang="ts" src="./component.ts" />
<style lang="scss" src="./component.scss" />
