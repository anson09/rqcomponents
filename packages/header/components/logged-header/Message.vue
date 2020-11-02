<template>
  <div
    ref="message"
    v-clickoutside="handleClickOutside"
    :class="['message', { 'is-dropdown-active': dropdownVisible }]"
  >
    <div
      :class="['message-button', { 'is-icon-active': dropdownVisible }]"
      @click="toggleDropdownVisible"
    >
      <i
        class="icon-base icon-base-message-center-border icon-message-center"
      ></i>
      <i
        class="icon-base icon-base-message-center-fill icon-message-center active-icon"
      ></i>
      <span v-show="unreadMsgNum > 0" class="message-button__num">{{
        unreadMsgNum
      }}</span>
    </div>
    <transition name="rq-zoom-in-top">
      <div v-show="dropdownVisible" class="message-container">
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
          <div
            v-clickoutside="handleSettingClickOutside"
            class="message__header-right"
          >
            <i
              :class="[
                'icon-base icon-base-message-border message-setting__icon',
                { 'is-active': settingDropdownVisible },
              ]"
              @click="setSettingDropdownVisible(!settingDropdownVisible)"
            ></i>

            <div
              v-show="settingDropdownVisible"
              class="message-setting__dropdown"
            >
              <button
                v-for="setting in messageSettings"
                :key="setting.value"
                class="message-setting__item"
                @click="setMessage(setting.value)"
              >
                {{ setting.label }}
              </button>
            </div>
          </div>
        </div>
        <message-list
          v-for="(msg, index) in message"
          v-show="curType === msg.type"
          :key="index"
          :message="msg.data"
          @get-message="
            getMessage({ ...$event, unread: msg.unread, offset: msg.offset })
          "
          @delete-message="deleteMessage({ ...$event, unread: msg.unread })"
          @update-message="updateMessage({ ...$event, unread: msg.unread })"
        >
        </message-list>
      </div>
    </transition>
  </div>
</template>
<script>
import MessageList from "./message/MessageList.vue";
import { message as messageApi } from "../../api";
import dropdownMixin from "./dropdown-mixin";

export default {
  name: "Message",
  components: { MessageList },
  mixins: [dropdownMixin],
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
      settingDropdownVisible: false,
    };
  },

  mounted() {
    Object.values(this.message).forEach((item) => {
      this.getMessage({ unread: item.unread, updateToView: true });
    });
    this.fetchInterval = setInterval(() => {
      Object.values(this.message).forEach((item) => {
        // 已读消息在未显示时不更新

        if (!this.dropdownVisible && !item.unread) return;
        this.getMessage({
          unread: item.unread,
          offset: 0,
          limit: this.dropdownVisible
            ? Math.max(this.limit, item.data.length)
            : 1,
        });
      });
    }, 60 * 1000);
  },
  beforeDestroy() {
    this.fetchInterval && clearInterval(this.fetchInterval);
  },

  methods: {
    handleSettingClickOutside() {
      this.setSettingDropdownVisible(false);
    },
    setSettingDropdownVisible(visible) {
      this.settingDropdownVisible = visible;
    },
    async updateMessage({ msg, unread, index }) {
      // 只更新未读
      if (!unread) return;
      await messageApi.updateMessage(msg.id);
      this.message.unread.data.splice(index, 1);
      this.unreadMsgNum -= 1;
      this.message.read.data.unshift(msg);
    },
    async deleteMessage({ unread, msg, index }) {
      await messageApi.deleteMessage(msg.id);
      const messageProp = unread ? "unread" : "read";
      this.message[messageProp].data.splice(index, 1);
      if (unread) {
        this.unreadMsgNum -= 1;
      }
    },
    async deleteAllMessage() {
      // 删除已读
      await messageApi.deleteAllMessage(false);
      this.message.read.data = [];
    },
    async updateAllMessage() {
      await messageApi.updateAllMessage();
      this.message.read.data.unshift(...this.message.unread.data);
      this.unreadMsgNum = 0;
      this.message.unread.data = [];
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
      if (this.dropdownVisible || updateToView) {
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
      this.settingDropdownVisible = false;
      this[val]();
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../../../common/style/mixins";
.message {
  padding: 0;
  margin: 0 8px;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  color: rqthemify(--text-primary);
  .icon-base-message-center-fill {
    display: none;
  }

  &-button {
    position: relative;
    height: 30px;
    @include logged-icon-container("icon-message-center");

    &__num {
      color: rqthemify(--white);
      background-color: rqthemify(--primary-color);
      display: flex;
      margin-left: -8px;
      justify-content: center;
      align-items: center;
      width: 17px;
      height: 17px;
      border-radius: 50%;
      font-size: 12px;
      box-sizing: border-box;
      background-clip: content-box;
      border: 1px solid transparent;
    }
    &:hover &__num {
      border-color: rqthemify(--white);
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
    @include logged-dropdown;
    width: 438px;
  }

  &-setting {
    &__dropdown {
      position: absolute;
      z-index: 10;
      border: 1px solid rqthemify(--border-primary);
      background-color: rqthemify(--background-final);
      border-radius: 4px;
      right: 0;
      box-shadow: 0px 0px 20px 0px rqthemify(--shadow-primary);
    }
    &__icon {
      font-size: 14px;
      cursor: pointer;

      &:focus,
      &.is-active,
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
}
</style>
