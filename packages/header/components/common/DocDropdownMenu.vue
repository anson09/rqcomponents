<template>
  <div class="doc-menu">
    <div v-for="(item, index) in config" :key="index" class="doc-menu-item">
      <p class="doc-menu-item__label" @click="handleLink(item.link)">
        {{ item.label }} <i v-if="item.links" class="el-icon-arrow-right"></i>
      </p>

      <div v-if="item.links" class="doc-menu-item-popover">
        <div
          v-for="(subitem, subindex) in item.links"
          :key="subindex"
          class="doc-menu-subitem"
        >
          <p
            :class="['doc-menu-subitem__label', { 'not-link': !subitem.link }]"
            @click="handleLink(subitem.link)"
          >
            {{ subitem.label }}
          </p>
          <template v-if="subitem.links">
            <p
              v-for="(leastItem, leastIndex) in subitem.links"
              :key="leastIndex"
              class="doc-menu-least-item__label"
              @click="handleLink(leastItem.link)"
            >
              {{ leastItem.label }}
            </p>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import mixin from "../../../common/util/mixin";

export default {
  name: "DocDropdownMenu",
  mixins: [mixin],
  props: {
    config: { type: Array, required: true },
  },
  data() {
    return {};
  },
};
</script>
<style lang="scss" scoped>
@mixin container {
  background-color: rqthemify(--dropdown-background);
  // TODO
  box-shadow: 0px 0px 8px rqthemify(--shadow-primary);
  border-radius: 4px;
}

.doc-menu {
  @include container;
  padding: 14px 0;
  width: 208px;
  p {
    margin: 0;
  }
  &-item {
    position: relative;
    cursor: pointer;
    display: flex;
    &-popover {
      position: absolute;
      right: 0;
      transform: translateX(100%);
      top: 0;
      width: 240px;
      @include container;
      padding: 8px 0;
      display: none;
    }
    &:hover &-popover {
      display: block;
    }

    &__label {
      padding-left: 15px;
      position: relative;

      .el-icon-arrow-right {
        position: absolute;
        right: 12px;
        top: 50%;
        transform: translateY(-50%);
        color: inherit;
      }
    }
  }

  &-subitem,
  &-item {
    &__label {
      font-size: 14px;
      font-weight: 600;
      line-height: 36px;
      padding-left: 15px;
      width: 100%;
      box-sizing: border-box;
    }
  }

  &-least-item {
    &__label {
      font-size: 12px;
      line-height: 30px;
      padding-left: 24px;
    }
  }

  &-subitem,
  &-item,
  &-least-item {
    &__label {
      // TODO
      color: rqthemify(--text-normal);
      &:hover {
        // TODO
        color: rqthemify(--text-hover);
        background-color: rqthemify(--background-primary);
      }
      &.not-link {
        cursor: initial;
      }
    }
  }

  &-subitem {
    padding: 6px 0;
  }
  &-subitem + &-subitem {
    border-top: 1px solid rqthemify(--border-primary);
  }
}
</style>
