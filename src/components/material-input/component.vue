<template>
  <div :class="computedClasses" class="material-input__component">
    <div :class="{ iconClass: icon }">
      <i v-if="icon" :class="['el-icon-' + icon]" class="el-input__icon material-input__icon" />
      <input
        v-if="type === 'email'"
        :id="id"
        v-model="valueCopy"
        type="email"
        class="material-input"
        :name="name"
        :placeholder="filledPlaceholder"
        :readonly="readonly"
        :disabled="disabled"
        :autocomplete="autoComplete"
        :required="required"
        @focus="handleFocus"
        @blur="handleBlur"
        @input="handleInput"
      />
      <input
        v-if="type === 'url'"
        :id="id"
        v-model="valueCopy"
        type="url"
        class="material-input"
        :name="name"
        :placeholder="filledPlaceholder"
        :readonly="readonly"
        :disabled="disabled"
        :autocomplete="autoComplete"
        :required="required"
        @focus="handleFocus"
        @blur="handleBlur"
        @input="handleInput"
      />
      <input
        v-if="type === 'number'"
        :id="id"
        v-model="valueCopy"
        type="number"
        class="material-input"
        :name="name"
        :placeholder="filledPlaceholder"
        :readonly="readonly"
        :disabled="disabled"
        :autocomplete="autoComplete"
        :max="max"
        :min="min"
        :step="step"
        :minlength="minlength"
        :maxlength="maxlength"
        :required="required"
        @focus="handleFocus"
        @blur="handleBlur"
        @input="handleInput"
      />
      <input
        v-if="type === 'password'"
        :id="id"
        v-model="valueCopy"
        type="password"
        class="material-input"
        :name="name"
        :placeholder="filledPlaceholder"
        :readonly="readonly"
        :disabled="disabled"
        :autocomplete="autoComplete"
        :max="max"
        :min="min"
        :step="step"
        :required="required"
        @focus="handleFocus"
        @blur="handleBlur"
        @input="handleInput"
      />
      <input
        v-if="type === 'tel'"
        :id="id"
        v-model="valueCopy"
        type="tel"
        class="material-input"
        :name="name"
        :placeholder="filledPlaceholder"
        :readonly="readonly"
        :disabled="disabled"
        :autocomplete="autoComplete"
        :required="required"
        @focus="handleFocus"
        @blur="handleBlur"
        @input="handleInput"
      />
      <input
        v-if="type === 'text'"
        :id="id"
        v-model="valueCopy"
        type="text"
        class="material-input"
        :name="name"
        :placeholder="filledPlaceholder"
        :readonly="readonly"
        :disabled="disabled"
        :autocomplete="autoComplete"
        :minlength="minlength"
        :maxlength="maxlength"
        :required="required"
        @focus="handleFocus"
        @blur="handleBlur"
        @input="handleInput"
      />
      <span class="material-input-bar" />
      <label class="material-label">
        <slot />
      </label>
    </div>
  </div>
</template>
<script lang="ts" src="./component.ts" />
<style lang="scss" src="./component.scss" />
