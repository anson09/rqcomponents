<template>
  <div class="anka-header" :class="{'is-topic': Boolean(topic)}">
    <div :class="isInProduce">
      <nav>
        <a href="/" class="nav__logo">
          <img v-show="light" data-logo-theme="light" src="../../assets/img/logo-white-pure.png" />
          <img v-show="!light" data-logo-theme="dark" src="../../assets/img/logo.png" />
        </a>
	<vnodes v-if="topicSlot" :vnodes="topicSlot"></vnodes>
        <div v-else-if="topic" :class="['nav__topic', { light }]">
          <p>{{ topic }}</p>
        </div>
        <template v-else>
          <div class="nav__buttons">
            <NavButton
              v-for="(button, idx) in buttons"
              :key="idx"
              :label="button.label"
              :active="button.active"
              :light="light"
              :more="button.more"
              @click="clickHandler"
              @hover="hoverHandler"
              @close="closeChildNav"
            ></NavButton>
          </div>
          <transition name="fade">
            <div class="nav__buttons login">
              <CommonButton
                v-for="(cfg, idx) in loginButtons"
                :key="idx"
		:class="[cfg.className, opacity]"
                :label="cfg.label"
                :plain="cfg.plain || light"
                :light="light"
                @click="cfg.click"
              ></CommonButton>
            </div>
          </transition>
        </template>
      </nav>
      <ExpandMenu
        :active-label="activeLabel"
        :menu-icon-light.sync="menuIconLight"
        @hover="expandMenuHoverHandler"
        @redirect="redirect"
        @close="closeChildNav"
      ></ExpandMenu>
    </div>
    <transition name="rq-fade-in-linear">
      <div
        v-show="activeLabel !== '' || openDialog"
        class="mask"
        @mouseover="closeChildNav"
      />
    </transition>
    <SecondHeader></SecondHeader>
  </div>
</template>

<script>
import CommonButton from "./anka-header/CommonButton.vue";
import NavButton from "./anka-header/NavButton.vue";
import ExpandMenu from "./anka-header/ExpandMenu.vue";
import SecondHeader from "./anka-header/SecondHeader.vue";
import { anka } from "../../assets/dict/header.json";

