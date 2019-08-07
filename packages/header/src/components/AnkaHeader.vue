<template>
  <div class="anka-header">
    <div :class="isInProduce" />
    <nav>
      <a href="/" class="nav__logo"
        ><img src="../../assets/img/logo.png"
      /></a>
      <div class="nav__buttons">
        <NavButton
          v-for="(button, idx) in buttons"
          :key="idx"
          :label="button.label"
          :active="button.active"
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
            :label="cfg.label"
            :plain="cfg.plain"
            @click="cfg.click"
          ></CommonButton> 
        </div>
      </transition>
    </nav>
    <ExpandMenu
      :active-label="activeLabel"
      :menu-icon-light.sync="menuIconLight"
      @hover="expandMenuHoverHandler"
      @redirect="redirect"
      @close="closeChildNav"
    ></ExpandMenu>
    <transition name="rq-fade-in-linear">
      <div v-show="activeLabel !== '' || openDialog" class="mask" @mouseover="closeChildNav" />
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
    SecondHeader
  },
  props: {
    isLogin: {
      default: false,
      type: Boolean
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
    loginButtons() {
      if (this.isLogin) {
        return [
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
        {
          label: "登录",
          plain: true,
          click: () => { 
            this.redirect({event: "login"});
          }
        },
        {
          label: "注册",
          click: () => { 
            this.redirect({event: "register"});
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
      const producePageLink = ["/rqdata", "/rqpro"];
      return !producePageLink.includes(this.getPath()) || this.activeLabel
        ? "header__bg"
        : "header__bg__produce";
    },
    isNotPageMore() {
      return (
        this.buttons
          .filter(i => !i.more)
          .filter(sub => this.getPath().includes(sub.link)).length <= 0
      );
    }
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
  position: absolute;
  z-index: 10;
  box-sizing: border-box;
  height: 70px;
  @include full-vw;
  .header__bg {
    position: absolute;
    z-index: 2;
    width: 100%;
    height: 100%;
    background: $bg-white;
  }
  .header__bg__produce {
    position: absolute;
    z-index: 2;
    width: 100%;
    height: 100%;
    background: $bg-gray;
  }
  nav {
    position: absolute;
    z-index: 2;
    align-items: center;
    width: $article-width;
    height: 100%;
    @include m-center-horizontal;
    @include f-center;
    .nav__logo {
      margin-right: 40px;
      img {
        width: 136px;
      }
    }
    .nav__buttons {
      display: inline-block;
      flex: 1;
      div {
        margin-right: 10px;
        &:last-child {
          margin-right: 0;
        }
      }
      &.login {
        flex: unset;
      }
    }
  }
  .mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: $mask-bg;
  }
}
</style>
