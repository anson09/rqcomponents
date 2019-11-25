<template>
  <transition name="expand-menu">
    <div v-show="Boolean(activeLabel)" class="expand-menu">
      <div class="expand-menu__bg">
        <div class="expand-menu__supportBg"></div>
        <div class="expand-menu__content">
          <div
            v-for="(cfg, idx) in configs"
            :key="idx"
            class="expand-menu__links--wapper"
          >
            <div
              :class="['expand-menu__links', { active: cfg.active }]"
              @mouseenter="hoverHandler(cfg.label)"
            >
              <p class="title">{{ cfg.label }}</p>
              <a
                v-for="(link, linkIdx) in cfg.links"
                :key="linkIdx"
                :class="activeClass(link)"
                @click="clickHandle(link)"
                @mouseenter="handleMouseEnter(link)"
                @mouseleave="handleMouseLeave()"
              >
                <img
                  v-if="link.iconImg"
                  :class="activeClass(link)"
                  :src="link.iconImg"
                />
                {{ link.label }}
              </a>
            </div>
          </div>
          <div class="expand-menu__links--wapper support">
            <div class="expand-menu__links">
              <p class="title">{{ support.label }}</p>
              <p v-for="(cfg, idx) in support.info" :key="idx">
                {{ cfg.label }}: {{ cfg.value }}
              </p>
              <p class="contact">
                <span
                  v-for="(contact, contactIdx) in support.contact"
                  :key="contactIdx"
                >
                  <i
                    v-if="!contact.qrcode"
                    :class="'rq-icons rq-icon-' + contact.icon"
                    @click="clickHandle(contact)"
                  ></i>
                  <el-popover
                    v-else
                    placement="bottom"
                    width="auto"
                    trigger="hover"
                  >
                    <img :src="qrcodeImg" />
                    <i
                      slot="reference"
                      :class="'rq-icons rq-icon-' + contact.icon"
                    ></i>
                  </el-popover>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import ra from "../../../assets/img/ra.png";
import rp from "../../../assets/img/rp.png";
import rd from "../../../assets/img/rd.png";
import { anka } from "../../../assets/dict/header.json";
import qrcodeImg from "../../../assets/img/qrcodeImg.jpg";
import titleIcon from "../../../assets/img/ams/titleIcon.png";
import headerIcon from "../../../assets/img/ams/headerIcon.png";
import elPopover from "element-ui/lib/popover";

export default {
  name: "ExpandMenu",
  props: {
    activeLabel: {
      type: String,
      default: ""
    },
    menuIconLight: {
      type: Boolean,
      default: true
    }
  },
  components: {
    elPopover
  },
  data() {
    return {
      showMask: false,
      activePage: "",
      hoverPage: "",
      qrcodeImg,
      support: anka.support
    };
  },
  computed: {
    configs() {
      const logos = { ra, rp, rd };
      return anka.expandHeader.map(cfg => {
        cfg.links.forEach(link => {
          if (link.icon) {
            link.iconImg = logos[link.icon];
          }
	  if (link.undone) {
            link.undone = { titleIcon, headerIcon };
          }
        });
        cfg.active = this.activeLabel === cfg.label;
        return cfg;
      });
    }
  },
  methods: {
    activeClass({ label }) {
      return this.menuIconLight && this.hoverPage === label ? "activePage" : "";
    },
    hoverHandler(label) {
      this.$emit("hover", label);
    },
    clickHandle({ label, link, undone, qrcode }) {
      if (undone) {
        this.$undone(undone);
        this.$emit("close");
        return;
      } else if (link) {
        this.$emit("redirect", link);
        if (!link.newBlock) {
          this.hoverPage = this.activePage = label;
        }
      }
      this.$emit("close");
    },
    handleMouseEnter(link) {
      this.hoverPage = link.label;
      this.$emit("update:menuIconLight", true);
    },
    handleMouseLeave() {
      this.hoverPage = this.activePage;
      this.$emit("update:menuIconLight", this.activeLabel.length > 0);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../../common/style/common";

.expand-menu-enter-active,
.expand-menu-leave-active {
  transition: all 0.3s ease;
}
.expand-menu-enter,
.expand-menu-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}

.expand-menu {
  position: absolute;
  top: 70px;
  z-index: 1;
  width: 100%;
  height: 340px;
  border-top: 1px solid rqthemify(button-gray);
  overflow-x: hidden;
  &__bg {
    position: absolute;
    @include t-center-horizontal;
    width: 3000px;
    min-width: 100%;
    height: 310px;
    overflow: hidden;
    background: #fff;
    border-radius: 0 0 50% 50%;
    box-shadow: 0px 10px 30px 0px rgba(0, 0, 0, 0.07);
  }
  &__supportBg {
    position: absolute;
    left: 65%;
    width: 35%;
    height: 310px;
    background: rqthemify(bg-gray);
  }
  &__content {
    position: absolute;
    display: flex;
    @include m-center-horizontal;
    justify-content: space-between;
    width: $article-width;
    .expand-menu__links {
      padding: 30px 40px 0 0;
      a,
      p,
      i {
        position: relative;
        @include text(rqthemify(text-disabled));
        transition: color 0.3s;
      }
      a {
        display: block;
        cursor: pointer;
        img {
          filter: grayscale(0.9);
        }
      }
      a + a {
        margin-top: 16px;
      }
      p.title {
        position: relative;
        display: inline-block;
        margin: 0;
        margin-bottom: 24px;
        font-size: 12px;
        line-height: 1;
      }
      &.active {
        a,
        p,
        i {
          &.activePage {
            color: rqthemify(highlight);
            &:before {
              position: absolute;
              top: 4px;
              left: -20px;
              width: 10px;
              height: 10px;
              content: "";
              background: rqthemify(success);
              border-radius: 50%;
            }
          }
          font-weight: 700;
          color: rqthemify(text-hard);
        }
        img {
          &.activePage {
            filter: none;
          }
        }
        &.expand-menu__links {
          p.title {
            color: rqthemify(highlight);
            &::after {
              position: absolute;
              top: -36px;
              width: 0;
              content: "";
              border-top: 8px solid rqthemify(highlight);
              border-right: 8px solid transparent;
              border-left: 8px solid transparent;
              @include m-center-horizontal;
            }
          }
        }
      }
      &--wapper {
        margin-right: 40px;
        &.support {
          padding-left: 60px;
          margin-right: 0;
          margin-left: 80px;
          background: rqthemify(bg-gray);
          @include text;
          .expand-menu__links {
            float: left;
            height: 310px;
            padding-right: 0;
          }
          .contact {
            margin-top: 30px;
            i {
              margin-right: 22px;
              font-size: 20px;
              cursor: pointer;
              @include hover;
            }
          }
        }
      }
    }
  }
}
</style>
