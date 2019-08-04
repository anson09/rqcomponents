<template>
  <div class="topic__wrapper">
    <div class="topic" @click="redirect">
      <div class="topic__content">
        <div class="left avatar">
          <img :src="info.author.avatar" alt="">
        </div>
        <div class="right">
          <p class="topic__title">
            {{info.name}}
          </p>
          <p><a class="highlight" @click.stop="redirectAuthor">{{info.author.name}}</a>{{labels.createAt}}{{info.createAt}}</p>
          <p>{{labels.lastRepeat}}{{info.lastRepeat}}</p>
        </div>
      </div>
       <div class="topic__footer">
        <i class="rq-icons icon-chat"> </i>
        <span>{{info.chat}}</span>
        <i class="rq-icons icon-view"> </i>
        <span>{{info.view}}</span>
        <i class="rq-icons icon-heart"> </i>
        <span>{{info.like}}</span>
        <template v-if="info.chart">
          <i class="rq-icons icon-chart highlight"> </i>
          <span class="chart">{{info.chart}}</span>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Topic",
  props: {
    info: {
      required: true,
      type: Object
    }
  },
  data() {
    return {
      labels: {
        createAt: "发表于",
        lastRepeat: "最后回复于"
      }
    }
  },
  methods: {
    redirect() {
      this.$emit("redirect", "community", "topic", this.info.tid);
    },
    redirectAuthor() {
      this.$emit("redirect", "profile", this.info.author.uid);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../common/style/common";

.topic {
  box-sizing: border-box;
  padding: 24px;
  background: $bg-white;
  border-radius: 8px;
  @include hover-scale;
  height: 100%;
  margin-bottom: 24px;
  &__wrapper {
    @include flex-item;
  }
  .highlight {
    color: $highlight;
  }
  .avatar {
    position: relative;
    width: 76px;
    height: 76px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .left + .right {
    margin-left: 24px;
  }
  &__content {
    display: flex;
    margin-bottom: 20px;
    @include mini-text;
    .topic__title {
      @include text($text-dark);
      margin-bottom: 12px;
    }
    p + p {
      margin-top: 6px;
    }
  }
  &__footer {
    text-align: right;
    span, i {
      @include mini-text;
    }
    i {
      margin-left: 20px;
      margin-right: 10px;
    }
    span {
      &.chart {
        position: relative;
        padding: 2px 6px;
        background: $highlight;
        color: $text-white;
        border-radius: 2px;
        &::before {
          content: "";
          position: absolute;
          height: 0;
          width: 0;
          top: 1px;
          left: -8px;
          border-top: 8px solid transparent;
          border-bottom: 8px solid transparent;
          border-right: 8px solid $highlight;
        }
      }
    }
  }

}
</style>