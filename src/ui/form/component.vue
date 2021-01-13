<template>
  <div class="luckystarry-form" v-loading="loading">
    <slot v-if="subject">
      <section class="form-container">
        <el-form ref="form-author" :model="subject" :rules="rules" label-width="100px" @submit.native.prevent>
          <sticky class-name="sub-navbar" :z-index="10">
            <el-button v-loading="loading" type="success" @click="() => $emit('save', { subject })">{{ $t('common.form.save') }}</el-button>
          </sticky>
          <aside>{{ stickyTips }}</aside>
        </el-form>
      </section>
    </slot>
    <slot name="empty-subject" v-else>
      <section>未找到数据</section>
    </slot>
  </div>
</template>
<script lang="ts" src="./component.ts" />
<style lang="scss" src="./component.scss" />
