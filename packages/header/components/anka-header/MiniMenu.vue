<template>
  <el-popover
    v-model="active"
    :class="['mini-menu__wrapper', { active, light }]"
    placement="bottom-start"
    trigger="hover"
    popper-class="mini-menu"
    :visible-arrow="false"
  >
    <div class="mini-menu">
      <div class="mini-menu-list">
        <div
          v-for="(item, idx) in cfg"
          :key="item.label"
          :class="['mini-menu-list__item', { active: activeIdx === idx }]"
          @mouseover="hover(idx)"
          @click="toggle(idx)"
        >
          <span class="">
            {{ item.label }}
          </span>
          <i v-if="item.links" class="el-icon-arrow-right"> </i>
        </div>
      </div>
      <div v-if="detail" class="mini-menu-detail">
        <dropdown-menu :links="detail" :support="support" @redirect="redirect">
        </dropdown-menu>
      </div>
    </div>
    <el-button slot="reference" class="mini-menu-burger" type="text">
      <span></span>
      <span></span>
      <span></span>
    </el-button>
  </el-popover>
</template>

<script>
import ElPopover from "element-ui/lib/popover";
import ElButton from "element-ui/lib/button";
import DropdownMenu from "./DropdownMenu.vue";

export default {
  name: "MiniMenu",
  components: {
    ElButton,
    ElPopover,
    DropdownMenu,
  },
  props: {
    cfg: {
      required: true,
      type: Array,
    },

    support: {
      required: true,
      type: Object,
    },

    light: {
      default: false,
      type: Boolean,
    },
  },
  data() {
    return {
      active: false,
      activeIdx: null,
    };
  },
  computed: {
    detail() {
      return this.cfg?.[this.activeIdx]?.links ?? null;
    },
  },
  watch: {
    active(val) {
      if (!val) this.clear();
    },
  },
  mounted() {},
  methods: {
    clear() {
      this.activeIdx = null;
    },
    hover(idx) {
      if (this.activeIdx !== idx) {
        this.activeIdx = this.cfg[idx] && this.cfg[idx].links ? idx : null;
      }
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
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../../../common/style/mixins";

.mini-menu {
  display: flex;

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
      background: rqthemify(--text-normal);
      border-radius: 6px;
      transition: all 0.3s;
      + span {
        margin-top: 4px;
      }
    }
  }
  &__wrapper {
    &:before {
      content: "";
      margin-right: 10px;
      height: 40px;
      width: 1px;
      background: rqthemify(--text-normal);
    }
    &.light {
      &:before {
        background: rqthemify(--text-normal);
      }
      .mini-menu {
        &-burger {
          span {
            background: rqthemify(--text-normal);
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
          background: rqthemify(--primary-color);
          span {
            background: rqthemify(--text-white);
          }
        }
      }
    }
  }
  &-list {
    padding-top: 18px;
    padding-bottom: 30px;
    width: 124px;
    height: 400px;
    box-sizing: border-box;
    background: rqthemify(--primary-color);
    &__item {
      display: flex;
      align-items: center;
      padding-left: 20px;
      color: rqthemify(--text-white);
      height: 46px;
      cursor: pointer;
      transition: all 0.3s;
      &:hover,
      &.active {
        color: rqthemify(--primary-color);
        background: rqthemify(--background-white);
      }
      i {
        margin-left: 12px;
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
  box-shadow: 0px 20px 20px 0px rqthemify(--shadow-primary);
  &.el-popper[x-placement^="bottom"] {
    margin-top: 0;
  }
}
</style>
