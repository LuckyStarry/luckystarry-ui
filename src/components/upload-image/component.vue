<template>
  <div class="upload-container">
    <div class="image-preview" v-show="!!value">
      <div class="image-preview-wrapper">
        <img :src="value" />
        <div class="image-preview-action">
          <i class="el-icon-delete" @click="rmImage" />
        </div>
      </div>
    </div>
    <el-upload
      :headers="headers"
      :data="params"
      :multiple="false"
      :show-file-list="false"
      :on-success="handleImageSuccess"
      :on-error="handleImageFail"
      class="image-uploader"
      drag
      :action="url"
    >
      <i class="el-icon-upload" />
      <div class="el-upload__text">
        将文件拖到此处，或
        <em>点击上传</em>
      </div>
    </el-upload>
  </div>
</template>
<script lang="ts" src="./component.ts" />
<style lang="scss" src="./component.scss" />
