<template>
  <div class="list-container">
    <div ref="list" class="list">
      <div v-for="(msg, index) in message" :key="msg.id" class="item-wrapper">
        <i
          class="el-icon-remove-outline"
          @click.stop="$emit('delete-message', { msg, index })"
        ></i>
        <a
          class="item"
          rel="noopener"
          target="_blank"
          @click="handleClick(msg, index)"
        >
          <p class="title">
            <img :src="msg.from.avatar" alt="" class="avatar title__item" />
            <span class="name title__item">{{ msg.from.name }}</span>
            <span class="time title__item">{{
              msg.datetime | dateFormat
            }}</span>
          </p>
          <p class="content">
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
        bond: "/bond",
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
.list {
  min-height: 100px;
  max-height: 522px;
  height: fit-content;
  overflow-y: auto;
  overflow-x: hidden;
  &-container {
    padding-right: 4px;
  }
  .item {
    border-bottom: 1px solid rqthemify(--border-primary);
    padding: 14px 0;
    display: flex;
    color: inherit;
    justify-content: center;
    flex-direction: column;
    text-align: left;
    text-decoration: none;
    &-wrapper {
      display: block;

      cursor: pointer;
      padding: 0 20px;
      position: relative;
      .el-icon-remove-outline {
        z-index: 9;
        position: absolute;
        right: 20px;
        display: none;
        top: 50%;
        transform: translateY(-50%);
        font-size: 18px;
        color: rqthemify(--text-secondary);
        &:hover {
          color: rqthemify(--remove-hover-color);
        }
        &:active,
        &:focus {
          color: rqthemify(--remove-active-color);
        }
      }
      &:hover {
        background-color: rqthemify(--background-white-hover);
        .el-icon-remove-outline {
          display: inline-block;
        }
      }
    }
    .title {
      line-height: 20px;
      font-size: 12px;
      margin-bottom: 8px;
      &__item {
        margin-right: 10px;
        vertical-align: middle;
      }
    }
    .avatar {
      width: 20px;
      height: 20px;
    }
    .content {
      color: rqthemify(--text-normal);
      font-size: 14px;
      letter-spacing: 0.4px;
      line-height: 22px;
      width: 360px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>
