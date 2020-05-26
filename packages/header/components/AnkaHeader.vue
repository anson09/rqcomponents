<template>
  <div class="anka-header">
    <div :class="isInProduce">
      <nav>
        <a href="/" class="nav__logo">
          <img
            v-show="light"
            data-logo-theme="light"
            src="../assets/img/logo-white-pure.png"
          />
          <img
            v-show="!light"
            data-logo-theme="dark"
            src="../assets/img/logo.png"
          />
        </a>
        <vnodes v-if="topicSlot" :vnodes="topicSlot"></vnodes>
        <div v-else-if="topic" :class="['nav__topic', { light }]">
          <p>{{ topic }}</p>
        </div>
        <template v-else>
          <div v-if="fullScrean" class="nav__buttons">
            <nav-button
              v-for="(button, idx) in buttons"
              :key="idx"
              :label="button.label"
              :links="button.links"
              :support="support"
              :active="button.active"
              :light="light"
              :more="button.more"
              @redirect="redirect"
              @click="clickHandler"
            ></nav-button>
          </div>
          <mini-menu
            v-else
            class="nav__buttons"
            :light="light"
            :cfg="buttons"
            :support="support"
            @redirect="redirect"
            @click="clickHandler"
          ></mini-menu>
          <transition name="fade">
            <div class="nav__buttons login">
              <el-button
                v-for="(cfg, idx) in loginButtons"
                :key="idx"
                :class="[cfg.className, { light }]"
                :round="true"
                :plain="cfg.plain || light"
                :light="light"
                :type="cfg.type"
                :icon="cfg.icon ? `icon-base icon-base-${cfg.icon}` : ''"
                @click="cfg.click"
                >{{ cfg.label }}</el-button
              >
            </div>
          </transition>
        </template>
      </nav>
    </div>
    <second-header @redirect="redirect"></second-header>
  </div>
</template>

<script>
import ElButton from "element-ui/lib/button";
import debounce from "lodash/debounce";
import NavButton from "./anka-header/NavButton.vue";
import SecondHeader, {
  getSecondHeaderShow,
} from "./anka-header/SecondHeader.vue";
import MiniMenu from "./anka-header/MiniMenu.vue";
import { anka } from "../assets/dict/header";

export default {
  name: "AnkaHeader",
  components: {
    NavButton,
    MiniMenu,
    SecondHeader,
    ElButton,
    Vnodes: {
      functional: true,
      render: (h, ctx) => ctx.props.vnodes,
    },
  },
  props: {
    isLogin: {
      default: false,
      type: Boolean,
    },
    opacity: {
      default: false,
      type: Boolean,
    },
    topic: {
      default: "",
      type: String,
    },
  },
  data() {
    return {
      fullScrean: true,
      support: anka.support,
      activeLabel: "",
    };
  },
  computed: {
    topicSlot() {
      if (!this.topic) return false;
      return this.$parent.$slots?.topic ?? false;
    },
    secondHeaderOpen() {
      return getSecondHeaderShow(this.getPath());
    },
    light() {
      if (this.opacity && !this.secondHeaderOpen) {
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
          },
        },
      ];
      if (this.isLogin) {
        return [
          ...base,
          {
            label: "进入平台",
            plain: true,
            className: "to-quant",
            click: () => {
              this.redirect({
                outer: true,
                href: "/quant/",
              });
            },
          },
        ];
      }
      return [
        ...base,
        {
          label: "登录",
          plain: true,
          type: "text",
          icon: "login",
          click: () => {
            this.redirect({ event: "login" });
          },
        },
        {
          label: "注册",
          plain: true,
          type: "text",
          icon: "registered",
          click: () => {
            this.redirect({ event: "register" });
          },
        },
      ];
    },
    buttons() {
      let config = anka.header.default;
      if (/(\/about|\/recruitment)/.test(this.getPath())) {
        config = anka.header.others;
      }
      return config.map((btn) => {
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
      if (this.opacity) {
        return "header__bg opacity";
      }
      return "header__bg";
    },
    isNotPageMore() {
      return (
        this.buttons
          .filter((i) => !i.more)
          .filter((sub) => this.getPath().includes(sub.link)).length <= 0
      );
    },
  },
  mounted() {
    this.resize();
    window.addEventListener("resize", this.resize);
  },
  destoryed() {
    window.removeEventListener("resize", this.resize);
  },
  methods: {
    resize: debounce(function () {
      this.fullScrean = window.innerWidth > 1280;
    }),
    getBtnConfig(label) {
      const btns = this.buttons.filter((btn) => btn.label === label);
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
    getPath() {
      return this.$parent.getPath();
    },

    redirect(params) {
      this.$parent.handleLink(params);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../common/style/mixins";

.anka-header {
  position: relative;
  z-index: 10;
  box-sizing: border-box;
  height: 70px;
  &.is-topic {
    @media screen and (max-width: 600px) {
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
        @include laptop {
          margin-right: 30px;
        }
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
        height: 100%;
        flex-wrap: nowrap;
        flex: 1;
        align-items: center;
        div {
          margin-right: 10px;
          &:last-child {
            margin-right: 0;
          }
        }

        .to-quant,
        .road-show {
          padding: 10px 28px;
          border-radius: 40px;
          height: auto;
          border-color: #d9e0ea;
          transition: all 0.3s;
          color: white;
        }
        .to-quant {
          margin-left: 6px;
          color: rqthemify(highlight);
          border-color: rqthemify(highlight);
          background: transparent;
          &:hover,
          &:focus,
          &:active {
            color: rqthemify(highlight);
            background: #e3eeffff;
            transform: scale(1);
          }
          &:active {
            transform: scale(1.1);
          }
        }

        .road-show {
          margin: 0 24px 0 40px;
          background: #1b5fc4;
          &:hover,
          &:focus,
          &:active {
            color: white;
            transform: scale(1);
          }
          &:hover {
            background: #275dac;
          }
          &:focus,
          &:active {
            background: #19417b;
          }
        }
        &.login {
          flex: none;
          color: rqthemify(text);
          ::v-deep .icon-base {
            margin-right: 8px;
          }

          .el-button--text {
            padding: 12px 16px;
            margin-left: 0;
            color: rqthemify(highlight);
            border-width: 0;
            &:focus {
              background: transparent;
            }
            &:hover {
              background: #ccd9ea7a;
            }
            &:active {
              background: #cbd8ea;
            }
            &.light {
              color: rqthemify(text-white);
              border-width: 0;
              &:focus {
                background: transparent;
              }
              &:hover {
                background: #ffffff33;
              }
              &:active {
                background: #ffffff66;
              }
            }
          }
        }
      }
    }
  }
  .opacity {
    nav .nav__buttons {
      .road-show {
        background: #ffffff33;
        &:hover,
        &:focus,
        &:active {
          background: #ffffff66;
        }
      }

      .to-quant {
        color: white;
        border-color: white;
        background: transparent;
        &:hover,
        &:focus,
        &:active {
          color: white;
          background: #c8cde266;
        }
      }
    }
  }
}
</style>
