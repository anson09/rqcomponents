<template>
  <div class="menu-support">
    <div class="menu-support__links">
      <p
        v-for="(item, idx) in cfg.info"
        :key="idx"
        :class="['menu-support__links--item', { 'is-disabled': item.disabled }]"
        @click="copy(item)"
      >
        {{ item.label }}: {{ item.value }}
        <i v-if="!item.disabled" class="el-icon-copy-document"></i>
      </p>
      <p class="menu-support-contact">
        <span
          v-for="(contact, contactIdx) in cfg.contact"
          :key="contactIdx"
          class="menu-support-contact-item"
        >
          <i
            :class="'icon-base icon-base-' + contact.icon"
            @click="handleLink(contact.link)"
          ></i>
          <img
            v-if="contact.qrcode"
            class="menu-support-contact-item__img"
            :src="qrcode"
          />
        </span>
      </p>
    </div>
  </div>
</template>
<script>
import Message from "element-ui/lib/message";
import qrcode from "../../../common/assets/img/qrcode.jpg";
import "element-ui/lib/theme-chalk/message.css";
import mixin from "../../../common/util/mixin";

export default {
  name: "Support",
  mixins: [mixin],
  props: {
    cfg: { type: Object, required: true },
  },
  data() {
    return { qrcode };
  },
  methods: {
    copy(cfg) {
      if (cfg.disabled) return;
      const textArea = document.createElement("textarea");
      textArea.value = cfg.value;

      textArea.style.top = "0";
      textArea.style.left = "0";
      textArea.style.position = "fixed";

      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      document.execCommand("copy");
      Message.success("已成功复制到剪切板");
      document.body.removeChild(textArea);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../../../common/style/mixins";

.menu-support {
  @include mini-text(rqthemify(--text-secondary));
  padding-bottom: 14px;
  &__links {
    margin: 14px 16px 0;
    &--item {
      margin: 10px 0;
      &:not(.is-disabled) {
        @include hover;
        .el-icon-copy-document {
          margin-left: 6px;
        }
      }
    }
  }
  &-contact {
    height: 16px;
    line-height: 16px;
    i {
      margin-right: 12px;
      font-size: 16px;
      cursor: pointer;
      @include hover;
    }
    &-item {
      &__img {
        padding: 12px;
        box-shadow: 0 2px 12px 0 rqthemify(--shadow-primary);
        position: absolute;
        display: none;
        z-index: 999;
        left: 20px;
        bottom: 50px;
        transform: translateX(-50%);
        border: 1px solid rqthemify(--border-primary);
        border-radius: 4px;
        background-color: rqthemify(--white);
      }
      &:hover &__img {
        display: block;
      }
    }
  }
}
</style>
