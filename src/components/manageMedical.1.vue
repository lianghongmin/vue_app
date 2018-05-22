<template>
  <div>
    <!--头部-->
    <nav-header >
       <span slot="headTitle">管理检索</span>
    </nav-header>
    <div class="content">
       <form class="search_medical_form">
        <div class="input_row">
            <label for="idNumber">疾病编码</label>
            <!--<input type="text" id="idNumber" placeholder="疾病编码" v-model="idNumber"/>-->
            <input type="text" id="idNumber" placeholder="疾病编码" v-model="msg" v-on:input="search" @blur="blur"/>
            <div class="select-panel" v-show="isShow">
               <div  v-for="w in dislist" class="select-item" @click="click_item(w)">{{w['label']}}</div>
            </div>
        </div>
       </form>
       <router-link :to="{path:'/manageMedical_result',query: {uniq_code: uniq_code}}" class="search_medical_btn">查询</router-link>
       <!--<a class="search_medical_btn" @click="submit">查询</a>-->
    </div>
   
  </div>
</template>

<script>
import navHeader from "@/components/header"
export default {
  data () {
    return {
      token:"",
      isShow:false,
      idNumber:"",
      msg: '',
      uniq_code:"",
      dislist: [],
    }
  },
  components:{
   navHeader
  },
  mounted:function(){
     let Storedata=eval('(' + window.localStorage.getItem("data") + ')');
     this.token=window.localStorage.getItem("token");
     if(!this.token){
          this.$router.push({
              name: 'login',
              params: {
                     
              }
          });
      }
  },
  methods:{
    blur() {
    setTimeout(() => {
      this.isShow = false
     },
     200)
   },
  async search() {
   // console.log(this.msg)
   this.dislist=[];
    var url=this.api+'/basicInfo/getDiseaseByQueryName';
   // this.msg = await this.msg;
   // console.log(this.msg)
    var params={'token':this.token,'queryName':this.msg};
    this.axios.post(url,this.qs.stringify(params)).then((result)=>{
        console.log(result)
        if(result.data.diseases&&result.data.diseases.length>0){
            this.dislist=result.data.diseases;
            //console.log(this.dislist)
            this.isShow = true
        }
    })
   },
   click_item(w) {
       this.msg=w.label;
       this.uniq_code=w.uniq_code;
       this.isShow=false;
   }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 .input_row {
  position:relative;
  padding:.1rem .1rem;
 }
.input_row label{
   flex:1.3;
 }
 .select-panel {
  z-index: 999;
  position:absolute;
  top:1.3rem;
  left:15%;
  width:80%;
 
  background: #fff;
  opacity: 0.8;
 }
 
 .select-item {
    z-index: 999;
    margin: 1px;
    padding: 2px;
    font-size:.32rem;
    padding:10px 1px;
    text-align:center;
}
</style>
