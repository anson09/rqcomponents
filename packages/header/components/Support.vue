<template>
  <div class="rq-header-support">
    <div class="rq-header-support__contacts">
      <p
        v-for="(item, idx) in info"
        :key="idx"
        :class="[
          'rq-header-support__contact',
          { 'is-disabled': item.disabled },
        ]"
        @click="copy(item)"
      >
        {{ item.label }}: {{ item.value }}
        <i v-if="!item.disabled" class="icon-base icon-base-copy-document"></i>
      </p>
      <p class="rq-header-support__links">
        <span
          v-for="(item, index) in contact"
          :key="index"
          class="rq-header-support__link"
        >
          <i
            :class="'icon-base icon-base-' + item.icon"
            @click="handleLink(item.link)"
          ></i>
          <img
            v-if="item.qrcode"
            class="rq-header-support__link-img"
            :src="qrcode"
          />
        </span>
      </p>
    </div>
  </div>
</template>
<script>
import Message from "element-ui/lib/message";
import qrcode from "../../common/assets/img/qrcode.jpg";
import "element-ui/lib/theme-chalk/message.css";
import { info, contact } from "../../common/assets/dict/config";
import mixin from "../../common/util/mixin";

export default {
  name: "Support",
  mixins: [mixin],
  data() {
    return { qrcode, info, contact };
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
@import "../../common/style/mixins";
@import "../style/mixins.scss";
@include block(support) {
  color: rqthemify(--text-secondary);
  font-size: 12px;
  font-weight: 300;
  line-height: 1.5;
  padding-bottom: 14px;
  &__contacts {
    margin: 14px 16px 0;
  }
  &__contact {
    margin: 10px 0;
    &:not(.is-disabled) {
      cursor: pointer;
      &:hover {
        color: rqthemify(--primary-color);
      }

      .icon-base-copy-document {
        margin-left: 6px;
        font-size: 10px;
      }
    }
  }
  &__links {
    height: 16px;
    line-height: 16px;
  }
  &__link {
    position: relative;
    & + & {
      margin-left: 8px;
    }
    &-img {
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
    &:hover &-img {
      display: block;
    }
    i {
      font-size: 16px;
      cursor: pointer;
      &:hover {
        color: rqthemify(--primary-color);
      }
    }
  }
}
</style>
