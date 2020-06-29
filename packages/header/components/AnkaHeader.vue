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
            <nav-button
              v-for="(button, idx) in buttons"
              :key="idx"
              class="nav button"
              :support="support"
              :light="light"
              :button="button"
              @redirect="redirect"
            ></nav-button>
          </div>
          <mini-menu
            v-else
            class="nav__buttons"
            :light="light"
            :cfg="buttons"
            :support="support"
            @redirect="redirect"
          ></mini-menu>
          <transition name="fade">
            <div class="nav__buttons login">
              <el-button
                v-for="(cfg, idx) in loginButtons"
                :key="idx"
                :class="[cfg.className, { light }]"
                :round="true"
                plain
                :light="light"
                :type="cfg.type"
                :icon="cfg.icon ? `icon-base icon-base-${cfg.icon}` : ''"
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

                {{ cfg.label }}
              </el-button>
            </div>
          </transition>
        </template>
      </nav>
    </div>
    <second-header
      :show-warning="showWarning"
      @redirect="redirect"
    ></second-header>
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
import { anka } from "../assets/dict/config";
import { getStorage } from "../../common/util";
import entryOpacityImg from "../assets/img/entry-opacity.png";
import entryImg from "../assets/img/entry.png";
import entryActiveImg from "../assets/img/entry-active.png";

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
    showWarning: { default: false, type: Boolean },
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
            this.redirect({ href: `/trial/road-show`, event: "roadShow" });
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
              this.redirect({
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
            this.redirect({ event: "login" });
          },
        },
        {
          label: "注册",
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
      function getList(node, level = 0) {
        if (Array.isArray(node)) {
          return [
            ...node.reduce(
              (arr, item) => [...arr, ...getList(item, level)],
              []
            ),
          ];
        }
        if (node.links) {
          const obj = { ...node };
          delete obj.links;
          return [{ ...obj, level }, ...getList(node.links, level + 1)];
        }
        return [{ ...node, level, isLeaf: level !== 0 }];
      }
      return config.map((item) => ({
        ...item,
        links: item.links && getList(item.links),
      }));
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
    background: rqthemify(--background-white);
    &.opacity {
      background: transparent;
    }
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
          ::v-deep {
            .el-button {
              @include click-scale();
              // 登录 注册
              color: rqthemify(--text-primary);
              border-radius: 19px;
              padding: 10px 14px;
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
                color: rqthemify(--primary-color);
                border-color: rqthemify(--primary-color);
              }
              .icon-base {
                margin-right: 8px;
              }
            }
          }
          // 预约路演 进入平台
          .entry {
            padding: 6px 12px;
            margin-left: 6px;
            border-radius: 4px;
          }

          .road-show {
            margin: 0 24px 0 40px;
            border-radius: 40px;
            padding: 10px 28px;
            border-color: rqthemify(--text-primary);
          }

          .entry,
          .road-show {
            color: rqthemify(--text-primary);
            height: auto;
            transition: all 0.3s;
            &:hover,
            &:focus,
            &:active {
              color: rqthemify(--primary-color);
              border-color: rqthemify(--primary-color);
            }
            &:focus,
            &:active {
              background: rqthemify(--primary-color-1);
            }
          }
        }
      }
    }
  }
  .opacity {
    nav .nav__buttons {
      &.login {
        ::v-deep {
          .el-button {
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
        }
        .road-show {
          color: rqthemify(--text-white);
          border-color: rqthemify(--white);
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
