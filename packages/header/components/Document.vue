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

export default {
  name: "Document",
  mixins: [dropdownMixin],
  data() {
    return {
      config: [
        {
          label: "RQAMS文档",
          link: "/doc/rqams/",
        },

        {
          label: "量化平台文档",
          link: "/doc/quant/",
        },
        {
          label: "RQSDK使用文档",
          links: [
            {
              label: "Ricequant SDK快速上手",
              link: "/doc/rqsdk/",
            },
            {
              label: "RQData - 金融数据 API",
              links: [
                {
                  label: "Python API文档",
                  link: "/doc/rqdata/python/",
                },
                {
                  label: "Http API文档",
                  link: "/doc/rqdata/http/",
                },
              ],
            },
            {
              label: "RQAlpha Plus - 回测框架",
              links: [
                {
                  label: "使用教程",
                  link: "/doc/rqalpha-plus/tutorial.html",
                },
                {
                  label: "API使用手册",
                  link: "/doc/rqalpha-plus/api/",
                },
              ],
            },
            {
              label: "RQFactor - 因子投研工具",
              links: [
                {
                  label: "使用教程",
                  link: "/doc/rqfactor/manual.html",
                },
                {
                  label: "API使用手册",
                  link: "/doc/rqfactor/api.html",
                },
              ],
            },
            {
              label: "RQOptimizer - 股票组合优化器",
              links: [
                {
                  label: "使用教程",
                  link: "/doc/rqoptimize/manual.html",
                },
                {
                  label: "API使用手册",
                  link: "/doc/rqoptimizer/api/",
                },
              ],
            },
          ],
        },
        {
          label: "帮助中心",
          link: "/doc/faq/",
        },

        // {
        //   label: "RQFUND米筐公募基金文档",
        //   link: "/doc/quant/"
        // },
        // {
        //   label: "RQBOND米筐债券文档",
        //   link: "/doc/quant/"
        // },
      ],
    };
  },
  methods: {
    // TODO
    handleLink(link) {
      window.open(link);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./../style/mixins.scss";
@include block(doc) {
  margin: 0 8px;
  color: rqthemify(--text-normal);
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
  background-color: rqthemify(--background-final);
  box-shadow: 0px 0px 8px rqthemify(--shadow-dropdown);
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
        border-top: 1px solid rqthemify(--border-primary);
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
    color: rqthemify(--text-normal);
    &:hover {
      color: rqthemify(--text-hover);
      background-color: rqthemify(--background-primary);
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
