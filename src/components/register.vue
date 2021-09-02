<template>
  <div class="page-register" :style="mypagestyle">
    <article class="header">
      <header class="header">
        <el-avatar icon="el-icon-user-solid" shape="circle"></el-avatar>
        <span class="login">
          <em class="bold">已有账号？</em>
          <a href="/login">
            <el-button type="primary" size="small">登录</el-button>
          </a>
        </span>
      </header>
    </article>
    <el-steps :active="active" finish-status="success">
      <el-step title="步骤 1"></el-step>
      <el-step title="步骤 2"></el-step>
    </el-steps>

    <section>
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="100px"
        class="demo-ruleForm"
        autocomplete="off"
      >
        <div v-if="active == 0">
          <el-form-item prop="textarea">
            <el-input
              :value="ruleForm.textarea"
              type="textarea"
              :rows="10"
              :readonly="true"
            >
            </el-input>
          </el-form-item>
          <el-form-item prop="agreed">
            <el-checkbox v-model="ruleForm.agreed">同意注册协议</el-checkbox>
          </el-form-item>
        </div>
        <div v-if="active == 1">
          <el-form-item label="用户名" prop="name">
            <el-input v-model="ruleForm.name" />
          </el-form-item>
          <el-form-item label="手机号" prop="mobile">
            <el-input v-model="ruleForm.mobile" />
            <el-button size="mini" round @click="sendMsg">发送验证码</el-button>
            <span class="status">{{ statusMsg }}</span>
          </el-form-item>
          <el-form-item label="验证码" prop="code">
            <el-input v-model="ruleForm.code" maxlength="4" />
          </el-form-item>
          <el-form-item label="密码" prop="pwd">
            <el-input v-model="ruleForm.pwd" type="password" />
          </el-form-item>
          <el-form-item label="确认密码" prop="cpwd">
            <el-input v-model="ruleForm.cpwd" type="password" />
          </el-form-item>
        </div>
      </el-form>
      <div id="aplayer"></div>
    </section>
    <div class="footer">
      <el-button
        v-if="active > 0"
        type="primary"
        icon="el-icon-arrow-left"
        @click="prev"
        >上一步</el-button
      >
      <el-button
        v-if="active < step - 1"
        type="primary"
        icon="el-icon-arrow-right"
        @click="next"
        >下一步</el-button
      >
      <el-button v-if="active == step - 1" type="primary" @click="register"
        >同意以下协议并注册</el-button
      >
      <div class="error">{{ error }}</div>
    </div>
    <div id="aplayer"></div>
  </div>
</template>

