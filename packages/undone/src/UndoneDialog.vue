<template>
  <el-dialog
    top="0"
    custom-class="base"
    :show-close="false"
    :modal="false"
    :visible.sync="dialogVisible"
    :before-close="close"
  >
    <!-- title -->
    <div slot="title" class="base__header">
      <img v-show="headerIcon" :src="headerIcon" />
    </div>

    <!-- body -->
    <div class="base__body">
      <img v-show="titleIcon" :src="titleIcon" />
      <p class="base__body--title">{{ title }}</p>
      <div class="base__body--content">
        <span v-for="(text, idx) in content" :key="idx">
          <span v-if="idx !== 0" class="separator">
            /
          </span>
          {{ text }}
        </span>
      </div>
      <div class="base__body--close" @click="closeBtn">
        <i class="rq-icons icon-close-pane"></i>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import elDialog from "element-ui/lib/dialog";

export default {
  name: "UndoneDialog",
  components: {
    elDialog
  },
  data() {
    return {
      dialogVisible: false,
      title: "版本更新中，敬请期待···",
      content: [
        "跨资产投资组合管理系统",
        "债券管理与分析",
        "实时组合监控",
        "多样化报表展示与导出",
        "全面的分析体系"
      ],
      headerIcon: null,
      titleIcon: null
    };
  },
  mounted() {
    this.dialogVisible = true;
  },
  methods: {
    closeBtn() {
      this.dialogVisible = false;
    },
    close(done) {
      done();
      setTimeout(() => {
        this.$el.remove();
      }, 500);
    }
  }
};

</script>
<style lang="scss">
@import "../../common/style/common";

.el-dialog__wrapper {
  @include f-column;
  overflow: hidden;
  background: $mask-bg-dark;
}
</style>

<style lang="scss" scoped>
@import "../../common/style/common";

::v-deep .base {
  .el-dialog {
    &__header,
    &__body,
    &__footer {
      padding: 0;
    }
  }
  @include f-column;
  width: fit-content;
  border-radius: 12px;
  &__header {
    img {
      position: absolute;
      @include m-center-horizontal;
    }
  }
  &__body {
    padding: 0;
    &--title {
      text-align: center;
      @include h1($text-gray-light);
    }
    &--content {
      @include m-center-horizontal;
      text-align: center;
      @include text($text-gray-light);
    }
    &--close {
      @include m-center-horizontal;
      color: $button-gray;
      cursor: pointer;
      &:hover {
        color: $button-pink-light;
      }
      &:active {
        color: $button-pink;
      }
    }
  }
}

@function rem-real-vw($px) {
  @return $px;
}

::v-deep .base {
  padding: rem-real-vw(30px) rem-real-vw(120px);
  padding-top: rem-real-vw(188px);
  &__header {
    img {
      top: rem-real-vw(-92px);
      width: rem-real-vw(210px);
    }
  }
  &__body {
    img {
      width: rem-real-vw(582px);
    }
    &--content {
      width: rem-real-vw(334px);
      margin-bottom: rem-real-vw(60px);
    }
    &--close {
      width: rem-real-vw(32px);
      height: rem-real-vw(32px);
      i {
        font-size: rem-real-vw(32px);
      }
    }
  }
}
</style>
