<template>
  <div class="products">
    <div
      v-for="(item, index) in products"
      :key="index"
      :class="['product__item-wrapper', { 'is-active': item.active }]"
      @click="handleLink(item.link)"
    >
      <div :class="['product__item', { 'is-active': item.active }]">
        {{ item.label }}
      </div>

      <div v-if="item.links" class="product__subitem-wrapper">
        <div
          v-for="(subitem, subindex) in item.links"
          :key="subindex"
          class="product__subitem"
          @click.stop="handleLinkSubitem(item, subitem)"
        >
          <svg aria-hidden="true" class="icon-base-colorful">
            <use :xlink:href="`#icon-base-colorful-${subitem.icon}`"></use>
          </svg>
          {{ subitem.label }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import mixin from "../../../common/util/mixin";

export default {
  name: "Products",
  mixins: [mixin],
  props: {
    config: { type: Array, required: true },
  },
  data() {
    return {};
  },
  computed: {
    products() {
      return this.config.map((item) => ({
        ...item,
        active: item.link.href.includes(this.getFirstPath()),
      }));
    },
  },
  methods: {
    handleLinkSubitem(item, subitem) {
      if (item.active) {
        this.$router.push(subitem.link);
      } else {
        this.handleLink({
          href: `${item.link.href}${subitem.link}`.replace("//", "/"),
          outer: true,
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.product {
  &s {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__subitem {
    cursor: pointer;
    display: flex;
    height: 100%;
    align-items: center;
    position: relative;
    padding: 0px 9px;
    margin: 0 6px;
    color: rqthemify(--text-normal);
    .icon-base-colorful {
      filter: grayscale(80%);
      opacity: 0.6;
      margin-right: 4px;
    }
    &:after {
      content: "";
      display: block;
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 100%;
      height: 2px;
      border-radius: 1px;
      background-color: rqthemify(--primary-color);
      opacity: 0;
    }

    &:hover,
    &:active {
      color: rqthemify(--text-hover);
      .icon-base-colorful {
        filter: none;
        opacity: 1;
      }
      &:after {
        opacity: 1;
      }
    }
  }
  &__subitem-wrapper {
    box-shadow: inset 0px 2px 4px -2px hsla(216, 76%, 44%, 0.1);
    position: fixed;
    top: 40px;
    left: 0;
    width: 100vw;
    background: rqthemify(--background-final);
    display: none;
    align-items: center;
    justify-content: center;
    height: 44px;
    font-size: 14px;
  }
  &__item {
    font-size: 14px;
    line-height: 20px;
    padding: 4px 18px;
    margin: 0 2px;
    border-radius: 4px;
    cursor: pointer;
    &-wrapper {
      height: 100%;
      display: flex;
      align-items: center;
      &:hover,
      &:active {
        .product__subitem-wrapper {
          display: flex;
        }
      }
    }
    &:hover,
    &.is-active {
      background-color: rqthemify(--primary-color);
      color: rqthemify(--white);
    }
    &:active {
      color: rqthemify(--text-hover);
      background-color: rqthemify(--primary-color-1);
    }
  }
}
</style>
