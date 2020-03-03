<template>
  <el-popover
    :class="['mini-menu__wrapper', { active, light }]"
    placement="bottom-start"
    trigger="hover"
    v-model="active"
    popper-class="mini-menu"
    :visible-arrow="false"
  >
    <div class="mini-menu">
      <div class="mini-menu-list">
        <div
          v-for="(item, idx) in cfg"
          :class="['mini-menu-list__item', { active: activeIdx === idx }]"
          :key="item.label"
          @click="toggle(idx)"
        >
          <span class="">
            {{ item.label }}
          </span>
          <i v-if="item.links" class="el-icon-arrow-right"> </i>
        </div>
      </div>
      <div v-if="detail" class="mini-menu-detail">
        <DropdownMenu :links="detail" :support="support" @redirect="redirect">
        </DropdownMenu>
      </div>
    </div>
    <el-button class="mini-menu-burger" type="text" slot="reference">
      <span></span>
      <span></span>
      <span></span>
    </el-button>
  </el-popover>
</template>

<script>
import elPopover from "element-ui/lib/popover";
import elButton from "element-ui/lib/button";
import DropdownMenu from "./DropdownMenu.vue";

export default {
  name: "MiniMenu",
  components: {
    elButton,
    elPopover,
    DropdownMenu
  },
  props: {
    cfg: {
      required: true,
      type: Array
    },

    support: {
      required: true,
      type: Object
    },

    light: {
      default: false,
      type: Boolean
    }
  },
  data() {
    return {
      active: false,
      activeIdx: null
    };
  },
  computed: {
    detail() {
      return this.cfg?.[this.activeIdx]?.links ?? null;
    }
  },
  watch: {
    active(val) {
      if (!val) this.clear();
    }
  },
  mounted() {},
  methods: {
    clear() {
      this.activeIdx = null;
    },
    toggle(idx) {
      if (this.activeIdx === idx) return;
      if (this.cfg[idx] && !this.cfg[idx].links) {
        this.$emit("click", this.cfg[idx].label);
        this.active = false;
      }
      if (this.cfg[idx] && this.cfg[idx].links) this.activeIdx = idx;
    },
    redirect(...args) {
      this.$emit("redirect", ...args);
      this.active = false;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../../common/style/common";

.mini-menu {
  display: flex;
  &__wrapper {
    &:before {
      content: "";
      height: 40px;
      width: 1px;
      background: rqthemify(text);
    }
    &.light {
      &:before {
	background: rqthemify(text-white);
      }
      .mini-menu {
        &-burger {
          span {
            background: rqthemify(text-white);
          }
        }
      }
    }
    &.active {
      &:before {
	background: transparent;
      }
      .mini-menu {
        &-burger {
          background: rqthemify(highlight);
          span {
            background: white;
          }
        }
      }
    }
  }
  &-burger {
    @include f-column;
    width: 70px;
    height: 100%;
    border-radius: 0;
    transition: all 0.3s;
    span {
      display: block;
      width: 30px;
      height: 5px;
      background: rqthemify(text);
      border-radius: 6px;
      transition: all 0.3s;
      + span {
        margin-top: 4px;
      }
    }
  }
  &-list {
    padding-top: 18px;
    padding-bottom: 30px;
    width: 124px;
    height: 400px;
    box-sizing: border-box;
    background: #1b5fc4;
    &__item {
      display: flex;
      align-items: center;
      padding-left: 20px;
      color: #d4e0f2;
      height: 46px;
      cursor: pointer;
      transition: all 0.3s;
      &:hover,
      &.active {
        color: rqthemify(highlight);
        background: white;
      }
      i {
        margin-left: 12px;
      }
    }
  }
  &-detail {
    min-width: 300px;
    ::v-deep {
      .menu__links {
        height: 100%;
        .menu-support {
          position: absolute;
          bottom: 0;
        }
      }
    }
  }
}
</style>
<style lang="scss">
.mini-menu.el-popover {
  padding: 0;
  border-width: 0;
  min-width: auto;
  box-shadow: 0px 20px 20px 0px rgba(0, 0, 0, 0.15);
  &.el-popper[x-placement^="bottom"] {
    margin-top: 0;
  }
}
</style>
