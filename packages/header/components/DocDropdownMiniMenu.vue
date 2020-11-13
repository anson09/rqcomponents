<template>
  <div class="rq-header-doc-container">
    <p class="rq-header-doc__title">{{ label }}</p>
    <div v-for="(item, index) in links" :key="index">
      <p
        class="rq-header-doc__label rq-header-doc__label--default"
        @click="handleClick(item, index)"
      >
        {{ item.label }}
        <i
          v-if="item.links"
          :class="[
            'icon-caret',
            item.linksVisible ? 'el-icon-caret-top' : 'el-icon-caret-bottom',
          ]"
        ></i>
      </p>

      <div
        v-show="item.linksVisible"
        v-if="item.links"
        class="rq-header-doc__more"
      >
        <div v-for="(subitem, subindex) in item.links" :key="subindex">
          <p
            :class="[
              'rq-header-doc__label rq-header-doc__label--medium ',
              { 'is-link': subitem.link },
            ]"
            @click="handleClick(subitem)"
          >
            {{ subitem.label }}
          </p>
          <div v-if="subitem.links" class="rq-header-doc__label--mini-wrapper">
            <p
              v-for="(leastitem, leastindex) in subitem.links"
              :key="leastindex"
              class="rq-header-doc__label rq-header-doc__label--mini is-link"
              @click="handleClick(leastitem)"
            >
              {{ leastitem.label }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { config } from "../../common/components/DocDropdownMenu.vue";

export default {
  name: "DocDropdownMiniMenu",
  data() {
    return {
      links: config,
      label: "支持",
    };
  },
  methods: {
    handleClick(item, index) {
      if (item.link) {
        window.open(item.link);
      } else if (item.links) {
        this.$set(this.links, index, {
          ...item,
          linksVisible: !item.linksVisible,
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../style/mixins.scss";
@include block(doc) {
  &__title {
    font-size: 12px;
    color: rqthemify(--text-important);
    padding-left: 26px;
  }
  &__label {
    position: relative;
    @include f-center(flex-start);
    font-size: 14px;
    padding: 6px 26px;
    line-height: 20px;
    color: rqthemify(--text-important);
    margin: 8px 0;
    .icon-caret {
      margin-left: 4px;
    }
    &.is-link {
      color: rqthemify(--text-normal);

      &:before {
        content: "";
        position: relative;
        width: 4px;
        height: 4px;
        border-radius: 50%;
        display: block;
        background-color: rqthemify(--text-important);
        margin-right: 8px;
        left: 0;
      }
      &:hover {
        &:before {
          background-color: rqthemify(--text-remind);
        }
      }
    }
    &--mini {
      padding: 5px 48px;
      margin: 0;
      &-wrapper {
        margin-top: -9px;
      }
    }
    &--default,
    &--mini,
    &--medium.is-link {
      cursor: pointer;
      &:hover {
        color: rqthemify(--text-remind);
        background-color: rqthemify(--background-secondary);
      }
      &:active {
        color: rqthemify(--light-primary-color);
        background: rqthemify(--light-primary-color-1);
      }
    }
  }
  &__more {
    padding: 6px 0;
    background-color: rqthemify(--background-primary);
  }
}
</style>
