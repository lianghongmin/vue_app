<template>
  <div>
    <!--头部-->
    <!--<nav-header >
       <span slot="headTitle">移动病案登录</span>
    </nav-header>
    <div class="content">
       <form class="search_medical_form">
        <div class="input_row">
            <label for="username">用户名</label>
            <input type="text" id="username" placeholder="用户名" v-model="username"/>
        </div>
        <div class="input_row">
            <label for="pwd">密　码</label>
            <input type="password" id="pwd" placeholder="密　码" v-model="pwd"/>
        </div>
       </form>
       <a class="search_medical_btn" @click="toLogin">登录</a>
    </div>-->
  </div>
</template>
<script>
import navHeader from "@/components/header"
import { Indicator } from 'mint-ui';

export default {
  data () {
    return {
      username:"",
      pwd:""
    }
  },
  components:{
   navHeader
  },
  mounted:function(){
    window.localStorage.removeItem("token"); 
    this.username=this.$route.query.username;
    this.pwd=this.$route.query.pwd;
    this.toLogin();
  },
  methods:{
    toLogin(){
      if(this.username==""||this.pwd==""){
        layer.open({
                content: '用户名或者密码不能为空！'
               ,btn: '确定'
            });
          return;
      }
       
       var url=this.api+"/user/login";
      // var url="/phr-mobile/user/login";
       var params={'loginName':this.username,'password':this.pwd};
       Indicator.open({
            text: '',
            spinnerType: 'fading-circle'
        });
       this.axios.post(url, this.qs.stringify(params)).then((result)=>{
           Indicator.close();
           var data=result.data;
           if(data.success){
                  // console.log(data)
                   // window.localStorage.setItem("username",this.username);
                  //  window.localStorage.setItem("pwd",this.pwd);
                    window.localStorage.setItem("data",JSON.stringify(data.data.user));
                    var token=data.data.token;
                    window.localStorage.setItem("token",token);
                    this.$router.push({
                        name: 'index',
                        params: {
                          
                        }
                      })
                }else{
                  layer.open({
                     content: '用户名或者密码不正确！'
                   ,btn: '确定'
                 });
                  return;
                }
       }).catch((error)=>{
            Indicator.close();
            layer.open({
                content: '网络不稳定，登录失败'
                ,btn: '确定'
            });
            return;
       })
       
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
