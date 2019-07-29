<template>
  <div class="personal-center">
    <div class="banner">
      <div class="bg">
        <img :src="testImage" alt="">
      </div>
      <div class="personal-center__block">
        <div class="avatar">
          <img :src="testImage" alt="">
        </div>
        <div class="content">
          <p class="title">
            {{account.name}}
            <i v-if="account.isFollow" class="rq-icons icon-heart"> </i>
            <i v-else class="rq-icons icon-follow"> </i>
          </p>
          <p>
            <span>{{labels.follow}}: </span>
            <span>{{account.follow}}</span>
            <span>{{labels.fans}}: </span>
            <span>{{account.fans}}</span>
          </p>
          <p>
            {{account.descrition}}
          </p>
        </div>
        <div class="else">
          <img :src="testImage" alt="">
        </div>
      </div>
    </div>
    <div
      v-for="(val, key) in contentKeys"
      :key="key"
      class="personal-center__block">
      <div class="title">
        {{labels[key]}}
        <a href="">{{labels.more}}</a>
      </div>
      <div
        v-if="info[key].length !== 0"
        class="card-list">
        <Component
          v-for="(item, idx) in info[key]"
          :class="'col-' + val.col"
          :key="idx"
          :is="val.component"
          :info="item"
        ></Component>
      </div>
      <Empty
        v-else
        :emptyLabel="labels[key]"
      ></Empty>
    </div>
  </div>
</template>

<script>
import images from "../assets/img/*.png";
import headerBtns from "../assets/dict/header";
import Card from "./components/Card";
import Topic from "./components/Topic";
import Follow from "./components/Follow";
import Empty from "./components/Empty";
import { getAccount } from "../api";

