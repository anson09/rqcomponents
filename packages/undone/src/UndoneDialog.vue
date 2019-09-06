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
        <i class="rq-icons rq-icon-close-pane"></i>
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
      @include h1($text-gray-lighter);
    }
    &--content {
      @include m-center-horizontal;
      text-align: center;
      @include text($text-gray-lighter);
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

@function rem-min($px) {
  @return $px/$max-vh * 800px;
}

@function rem-real-vw($px) {
  @return $px/$max-vh * 100vh;
}

@function rem-max($px) {
  @return $px;
}
::v-deep .base {
  padding: rem-min(30px) rem-min(120px);
  padding-top: rem-min(188px);
  &__header {
    img {
      top: rem-min(-92px);
      width: rem-min(210px);
    }
  }
  &__body {
    &--title {
      margin-top: rem-min(30px);
      margin-bottom: rem-min(80px);
    }
    img {
      width: rem-min(582px);
    }
    &--content {
      width: rem-min(334px);
      margin-bottom: rem-min(40px);
    }
    &--close {
      width: rem-min(32px);
      height: rem-min(32px);
      i {
        font-size: rem-min(32px);
      }
    }
  }
}
@media screen and (min-height: $min-vh) {
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
      &--title {
        margin-top: rem-real-vw(30px);
        margin-bottom: rem-real-vw(80px);
      }
      img {
        width: rem-real-vw(582px);
        height: rem-real-vw(120px);
      }
      &--content {
        width: rem-real-vw(334px);
        margin-bottom: rem-real-vw(40px);
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
}
@media screen and (min-height: $max-vh) {
  ::v-deep .base {
    padding: rem-max(30px) rem-max(120px);
    padding-top: rem-max(188px);
    &__header {
      img {
        top: rem-max(-92px);
        width: rem-max(210px);
      }
    }
    &__body {
      &--title {
        margin-top: rem-max(30px);
        margin-bottom: rem-max(80px);
      }
      img {
        width: rem-max(582px);
      }
      &--content {
        width: rem-max(334px);
        margin-bottom: rem-max(40px);
      }
      &--close {
        width: rem-max(32px);
        height: rem-max(32px);
        i {
          font-size: rem-max(32px);
        }
      }
    }
  }
}
</style>
