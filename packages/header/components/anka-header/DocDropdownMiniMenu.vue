<template>
  <div class="doc-mini-menu">
    <p class="doc-mini-menu__title">{{ label }}</p>
    <div v-for="(item, index) in links" :key="index" class="doc-mini-menu-item">
      <p class="doc-mini-menu-item__label" @click="handleClick(item, index)">
        {{ item.label }}
        <i
          v-if="item.links"
          :class="
            item.linksVisible ? 'el-icon-caret-top' : 'el-icon-caret-bottom'
          "
        ></i>
      </p>

      <div
        v-show="item.linksVisible"
        v-if="item.links"
        class="doc-mini-menu-subitem-wrapper"
      >
        <div
          v-for="(subitem, subindex) in item.links"
          :key="subindex"
          class="doc-mini-menu-subitem"
        >
          <p
            :class="[
              'doc-mini-menu-subitem__label',
              { 'is-link': subitem.link },
            ]"
            @click="handleClick(subitem)"
          >
            {{ subitem.label }}
          </p>
          <div v-if="subitem.links" class="doc-mini-menu-leastitem-wrapper">
            <p
              v-for="(leastitem, leastindex) in subitem.links"
              :key="leastindex"
              class="doc-mini-menu-leastitem__label is-link"
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
import mixin from "../../../common/util/mixin";
import { config } from "../common/DocDropdownMenu.vue";

export default {
  name: "DocDropdownMiniMenu",
  mixins: [mixin],
  data() {
    return {
      links: config,
      label: "支持",
    };
  },
  methods: {
    handleClick(item, index) {
      if (item.link) {
        this.handleLink(item.link);
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
.doc-mini-menu {
  &__title {
    font-size: 12px;
    color: rqthemify(--text-important);
    padding-left: 26px;
  }

  &-subitem {
    &-wrapper {
      padding: 6px 0;
      background-color: rqthemify(--background-primary);
    }
  }
  &-subitem,
  &-leastitem {
    &__label {
      position: relative;
      display: flex;
      align-items: center;
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
    }
  }

  &-item,
  &-subitem,
  &-leastitem {
    &__label {
      font-size: 14px;
      padding: 6px 26px;
      line-height: 20px;
      color: rqthemify(--text-important);
      margin: 8px 0;
    }
  }
  &-leastitem {
    &-wrapper {
      margin-top: -9px;
    }
    &__label {
      padding: 5px 48px;
      margin: 0;
    }
  }
  .is-link,
  &-item__label {
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
</style>