export default {
  name: "RqPersonalCenter",
  components: {
    Card,
    Topic,
    Follow,
    Empty
  },
  data() {
    return {
      images,
      testImage: "https://images.alphacoders.com/499/thumb-1920-499786.png",
      contentKeys: {
        subscribe: {
          col: 3,
          component: "Card"
        },
        share: {
          col: 3,
          component: "Card"
        },
        topic: {
          col: 2,
          component: "Topic"
        },
        follow: {
          col: 4,
          component: "Follow"
        },
        fans: {
          col: 4,
          component: "Follow"
        }
      },
      labels: {
        follow: "关注",
        fans: "粉丝",
        more: "更多 >",
        subscribe: "我的订阅",
        share: "分享的订阅",
        topic: "发表的主题"
      },
      account: {
        name: "金尾巴",
        follow: 2,
        fans: 300,
        isFollow: true,
        descrition: "这家伙很懒，什么也没有留下",
        level: 0
      },
      info: {
        subscribe: [{
          name: "这变成综合交易策略了",
          total: "16.07",
          year: "52.89",
          retracement: "21.11",
          startAt: "2019-10-10"
        }, {
          name: "这变成综合交易策略了",
          total: "16.07",
          year: "52.89",
          retracement: "21.11",
          startAt: "2019-10-10"
        }, {
          name: "这变成综合交易策略了",
          total: "16.07",
          year: "52.89",
          retracement: "21.11",
          startAt: "2019-10-10"
        }, {
          name: "这变成综合交易策略了",
          total: "16.07",
          year: "52.89",
          retracement: "21.11",
          startAt: "2019-10-10"
        }, {
          name: "这变成综合交易策略了",
          total: "16.07",
          year: "52.89",
          retracement: "21.11",
          startAt: "2019-10-10"
        }, {
          name: "这变成综合交易策略了",
          total: "16.07",
          year: "52.89",
          retracement: "21.11",
          startAt: "2019-10-10"
        }],
        share: [{
          name: "这变成综合交易策略了",
          total: "16.07",
          year: "52.89",
          retracement: "21.11",
          startAt: "2019-10-10"
        }, {
          name: "这变成综合交易策略了",
          total: "16.07",
          year: "52.89",
          retracement: "21.11",
          startAt: "2019-10-10"
        }, {
          name: "这变成综合交易策略了",
          total: "16.07",
          year: "52.89",
          retracement: "21.11",
          startAt: "2019-10-10"
        }, {
          name: "这变成综合交易策略了",
          total: "16.07",
          year: "52.89",
          retracement: "21.11",
          startAt: "2019-10-10"
        }, {
          name: "这变成综合交易策略了",
          total: "16.07",
          year: "52.89",
          retracement: "21.11",
          startAt: "2019-10-10"
        }, {
          name: "这变成综合交易策略了",
          total: "16.07",
          year: "52.89",
          retracement: "21.11",
          startAt: "2019-10-10"
        }],
        topic: [{
          name: "抢跑者的脚步声--基于价量互动的选股因子",
          avatar: "https://images.alphacoders.com/499/thumb-1920-499786.png",
          author: {
            name: "HooH",
            uid: ""
          },
          // 发表于
          createAt: "2018-02-10 18.03.01",
          lastRepeat: "2018-02-10 18.03.01",
          chat: 3,
          view: 3546,
          like: 5,
          chart: 233
        }, {
          name: "抢跑者的脚步声--基于价量互动的选股因子",
          avatar: "https://images.alphacoders.com/499/thumb-1920-499786.png",
          author: {
            name: "HooH",
            uid: ""
          },
          // 发表于
          createAt: "2018-02-10 18.03.01",
          lastRepeat: "2018-02-10 18.03.01",
          chat: 3,
          view: 3546,
          like: 5,
          chart: 233
        }, {
          name: "抢跑者的脚步声--基于价量互动的选股因子",
          avatar: "https://images.alphacoders.com/499/thumb-1920-499786.png",
          author: {
            name: "HooH",
            uid: ""
          },
          // 发表于
          createAt: "2018-02-10 18.03.01",
          lastRepeat: "2018-02-10 18.03.01",
          chat: 3,
          view: 3546,
          like: 5,
          chart: 233
        }, {
          name: "抢跑者的脚步声--基于价量互动的选股因子",
          avatar: "https://images.alphacoders.com/499/thumb-1920-499786.png",
          author: {
            name: "HooH",
            uid: ""
          },
          // 发表于
          createAt: "2018-02-10 18.03.01",
          lastRepeat: "2018-02-10 18.03.01",
          chat: 3,
          view: 3546,
          like: 5,
          chart: 233
        }],
        follow: [{
          name: "Michael Shi",
          avatar: "https://images.alphacoders.com/499/thumb-1920-499786.png" 
        }, {
          name: "Michael Shi",
          avatar: "https://images.alphacoders.com/499/thumb-1920-499786.png" 
        }, {
          name: "Michael Shi",
          avatar: "https://images.alphacoders.com/499/thumb-1920-499786.png" 
        }, {
          name: "Michael Shi",
          avatar: "https://images.alphacoders.com/499/thumb-1920-499786.png" 
        }],
        fans: [{
          name: "Michael Shi",
          avatar: "https://images.alphacoders.com/499/thumb-1920-499786.png" 
        }, {
          name: "Michael Shi",
          avatar: "https://images.alphacoders.com/499/thumb-1920-499786.png" 
        }, {
          name: "Michael Shi",
          avatar: "https://images.alphacoders.com/499/thumb-1920-499786.png" 
        }, {
          name: "Michael Shi",
          avatar: "https://images.alphacoders.com/499/thumb-1920-499786.png" 
        }]
      }
    }
  },
  async mounted() {
    const {code, userData} = await getAccount(391952);
    if (code === 0) {
      this.account.name = userData.username,
      this.account.avatar = userData.picture,
      this.account.descrition = userData.signature,
      this.account.isFollow = userData.isFollowing,
      this.account.level = userData.level
    }
  },
  methods: {
    openDropdown(idx) {
      if (!this.btnConfig[idx].links) {
        return;
      }
      this.$set(this.btnConfig[idx], 'active', !this.btnConfig[idx].active);
    },
    closeDropdown(idx) {
      if (!this.btnConfig[idx].links) {
        return;
      }
      this.$set(this.btnConfig[idx], 'active', false);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../common/style/common";

::v-deep {
  // @include debug;
}
.personal-center {
  width: 100vw;
  min-width: $min-vw;
  @include f-column;
  background: $container-bg;
  padding-bottom: 40px;
  &__block {
    position: relative;
    padding-top: 40px;
    width: $article-width;
  }
  .banner {
    position: relative;
    width: 100%;
    height: 280px;
    .personal-center__block {
      position: relative;
      padding: 0;
      display: flex;
      @include m-center;
      height: 100%;
      align-items: center;
      background: transparent;
    }
    .bg {
      position: absolute;
      width: 100%;
      height: 100%;
      overflow: hidden;
      img {
        @include img-center;
      }
    }
    .avatar {
      width: 146px;
      height: 146px;
      background: $avatar-bg;
      overflow: hidden;
      border-radius: 50%;
      img {
        @include img-center;
      }
    }
    .content {
      flex: 1;
      padding: 0 30px;
      p {
        @include text($text-white);
        &.title {
          @include h3($text-white);
          vertical-align: center;
          & + p {
            margin-top: 24px;
          }
        }
      }
      p + p {
        margin-top: 12px;
      }
      .rq-icons {
        margin-left: 14px;
        &.icon-heart {
          color: $highlight;
        }
      }
    }
    .else {
      width: 160px;
      height: 170px;
      overflow: hidden;
      img {
        @include img-center;
      }
    }
  }
  .title {
    @include h3;
    margin-left: 6px;
    a {
      margin-left: 14px;
      text-decoration: none;
      @include text;
    }
  }
  .card-list {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
