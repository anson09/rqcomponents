<template>
  <div :class="['mini-menu']">
    <div :class="['mini-menu-wrapper', { light }]">
      <button class="mini-menu-burger" type="text">
        <span></span>
        <span></span>
        <span></span>
      </button>
      <div class="mini-menu-dropdown">
        <div class="mini-menu-item-wrapper">
          <div
            v-for="(item, index) in list"
            :key="index"
            class="mini-menu-item"
          >
            <component
              :is="item.componentMini"
              v-if="item.componentMini"
              :config="item"
            >
            </component>
            <div v-if="index === 0" class="mini-menu-item-more">
              <p
                v-for="link in links"
                :key="link.label"
                class="mini-menu-item-more__label"
                @click="handleLink(link.link)"
              >
                {{ link.label }}
              </p>
            </div>
          </div>
        </div>

        <Support :cfg="support"></Support>
      </div>
    </div>
  </div>
</template>

<script>
import Support from "../common/Support.vue";
import DocDropdownMiniMenu from "../common/DocDropdownMiniMenu.vue";
import ProductDropdownMiniMenu from "../common/ProductDropdownMiniMenu.vue";

export default {
  name: "MiniMenu",
  components: {
    Support,
    DocDropdownMiniMenu,
    ProductDropdownMiniMenu,
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
  watch: {},

  mounted() {},
  methods: {},
};
</script>
<style lang="scss" scoped>
@import "../../../common/style/mixins";

.mini-menu {
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
  &-item {
    &-wrapper {
      display: flex;
      width: 100%;
      border-bottom: 1px solid rqthemify(--border-primary);
    }
    flex: 1;
    padding-top: 26px;
    border-right: 1px solid rqthemify(--border-primary);
    &:last-child {
      border-right: none;
    }
    &-more {
      margin-bottom: 16px;

      &__label {
        font-size: 14px;
        line-height: 32px;
        margin: 0;
        margin-bottom: 8px;
        color: rqthemify(--text-important);
        padding-left: 26px;
        cursor: pointer;
        &:hover {
          color: rqthemify(--text-remind);
          background-color: rqthemify(--background-secondary);
        }
        &:active {
          color: rqthemify(--primary-color);
          background: rqthemify(--primary-color-1);
        }
      }
    }
  }

  &-dropdown {
    background-color: rqthemify(--white);
    min-width: 500px;
    border: 1px solid rqthemify(--border-primary);
    display: none;
    flex-direction: column;
    position: absolute;
    padding: 0;
    border-width: 0;
    max-width: 500px;
    border-radius: 0;
    bottom: 0;
    left: 0;
    transform: translateY(100%);
    text-align: left;
    box-shadow: 0px 20px 20px 0px rqthemify(--shadow-primary);
  }

  &-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    height: 100%;
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
      .mini-menu-burger {
        span {
          background: rqthemify(--text-normal);
        }
      }
    }
    &:hover {
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
        &-dropdown {
          display: flex;
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