<script>
import APlayer from "aplayer";
export default {
  data() {
    return {
      mypagestyle: {
        // color: "yellow",
        "background-image": "",
        "background-size": "cover",
      },
      step: 2,
      active: 0,
      statusMsg: "",
      error: "",
      ruleForm: {
        textarea: "请仔细阅读以下协议",
        agreed: false,
        name: "",
        code: "",
        pwd: "",
        cpwd: "",
        mobile: "",
      },
      rules: {
        agreed: [
          {
            validator: (rule, value, callback) => {
              console.log("value:" + value);
              if (value !== true) {
                callback(new Error("请确认同意注册协议"));
              } else {
                callback();
              }
            },
            trigger: "blur",
          },
        ],
        name: [
          {
            required: true,
            type: "string",
            message: "请输入用户名",
            trigger: "blur",
          },
        ],
        mobile: [
          {
            required: true,
            message: "请输入手机号",
            trigger: "blur",
          },
          {
            pattern: /^1(3|4|5|7|8|9)\d{9}$/,
            message: "手机号格式错误",
            trigger: "blur",
          },
        ],
        pwd: [
          {
            required: true,
            message: "创建密码",
            trigger: "blur",
          },
        ],
        cpwd: [
          {
            required: true,
            message: "确认密码",
            trigger: "blur",
          },
          {
            validator: (rule, value, callback) => {
              if (value === "") {
                callback(new Error("请再次输入密码"));
              } else if (value !== this.ruleForm.pwd) {
                callback(new Error("两次输入密码不一致"));
              } else {
                callback();
              }
            },
            trigger: "blur",
          },
        ],
      },
    };
  },
  layout: "blank",
  mounted() {
    this.$axiosbili.post("/bg/image/img").then((res) => {
      this.mypagestyle["background-image"] =
        "url(" + res.data.data.img.url + ")";
      console.log(res.data.data.img.url);
    });

    const ap = new APlayer({
      container: document.getElementById("aplayer"),
      listFolded: false,
      listMaxHeight: 90,
      fixed: true,
      autoplay: true,
      preload: "auto",
      lrcType: 3,
      audio: [
        {
          name: "ninelie",
          artist: "Aimer,EGOIST ",
          url: "https://redblack.oss-cn-beijing.aliyuncs.com/Aimer%20(%E3%82%A8%E3%83%A1)%20_%20Chelly%20-%20ninelie.mp3",
          cover: "https://redblack.oss-cn-beijing.aliyuncs.com/ninelie.jpg",
          lrc: "https://redblack.oss-cn-beijing.aliyuncs.com/ninelie%20-%20Aimer%2CEGOIST.lrc",
          theme: "#46718b",
        },
        {
          name: "中国有流行",
          artist: "葛东琪",
          url: "https://redblack.oss-cn-beijing.aliyuncs.com/%E8%91%9B%E4%B8%9C%E7%90%AA%20-%20%E4%B8%AD%E5%9B%BD%E6%9C%89%E6%B5%81%E8%A1%8C.mp3",
          lrc: "https://redblack.oss-cn-beijing.aliyuncs.com/%E4%B8%AD%E5%9B%BD%E6%9C%89%E6%B5%81%E8%A1%8C%20-%20%E8%91%9B%E4%B8%9C%E7%90%AA.lrc",
          cover:
            "https://redblack.oss-cn-beijing.aliyuncs.com/%E4%B8%AD%E5%9B%BD%E6%9C%89%E6%B5%81%E8%A1%8C.jpg",
          theme: "#46718b",
        },
        {
          name: "前前前世",
          artist: "君の名は",
          url: "https://redblack.oss-cn-beijing.aliyuncs.com/RADWIMPS%20(%E3%83%A9%E3%83%83%E3%83%89%E3%82%A6%E3%82%A3%E3%83%B3%E3%83%97%E3%82%B9)%20-%20%E5%89%8D%E5%89%8D%E5%89%8D%E4%B8%96%20(Movie%20ver_).flac",
          cover:
            "https://redblack.oss-cn-beijing.aliyuncs.com/%E5%89%8D%E5%89%8D%E4%B8%96%E4%B8%96.jpg",
          lrc: "https://redblack.oss-cn-beijing.aliyuncs.com/%E5%89%8D%E5%89%8D%E5%89%8D%E4%B8%96%20(movie%20ver.)%20-%20RADWIMPS.lrc",
        },
        {
          name: "See You Again",
          artist: "Wiz Khalifa,Charlie Puth ",
          url: "https://redblack.oss-cn-beijing.aliyuncs.com/Wiz%20Khalifa%20_%20Charlie%20Puth%20-%20See%20You%20Again%20(feat_%20Charlie%20Puth).flac",
          cover:
            "https://redblack.oss-cn-beijing.aliyuncs.com/see%20you%20again.jpg",
          lrc: "https://redblack.oss-cn-beijing.aliyuncs.com/See%20You%20Again%20-%20Wiz%20Khalifa%2CCharlie%20Puth.lrc",
          theme: "#46718b",
        },
        {
          name: "还是会想你",
          artist: "林达浪,h3R3 ",
          url: "https://redblack.oss-cn-beijing.aliyuncs.com/%E6%9E%97%E8%BE%BE%E6%B5%AA%2Ch3R3%20-%20%E8%BF%98%E6%98%AF%E4%BC%9A%E6%83%B3%E4%BD%A0.mp3",
          cover:
            "https://redblack.oss-cn-beijing.aliyuncs.com/%E8%BF%98%E6%98%AF%E4%BC%9A%E6%83%B3%E4%BD%A0.jpg",
          lrc: "https://redblack.oss-cn-beijing.aliyuncs.com/%E8%BF%98%E6%98%AF%E4%BC%9A%E6%83%B3%E4%BD%A0%20-%20%E6%9E%97%E8%BE%BE%E6%B5%AA%2Ch3R3.lrc",
          theme: "#46718b",
        },
        {
          name: "心如止水",
          artist: "Ice Paper ",
          url: "https://redblack.oss-cn-beijing.aliyuncs.com/Ice%20Paper%20-%20%E5%BF%83%E5%A6%82%E6%AD%A2%E6%B0%B4.mp3",
          cover:
            "https://redblack.oss-cn-beijing.aliyuncs.com/%E5%BF%83%E5%A6%82%E6%AD%A2%E6%B0%B4.jpg",
          lrc: "https://redblack.oss-cn-beijing.aliyuncs.com/%E5%BF%83%E5%A6%82%E6%AD%A2%E6%B0%B4%20-%20Ice%20Paper.lrc",
          theme: "#46718b",
        },
      ],
    });
    // setTimeout(() => {
    //   this.handleLogin();
    // }, 3000);
  },
  methods: {
    sendMsg: function () {
      const self = this;
      let namePass;
      let mobilePass;
      if (self.timerid) {
        return false;
      }
      this.$refs["ruleForm"].validateField("name", (valid) => {
        namePass = valid;
      });
      self.statusMsg = "";
      if (namePass) {
        return false;
      }
      this.$refs["ruleForm"].validateField("mobile", (valid) => {
        mobilePass = valid;
      });
      // 模拟验证码发送
      if (!namePass && !mobilePass) {
        let count = 60;
        self.statusMsg = `验证码已发送,剩余${count--}秒`;
        self.timerid = setInterval(function () {
          self.statusMsg = `验证码已发送,剩余${count--}秒`;
          if (count === 0) {
            clearInterval(self.timerid);
          }
        }, 1000);
      }
      if (mobilePass) {
        return false;
      } else {
        this.$axiosbili
          .post(
            "https://www.fastmock.site/mock/9622fedc10c4460c973964c75742c970/bda01/api/code/varification"
          )
          .then((res) => {
            this.ruleForm.code = res.data.code;
          });
      }
    },

    next: function () {
      if (this.active === 0) {
        this.$refs["ruleForm"].validateField("agreed", (valid) => {
          if (valid === "") {
            this.active++;
          }
        });
      }
    },
    prev: function () {
      if (--this.active < 0) this.active = 0;
    },

    // 模拟登录
    register: function () {
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          const ap = new APlayer({
            container: document.getElementById("aplayer"),
            listFolded: false,
            listMaxHeight: 90,
            fixed: true,
            autoplay: true,
            preload: "auto",
            lrcType: 3,
            audio: [
              {
                name: "ninelie",
                artist: "Aimer,EGOIST ",
                url: "https://redblack.oss-cn-beijing.aliyuncs.com/Aimer%20(%E3%82%A8%E3%83%A1)%20_%20Chelly%20-%20ninelie.mp3",
                cover:
                  "https://redblack.oss-cn-beijing.aliyuncs.com/ninelie.jpg",
                lrc: "https://redblack.oss-cn-beijing.aliyuncs.com/ninelie%20-%20Aimer%2CEGOIST.lrc",
                theme: "#46718b",
              },
              {
                name: "中国有流行",
                artist: "葛东琪",
                url: "https://redblack.oss-cn-beijing.aliyuncs.com/%E8%91%9B%E4%B8%9C%E7%90%AA%20-%20%E4%B8%AD%E5%9B%BD%E6%9C%89%E6%B5%81%E8%A1%8C.mp3",
                lrc: "https://redblack.oss-cn-beijing.aliyuncs.com/%E4%B8%AD%E5%9B%BD%E6%9C%89%E6%B5%81%E8%A1%8C%20-%20%E8%91%9B%E4%B8%9C%E7%90%AA.lrc",
                cover:
                  "https://redblack.oss-cn-beijing.aliyuncs.com/%E4%B8%AD%E5%9B%BD%E6%9C%89%E6%B5%81%E8%A1%8C.jpg",
                theme: "#46718b",
              },
              {
                name: "前前前世",
                artist: "君の名は",
                url: "https://redblack.oss-cn-beijing.aliyuncs.com/RADWIMPS%20(%E3%83%A9%E3%83%83%E3%83%89%E3%82%A6%E3%82%A3%E3%83%B3%E3%83%97%E3%82%B9)%20-%20%E5%89%8D%E5%89%8D%E5%89%8D%E4%B8%96%20(Movie%20ver_).flac",
                cover:
                  "https://redblack.oss-cn-beijing.aliyuncs.com/%E5%89%8D%E5%89%8D%E4%B8%96%E4%B8%96.jpg",
                lrc: "https://redblack.oss-cn-beijing.aliyuncs.com/%E5%89%8D%E5%89%8D%E5%89%8D%E4%B8%96%20(movie%20ver.)%20-%20RADWIMPS.lrc",
              },
              {
                name: "See You Again",
                artist: "Wiz Khalifa,Charlie Puth ",
                url: "https://redblack.oss-cn-beijing.aliyuncs.com/Wiz%20Khalifa%20_%20Charlie%20Puth%20-%20See%20You%20Again%20(feat_%20Charlie%20Puth).flac",
                cover:
                  "https://redblack.oss-cn-beijing.aliyuncs.com/see%20you%20again.jpg",
                lrc: "https://redblack.oss-cn-beijing.aliyuncs.com/See%20You%20Again%20-%20Wiz%20Khalifa%2CCharlie%20Puth.lrc",
                theme: "#46718b",
              },
              {
                name: "还是会想你",
                artist: "林达浪,h3R3 ",
                url: "https://redblack.oss-cn-beijing.aliyuncs.com/%E6%9E%97%E8%BE%BE%E6%B5%AA%2Ch3R3%20-%20%E8%BF%98%E6%98%AF%E4%BC%9A%E6%83%B3%E4%BD%A0.mp3",
                cover:
                  "https://redblack.oss-cn-beijing.aliyuncs.com/%E8%BF%98%E6%98%AF%E4%BC%9A%E6%83%B3%E4%BD%A0.jpg",
                lrc: "https://redblack.oss-cn-beijing.aliyuncs.com/%E8%BF%98%E6%98%AF%E4%BC%9A%E6%83%B3%E4%BD%A0%20-%20%E6%9E%97%E8%BE%BE%E6%B5%AA%2Ch3R3.lrc",
                theme: "#46718b",
              },
              {
                name: "心如止水",
                artist: "Ice Paper ",
                url: "https://redblack.oss-cn-beijing.aliyuncs.com/Ice%20Paper%20-%20%E5%BF%83%E5%A6%82%E6%AD%A2%E6%B0%B4.mp3",
                cover:
                  "https://redblack.oss-cn-beijing.aliyuncs.com/%E5%BF%83%E5%A6%82%E6%AD%A2%E6%B0%B4.jpg",
                lrc: "https://redblack.oss-cn-beijing.aliyuncs.com/%E5%BF%83%E5%A6%82%E6%AD%A2%E6%B0%B4%20-%20Ice%20Paper.lrc",
                theme: "#46718b",
              },
            ],
          });
          ap.destroy();
          setTimeout(this.$router.push("/login"), 2000);
        }
      });
    },
  },
};
</script>

<style  rel="stylesheet/scss" lang="scss">
.page-register {
  // background-image: url("../assets/login_images/register.gif");
  width: 100%;
  height: 100%;
  //  cover no-repeat;
  .header {
    //border-bottom: 2px solid rgb(235, 232, 232);
    min-width: 980px;
    color: white;

    header {
      margin: 0 auto;
      padding: 10px 0;
      width: 980px;

      .login {
        float: right;
      }

      .bold {
        font-style: normal;
      }
    }
  }

  .register {
    color: #1890ff;
  }

  a {
    color: #1890ff;
    text-decoration: none;
    background-color: transparent;
    outline: none;
    cursor: pointer;
    transition: color 0.3s;
  }

  > section {
    margin: 0 auto 30px;
    padding-top: 30px;
    width: 980px;
    min-height: 300px;
    padding-right: 550px;
    box-sizing: border-box;

    .status {
      font-size: 12px;
      margin-left: 20px;
      color: #e6a23c;
    }

    .error {
      color: red;
    }
  }

  .footer {
    text-align: center;
  }
  .el-step__title.is-process {
    font-weight: 700;
    /* color: #303133; */
    color: white;
  }
}
</style>
