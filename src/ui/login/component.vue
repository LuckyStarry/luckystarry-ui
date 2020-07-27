<template>
  <div class="login-container">
    <el-form class="login-form">
      <div class="title-container">
        <h3 class="title">{{ $t('login.title') }}</h3>
      </div>
      <el-button :loading="loading" type="primary" style="width:100%; margin-bottom:30px;" @click="login">{{ $t('login.thirdparty') }}</el-button>
      <div style="position:relative">
        <div class="tips">
          <span>{{ $t('login.tips') }}</span>
        </div>
      </div>
    </el-form>
    <el-dialog class="dialog-thirdparty" :title="$t('login.thirdparty')" :visible.sync="showDialog">
      <h1 class="login-tips">{{ $t('login.thirdpartyTips') }}</h1>
    </el-dialog>
  </div>
</template>
<script lang="ts" src="./component.ts" />
<style lang="scss" src="./component.scss" />
