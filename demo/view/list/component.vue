<template>
  <list :criteria="criteria" :search-api="apis.search">
    <template slot="criteria" slot-scope="{ search, loading }">
      <el-form-item label="姓名">
        <el-input placeholder="请输入姓名" v-model="criteria.name" clearable :disabled="loading" @keyup.enter.native="search" />
      </el-form-item>
    </template>
    <template slot="columns">
      <el-table-column prop="id" width="60" align="center"></el-table-column>
      <el-table-column label="姓名" prop="name"></el-table-column>
      <el-table-column label="省份" prop="province"></el-table-column>
      <el-table-column label="市区" prop="city"></el-table-column>
      <el-table-column label="地址" prop="address"></el-table-column>
    </template>
  </list>
</template>
<script lang="ts" src="./component.ts" />
