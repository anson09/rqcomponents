<template>
  <div class="anka-header">
    <div :class="headerClassName">
      <nav>
        <a href="/" class="nav__logo">
          <img
            v-show="light"
            data-logo-theme="light"
            src="../assets/img/logo-white.png"
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
            <Menu
              v-for="(button, idx) in buttons"
              :key="idx"
              class="nav button"
              :support="support"
              :light="light"
              :button="button"
            ></Menu>
          </div>
          <mini-menu
            v-else
            class="nav__buttons"
            :light="light"
            :cfg="buttons"
            :support="support"
          ></mini-menu>
          <transition name="fade">
            <div class="nav__buttons login">
              <button
                v-for="(cfg, idx) in loginButtons"
                :key="idx"
                :class="[cfg.className, { light }, 'login-button']"
                @click="cfg.click"
              >
                <template v-if="cfg.images">
                  <img
                    v-for="(item, index) in cfg.images"
                    :key="index"
                    :src="item.src || item"
                    :class="item.className"
                  />
                </template>
                <i
                  v-if="cfg.icon"
                  :class="`icon-base icon-base-${cfg.icon}`"
                ></i>

                {{ cfg.label }}
              </button>
            </div>
          </transition>
        </template>
      </nav>
    </div>
    <second-header :config="secondHeader"></second-header>
  </div>
</template>

<script>
import debounce from "lodash/debounce";
import Menu from "./anka-header/Menu.vue";
import SecondHeader from "./anka-header/SecondHeader.vue";
import MiniMenu from "./anka-header/MiniMenu.vue";
import { anka } from "../assets/dict/config";
import { getStorage } from "../../common/util";
import entryOpacityImg from "../assets/img/entry-opacity.png";
import entryImg from "../assets/img/entry.png";
import entryActiveImg from "../assets/img/entry-active.png";
import mixin from "../../common/util/mixin";

export default {
  name: "AnkaHeader",
  components: {
    Menu,
    MiniMenu,
    SecondHeader,
    Vnodes: {
      functional: true,
      render: (h, ctx) => ctx.props.vnodes,
    },
  },
  mixins: [mixin],
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
      secondHeader: anka.secondHeader,
      activeLabel: "",
    };
  },
  computed: {
    topicSlot() {
      if (!this.topic) return false;
      return this.$parent.$slots?.topic ?? false;
    },

    light() {
      if (this.opacity) {
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
            this.handleLink({ href: `/trial/road-show`, event: "roadShow" });
          },
        },
      ];
      if (this.isLogin) {
        return [
          ...base,
          {
            label: "进入平台",
            className: "entry",
            type: "text",
            images: this.opacity
              ? [entryOpacityImg]
              : [
                  {
                    className: "default",
                    src: entryImg,
                  },
                  {
                    className: "active",
                    src: entryActiveImg,
                  },
                ],
            click: () => {
              const account = getStorage("account");
              const history = getStorage("userDefaultProduct");
              this.handleLink({
                outer: true,
                href: `/${history[account.userId] ?? "quant"}/`,
              });
            },
          },
        ];
      }
      return [
        ...base,
        {
          label: "登录",
          type: "text",
          icon: "login",
          click: () => {
            this.handleLink({ event: "login" });
          },
        },
        {
          label: "注册",
          type: "text",
          icon: "registered",
          click: () => {
            this.handleLink({ event: "register" });
          },
        },
      ];
    },
    buttons() {
      let config = anka.header.default;
      if (/(\/about|\/recruitment)/.test(this.getPath())) {
        config = anka.header.others;
      }

      return config;
    },
    headerClassName() {
      if (this.opacity) {
        return "header__bg opacity";
      }
      return "header__bg";
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
          this.handleLink(btn.link);
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../common/style/mixins";

::v-deep button {
  @include click-scale();
}

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
    background: rqthemify(--background-white);
    &.opacity {
      background: transparent;
    }
  }

  nav {
    position: absolute;
    z-index: 2;
    align-items: center;
    height: 100%;
    box-shadow: none;
    box-sizing: border-box;
    background: transparent;
    @include m-center-horizontal;
    @include f-center;
    margin: 0 auto;
    padding: 0 16px;
    width: 100%;
    max-width: 1200px;

    .nav {
      &__logo {
        margin-right: 48px;
        @include laptop {
          margin-right: 30px;
        }
        img {
          width: 138px;
        }
      }
      &__topic {
        flex: 1;
        p {
          @include h2(rqthemify(--text-primary));
        }
        &.light p {
          color: rqthemify(--border-primary);
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

        &.login {
          flex: none;
          button {
            background: transparent;
            padding: 8px 12px;
            border: 1px solid transparent;
            margin: 0 4px;
            font-size: 14px;
            line-height: 18px;
            color: rqthemify(--text-primary);
            display: flex;
            border-radius: 20px;
            align-items: center;
            .icon-base {
              margin-right: 8px;
            }
            img {
              width: 26px;
              height: 26px;
              vertical-align: middle;
              margin-right: 12px;
              &.active {
                display: none;
              }
            }
            &:hover,
            &:active,
            &:focus {
              img {
                &.default {
                  display: none;
                }
                &.active {
                  display: inline-block;
                }
              }
            }

            &:hover {
              border-color: rqthemify(--text-primary);
            }
            &:active,
            &:focus {
              color: rqthemify(--light-primary-color);
              border-color: rqthemify(--light-primary-color);
            }
          }
          // 预约路演 进入平台
          .entry {
            padding: 4px 12px;
            margin-left: 6px;
            border-radius: 4px;
          }

          .road-show {
            margin: 0 22px 0 40px;
            border-radius: 40px;
            padding: 8px 28px;
            border: 1px solid rqthemify(--text-primary);
          }

          .entry,
          .road-show {
            color: rqthemify(--text-primary);
            height: auto;
            transition: all 0.3s;
            &:hover,
            &:focus,
            &:active {
              color: rqthemify(--light-primary-color);
              border-color: rqthemify(--light-primary-color);
            }
            &:focus,
            &:active {
              background: rqthemify(--light-primary-color-1);
            }
          }
        }
      }
    }
  }
  .opacity {
    nav .nav__buttons {
      &.login {
        button {
          color: rqthemify(--text-white);
          border-color: transparent;
          &:hover {
            background: rqthemify(--text-white-4);
          }
          &:focus,
          &:active {
            background: rqthemify(--text-white-6);
          }
        }

        .road-show {
          color: rqthemify(--text-white);
          border: 1px solid rqthemify(--white);
          background: rqthemify(--text-white-2);
        }

        .entry {
          border-color: transparent;
          color: rqthemify(--text-white);
          background: transparent;
        }
        .entry,
        .road-show {
          &:hover {
            background: rqthemify(--text-white-4);
          }
          &:focus,
          &:active {
            background: rqthemify(--text-white-6);
          }
        }
      }
    }
  }
}
</style>
