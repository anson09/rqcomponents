<template>
  <div
    ref="message"
    class="message"
    @mouseover="setMessageVisible(true)"
    @mouseleave="setMessageVisible(false)"
  >
    <button class="message-button" size="mini" type="text">
      <i class="el-icon-chat-dot-round"></i>
      <span v-show="unreadMsgNum > 0" class="message-button__num">{{
        unreadMsgNum
      }}</span>
    </button>
    <transition name="rq-zoom-in-top">
      <div v-show="messageVisible" class="message-container">
        <div class="message__header">
          <div class="message__header-left">
            <span
              v-for="type in messageTypes"
              :key="type.value"
              :class="[
                'message__header-item',
                { 'is-active': type.value === curType },
              ]"
              @click="curType = type.value"
              >{{ type.label }}</span
            >
          </div>
          <div class="message__header-right">
            <el-popover
              placement="top-end"
              trigger="click"
              :append-to-body="false"
              popper-class="message-setting-popper"
            >
              <div class="message-setting__dropdown">
                <button
                  v-for="setting in messageSettings"
                  :key="setting.value"
                  class="message-setting__item"
                  @click="setMessage(setting.value)"
                >
                  {{ setting.label }}
                </button>
              </div>
              <i
                slot="reference"
                class="el-icon-setting message-setting__icon"
              ></i>
            </el-popover>
          </div>
        </div>
        <messageList
          v-for="(msg, index) in message"
          v-show="curType === msg.type"
          :key="index"
          :message="msg.data"
          @getMessage="getMessage({ ...$event, read: msg.read })"
          @deleteMessage="deleteMessage({ ...$event, read: msg.read })"
          @updateMessage="updateMessage({ ...$event, read: msg.read })"
        >
        </messageList>
      </div>
    </transition>
  </div>
</template>
<script>
import elPopover from "element-ui/lib/popover";

import MessageList from "./message/MessageList.vue";
import { message as messageApi } from "../../../api";

