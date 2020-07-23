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
      <p class="contact">
        <span v-for="(contact, contactIdx) in cfg.contact" :key="contactIdx">
          <i
            v-if="!contact.qrcode"
            :class="'icon-base icon-base-' + contact.icon"
            @click="clickHandle(contact)"
          ></i>
          <el-popover v-else placement="bottom" width="auto" trigger="hover">
            <img :src="qrcode" />
            <i
              slot="reference"
              :class="'icon-base icon-base-' + contact.icon"
            ></i>
          </el-popover>
        </span>
      </p>
    </div>
  </div>
</template>
<script>
import ElPopover from "element-ui/lib/popover";
import Message from "element-ui/lib/message";
import qrcode from "../../../common/assets/img/qrcode.jpg";

export default {
  name: "Support",
  components: { ElPopover },
  props: {
    cfg: { type: Object, required: true },
  },
  data() {
    return { qrcode };
  },
  methods: {
    clickHandle({ link }) {
      if (link) {
        this.$emit("redirect", link);
      }
    },
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

      try {
        document.execCommand("copy");
        Message.success(`已成功复制到剪切板`);
      } catch (err) {
        Message.success(`复制失败`);
      }

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
    padding-top: 2px;
    margin: 14px 16px 0;
    border-top: 1px solid rqthemify(--border-primary);
    &--item:not(.is-disabled) {
      @include hover;
      .el-icon-copy-document {
        margin-left: 6px;
      }
    }
  }
  .contact {
    height: 16px;
    line-height: 16px;
    i {
      margin-right: 12px;
      font-size: 16px;
      cursor: pointer;
      @include hover;
    }
  }
}
</style>
