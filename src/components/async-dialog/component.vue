<template>
  <el-dialog
    class="async-dialog"
    :title="TITLE"
    :visible.sync="visible"
    :width="width"
    @close="close"
    :close-on-click-modal="closeOnClickModal && !processing"
    :close-on-press-escape="closeOnPressEscape && !processing"
  >
    <slot name="full" :subject="subject" :loading="loading" :processing="processing" :ok="ok" :close="close">
      <div class="async-dialog-panel" v-loading="loading" :element-loading-text="(processing ? '处理中' : '读取中') + '，请稍候……'">
        <div class="async-dialog-content">
          <slot :subject="subject" :loading="loading" :processing="processing" :ok="ok" :close="close"> </slot>
        </div>
        <div class="async-dialog-buttons">
          <el-button @click="close">取消 (ESC)</el-button>
          <el-button type="primary" @click="ok">确认</el-button>
        </div>
      </div>
    </slot>
  </el-dialog>
</template>
<script lang="ts" src="./component.ts" />
<style lang="scss" src="./component.scss" />
