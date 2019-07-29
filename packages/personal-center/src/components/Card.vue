<template>
  <div class="card__wrapper">
    <div class="card">
      <p class="card__title">
        {{info.name}}
      </p>
      <div class="card__content">
        <div
          v-for="(key, idx) in contentKeys"
          :key="idx"
          class="card__content--item">
            <p class="label">{{labels[key]}}</p>
            <p class="value">{{info[key]}}%</p>
          </div>
      </div>
       <div class="card__footer">
        <span class="label">{{labels.startAt}}</span>
        <span class="value">{{info.startAt}}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Card",
  props: {
    info: {
      required: true,
      type: Object
    }
  },
  data() {
    return {
      contentKeys: [
        "total",
        "year",
        "retracement",
      ],
      labels: {
        total: "累计收益",
        year: "年化收益",
        retracement: "最大回馈",
        startAt: "开始时间"
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../common/style/common";

.card {
  padding: 26px;
  background: $bg-white;
  border-radius: 8px;
  .label {
    @include mini-text;
  }
  .value {
    @include h5;
    &.red {
      color: $rq-red; 
    }
    &.green {
      color: $rq-green; 
    }
  }
  &__wrapper {
    @include flex-item;
  }
  &__title {
    @include h4;
  }
  &__content {
    display: flex;
    margin-top: 30px;
    margin-bottom: 40px;
    &--item {
      display: inline-block;
      & + & {
        margin-left: 24px;
      }
    }
  }
  &__footer {
    text-align: right;
    .value {
      @include rg-text;
    }
  }

}
</style>