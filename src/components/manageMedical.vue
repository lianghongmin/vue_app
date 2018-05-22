<template>
  <div>
    <!--头部-->
    <nav-header >
       <span slot="headTitle">管理检索</span>
    </nav-header>
    <div class="content">
     <!--<form class="disForm" target="frameFile"><mt-search v-model="msg" cancel-text="取消" placeholder="疾病编码搜索" v-on:input="search"></mt-search></form>-->
     <form class="search_medical_form disForm" >
          <div class="input_row">
            <label for="idNumber">疾病编码</label>
            <input type="text" id="idNumber" placeholder="疾病编码" v-model="msg"/>
            <span @click="search">查询</span>
        </div>
     </form>
     <div class="disList" name='frameFile'>
      <ul >
         <li class="lis" v-for="item in dislist"  @click="manageMedical_result(item.uniq_code)">
            {{item.label}}
         </li>
        </ul>
     </div>
    </div>
   
  </div>
</template>

<script>
import navHeader from "@/components/header"
//import {Search} from 'mint-ui'
import { Indicator } from 'mint-ui';
export default {
  data () {
    return {
      token:"",
      //isShow:false,
      idNumber:"",
      msg: '',
      uniq_code:"",
      dislist: [],
    }
  },
  components:{
   navHeader,
   //'mt-search': Search
  },
  mounted:function(){
     let Storedata=eval('(' + window.localStorage.getItem("data") + ')');
     this.token=window.localStorage.getItem("token");
      if(!this.token){
          this.$router.push({
              name: 'login',
            
          });
      }
    this.msg=window.localStorage.getItem("msg");
    this.dislist=eval('(' + window.localStorage.getItem("dislist") + ')');
    //console.log(this.dislist)
  },
  methods:{
     manageMedical_result(code){
        this.$router.push({
                      name: 'manageMedical_result',
                     query: {uniq_code:code}
                    });
     },
   search() {
    //console.log(this.msg)
    window.localStorage.setItem("msg",this.msg);
    this.dislist=[];
    var url=this.api+'/basicInfo/getDiseaseByQueryName';
   // this.msg = await this.msg;
   // console.log(this.msg)
    var params={'token':this.token,'queryName':this.msg};
    Indicator.open({
            text: '加载中...',
            spinnerType: 'fading-circle'
        });
    this.axios.post(url,this.qs.stringify(params)).then((result)=>{
       // console.log(result)
        Indicator.close();
      // alert(result)
        if(result.data.diseases&&result.data.diseases.length>0){
            this.dislist=result.data.diseases;
            window.localStorage.setItem("dislist",JSON.stringify(this.dislist));
            //console.log(this.dislist)
           // this.isShow = true
            
        }
    }).catch((error)=>{
       Indicator.close();
       layer.open({
                   content: '网络原因，请求超时！'
                   ,btn: '我知道了'
                })
      })
   }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/*.mint-search{
    height:1.08rem;
}*/
.content{
    margin-bottom:.2rem;
}
.disForm{
    height:1.08rem;position:fixed;top:1.08rem;width:100%;
    z-index:11;
}
.input_row {
  position:relative;
  padding:.1rem .1rem;
  border-bottom-color:#9E7831;
 }
.input_row label{
   flex:1.5;
 }
 .input_row span{
     flex:1;
    background:#9E7831;
    color:#fff;
    height:1rem;
    border-radius:3px;
 }
.disList{
  position:absolute;
  top:1.2rem;
  z-index:10;
  width:100%;
}
.lis{
    width:100%;
    padding:.4rem .3rem;
    border-bottom:1px solid #ccc;
    font-size:.32rem;
}
</style>
