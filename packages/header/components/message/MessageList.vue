<template>
  <div class="rq-header-msgs-wrapper">
    <div ref="list" class="rq-header-msgs">
      <div v-for="(msg, index) in message" :key="msg.id" class="rq-header-msg">
        <i
          class="icon-base icon-base-remove-outline"
          @click.stop="$emit('delete-message', { msg, index })"
        ></i>
        <a
          class="rq-header-msg__link"
          rel="noopener"
          target="_blank"
          @click="handleClick(msg, index)"
        >
          <p class="rq-header-msg__title">
            <img :src="msg.from.avatar" alt="" class="rq-header-msg__avatar" />
            <span class="rq-header-msg__name">{{ msg.from.name }}</span>
            <span class="rq-header-msg__time">{{
              msg.datetime | dateFormat
            }}</span>
          </p>
          <p class="rq-header-msg__text">
            {{ msg.content }}
          </p>
        </a>
      </div>
    </div>
  </div>
</template>
<script>
import debounce from "lodash/debounce";

export default {
  name: "MessageList",
  filters: {
    dateFormat(val) {
      function formatNumber(number) {
        return number < 10 ? `0${number}` : number;
      }
      const date = new Date(val * 1000);
      return `${date.getFullYear()}.${formatNumber(
        date.getMonth() + 1
      )}.${formatNumber(date.getDate())} ${formatNumber(
        date.getHours()
      )}:${formatNumber(date.getMinutes())}:${formatNumber(date.getSeconds())}`;
    },
  },
  props: {
    message: { type: Array, default: () => [] },
  },
  data() {
    return {};
  },

  mounted() {
    const scrollBody = this.$refs.list;
    scrollBody.addEventListener("scroll", this.handleScroll);
  },
  beforeDestroy() {
    const scrollBody = this.$refs.list;
    scrollBody.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleClick(msg, index) {
      const linkDict = {
        quant: "/quant",
        ams: "/ams",
        fof: "/fof",
      };
      let fullpath = "";
      // TODO 旧的因子消息 type 为 factor 且 没有 action 字段
      if (msg.type === "factor") {
        fullpath = "/quant/factor";
      } else {
        fullpath = `${linkDict[msg.system]}?action=${encodeURIComponent(
          JSON.stringify(msg.action)
        )}`;
      }
      window.open(fullpath);
      this.$emit("update-message", { msg, index });
    },

    handleScroll: debounce(function (event) {
      const { target } = event;
      if (target.scrollTop + target.offsetHeight >= target.scrollHeight - 20) {
        this.$emit("get-message");
      }
    }, 300),
  },
};
</script>
<style lang="scss" scoped>
@import "../../style/mixins.scss";
@include block(msgs) {
  min-height: 100px;
  max-height: 522px;
  height: fit-content;
  overflow-y: auto;
  overflow-x: hidden;

  &-wrapper {
    padding-right: 4px;
  }
}
@include block(msg) {
  display: block;
  cursor: pointer;
  padding: 0 20px;
  position: relative;
  .icon-base-remove-outline {
    z-index: 9;
    position: absolute;
    right: 20px;
    display: none;
    @include t-center-vertical;
    font-size: 16px;
    color: var(--text-secondary);
    &:hover {
      color: var(--error-color);
    }
    &:active,
    &:focus {
      color: var(--error-color-6);
    }
  }
  &:hover {
    background-color: var(--bg-secondary);
    .icon-base-remove-outline {
      display: inline-block;
    }
  }
  &__link {
    border-bottom: 1px solid var(--border-primary);
    padding: 14px 0;
    color: var(--text-title);
    @include f-column(flex-start);
    text-align: left;
    text-decoration: none;
  }

  &__text {
    color: var(--text-normal);
    font-size: 14px;
    letter-spacing: 0.4px;
    line-height: 22px;
    width: 360px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  &__title {
    line-height: 20px;
    font-size: 12px;
    margin-bottom: 8px;
    @include f-center(flex-start);
    span {
      margin-left: 10px;
    }
  }
  &__avatar {
    width: 20px;
    height: 20px;
  }
}
</style>
