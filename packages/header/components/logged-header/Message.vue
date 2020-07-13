<template>
  <div ref="message" class="message">
    <button class="message-button" size="mini" type="text">
      <i class="el-icon-chat-dot-round"></i>
      <span v-show="unreadMsgNum > 0" class="message-button__num">{{
        unreadMsgNum
      }}</span>
    </button>
    <transition name="rq-zoom-in-top">
      <div v-show="active" class="message-container">
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
              v-model="messageSettingDropdown"
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
        <message-list
          v-for="(msg, index) in message"
          v-show="curType === msg.type"
          :key="index"
          :message="msg.data"
          @getMessage="
            getMessage({ ...$event, unread: msg.unread, offset: msg.offset })
          "
          @deleteMessage="deleteMessage({ ...$event, unread: msg.unread })"
          @updateMessage="updateMessage({ ...$event, unread: msg.unread })"
        >
        </message-list>
      </div>
    </transition>
  </div>
</template>
<script>
import ElPopover from "element-ui/lib/popover";
import Message from "element-ui/lib/message";

import MessageList from "./message/MessageList.vue";
import { message as messageApi } from "../../api";

export default {
  name: "Message",
  components: { MessageList, ElPopover },
  props: {
    active: { type: Boolean, default: false },
  },
  data() {
    return {
      messageTypes: [
        { label: "未读消息", value: "unread" },
        { label: "已读消息", value: "read" },
      ],
      messageSettings: [
        { label: "全部已读", value: "updateAllMessage" },
        { label: "删除已读", value: "deleteAllMessage" },
      ],
      curType: "unread",
      unreadMsgNum: 0,

      limit: 10,
      fetchInterval: null,
      message: {
        read: {
          type: "read",
          data: [],
          unread: false,
          set: new Set(),
          offset: 0,
        },
        unread: {
          type: "unread",
          data: [],
          set: new Set(),
          unread: true,
          offset: 0,
        },
      },
      messageSettingDropdown: false,
    };
  },

  mounted() {
    Object.values(this.message).forEach((item) => {
      this.getMessage({ unread: item.unread, updateToView: true });
    });
    this.fetchInterval = setInterval(() => {
      Object.values(this.message).forEach((item) => {
        // 已读消息在未显示时不更新

        if (!this.active && !item.unread) return;
        this.getMessage({
          unread: item.unread,
          offset: 0,
          limit: this.active ? Math.max(this.limit, item.data.length) : 1,
        });
      });
    }, 60 * 1000);
  },
  beforeDestroy() {
    this.fetchInterval && clearInterval(this.fetchInterval);
  },

  methods: {
    async updateMessage({ msg, unread, index }) {
      // 只更新未读
      if (!unread) return;
      try {
        await messageApi.updateMessage(msg.id);
        this.message.unread.data.splice(index, 1);
        this.unreadMsgNum -= 1;
        this.message.read.data.unshift(msg);
      } catch (err) {
        Message.error(err.message);
      }
    },
    async deleteMessage({ unread, msg, index }) {
      try {
        await messageApi.deleteMessage(msg.id);
        const messageProp = unread ? "unread" : "read";
        this.message[messageProp].data.splice(index, 1);
        if (unread) {
          this.unreadMsgNum -= 1;
        }
      } catch (err) {
        Message.error(err.message);
      }
    },
    async deleteAllMessage() {
      // 删除已读
      try {
        await messageApi.deleteAllMessage(false);
        this.message.read.data = [];
      } catch (err) {
        Message.error(err.message);
      }
    },
    async updateAllMessage() {
      try {
        await messageApi.updateAllMessage();
        this.message.read.data.unshift(...this.message.unread.data);
        this.unreadMsgNum = 0;
        this.message.unread.data = [];
      } catch (err) {
        Message.error(err.message);
      }
    },
    async getMessage(
      { offset, limit = this.limit, unread = false, updateToView = false },
      getLackingMsg = false
    ) {
      const messageProp = unread ? "unread" : "read";
      const res = await messageApi.getMessages({
        unread,
        limit,
        offset,
      });
      if (!res.data) return;
      if (this.active || updateToView) {
        const message = [];

        if (offset === 0) {
          this.message[messageProp].set.clear();
        }
        res.data.forEach((item) => {
          if (!this.message[messageProp].set.has(item.id)) {
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
          this.message[messageProp].offset = 0;
        } else {
          this.message[messageProp].data.push(...message);
        }
        this.message[messageProp].offset += res.data.length;
        if (!getLackingMsg) {
          const lacking = res.data.length - message.length;
          if (lacking > 0) {
            await this.getMessage(
              {
                offset: this.message[messageProp].offset,
                limit: lacking,
                unread,
              },
              true
            );
            return;
          }
        }
      }
      if (unread) {
        this.unreadMsgNum = res.total;
      }
    },
    setMessage(val) {
      this.messageSettingDropdown = false;
      this[val]();
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../../../common/style/mixins";
.message {
  padding: 0;
  height: 100%;
  position: relative;
  margin: auto;
  color: rqthemify(--text-primary);
  .el-icon-chat-dot-round {
    font-size: 18px;
  }
  &:hover {
    .el-icon-chat-dot-round {
      color: rqthemify(--primary-color);
    }
  }

  &-button {
    padding: 4px 15px;
    height: 100%;
    display: flex;
    align-items: center;
    color: rqthemify(--text-primary);
    background-color: transparent;
    border: none;
    position: relative;

    &__num {
      position: absolute;
      color: white;
      background-color: rqthemify(--remove-hover-color);
      right: 10px;
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
    color: rqthemify(--text-normal);
    height: 53px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rqthemify(--border-primary);

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
        background: rqthemify(--text-normal);
      }
      &:first-child {
        margin-left: 0;
      }
      &.is-active {
        color: rqthemify(--primary-color);
        font-weight: 600;
      }
      &:hover,
      &:focus,
      &:active {
        color: rqthemify(--primary-color);
        font-weight: 600;
      }
    }
    &-right {
      position: relative;
    }
  }

  &-container {
    position: absolute;
    background: rqthemify(--dropdown-background);
    width: 438px;
    right: 0;
    box-shadow: 0px 8px 12px 0px rqthemify(--shadow-primary);
  }

  &-setting {
    &__dropdown {
      box-shadow: 0px 0px 20px 0px rqthemify(--shadow-primary);
    }
    &__icon {
      font-size: 18px;
      cursor: pointer;
      &:focus,
      &:active {
        color: rqthemify(--primary-color);
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
      color: rqthemify(--text-normal);
      outline: none;
      background-color: transparent;
      &:hover,
      &:active,
      &:focus {
        color: rqthemify(--primary-color);
        background-color: rqthemify(--background-primary);
      }
    }
  }
  ::v-deep {
    .message-setting-popper {
      min-width: 0;
      padding: 0;
      border-color: rqthemify(--border-primary);
      background-color: rqthemify(--dropdown-background);
      .popper__arrow {
        border-bottom-color: rqthemify(--border-primary);
        &:after {
          border-bottom-color: rqthemify(--dropdown-background);
        }
      }
    }
  }
}
</style>
