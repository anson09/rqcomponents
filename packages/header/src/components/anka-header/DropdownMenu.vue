<template>
  <div class="menu__links">
    <div
      v-for="(link, linkIdx) in links"
      :key="linkIdx"
      :class="['menu__links-item', { product: link.icon }, link.icon]"
      @click="clickHandle(link)"
    >
      <i :class="'rq-icons rq-icon-' + link.icon"></i>
      <a>
        {{ link.label }}
      </a>
    </div>
    <div class="menu-support">
      <div class="menu-support__links">
        <p
          class="menu-support__links--item"
          v-for="(cfg, idx) in support.info"
          :key="idx"
          @click="copy(cfg)"
        >
          {{ cfg.label }}: {{ cfg.value }}
        </p>
        <p class="contact">
          <span
            v-for="(contact, contactIdx) in support.contact"
            :key="contactIdx"
          >
            <i
              v-if="!contact.qrcode"
              :class="'rq-icons rq-icon-' + contact.icon"
              @click="clickHandle(contact)"
            ></i>
            <el-popover v-else placement="bottom" width="auto" trigger="hover">
              <img :src="qrcodeImg" />
              <i slot="reference" :class="'rq-icons rq-icon-' + contact.icon"></i>
            </el-popover>
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import elPopover from "element-ui/lib/popover";
import Message from 'element-ui/lib/message';
import qrcodeImg from "../../../assets/img/qrcodeImg.jpg";

export default {
  name: "DropdownMenu",
  components: {
    elPopover
  },
  props: {
    links: {
      default: () => [],
      type: Array
    },
    support: {
      required: true,
      type: Object
    }
  },
  data() {
    return {
      qrcodeImg
    };
  },
  watch: {},
  mounted() {},
  methods: {
    clickHandle({ link }) {
      if (link) {
        this.$emit("redirect", link);
      }
      this.$emit("close");
    },
    copy(cfg) {
      const textArea = document.createElement("textarea");
      textArea.value = cfg.value;

      textArea.style.top = "0";
      textArea.style.left = "0";
      textArea.style.position = "fixed";

      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      try {
        document.execCommand("copy");
	Message.success(`已成功复制到剪切板`);
      } catch (err) {
	Message.success(`复制失败`);
      }

      document.body.removeChild(textArea);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../../common/style/common";

.menu {
  &__links {
    @include text(rqthemify(text));
    margin-top: 10px;
    &-item {
      padding: 10px 20px;
      vertical-align: middle;
      @include hover;
      .rq-icons {
        font-size: 20px;
        margin-right: 8px;
      }
      &:hover {
        color: rqthemify(highlight);
        font-weight: bold;
        background: #ecf0f4;
      }
      $products: rqams, rqdata, rqpro, rqoptimizer;
      @each $product in $products {
        &.product.#{$product} {
          &:hover {
            color: rqthemify(#{$product});
            background: rqthemify(#{$product}-bg);
          }
        }
      }
    }
  }
  &-support {
    @include mini-text(#a3a3a3ff);
    &__links {
      padding: 20px 0 10px;
      margin: 22px 20px 0;
      border-top: 1px solid rqthemify(border-disabled);
      &--item {
        & + & {
          margin-top: 6px;
        }
        @include hover;
      }
    }
    .contact {
      margin-top: 6px;

      i {
        margin-right: 12px;
        font-size: 16px;
        cursor: pointer;
        @include hover;
      }
    }
  }
}
</style>
<style lang="scss">
.nav-menu.el-popper {
  padding: 0;
  border-radius: 0 12px 12px 12px;
  border-width: 0;
  min-width: 300px;
  box-shadow: 0px 16px 20px 0 rgba(0, 0, 0, 0.15);
  background: white;
  &.fade-in-linear-leave-active.fade-in-linear-leave-to {
    opacity: 0;
    transition: all 0s;
  }
  &.el-popper[x-placement^="bottom"] {
    margin-top: 0;
  }
}
</style>
