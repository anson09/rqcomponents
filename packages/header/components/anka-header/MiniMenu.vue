<template>
  <el-popover
    v-model="active"
    :class="['mini-menu__wrapper', { active, light }]"
    placement="bottom-start"
    trigger="hover"
    popper-class="mini-menu"
    :visible-arrow="false"
  >
    <div class="mini-menu">
      <div class="mini-menu-list">
        <div
          v-for="(item, index) in list"
          :key="index"
          :class="['mini-menu-list-item', item.className]"
        >
          <p :class="['mini-menu-list-item__label', item.className]">
            {{ item.label }}
          </p>
          <p
            v-for="(link, linkIdx) in item.links"
            :key="linkIdx"
            :class="[
              'mini-menu-list-item__link',
              item.className,
              link.product,
              `level-${link.level}`,
              { 'is-leaf': link.isLeaf },
            ]"
            @click="redirect(link.link)"
          >
            {{ link.label }}
          </p>
          <template v-if="index === 0">
            <p
              v-for="link in links"
              :key="link.label"
              class="mini-menu-list-item__link level-0"
              @click="redirect(link.link)"
            >
              {{ link.label }}
            </p>
          </template>
        </div>
      </div>
      <Support :cfg="support" @redirect="redirect"></Support>
    </div>
    <button slot="reference" class="mini-menu-burger" type="text">
      <span></span>
      <span></span>
      <span></span>
    </button>
  </el-popover>
</template>

<script>
import ElPopover from "element-ui/lib/popover";
import Support from "../common/Support.vue";

export default {
  name: "MiniMenu",
  components: {
    ElPopover,
    Support,
  },
  props: {
    cfg: {
      required: true,
      type: Array,
    },

    support: {
      required: true,
      type: Object,
    },

    light: {
      default: false,
      type: Boolean,
    },
  },
  data() {
    return {
      active: false,
    };
  },
  computed: {
    list() {
      return this.cfg.filter((item) => item.links);
    },
    links() {
      return this.cfg.filter((item) => !item.links);
    },
  },

  mounted() {},
  methods: {
    redirect(link) {
      this.$emit("redirect", link);
      this.active = false;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../../../common/style/mixins";

.mini-menu {
  display: flex;
  flex-wrap: wrap;

  &-burger {
    @include f-column;
    width: 70px;
    height: 100%;
    border-radius: 0;
    transition: all 0.3s;
    &:active {
      transform: none;
    }
    span {
      display: block;
      width: 30px;
      height: 5px;
      background: rqthemify(--text-normal);
      border-radius: 6px;
      transition: all 0.3s;
      + span {
        margin-top: 4px;
      }
    }
  }
  &__wrapper {
    &:before {
      content: "";
      margin-right: 10px;
      height: 40px;
      width: 1px;
      background: rqthemify(--text-normal);
    }
    &.light {
      &:before {
        background: rqthemify(--text-normal);
      }
      .mini-menu {
        &-burger {
          span {
            background: rqthemify(--text-normal);
          }
        }
      }
    }
    &.active {
      &:before {
        background: transparent;
      }
      .mini-menu {
        &-burger {
          box-shadow: 0px 0px 20px 0px rqthemify(--shadow-secondary);
          background: rqthemify(--background-white);
          span {
            background: rqthemify(--primary-color);
          }
        }
      }
    }
  }
  & &-list {
    display: flex;
    width: 100%;
    &-item {
      padding: 26px 0;
      &:not(:first-child) {
        border-left: 1px solid rqthemify(--border-primary);
      }
      &:last-child {
        flex: 1;
      }
      &__label {
        margin: 0;
        padding-left: 26px;
        @include text(rqthemify(--text-normal), 12);
        &.docs {
          margin-bottom: 22px;
        }
      }
      &__link {
        @include text;
        padding: 4px 30px 4px 26px;
        margin: 2px 0 0;
        cursor: pointer;

        &:active {
          background-color: rqthemify(--background-secondary);
        }
        &.level-0 {
          color: rqthemify(--text-important);
          margin-top: 8px;
        }
        &:hover {
          color: rqthemify(--text-remind);
          background-color: rqthemify(--background-primary);
        }

        &.docs {
          position: relative;
          color: rqthemify(--text-important);

          &.is-leaf {
            padding-left: 36px;
            font-size: 12px;
            margin: 0 0 -2px;
            color: rqthemify(--text-secondary);
            font-weight: 400;
            &:before {
              position: absolute;
              content: "";
              width: 4px;
              height: 4px;
              border-radius: 50%;
              left: 26px;
              background-color: rqthemify(--text-secondary);
              @include t-center-vertical;
            }
          }
          &:hover {
            color: rqthemify(--text-remind);
          }
          &.is-leaf:hover:before {
            background-color: rqthemify(--text-remind);
          }

          &:not(.is-leaf) {
            margin-top: 12px;

            &:before {
              position: absolute;
              left: 26px;
              right: 26px;
              height: 1px;
              top: -6px;
              content: "";
              background-color: rqthemify(--background-secondary);
            }
          }
        }
        &.product {
          $products: quant, rqsdk, rqalphaplus, rqams, rqdata, rqfactor,
            rqoptimizer;
          @each $product in $products {
            &.#{$product} {
              &:hover {
                color: rqthemify(--#{$product}-product-color);
              }
              &:active {
                background: rqthemify(--#{$product}-product-color-1);
              }
            }
          }
        }
      }
    }
  }

  ::v-deep {
    .menu-support {
      width: 100%;
      &__links {
        margin: 0;
        padding: 16px 26px 8px;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        &--item {
          margin: 0;
          margin-right: 24px;
        }
      }
    }
  }
}
</style>
<style lang="scss">
.mini-menu.el-popover {
  padding: 0;
  border-width: 0;
  max-width: 500px;
  border-radius: 0;
  box-shadow: 0px 20px 20px 0px rqthemify(--shadow-primary);
  &.el-popper[x-placement^="bottom"] {
    margin-top: 0;
  }
}
</style>
