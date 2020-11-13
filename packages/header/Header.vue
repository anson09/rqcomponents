<template>
  <header :class="['rq-header-container', { 'is-opacity': opacity }]">
    <Notification :text="notification">
      <template v-if="$slots.notification">
        <slot name="notification" />
      </template>
    </Notification>
    <div class="rq-header-wrapper">
      <div class="rq-header">
        <a href="/" class="rq-header-logo">
          <img
            v-show="opacity"
            class="rq-header-logo__img"
            src="./assets/img/logo-white.png"
          />
          <img
            v-show="!opacity"
            class="rq-header-logo__img"
            src="./assets/img/logo.png"
          />
        </a>
        <div v-if="$slots.topic || topic" class="rq-header-topic">
          <slot v-if="$slots.topic" name="topic"></slot>
          <template v-else-if="topic">
            {{ topic }}
          </template>
        </div>
        <!-- 正常 header -->
        <template v-else>
          <MiniNav class="rq-header-nav--mini" :opacity="opacity" />
          <Nav class="rq-header-nav--default" :opacity="opacity" />
          <transition name="fade">
            <NavButtons :opacity="opacity" @auth="$emit('auth', $event)" />
          </transition>
        </template>
      </div>
    </div>
    <SecondHeader />
  </header>
</template>
<script>
import Notification from "../common/components/Notification.vue";
import Nav from "./components/Nav.vue";
import MiniNav from "./components/MiniNav.vue";
import { rootMixin } from "../common/util/mixin";
import NavButtons from "./components/NavButtons.vue";
import SecondHeader from "./components/SecondHeader.vue";

export default {
  name: "RqHeader",
  components: { Notification, Nav, MiniNav, NavButtons, SecondHeader },
  mixins: [rootMixin],
  props: {
    notification: {
      default: "",
      type: String,
    },
    opacity: {
      default: false,
      type: Boolean,
    },
    topic: {
      default: "",
      type: String,
    },
    config: {
      type: Object,
      default: () => ({ admin: false, ankaPrefix: "/welcome", router: false }),
    },
  },
  data() {
    return {};
  },

  methods: {},
};
</script>

<style lang="scss" scoped>
@import "./style/mixins.scss";
@include reset;
@include block(null) {
  $self: &;
  height: 100%;
  z-index: 2;
  margin: 0 auto;
  padding: 0 16px;
  max-width: $max-vw;
  @include f-center;

  &-container {
    position: relative;
    width: 100%;
    max-width: 1440px;
    box-shadow: 0px 2px 4px rqthemify(--shadow-container);
    &.is-opacity {
      background: transparent;
      box-shadow: none;
    }
  }
  &-wrapper {
    position: relative;
    z-index: 10;
    height: 70px;
  }
}

@include block(nav) {
  &--mini {
    display: none;
  }
}

@include laptop {
  @include block(nav) {
    &--mini {
      display: flex;
    }
    &--default {
      display: none;
    }
  }
}

@include block(logo) {
  @include laptop {
    margin-right: 30px;
  }
  &__img {
    width: 138px;
  }
}

@include block(topic) {
  flex: 1;
  font-size: 26px;
  font-weight: 500;
  margin-left: 48px;
  color: rqthemify(--text-primary);
}
</style>
