<template>
  <div id="tags-view-container" class="tags-view-container">
    <scroll-pane ref="scrollPane" class="tags-view-wrapper">
      <router-link
        v-for="tag in visitedViews"
        ref="tag"
        :key="tag.path"
        :class="isActive(tag) ? 'active' : ''"
        :to="{path: tag.path, query: tag.query, fullPath: tag.fullPath}"
        tag="span"
        class="tags-view-item"
        @click.middle.native="!isAffix(tag)?closeSelectedTag(tag):''"
        @contextmenu.prevent.native="openMenu(tag, $event)"
      >
        {{ $t('route.' + tag.meta.title) }}
        <span
          v-if="!isAffix(tag)"
          class="el-icon-close"
          @click.prevent.stop="closeSelectedTag(tag)"
        />
      </router-link>
    </scroll-pane>
    <ul v-show="visible" :style="{left: left+'px', top: top+'px'}" class="contextmenu">
      <li @click="refreshSelectedTag(selectedTag)">{{ $t('tagsView.refresh') }}</li>
      <li v-if="!isAffix(selectedTag)" @click="closeSelectedTag(selectedTag)">
        {{
        $t('tagsView.close') }}
      </li>
      <li @click="closeOthersTags">{{ $t('tagsView.closeOthers') }}</li>
      <li @click="closeAllTags(selectedTag)">{{ $t('tagsView.closeAll') }}</li>
    </ul>
  </div>
</template>
<script lang="ts" src="./component.ts" />
<style lang="scss" src="./component.scss"></style>