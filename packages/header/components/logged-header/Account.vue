<template>
  <div class="account">
    <img class="account__avatar" :src="avatarShow" alt="" />

    <transition name="rq-zoom-in-top">
      <div v-show="active" class="account-dropdown">
        <p class="account__username">{{ username }}</p>
        <p
          v-for="(link, index) in links"
          :key="index"
          class="account__link"
          @click="handleClick(link)"
        >
          {{ link.label }}
        </p>
      </div>
    </transition>
  </div>
</template>
<script>
import defaultAvatar from "../../assets/img/header.png";

export default {
  name: "Account",
  props: {
    links: { type: Array, required: true },
    active: { type: Boolean, default: false },
    avatar: {
      default: "",
      type: String,
    },
    username: {
      required: true,
      type: String,
    },
  },
  data() {
    return {};
  },
  computed: {
    avatarShow() {
      return this.avatar || defaultAvatar;
    },
  },
  methods: {
    handleClick(cfg) {
      if (cfg.event === "logout") {
        this.$emit("logout");
      } else if (cfg.link) {
        this.$emit("handleLink", cfg.link);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../../../common/style/mixins.scss";
.account {
  height: 100%;
  display: flex;
  align-items: center;
  position: relative;
  padding: 0 15px;
  &__avatar {
    width: 34px;
    height: 34px;
    border-radius: 50%;
  }

  &__link {
    cursor: pointer;
    margin-bottom: -8px;
    padding: 12px 20px;
    text-align: center;
    &:last-child {
      margin-bottom: 0;
    }
    &:hover {
      color: rqthemify(--text-hover);
      background-color: rqthemify(--dropdown-hover-background);
    }
  }
  &__username {
    position: relative;
    font-size: 14px;
    box-sizing: border-box;
    width: 108px;
    padding: 8px 10px 6px 16px;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    border-bottom: 1px solid rqthemify(--border-primary);
    &:after {
      content: "";
      position: absolute;
      display: block;
      margin: auto;
      top: 12px;
      left: 10px;
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background: rqthemify(--succeed-color);
    }
  }
  &-dropdown {
    box-shadow: 0px 8px 12px 0px rqthemify(--shadow-primary);
    position: absolute;
    right: 0;
    top: 100%;
    background-color: rqthemify(--dropdown-background);
    @include text(rqthemify(--text-normal), 14, 1);
  }
}
</style>
