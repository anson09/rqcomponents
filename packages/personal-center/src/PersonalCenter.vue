<template>
  <div class="personal-center">
    <div class="banner">
      <div class="bg">
        <img :src="banner" alt="">
      </div>
      <div class="personal-center__block">
        <div class="avatar">
          <transition name="rq-fade-in-linear">
            <img v-if="account.avatar" :src="account.avatar" alt="">
          </transition>
        </div>
        <div class="content">
          <p class="title">
            {{account.name}}
            <i v-if="account.isFollow" class="rq-icons icon-heart" @click="follow(false)"></i>
            <i v-else class="rq-icons icon-follow" @click="follow(true)"></i>
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
        <div class="level">
          <transition-group name="rq-fade-in-linear">
            <img
              class="level-img"
              v-for="(level, idx) in labels.level"
              v-show="idx === account.level - 1"
              :key="level.label"
              :src="level.image" alt="">
          </transition-group>
        </div>
      </div>
    </div>
    <div
      v-for="(val, key) in contentKeys"
      :key="key"
      class="personal-center__block">
      <div class="title">
        {{labels[key]}}
      </div>
        <div
          v-if="info[key].length !== 0"
          class="wrapper">
          <div
            class="card-list">
              <Component
                v-for="(item, idx) in info[key]"
                :class="'col-' + val.col"
                :key="idx"
                :is="val.component"
                :info="item"
                @redirect="redirect"
              ></Component>
          </div>
          <div class="card-pagination" 
            v-if="contentKeys[key].pages >= 1"
          >
            <div
              v-for="(page, idx) in
                createPagination(contentKeys[key].page, contentKeys[key].pages)"
              :key="idx"
              @click="pageChange(key, page)"
              :class="['card-pagination-item', {active: contentKeys[key].page === page}]">
              {{page}}
            </div>
          </div>
        </div>
        <Empty
          v-else
          :emptyLabel="labels[key]"
        ></Empty>
    </div>
  </div>
</template>

<script>
import Card from "./components/Card.vue";
import Topic from "./components/Topic.vue";
import Follow from "./components/Follow.vue";
import Empty from "./components/Empty.vue";
import bannerImage from "../assets/img/banner.png";
import bronzeImage from "../assets/img/bronze.png";
import goldImage from "../assets/img/gold.png";
import diamondImage from "../assets/img/diamond.png";
import kingImage from "../assets/img/king.png";
import {
  getAccount,
  getSubscribe,
  getShare,
  getTopic,
  getFollow,
  getFans
} from "../api";
import { fmtDate, fmtDatetime } from "../../common/util";

