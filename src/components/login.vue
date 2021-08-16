<template>
  <div class="login-container" :style="mypagestyle">
    <div>
      <el-button>
        <span>{{ dateFormat(newDate) }}</span>
      </el-button>
    </div>
    <el-row>
      <el-col :xs="24" :sm="24" :md="12" :lg="16" :xl="16">
        <div style="color: transparent">占位符</div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
        <el-form
          ref="form"
          :model="form"
          :rules="rules"
          class="login-form"
          label-position="left"
          show-message
        >
          <div class="title">欢迎进入</div>
          <div class="line" />
          <div class="title-tips">我的王国！{{ title }}！</div>
          <el-form-item label="用户名" style="margin-top: 20px" prop="username">
            <span class="svg-container svg-container-admin">
              <vab-icon :icon="['fas', 'user']" />
            </span>
            <el-input
              v-model.trim="form.username"
              v-focus
              placeholder="请输入用户名"
              tabindex="1"
              type="text"
            />
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <span class="svg-container">
              <vab-icon :icon="['fas', 'lock']" />
            </span>
            <el-input
              :key="passwordType"
              ref="password"
              v-model.trim="form.password"
              :type="passwordType"
              tabindex="2"
              placeholder="请输入密码"
              @keyup.enter.native="handleLogin"
            />
            <span
              v-if="passwordType === 'password'"
              class="show-password"
              @click="handlePassword"
            >
              <vab-icon :icon="['fas', 'eye-slash']"></vab-icon>
            </span>
            <span v-else class="show-password" @click="handlePassword">
              <vab-icon :icon="['fas', 'eye']"></vab-icon>
            </span>
          </el-form-item>
          <!-- <el-checkbox v-model="form.rememberMe" style="margin: 0 0 25px 0">
            记住我
          </el-checkbox> -->
          <h5 class="usernametip">用户名：xzz</h5>
          <h5 class="passwardtip">密码：201016</h5>
          <el-button
            :loading="loading"
            class="login-btn"
            type="primary"
            @click="handleLogin"
          >
            登录
          </el-button>
          <router-link to="/register">
            <div style="margin-top: 20px" class="register">注册</div>
          </router-link>
        </el-form>
      </el-col>
    </el-row>
    <ElementLoading
      :active="isActive"
      :is-full-screen="true"
      text="加载中..."
      spinner="bar-fade-scale"
    >
      <img
        src="https://redblack.oss-cn-beijing.aliyuncs.com/loading1.gif"
        width="100px"
        height="100px"
      />
    </ElementLoading>

    <div id="aplayer"></div>
  </div>
</template>

