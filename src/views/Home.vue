<template>
  <div class="my">
    <!-- <div class="line"></div> -->
    <h1>八喜🇧🇷</h1>
    <!-- <div v-dir1 ></div> -->
    <header>
      <div class="img-box">
        <img
          @click="pausedOrRunning"
          src="../images/user.png"
          :style="{
            width: 100 + 'px',
            height: 100 + 'px',
            animationPlayState: state ? 'running' : 'paused'
          }"
          alt=""
        />
      </div>
      <audio
        id="my-audio"
        type="audio/mpeg"
        controlsList="nodownload"
        controls
        src="http://other.web.rd01.sycdn.kuwo.cn/resource/n3/7/75/2942928835.mp3"
        autoplay="autoplay"
      ></audio>
    </header>
    <div class="content">
      <router-link to="/exercise">
        <div>anchors</div>
      </router-link>

      <router-link to="/parent">
        <div>parent</div>
      </router-link>

      <router-link to="/child">
        <div>child</div>
      </router-link>
      <el-input v-model="num" placeholder="请输入内容"></el-input>
      <el-input
        v-model="num"
        @change="handleChange"
        label="描述文字"
      ></el-input>
      {{num | validate(that)}}
    </div>

    <div class="footer">
      <router-link to="/" style="text-decoration:none" class="selected">
        <div>首页</div>
      </router-link>

      <router-link to="/About" style="text-decoration:none">
        <div>我的</div>
      </router-link>
    </div>
  </div>
</template>
<script>
export default {

  data() {
    return {
      that: this,
      state: true, // 动画的选择状态
      num: 1,
      input: ''
    }
  },
  // 自定义指令
  directives: {
    dir1: {
      inserted(el) {
        console.log('el', el)
        console.log('argument', arguments)
        el.style.width = '200px'
        el.style.height = '200px'
        el.style.background = 'red'
      }
    }
  },
  // 过滤器
  filters: {
    validate: function (value, that) {
      console.log(this, 'this')

      console.log(value)
      value = +value
      console.log('Var', value)

      const regNum = /^(-?\d+)(\.\d+)?$/ // 数字
      const reg = /^\d+(?:\.\d{1,2})?$/ // 2位小数
      if (!regNum.test(value)) {
        console.log('金额只能为数字，请重新输入')
      } else {
        if (value > 0) {
          if (!reg.test(value)) {
            console.log('金额只能保留两位小数，请重新输入')
            that.$message({ type: 'waring', message: '金额只能保留两位小数，请重新输入' })
            console.log('that', that)
          } else {
            console.log('c成功了呢')
            // that.$message({ type: 'error', message: '金额只能保留两位小数，请重新输入' })
          }
        } else {
          console.log('金额必须大于0，请重新输入')
          that.$message({ type: 'success', message: '金额必须大于0，请重新输入' })
        }
      }
    },
  },
  methods: {
    // 动画暂停或者运行
    pausedOrRunning() {
      const state = this.state
      const myaudio = this.myaudio
      if (state) {
        myaudio.pause()
        this.state = false
      } else {
        this.state = true
        myaudio.play()
      }
    },
    handleChange(value) {
      console.log(value)
    }
  },
  mounted() {
    const myaudio = document.getElementById('my-audio')
    this.myaudio = myaudio
    const reg = /^1[3456789]\d{9}$/
    console.log(reg.test(13453434343))
  }
}
</script>

<style lang="less" scoped>
.img-box{
  display: flex;
  justify-content: center;
  align-items: center;
}
header img {
  display: inline-block;
  background: red;
  animation: circle 6s linear infinite;
  animation-play-state: running;
  box-shadow: 1px 1px 10px 10px red;
}
* {
  padding: 0;
  margin: 0;
}
.line {
  width: 375px;
  height: 50px;
  margin: 0px auto;
  border-radius: 10px;
  /* 线性渐变 */
  background-image: linear-gradient(
    135deg,
    yellow 25%,
    green 25%,
    green 50%,
    yellow 50%,
    yellow 75%,
    green 75%,
    green 100%
  );

  background-size: 100px 100px;
  animation: move 2s linear infinite;
}

@keyframes move {
  from {
    background-position: 0px;
  }

  to {
    background-position: 100px;
  }
}
@keyframes circle {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
}
#my-audio {
  margin-top: 30px;
}
h1 {
  margin-bottom: 20px;
}
.footer {
  height: 34px;
  line-height: 34px;
  width: 100%;
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;

  div {
    flex: 1;
    background: lightgreen;
    border-radius: 20px;
    width: 180px;
    color: white;
    font-weight: 500;
  }
}
</style>