export default {
  name: "RqPersonalCenter",
  components: {
    Card,
    Topic,
    Follow,
    Empty
  },
  props: {
    uid: {
      required: true,
      type: Number
    }
  },
  data() {
    return {
      banner: bannerImage,
      contentKeys: {
        subscribe: {
          pages: 0,
          page: 1,
          col: 3,
          component: "Card",
          handler: "loadSubscribeData",
          api: getSubscribe
        },
        share: {
          pages: 0,
          page: 1,
          col: 3,
          component: "Card",
          handler: "loadShareData",
          api: getShare
        },
        topic: {
          pages: 0,
          page: 1,
          col: 2,
          component: "Topic",
          handler: "loadTopicData",
          api: getTopic
        },
        follow: {
          pages: 0,
          page: 1,
          col: 4,
          component: "Follow",
          handler: "loadFollowData",
          api: getFollow
        },
        fans: {
          pages: 0,
          page: 1,
          col: 4,
          component: "Follow",
          handler: "loadFansData",
          api: getFans
        }
      },
      labels: {
        follow: "关注",
        fans: "粉丝",
        subscribe: "我的订阅",
        share: "分享的订阅",
        topic: "发表的主题",
        level: [{
          label: "青铜韭菜",
          image: bronzeImage
        }, {
          label: "黄金矿工",
          image: goldImage
        }, {
          label: "钻石强者",
          image: diamondImage
        }, {
          label: "量化王者",
          image: kingImage
        }]
      },
      account: {
        name: "金尾巴",
        avatar: "",
        follow: 2,
        fans: 300,
        isFollow: false,
        descrition: "这家伙很懒，什么也没有留下",
        level: 1
      },
      info: {
        subscribe: [],
        share: [],
        topic: [],
        follow: [],
        fans: []
      }
    }
  },
  async mounted() {
    this.loadData(this.uid);
  },
  watch: {
    uid: {
      handler(val) {
        this.loadData(val);
      }
    }
  },
  methods: {
    createPagination(now, total) {
      if (total <= 1) {
        return [];
      }
      let count = now - 3;
      const res = [];
      for (let i = 1; i <= 5; i++) {
        const point = count + i;
        if (point > 1 && point < total) {
          res.push(point);
        }
      }
      if (res.includes(2)) {
        res.unshift(1);
      } else {
        res.unshift(1, '...');
      }
      if (res.includes(total - 1)) {
        res.push(total);
      } else {
        res.push('...', total);
      }
      return res;
    },
    pageChange(key, nextPage) {
      const { page, handler } = this.contentKeys[key];
      if (!isNaN(nextPage) && (nextPage) !== page) {
        this[handler](this.uid, nextPage);
      }
    },
    loadData(uid) {
      this.loadAccountData(uid);
      this.loadSubscribeData(uid);
      this.loadShareData(uid);
      this.loadTopicData(uid);
      this.loadFansData(uid);
      this.loadFollowData(uid);
    },
    initAlgoData(key, {count, data}) {
      const fmtPercent = num => ({
        type: num >= 0 ? 'red' : 'green',
        val: (num * 100).toFixed(2)
      });
      if (count) {
        this.contentKeys[key].pages = Math.ceil(count / (this.contentKeys[key].col * 3));
      }
      this.info[key] = data.map(e => ({
          algoId: e["algo-id"],
          name: e.title,
          year: fmtPercent(e.annualizedReturn),
          total: fmtPercent(e.totalReturn),
          retracement: {...fmtPercent(e.maximumDrawdown), type: 'default'},
          startAt: fmtDate(e.runStartTimestamp)
      }));
    },
    async loadAccountData(uid) {
      const paramsList = {
        name: ["userInfo", "username"],
        avatar: ["userInfo", "picture"],
        descrition: ["userInfo", "signature"],
        follow: ["userInfo", "followingCount"],
        fans: ["userInfo", "followerCount"],
        isFollow: ["userInfo", "isFollowing"],
        level: ["level"],
      }
      const { data: {code, userData} } = await getAccount(uid);
      if (code === 0) {
        Object.entries(paramsList).map(([key, path]) => {
          const val = path.length === 1 ?
            userData[path[0]]
            : path.reduce((a, b) => {
              if (typeof a === "string") {
                return userData[a][b];
              } else {
                return a[b];
              }
            });
          this.account[key] = val !== ""  ? val : this.account[key];
        })
      }
    },
    pageUpdate(key, page, count) {
      this.contentKeys[key].page = page;
      this.contentKeys[key].pages = Math.ceil(count / (this.contentKeys[key].col * 3));
    },
    async loadTopicData(uid, page=1) {
      const key = "topic";
      const { col, api } = this.contentKeys[key];
      const {topics, count} = await api(uid, page, col * 3);
      this.pageUpdate(key, page, count);
      this.info.topic = topics.map(e => {
        return {
          tid: e.tid,
          createAt: fmtDatetime(e.timestamp),
          lastRepeat: fmtDatetime(e.relativeTime),
          name: e.title,
          author: {
            name: e.user.username,
            avatar: e.user.picture,
            uid: e.user.uid
          },
          chat: e.postcount,
          view: e.viewcount,
          like: e.votes,
          chart: e.clone
        }
      });
    },
    initFollowingData(key, uid, countKey, page=1) {
      const { col, api } = this.contentKeys[key];
      return api(uid, page, col * 3).then((res) => {
        this.pageUpdate(key, page, res[countKey]);
        this.info[key] = res.users.map(e => {
          return {
            name: e.username,
            avatar: e.picture,
            uid: e.uid
          }
        });
      });
    },
    loadFollowData(uid, page=1) {
      const key = "follow";
      this.initFollowingData(key, uid, "followingCount", page);
    },
    loadFansData(uid, page=1) {
      const key = "fans";
      this.initFollowingData(key, uid, "followerCount", page);
    },
    async loadShareData(uid, page) {
      const data = await getShare(uid, page);
      this.initAlgoData("share", data);
    },
    async loadSubscribeData(uid, page) {
      const data = await getSubscribe(uid, page);
      this.initAlgoData("subscribe", data);
    },
    follow(follow=true) {
      this.$emit("follow", this.uid, follow);
      this.account.isFollow = follow;
    },
    redirect(...path) {
      this.$emit("redirect", ...path);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../common/style/common/index.scss";

::v-deep {
  // @include debug;
}
.personal-center {
  width: 100%;
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
          margin-left: 0;
          vertical-align: center;
          & + p {
            margin-top: 24px;
          }
          i {
            @include hover-scale;
          }
        }
      }
      span:nth-child(2n) {
        margin-right: 14px;
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
    .level {
      width: 170px;
      height: 170px;
      overflow: hidden;
      @include hover-scale;
      .level-img {
        @include img-center;
      }
    }
  }
  .title {
    @include h3;
    margin-left: 6px;
  }
  .card{
    &-list {
      display: flex;
      flex-wrap: wrap;
    }
    &-pagination {
      display: flex;
      width: 100%;
      justify-content: center;
      margin-top: 30px;
      margin-bottom: 46px;
      &-item {
        color: $highlight;
        width: 32px;
        height: 32px;
        text-align:center;
        line-height: 32px;
        border-radius: 50%;
        cursor: pointer;
        &.active {
          background: $highlight;
          color: $bg-white;
        }
      }
    }
  }
}
</style>