export default {
  name: "AnkaHeader",
  components: {
    NavButton,
    CommonButton,
    ExpandMenu,
    SecondHeader,
    Vnodes: {
      functional: true,
      render: (h, ctx) => ctx.props.vnodes
    }
  },
  props: {
    isLogin: {
      default: false,
      type: Boolean
    },
    opacity: {
      default: false,
      type: Boolean
    },
    topic: {
      default: "",
      type: String
    }
  },
  data() {
    return {
      openDialog: false,
      activeLabel: "",
      menuIconLight: true
    };
  },
  computed: {
    topicSlot() {
      if (!this.topic) return false;
      return this.$parent.$slots?.topic ?? false;
    },
    secondHeaderOpen() {
      const producePageLink = ["/rqdata", "/rqpro", "/ams"];
      if (
        producePageLink.includes(this.getPath()) &&
          !Boolean(this.activeLabel)
      ) {
        return true;
      }
      return false;
    },
    light() {
      const producePageLink = ["/rqdata", "/rqpro"];
      if (this.secondHeaderOpen) {
        return false;
      }
      if (!Boolean(this.activeLabel) && this.opacity) {
        return true;
      }
      return false;
    },
    loginButtons() {
      const base = [
        {
          label: "预约路演",
	  className: "road-show",
          click: () => {
            this.redirect("/welcome/trial/road-show");
          }
        }];
      if (this.isLogin) {
        return [
	  ...base,
          {
            label: "进入平台",
            plain: true,
            click: () => {
              this.redirect({
                outer: true,
                href: "/quant/"
              });
            }
          }
        ];
      }
      return [
	...base,
        {
          label: "登录",
          plain: true,
          click: () => {
            this.redirect({ event: "login" });
          }
        },
        {
          label: "注册",
          plain: true,
          click: () => {
            this.redirect({ event: "register" });
          }
        }
      ];
    },
    buttons() {
      let config = anka.header.default;
      if (/(\/about|\/recruitment)/.test(this.getPath())) {
        config = anka.header.others;
      }
      return config.map(btn => {
        if (btn.more) {
          btn.active = this.activeLabel === btn.label;
        } else if (btn.link) {
          btn.active = this.getPath().includes(btn.link);
        }
        return btn;
      });
    },
    isInProduce() {
      if (this.secondHeaderOpen) {
        return "header__bg__produce";
      }
      if (this.opacity && !Boolean(this.activeLabel)) {
        return "header__bg opacity";
      }
      return "header__bg";
    },
    isNotPageMore() {
      return (
        this.buttons
          .filter(i => !i.more)
          .filter(sub => this.getPath().includes(sub.link)).length <= 0
      );
    }
  },
  mounted() {
  },
  methods: {
    getBtnConfig(label) {
      const btns = this.buttons.filter(btn => btn.label === label);
      return btns.length > 0 ? btns[0] : null;
    },
    clickHandler(label) {
      const btn = this.getBtnConfig(label);
      if (btn) {
        if (btn.more) {
          if (this.activeLabel !== label) {
            this.activeLabel = label;
          } else {
            this.activeLabel = "";
          }
        } else if (btn.link) {
          this.$parent.handleLink(btn.link);
        }
      }
    },
    expandMenuHoverHandler(label) {
      const btn = this.getBtnConfig(label);
      if (btn && btn.more) {
        if (this.activeLabel !== label) {
          this.activeLabel = label;
        }
      }
    },
    hoverHandler(label) {
      if (this.activeLabel !== "") {
        this.expandMenuHoverHandler(label);
      }
      const btn = this.getBtnConfig(label);
      if (btn) {
        if (btn.more) {
          if (this.activeLabel !== label) {
            this.activeLabel = label;
          }
        }
      }
    },
    closeChildNav() {
      this.$nextTick(() => {
        this.menuIconLight = this.isNotPageMore;
      });
      this.activeLabel = "";
    },
    getPath() {
      return this.$parent.getPath();
    },
    redirect(params) {
      this.$parent.handleLink(params);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../common/style/common";

.anka-header {
  position: relative;
  z-index: 10;
  box-sizing: border-box;
  height: 70px;
  @include full-vw;
  &.is-topic {
    @media screen and (max-width: $mobile-max-vw) {
      height: 40px;
      nav {
	box-sizing: border-box;
	width: 100%;
	padding: 10px 30px;
      }
    }
  }
  .header__bg {
    position: absolute;
    z-index: 2;
    width: 100%;
    height: 100%;
    background: rqthemify(bg-white);
    &.opacity {
      background: transparent;
    }
  }
  .header__bg__produce {
    position: absolute;
    z-index: 2;
    width: 100%;
    height: 100%;
    background: rqthemify(bg-gray);
  }
  nav {
    position: absolute;
    z-index: 2;
    align-items: center;
    width: 100%;
    height: 100%;
    box-shadow: none;
    padding: 0 50px;
    box-sizing: border-box;
    background: transparent;
    @include m-center-horizontal;
    @include f-center;
    .nav {
      &__logo {
	margin-right: 48px;
        img {
          width: 136px;
        }
      }
      &__topic {
        flex: 1;
        p {
          @include h2(rqthemify(text-dark));
        }
        &.light p {   
          color: rqthemify(text-white-dark);
        }
      }
      &__buttons {
	display: flex;
	flex-wrap: nowrap;
        flex: 1;
        div {
          margin-right: 10px;
          &:last-child {
            margin-right: 0;
          }
        }
	.road-show {
	  padding: 10px 24px;
	  margin: 0 20px 0 40px;
	  border-radius: 40px;
	  background: rqthemify(highlight);
	  border-color: transparent;
	  border-width: 0;
	  transition: background .3s;
	  &:hover,
	  &:active {
	    filter: brightness(1.1);
	  }
	  &.light {
	    background: linear-gradient(
	      180deg,
	      rgba(58, 152, 228, 1) 0%,
	      rgba(27, 95, 196, 1) 100%
	    );
	    &:hover,
	    &:active {
	      color: rqthemify(text-white);
	      background: linear-gradient(
		180deg,
		rgba(0, 133, 239, 1) 0%,
		rgba(0, 70, 173, 1) 100%
	      );
	    }
	  }
	}
        &.login {
          flex: none;
        }
      }
    }
  }
  .mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rqthemify(mask-bg);
    z-index: 1;
  }
}
</style>