<script>
import { isPassword } from "@/utils/validate";
import APlayer from "aplayer";
export default {
  name: "login",
  directives: {
    focus: {
      inserted(el) {
        el.querySelector("input").focus();
      },
    },
  },
  data() {
    const validateusername = (rule, value, callback) => {
      if ("" == value) {
        callback(new Error("用户名不能为空"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (!isPassword(value)) {
        callback(new Error("密码不能少于6位"));
      } else {
        callback();
      }
    };
    return {
      isActive: false,
      mypagestyle: {
        // color: "yellow",
        "background-image": "",
      },
      newDate: new Date(),
      nodeEnv: process.env.NODE_ENV,
      title: this.$baseTitle,
      form: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          {
            required: true,
            trigger: "blur",
            message: "账号不能为空！",
            validator: validateusername,
          },
        ],
        password: [
          {
            required: true,
            trigger: "blur",
            message: "密码不能为空！",
            validator: validatePassword,
          },
        ],
      },
      loading: false,
      passwordType: "password",
      redirect: undefined,
    };
  },
  watch: {
    $route: {
      handler(route) {
        this.redirect = (route.query && route.query.redirect) || "/";
      },
      immediate: true,
    },
  },
  created() {
    document.body.style.overflow = "hidden";
  },
  beforeDestroy() {
    document.body.style.overflow = "auto";
    if (this.timer) {
      clearInterval(this.timer);
    }
  },
  mounted() {
    this.$axiosbili.post("/bg/image/img").then((res) => {
      console.log(res.data);
      this.mypagestyle["background-image"] =
        "url(" + res.data.data.img.url + ")";
      console.log(res.data.data.img.url);
    });
    let that = this;
    this.timer = setInterval(function () {
      that.newDate = new Date().toLocaleString();
    });
    this.form.username = "xzz";
    this.form.password = "201016";
    const ap = new APlayer({
      container: document.getElementById("aplayer"),
      listFolded: false,
      listMaxHeight: 90,
      fixed: true,
      autoplay: false,
      preload: "auto",
      lrcType: 3,
      audio: [
        {
          name: "异人也",
          artist: "霍尊 ",
          url: "https://redblack.oss-cn-beijing.aliyuncs.com/%E9%9C%8D%E5%B0%8A%20-%20%E5%BC%82%E4%BA%BA%E4%B9%9F.mp3",
          cover:
            "https://redblack.oss-cn-beijing.aliyuncs.com/%E5%BC%82%E4%BA%BA%E4%B9%9F.jpg",
          lrc: "https://redblack.oss-cn-beijing.aliyuncs.com/%E5%BC%82%E4%BA%BA%E4%B9%9F%EF%BC%88%E3%80%8A%E4%B8%80%E4%BA%BA%E4%B9%8B%E4%B8%8B3%E3%80%8B%E6%A6%82%E5%BF%B5%E4%B8%BB%E9%A2%98%E6%9B%B2%EF%BC%89-%20%E9%9C%8D%E5%B0%8A.lrc",
          theme: "#46718b",
        },

        {
          name: "aLIEz - mizuki (瑞葵),SawanoHiroyuki[nZk]",
          artist: "aLIEz  ",
          url: "https://redblack.oss-cn-beijing.aliyuncs.com/mizuki%20(%E7%91%9E%E8%91%B5)%2CSawanoHiroyuki%5BnZk%5D%20-%20aLIEz.mp3",
          cover: "https://redblack.oss-cn-beijing.aliyuncs.com/aLIEz.jpg",
          lrc: "https://redblack.oss-cn-beijing.aliyuncs.com/aLIEz%20-%20mizuki%20(%E7%91%9E%E8%91%B5)%2CSawanoHiroyuki%5BnZk%5D.lrc",
          theme: "#46718b",
        },

        {
          name: "后退",
          artist: "梁根荣 ",
          url: "https://redblack.oss-cn-beijing.aliyuncs.com/%E6%A2%81%E6%A0%B9%E8%8D%A3%20-%20%E5%90%8E%E9%80%80.mp3",
          cover:
            "https://redblack.oss-cn-beijing.aliyuncs.com/%E5%90%8E%E9%80%80.jpg",
          lrc: "https://redblack.oss-cn-beijing.aliyuncs.com/%E5%90%8E%E9%80%80%20-%20%E6%A2%81%E6%A0%B9%E8%8D%A3.lrc",
          theme: "#46718b",
        },

        {
          name: "Take me hand (抓紧我的手)",
          artist: "DAISHI DANCE / Cécile Corbel   WONDER Tourism",
          url: "https://redblack.oss-cn-beijing.aliyuncs.com/Take%20me%20hand.mp3",
          cover:
            "https://redblack.oss-cn-beijing.aliyuncs.com/Take%20me%20Hand%20.jpg",
          lrc: "https://redblack.oss-cn-beijing.aliyuncs.com/Take%20me%20hand%20-%20DAISHI%20DANCE%2CC%C3%A9cile%20Corbel.lrc",
        },
        {
          name: "梦回还",
          artist: "呦猫UNEKO",
          url: "https://redblack.oss-cn-beijing.aliyuncs.com/%E5%91%A6%E7%8C%ABUNEKO%20-%20%E6%A2%A6%E5%9B%9E%E8%BF%98.mp3",
          lrc: "https://redblack.oss-cn-beijing.aliyuncs.com/%E6%A2%A6%E5%9B%9E%E8%BF%98%20-%20%E5%91%A6%E7%8C%ABUNEKO.lrc",
          cover:
            "https://redblack.oss-cn-beijing.aliyuncs.com/%E6%A2%A6%E5%9B%9E%E8%BF%98.jpg",
          theme: "#46718b",
        },
      ],
    });
    ap.play();
    // setTimeout(() => {
    //   this.handleLogin();
    // }, 3000);
  },
  methods: {
    dateFormat() {
      var date = new Date();
      var year = date.getFullYear();

      var month =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      var hours =
        date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      var minutes =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      var seconds =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      let week = date.getDay(); // 星期
      let weekArr = [
        "星期日",
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六",
      ];
      // 拼接 时间格式处理
      return (
        year +
        "年" +
        month +
        "月" +
        day +
        "日 " +
        hours +
        ":" +
        minutes +
        ":" +
        seconds +
        " " +
        weekArr[week]
      );
    },
    handlePassword() {
      this.passwordType === "password"
        ? (this.passwordType = "")
        : (this.passwordType = "password");
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },

    handlePost() {
      this.$axiosbili
        .post(
          "http://123.56.129.36:8082/api/login/user",
          this.$qs.stringify({
            name: this.form.username,
            password: this.form.password,
          })
        )
        .then((res) => {
          console.log(res);
          const ap = new APlayer({
            container: document.getElementById("aplayer"),
            llistFolded: false,
            listMaxHeight: 90,
            fixed: true,
            autoplay: true,
            preload: "auto",
            lrcType: 3,
            audio: [
              {
                name: "异人也",
                artist: "霍尊 ",
                url: "https://redblack.oss-cn-beijing.aliyuncs.com/%E9%9C%8D%E5%B0%8A%20-%20%E5%BC%82%E4%BA%BA%E4%B9%9F.mp3",
                cover:
                  "https://redblack.oss-cn-beijing.aliyuncs.com/%E5%BC%82%E4%BA%BA%E4%B9%9F.jpg",
                lrc: "https://redblack.oss-cn-beijing.aliyuncs.com/%E5%BC%82%E4%BA%BA%E4%B9%9F%EF%BC%88%E3%80%8A%E4%B8%80%E4%BA%BA%E4%B9%8B%E4%B8%8B3%E3%80%8B%E6%A6%82%E5%BF%B5%E4%B8%BB%E9%A2%98%E6%9B%B2%EF%BC%89-%20%E9%9C%8D%E5%B0%8A.lrc",
                theme: "#46718b",
              },
              {
                name: "aLIEz - mizuki (瑞葵),SawanoHiroyuki[nZk]",
                artist: "aLIEz  ",
                url: "https://redblack.oss-cn-beijing.aliyuncs.com/mizuki%20(%E7%91%9E%E8%91%B5)%2CSawanoHiroyuki%5BnZk%5D%20-%20aLIEz.mp3",
                cover: "https://redblack.oss-cn-beijing.aliyuncs.com/aLIEz.jpg",
                lrc: "https://redblack.oss-cn-beijing.aliyuncs.com/aLIEz%20-%20mizuki%20(%E7%91%9E%E8%91%B5)%2CSawanoHiroyuki%5BnZk%5D.lrc",
                theme: "#46718b",
              },

              {
                name: "后退",
                artist: "梁根荣 ",
                url: "https://redblack.oss-cn-beijing.aliyuncs.com/%E6%A2%81%E6%A0%B9%E8%8D%A3%20-%20%E5%90%8E%E9%80%80.mp3",
                cover:
                  "https://redblack.oss-cn-beijing.aliyuncs.com/%E5%90%8E%E9%80%80.jpg",
                lrc: "https://redblack.oss-cn-beijing.aliyuncs.com/%E5%90%8E%E9%80%80%20-%20%E6%A2%81%E6%A0%B9%E8%8D%A3.lrc",
                theme: "#46718b",
              },

              {
                name: "Take me hand (抓紧我的手)",
                artist: "DAISHI DANCE / Cécile Corbel   WONDER Tourism",
                url: "https://redblack.oss-cn-beijing.aliyuncs.com/Take%20me%20hand.mp3",
                cover:
                  "https://redblack.oss-cn-beijing.aliyuncs.com/Take%20me%20Hand%20.jpg",
              },
              {
                name: "梦回还",
                artist: "呦猫UNEKO",
                url: "https://redblack.oss-cn-beijing.aliyuncs.com/%E5%91%A6%E7%8C%ABUNEKO%20-%20%E6%A2%A6%E5%9B%9E%E8%BF%98.mp3",
                lrc: "https://redblack.oss-cn-beijing.aliyuncs.com/%E6%A2%A6%E5%9B%9E%E8%BF%98%20-%20%E5%91%A6%E7%8C%ABUNEKO.lrc",
                cover:
                  "https://redblack.oss-cn-beijing.aliyuncs.com/%E6%A2%A6%E5%9B%9E%E8%BF%98.jpg",
                theme: "#46718b",
              },
            ],
          });
          ap.destroy();
          this.isActive = false;
          this.$router.push(res.data.code === 20000 ? "/bilibili" : "/login");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleLogin() {
      this.isActive = true;
      setTimeout(() => {
        this.handlePost();
      }, 2000);
    },
  },
};
</script>

<style lang="scss" scoped>
.login-container {
  height: 100vh;

  background-size: cover;

  .aplayer-lrc {
    font-size: 20px;
  }

  .title {
    font-size: 54px;
    font-weight: 500;
    color: white;
    text-underline-position: below;
    // box-shadow: 0 0 5px 2px hsl(64, 68%, 69%);
  }
  /* 横线 */
  .line {
    float: right;
    width: 100%;
    height: 2px;
    margin-top: 0.5em;
    background: #d4c4c4;
    position: relative;
    text-align: center;
  }

  .title-tips {
    margin-top: 15px;
    font-size: 26px;
    font-weight: 400;
    color: rgb(255, 255, 255);
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .login-btn {
    display: inherit;
    width: 220px;
    height: 60px;
    margin-top: 5px;
    border: 0;

    &:hover {
      opacity: 0.9;
    }
  }

  .login-form {
    position: relative;
    max-width: 100%;
    margin: calc((100vh - 425px) / 2) 10% 10%;
    overflow: hidden;

    .forget-password {
      width: 100%;
      margin-top: 40px;
      text-align: left;

      .forget-pass {
        width: 129px;
        height: 19px;
        font-size: 20px;
        font-weight: 400;
        color: rgba(92, 102, 240, 1);
      }
    }
  }

  .tips {
    margin-bottom: 10px;
    font-size: $base-font-size-default;
    color: $base-color-white;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .title-container {
    position: relative;

    .title {
      margin: 0 auto 20px auto;
      font-size: 34px;
      font-weight: bold;
      color: $base-color-blue;
      text-align: center;
    }
  }

  .svg-container {
    position: absolute;
    top: 14px;
    left: 15px;
    z-index: $base-z-index;
    font-size: 16px;
    color: #d7dee3;
    cursor: pointer;
    user-select: none;
  }

  .show-password {
    position: absolute;
    top: 14px;
    right: 25px;
    font-size: 16px;
    color: #d7dee3;
    cursor: pointer;
    user-select: none;
  }

  ::v-deep {
    .el-form-item {
      padding-right: 0;
      margin: 20px 0;
      color: #454545;
      background: transparent;
      border: 1px solid transparent;
      border-radius: 2px;

      &__content {
        min-height: $base-input-height;
        line-height: $base-input-height;
      }

      &__error {
        position: absolute;
        top: 100%;
        left: 18px;
        font-size: $base-font-size-small;
        line-height: 18px;
        color: $base-color-red;
      }
    }

    .el-input {
      box-sizing: border-box;

      input {
        height: 58px;
        padding-left: 45px;
        font-size: $base-font-size-default;
        line-height: 58px;
        color: $base-font-color;
        background: #f6f4fc;
        border: 0;
        caret-color: $base-font-color;
      }
    }
    .usernametip {
      color: rgb(255, 255, 255);
      display: inline;
    }
    .passwardtip {
      display: inline;
      color: rgb(255, 255, 255);
      margin-left: 120px;
    }
    .register {
      color: rgb(255, 255, 255);
    }
  }
}
</style>