export default {
  name: "Message",
  components: { MessageList, elPopover },
  data() {
    return {
      value: "light",
      messageTypes: [
        { label: "未读消息", value: "unread" },
        { label: "已读消息", value: "read" },
      ],
      messageSettings: [
        { label: "全部已读", value: "updateAllMessage" },
        { label: "全部删除", value: "deleteAllMessage" },
      ],
      curType: "unread",
      unreadMsgNum: 0,
      messageVisible: false,
      limit: 6,
      fetchInterval: null,
      message: {
        read: {
          type: "read",
          data: [],
          read: true,
          set: new Set(),
        },
        unread: {
          type: "unread",
          data: [],
          set: new Set(),
          read: false,
        },
      },
    };
  },

  mounted() {
    Object.values(this.message).forEach((item) => {
      this.getMessage({ read: item.read, updateToView: true });
    });
    this.fetchInterval = setInterval(() => {
      Object.values(this.message).forEach((item) => {
        // 已读消息在未显示时不更新
        if (!this.messageVisible && item.read) return;
        this.getMessage({
          read: item.read,
          offset: 0,
          limit: Math.max(this.limit, item.data.length),
        });
      });
    }, 60 * 1000);
  },
  beforeDestroy() {
    this.fetchInterval && clearInterval(this.fetchInterval);
  },

  methods: {
    setMessageVisible(visible) {
      this.messageVisible = visible;
    },
    async updateMessage({ msg, read, index }) {
      if (read) return;
      try {
        await messageApi.updateMessage(msg.id);
        this.message.unread.data.splice(index, 1);
        this.message.read.data.unshift(msg);
      } catch (err) {
        this.$message.error(err.message);
      }
    },
    async deleteMessage({ read, msg, index }) {
      try {
        await messageApi.deleteMessage(msg.id);
        const messageProp = read ? "read" : "unread";
        this.message[messageProp].data.splice(index, 1);
      } catch (err) {
        this.$message.error(err.message);
      }
    },
    async deleteAllMessage() {
      try {
        await messageApi.deleteAllMessage();
        this.message.unread.data = [];
        this.message.read.data = [];
      } catch (err) {
        this.$message.error(err.message);
      }
    },
    async updateAllMessage() {
      try {
        await messageApi.updateAllMessage();
        this.message.read.data.unshift(...this.message.unread.data);
        this.message.unread.data = [];
      } catch (err) {
        this.$message.error(err.message);
      }
    },
    async getMessage(
      { offset = 0, limit = this.limit, read = false, updateToView = false },
      getNewestMsg = false
    ) {
      const res = await messageApi.getMessages({
        read,
        limit,
        offset,
      });
      if (this.messageVisible || updateToView) {
        const messageProp = read ? "read" : "unread";
        const message = [];

        if (!getNewestMsg) {
          if (offset === 0) {
            this.message[messageProp].set.clear();
          }
          res.data.forEach((item) => {
            if (!(item.id in this.message[messageProp].set)) {
              message.push({ ...item });
              this.message[messageProp].set.add(item.id);
            }
          });

          // 更新到视图
          if (offset === 0) {
            this.message[messageProp].data.splice(
              0,
              this.message[messageProp].data.length,
              ...message
            );
          } else {
            this.message[messageProp].data.push(...message);
          }
          const lacking = offset + res.data.length - message.length;

          if (lacking > 0) {
            await this.getMessage({ offset: 0, limit: lacking, read }, true);
            return;
          }
        } else {
          res.data.forEach((item) => {
            if (!this.message[messageProp].set.has(item.id)) {
              message.push(item);
              this.message[messageProp].set.add(item.id);
            }
          });
          this.message[messageProp].data.unshift(...message);
        }
      }
      if (!read) {
        this.unreadMsgNum = res.total;
      }
    },
    setMessage(val) {
      this[val]();
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../../../../common/style/common";
.message {
  padding: 0;
  height: 100%;
  position: relative;
  margin: auto;
  color: rqthemify(text);

  &-button {
    padding: 4px 10px;
    width: 38px;
    height: 100%;
    display: flex;
    align-items: center;
    color: rqthemify(text);
    background-color: inherit;
    border: none;
    position: relative;

    .el-icon-chat-dot-round {
      font-size: 18px;
    }
    &__num {
      position: absolute;
      color: white;
      background-color: #ed4a4a;
      right: 0;
      top: 4px;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      line-height: 18px;
      font-size: 12px;
    }
  }
  &__header {
    padding: 0 20px;
    font-size: 12px;
    line-height: 1.5;
    color: rqthemify(text);
    height: 53px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rqthemify(border-gray);

    &-item {
      margin: 0 12px;
      cursor: pointer;
      position: relative;
      &:not(:last-child):after {
        position: absolute;
        width: 1px;
        right: -12px;
        top: 50%;
        transform: translateY(-50%);
        height: 11px;
        content: "";
        display: block;
        background: rqthemify(text);
      }
      &:first-child {
        margin-left: 0;
      }
      &.is-active {
        color: rqthemify(highlight);
        font-weight: 600;
      }
      &:hover,
      &:focus,
      &:active {
        color: rqthemify(highlight);
        font-weight: 600;
      }
    }
    &-right {
      position: relative;
    }
  }

  &-container {
    position: absolute;
    background: white;
    border-radius: 8px 0 8px 8px;
    width: 438px;
    right: 0;
    box-shadow: 0px 8px 12px 0px rgba(152, 165, 185, 0.2);
  }

  &-setting {
    &__dropdown {
      background-color: white;
      box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.15);
    }
    &__icon {
      font-size: 18px;
      cursor: pointer;
      &:focus,
      &:active {
        color: rqthemify(highlight);
      }
    }
    &__item {
      display: block;
      cursor: pointer;
      padding: 0px;
      font-size: 14px;
      width: 76px;
      line-height: 46px;
      border: none;
      color: rqthemify(text);
      &:hover,
      &:active,
      &:focus {
        color: rqthemify(highlight);
        background-color: rqthemify(bg-hover);
      }
    }
  }
  ::v-deep {
    .message-setting-popper {
      min-width: 0;
      padding: 0;
    }
  }
}
</style>
