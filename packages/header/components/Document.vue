<template>
  <div v-clickoutside="handleClickOutside" class="rq-header-doc">
    <div
      :class="[
        'rq-header-doc__icon-wrapper',
        { 'is-icon-active': dropdownVisible },
      ]"
      @click="toggleDropdownVisible"
    >
      <i class="icon-base icon-base-help-border"></i>
      <i class="icon-base icon-base-help-fill active-icon"></i>
    </div>
    <div v-show="dropdownVisible" class="rq-header-dropdown">
      <div
        v-for="(item, index) in config"
        :key="index"
        class="rq-header-dropdown__item"
      >
        <p class="rq-header-dropdown__label" @click="handleLink(item.link)">
          {{ item.label }}
          <i v-if="item.links" class="icon-base icon-base-arrow-up"></i>
        </p>

        <div v-if="item.links" class="rq-header-dropdown__more">
          <div
            v-for="(subitem, subindex) in item.links"
            :key="subindex"
            class="rq-header-dropdown__more-item"
          >
            <p
              :class="[
                'rq-header-dropdown__label',
                { 'not-link': !subitem.link },
              ]"
              @click="handleLink(subitem.link)"
            >
              {{ subitem.label }}
            </p>
            <template v-if="subitem.links">
              <p
                v-for="(leastItem, leastIndex) in subitem.links"
                :key="leastIndex"
                class="rq-header-dropdown__label rq-header-dropdown__label--mini"
                @click="handleLink(leastItem.link)"
              >
                {{ leastItem.label }}
              </p>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import dropdownMixin from "./dropdown-mixin";
import { handleLink } from "../../common/util/index";

export default {
  name: "Document",
  mixins: [dropdownMixin],
  data() {
    return {
      config: [
        {
          label: "RQAMS文档",
          link: { path: "/doc/rqams/", newBlock: true },
        },

        {
          label: "量化平台文档",
          link: { path: "/doc/quant/", newBlock: true },
        },
        {
          label: "RQFUND文档",
          link: { path: "/doc/rqfund/", newBlock: true },
        },
        {
          label: "RQSDK使用文档",
          links: [
            {
              label: "Ricequant SDK快速上手",
              link: { path: "/doc/rqsdk/", newBlock: true },
            },
            {
              label: "RQData - 金融数据 API",
              links: [
                {
                  label: "Python API文档",
                  link: { path: "/doc/rqdata/python/", newBlock: true },
                },
                {
                  label: "Http API文档",
                  link: { path: "/doc/rqdata/http/", newBlock: true },
                },
              ],
            },
            {
              label: "RQAlpha Plus - 回测框架",
              links: [
                {
                  label: "使用教程",
                  link: {
                    path: "/doc/rqalpha-plus/tutorial.html",
                    newBlock: true,
                  },
                },
                {
                  label: "API使用手册",
                  link: { path: "/doc/rqalpha-plus/api/", newBlock: true },
                },
              ],
            },
            {
              label: "RQFactor - 因子投研工具",
              links: [
                {
                  label: "使用教程",
                  link: { path: "/doc/rqfactor/manual.html", newBlock: true },
                },
                {
                  label: "API使用手册",
                  link: { path: "/doc/rqfactor/api.html", newBlock: true },
                },
              ],
            },
            {
              label: "RQOptimizer - 股票组合优化器",
              links: [
                {
                  label: "使用教程",
                  link: { path: "/doc/rqoptimize/manual.html", newBlock: true },
                },
                {
                  label: "API使用手册",
                  link: { path: "/doc/rqoptimizer/api/", newBlock: true },
                },
              ],
            },
          ],
        },
        {
          label: "帮助中心",
          link: { path: "/doc/faq/", newBlock: true },
        },
      ],
    };
  },
  methods: {
    handleLink,
  },
};
</script>
<style lang="scss" scoped>
@import "./../style/mixins";
@include block(doc) {
  margin: 0 8px;
  color: var(--text-normal);
  display: flex;
  align-items: center;
  position: relative;
  height: 100%;
  width: 30px;

  &__icon-wrapper {
    @include icon-container("icon-base");

    height: 30px;
  }
}

@mixin container {
  background-color: var(--bg-primary);
  box-shadow: 0 0 8px var(--primary-color-2);
  border-radius: 4px;
  padding: 8px 0;
}

@include block(dropdown) {
  @include container;

  width: 196px;
  left: 0;
  position: absolute;
  bottom: -2px;
  transform: translateY(100%);

  &__item {
    position: relative;
    cursor: pointer;
    @include f-center;
  }

  &__more {
    position: absolute;
    top: 0;
    width: 240px;
    @include container;

    left: 0;
    transform: translateX(-100%);
    display: none;

    &-item {
      padding: 6px 0;

      & + & {
        border-top: 1px solid var(--border-primary);
      }
    }
  }

  &__item:hover &__more {
    display: block;
  }

  &__label {
    position: relative;
    font-size: 14px;
    font-weight: 600;
    line-height: 36px;
    padding-left: 15px;
    width: 100%;
    color: var(--text-normal);

    &:hover {
      color: var(--primary-color);
      background-color: var(--bg-secondary);
    }

    &.not-link {
      cursor: initial;
    }

    .icon-base-arrow-up {
      position: absolute;
      right: 12px;
      @include t-center-vertical;

      transform: translateY(-50%) rotate(90deg);
      color: inherit;
      font-size: 8px;
    }
  }

  &__label--mini {
    font-size: 12px;
    line-height: 30px;
    padding-left: 24px;
    font-weight: 400;
  }
}
</style>
