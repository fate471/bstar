
<template>
  <div>
    <div class="info">
      <div class="info_board">
        <div class="info_board_title">
          <p>欢迎</p>
          <p>很高兴可以在这个网站运行的</p>
          <p>第{{ longTime }}遇见你</p>
          <p>你是运行以来的第{{ visitor_count }}位访客</p>
          <p>在这里你可以畅所欲言</p>
          <p>或者看看别人有什么想法</p>
        </div>
        <hr />
        <div class="info_board_form">
          <el-form label-position="top" :model="messageForm">
            <el-form-item label="请告诉我该如何称呼你">
              <el-input
                v-model="messageForm.name"
                placeholder="请输入你的昵称"
              ></el-input>
            </el-form-item>
            <el-form-item label="方便的话可以留个邮箱">
              <el-input
                v-model="messageForm.mailbox"
                placeholder="请输入你的邮箱"
              ></el-input>
            </el-form-item>
            <el-form-item label="然后告诉我你想说什么吧">
              <el-input
                type="textarea"
                v-model="messageForm.comment"
                placeholder="你也来说两句吧！在此输入留言内容"
              ></el-input>
            </el-form-item>
            <p class="tip">
              隐私说明：你的昵称以及留言内容会被公开展示，但邮箱不会
            </p>
            <el-button
              type="primary"
              plain
              class="btn"
              @click="submitMessage"
              :disabled="submiting"
              >给我留言</el-button
            >
          </el-form>
        </div>
      </div>
    </div>
    <div class="list">
      <el-button type="primary" plain @click="$router.push('/bilibili')"
        >返回</el-button
      >
      <h3 class="title">留言板</h3>
      <p class="title">已有 {{ allMessageList.length }} 人留言</p>
      <div class="message">
        <div
          v-for="(item, index) in showMessageList"
          :key="index"
          class="message_item"
        >
          <p class="message_item_name">{{ item.name }}</p>
          <p class="message_item_info">
            {{ item.createTime | dateFormat }}{{ item.city ? " 在 " : ""
            }}{{ item.city }} 说：
          </p>
          <p class="message_item_comment">{{ item.comment }}</p>
          <div class="message_item_list">
            <div class="mil_item">
              <img
                class="mil_item_img"
                @click="agree(item)"
                src="https://redblack.oss-cn-beijing.aliyuncs.com/flower.png"
                alt=""
              />
              <p class="mil_item_text">言之有理？送一束花</p>
              <p class="mil_item_text">(收到的鲜花数：{{ item.agree }})</p>
            </div>
            <div class="mil_item">
              <img
                class="mil_item_img"
                @click="disagree(item)"
                src="https://redblack.oss-cn-beijing.aliyuncs.com/tomato.png"
                alt=""
              />
              <p class="mil_item_text">觉得不对？扔个番茄</p>
              <p class="mil_item_text">(被扔的番茄数：{{ item.disagree }})</p>
            </div>
          </div>
        </div>
        <el-pagination
          background
          layout="prev, pager, next"
          :total="allMessageList.length"
          @current-change="handleChange"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "message",
  data() {
    return {
      longTime: "",
      agree_count: 0,
      disagree_count: 0,
      messageForm: {
        name: "",
        mailbox: "",
        comment: "",
      },
      loading: true,
      submiting: false,
      time: 0,
      start_date: "",
      visitor_count: 0,
      allMessageList: [],
      showMessageList: [],
    };
  },
  methods: {
    runTime: function () {
      //运行倒计时
      var that = this;
      var oldTime = new Date("2021/07/31 00:00:00");
      var timer = setInterval(function () {
        var nowTime = new Date();
        var longTime = nowTime - oldTime;
        var days = parseInt(longTime / 1000 / 60 / 60 / 24, 10); //计算剩余的天数
        var hours = parseInt((longTime / 1000 / 60 / 60) % 24, 10); //计算剩余的小时
        var minutes = parseInt((longTime / 1000 / 60) % 60, 10); //计算剩余的分钟
        var seconds = parseInt((longTime / 1000) % 60, 10); //计算剩余的秒数
        that.longTime =
          days + "天" + hours + "小时" + minutes + "分" + seconds + "秒";
      }, 1000);
    },

    handleChange(current) {
      this.showMessageList = this.allMessageList.slice(
        (current - 1) * 10,
        current * 10
      );
    },
    agree(item) {
      this.$axiosbili
        .post(
          "http://123.56.129.36:8082/api/messageboard/agree?id=" +
            item.id +
            "&agree=" +
            item.agree
        )
        .then((res) => {
          this.getMessage();
          console.log(res.data, 111);
          this.agree_count++;
        });
    },
    disagree(item) {
      this.$axiosbili
        .post(
          "http://123.56.129.36:8082/api/messageboard/disagree?id=" +
            item.id +
            "&disagree=" +
            item.disagree
        )
        .then((res) => {
          this.getMessage();
          this.disagree_count++;
        });
    },
    submitMessage() {
      if (this.messageForm.name == "" || this.messageForm.comment == "") {
        return this.$message(
          "给我留言的话，至少要告诉我你的昵称和留言的内容哦"
        );
      }
      if (this.messageForm.mailbox != "") {
        if (
          !/^([a-zA-Z]|[0-9])(\w)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(
            this.messageForm.mailbox
          )
        ) {
          return this.$message.warning(
            "你的邮箱格式好像有点问题，要不要再检查一下"
          );
        }
      }
      this.submiting = true;
      this.$axiosbili
        .post(
          "http://123.56.129.36:8082/api/messageboard/info",
          this.messageForm
        )
        .then((res) => {
          this.submiting = false;
          this.getMessage();
          console.log(res.data);
        });
    },
    getMessage() {
      this.$axiosbili
        .get("http://123.56.129.36:8082/api/messageboard/info")
        .then((res) => {
          console.log(res.data);
          this.allMessageList = res.data.data.info;
          this.showMessageList = res.data.data.info.slice(0, 10);
        });
    },
  },
  created() {
    this.runTime();
    this.$axiosbili
      .post("http://123.56.129.36:8082/api/message/server_info")
      .then((res) => {
        this.visitor_count = res.data.data.count;
      });
    this.getMessage();
  },
  filters: {
    // 将留言时间格式化
    dateFormat: (time) => {
      const date = new Date(time);
      return `${date.getFullYear()}年 ${
        date.getMonth() + 1
      }月 ${date.getDate()}日`;
    },
    // 将运行时间格式化
    timeFormat: (time) => {
      const totalSec = time / 1000;
      let s = Math.floor(totalSec % 60);
      let m = Math.floor(totalSec / 60);
      let h = 0;
      if (m >= 60) {
        h = Math.floor(m / 60);
        m = Math.floor(m % 60);
      }
      let d = 0;
      if (h >= 24) {
        d = Math.floor(h / 24);
        h = Math.floor(h % 24);
      }
      return `${d}天${h}小时${m}分钟${s}秒`;
    },
  },
};
</script>

