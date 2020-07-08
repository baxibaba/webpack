<template >
  <div class="header">
    <p class="demo1" @click="alert1">1</p>
    <baxi-button @click="alert1">Default Button</baxi-button>
    <baxi-tabs :data="data"
          :active.sync="active"
          @callback="callback"/>
          <baxi-input v-model="val"
           placeholder="请输入"/>

           <baxi-button @click="show">show</baxi-button>

  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      picker: null,
      data: ['Google', 'IBM'],
      active: 0,
      val: null,
      password: '',
      arr: [{ name: 1, type: 1 }, { name: 2, type: 2 }]
    }
  },
  methods: {
    show () {
      this.picker.show()
    },
    callback (val) {
      console.log(val)
    },
    alert1() {
      console.log('this', this)
      // this.$vux.alert.show({
      //   title: "您已经开通会员续费服务,关闭自动续费服务后可以升级"
      // });
    }
  },
  mounted() {
    // var i, a;
    // for (let i = 0; i < 10; i++) {
    //   (function(i) {
    //     a = document.createElement("a");
    //     a.innerHTML = i + "<br>";
    //     a.addEventListener("click", e => {
    //       e.preventDefault();
    //       alert(i);
    //     });
    //   })(i);
    //   let p = document.querySelector(".demo");
    //   console.log("p", p);

    //   let div = document.querySelector(".header");
    //   p.appendChild(a);
    // }
    const p = document.querySelector('p')

    console.log('d', p)
    p.style.width = '20px'
    p.style.height = '20px'
    // p.style.backgroundColor = "#ff0000";

    p.style.border = 'thick solid #0000FF'
    // p.sytle.borderColor = "#ff0000";
  },
  created() {
    this.picker = this.$datePicker({
      $events: {
        confirm: data => {
        },
        cancel: data => {
        },
        callback: data => {
        }
      }
    })
  }
}
</script>
<style lang="less">
.header{
  background: red;
}
</style>
