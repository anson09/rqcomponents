<template>
  <div class="rq-header-nav-wrapper">
    <div :class="['rq-header-nav', { 'is-opacity': opacity }]">
      <button class="rq-header-nav__burger" type="text">
        <span></span>
        <span></span>
        <span></span>
      </button>
      <div class="rq-header-nav__dropdown">
        <div class="rq-header-nav__item-wrapper">
          <div class="rq-header-nav__item">
            <ProductDropdownMiniMenu />
            <div class="rq-header-nav__more">
              <p
                v-for="item in links"
                :key="item.label"
                class="rq-header-dropdown__label"
                @click="handleLink(item.link)"
              >
                {{ item.label }}
              </p>
            </div>
          </div>
          <div class="rq-header-nav__item">
            <DocDropdownMiniMenu />
          </div>
        </div>
        <Support />
      </div>
    </div>
  </div>
</template>

<script>
import Support from "./Support.vue";
import DocDropdownMiniMenu from "./DocDropdownMiniMenu.vue";
import ProductDropdownMiniMenu from "./ProductDropdownMiniMenu.vue";
import mixin from "../../common/util/mixin";

export default {
  name: "MiniNav",
  components: {
    Support,
    DocDropdownMiniMenu,
    ProductDropdownMiniMenu,
  },
  mixins: [mixin],
  props: {
    opacity: {
      default: false,
      type: Boolean,
    },
  },
  data() {
    return {
      links: [
        { link: "/edu", label: "教育专区" },
        { link: "/pricing", label: "定价" },
      ],
    };
  },
  watch: {},

  mounted() {},

  methods: {},
};
</script>
<style lang="scss" scoped>
@import "../../common/style/mixins";

.rq-header-nav {
  $self: &;
  position: relative;
  @include f-center;
  height: 100%;
  &:before {
    content: "";
    margin-right: 10px;
    height: 40px;
    width: 1px;
    background: rqthemify(--text-normal);
  }
  &-wrapper {
    flex: 1;
    margin-left: 32px;
    height: 100%;
  }
  &__burger {
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
  &__item {
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
    #{$self}__more {
      margin-bottom: 16px;
      &-label {
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

  &__dropdown {
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
    left: 11px;
    transform: translateY(100%);
    text-align: left;
    box-shadow: 0px 20px 20px 0px rqthemify(--shadow-primary);
  }

  &.is-opacity {
    &:before {
      background: rqthemify(--text-normal);
    }
    #{$self}__burger {
      span {
        background: rqthemify(--text-normal);
      }
    }
  }
  &:hover {
    &:before {
      background: transparent;
    }
    #{$self} {
      &__burger {
        box-shadow: 0px 0px 20px 0px rqthemify(--shadow-secondary);
        background: rqthemify(--background-white);
        span {
          background: rqthemify(--primary-color);
        }
      }
      &__dropdown {
        display: flex;
      }
    }
  }
}

::v-deep {
  @include block(support) {
    width: 100%;
    padding-bottom: 0;
    &__contacts {
      margin: 0;
      line-height: 26px;
      padding: 10px 26px;
      @include f-center(flex-start);
      flex-wrap: wrap;
    }
    &__contact {
      margin: 0;
      margin-right: 26px;
    }
  }
}
</style>