<style lang='less' scoped>
.list {
  background-color: #f1f3f7;
  position: absolute;
  min-width: 600px;
  right: 0;
  left: 700px;
  min-height: 100%;
  padding: 30px;
  .title {
    text-align: center;
    font-size: 25px;
    font-weight: bold;
    margin-bottom: 40px;
  }
  h3.title {
    font-size: 45px;
    margin-bottom: 20px;
  }
  .message {
    width: 600px;
    margin: 0 auto;
    .message_item {
      padding: 20px;
      border: 1px solid #eee;
      border-radius: 10px;
      background-color: white;
      margin-bottom: 20px;
      .message_item_name {
        font-size: 24px;
        font-weight: 500;
        margin-bottom: 10px;
      }
      .message_item_info {
        font-size: 14px;
        color: #999;
        margin-bottom: 15px;
      }
      .message_item_comment {
        font-size: 20px;
        color: #999;
        margin-bottom: 40px;
        white-space: pre-wrap;
      }
      .message_item_list {
        display: flex;
        align-items: center;
        justify-content: space-around;
        .mil_item {
          text-align: center;
          .mil_item_img {
            width: 40px;
            cursor: pointer;
          }
          .mil_item_text {
            font-size: 14px;
            color: #999;
          }
        }
      }
    }
  }
}
.info {
  z-index: 10;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 700px;
  background: url("https://redblack.oss-cn-beijing.aliyuncs.com/bg_12.jpg")
    center center;
  background-size: 100% 100%;
  transition: 1s;
  .info_board {
    width: 400px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(255, 255, 255, 0.7);
    border-radius: 20px;
    padding: 20px;
    .info_board_title {
      font-size: 20px;
      font-family: youzai;
    }
    .info_board_form {
      text-align: center;
      margin-top: 20px;
      .tip {
        font-size: 14px;
        color: #777;
      }
      .btn {
        margin: 20px auto 0;
      }
    }
  }
}
.info:hover {
  background-size: 110% 110%;
}
</style>