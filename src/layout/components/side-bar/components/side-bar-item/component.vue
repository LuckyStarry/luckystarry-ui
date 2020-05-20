<template>
  <div
    class="side-bar-item"
    v-if="!item.meta || !item.meta.hidden"
    :class="[isCollapse ? 'simple-mode' : 'full-mode', {'first-level': isFirstLevel}]"
  >
    <template v-if="!alwaysShowRootMenu && theOnlyOneChild && !theOnlyOneChild.children">
      <side-bar-item-link v-if="theOnlyOneChild.meta" :to="resolvePath(theOnlyOneChild.path)">
        <el-menu-item
          :index="resolvePath(theOnlyOneChild.path)"
          :class="{'submenu-title-noDropdown': isFirstLevel}"
        >
          <svg-icon
            v-if="showChildrenIcon && theOnlyOneChild.meta.icon"
            :name="theOnlyOneChild.meta.icon"
          />
          <span
            v-if="(item.meta && item.meta.title) || theOnlyOneChild.meta.title"
            slot="title"
          >{{ $t('route.' + ((item.meta && item.meta.title) || theOnlyOneChild.meta.title)) }}</span>
        </el-menu-item>
      </side-bar-item-link>
    </template>
    <el-submenu v-else :index="resolvePath(item.path)" popper-append-to-body>
      <template slot="title">
        <svg-icon v-if="showChildrenIcon && item.meta && item.meta.icon" :name="item.meta.icon" />
        <span v-if="item.meta && item.meta.title" slot="title">{{ $t('route.' + item.meta.title) }}</span>
      </template>
      <template v-if="item.children">
        <side-bar-item
          v-for="child in item.children"
          :key="child.path"
          :item="child"
          :is-collapse="isCollapse"
          :is-first-level="false"
          :base-path="resolvePath(child.path)"
          class="nest-menu"
        />
      </template>
    </el-submenu>
  </div>
</template>
<script lang="ts" src="./component.ts" />
<style lang="scss" src="./component.scss" />