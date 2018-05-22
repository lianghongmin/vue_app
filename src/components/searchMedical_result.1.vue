<template>
  <div>
    <!--头部-->
    <nav-header >
       <span slot="headTitle">病案检索查询</span>
    </nav-header>
    <div class="content">
        <mt-loadmore  :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :max-distance="150"
                 @top-status-change="handleTopChange" ref="loadmore">

            <div slot="top" class="mint-loadmore-top">
                <span v-show="topStatus === 'pull'" :class="{ 'rotate': topStatus === 'drop' }">↓</span>
                <span v-show="topStatus === 'loading'">加载中...</span>
                <span v-show="topStatus === 'drop'">释放更新</span>
            </div>
            <div class="wrapper">
                <ul class="search_medical_result">
                    <li v-for="item in list">
                        <router-link :to="{path:'/medical_detail',query: {guid:item.guid}}">
                            <p>姓名：<span>{{item.patientName}}</span>&nbsp;病案号：<span>{{item.idNumber}}</span></p>
                            <p>出院科室：<span>{{item.outDepartment}}</span></p>
                            <p>出院日期：<span>{{item.outDate}}</span></p>
                            <p>所属机构：<span>{{ item.outInstitution}}</span></p>
                            <span class="icon_star" @click.prevent='collectedToggle($event,item.guid)'></span>
                        </router-link>
                    </li>
                </ul>
            </div>
        </mt-loadmore>
    </div> 
  </div>
</template>
<script>
import navHeader from "@/components/header"
import { Indicator } from 'mint-ui';
export default {
  data () {
    return {
     //sessionId:"",//登录用户Id
      idNumber:"",
      patientName:"",
      idCard:"",
      outDateStart:"",
      outDateEnd:"",
      outDepartment:"",
      list: [],//后台数据
      allLoaded: false,
      topStatus: ''
    }
  },
  components:{
   navHeader
  },
  mounted:function(){
      this.idNumber=this.$route.query.idNumber;
      this.patientName=this.$route.query.patientName;
      this.idCard=this.$route.query.idCard;
      this.outDateStart=this.$route.query.outDateStart;  
      this.outDateEnd=this.$route.query.outDateEnd;
      this.outDepartment=this.$route.query.outDepartment; 
      this.getData();
  },
  methods:{
      //从后台获取数据
      getData(){
        var url=this.api+'/medicalData';
        //Indicator.open({
        // text: '加载中...',
        // spinnerType: 'fading-circle'
        // });
        //this.axios.post(url,{params:{'sessionId':this.sessionId}}).then((result)=>{
        this.axios.post(url,{params:{'idNumber':this.idNumber,'patientName':this.patientName,'idCard':this.idCard,'outDateStart':this.outDateStart,'outDateEnd':this.outDateEnd,'outDepartment':this.outDepartment}}).then((data)=>{
             // Indicator.close();
              var resultData=data.data;
             
            if(resultData.success){
                if(resultData.data){
                   var reqData=resultData.data;
                  //this.list=reqData;
                   this.list.push.apply(this.list,reqData)
                  // console.log(this.list)
                }else{
                  layer.open({
                     content: '获取数据为空！'
                   ,btn: '确定'
                 });
                  return;
                } 
            }else{
               layer.open({
                     content: '获取数据失败'
                   ,btn: '确定'
                 });
               return;
           }
       }).catch((error)=>{
            this.loadShow=false;
             layer.open({
                content: '网络不稳定，加载失败'
                ,btn: '确定'
            });
            return;
       })
      },
      loadTop() {  // 刷新数据的操作
          var self = this;
          setTimeout(function () {
           self.getData();
           self.$refs.loadmore.onTopLoaded();
         }, 2000);            
      },
      loadBottom () { // 加载更多数据的操作
          var self = this;
          setTimeout(function () {
            self.getData();
            self.$refs.loadmore.onBottomLoaded();
         }, 2000);  
      },
      handleTopChange: function (status) {
            this.topStatus = status;
      },
      //收藏事件
      collectedToggle(ev,guid){
          let target=ev.target;
          let className=target.className;
          if(className=='collected_star'){
             target.className='icon_star'
             layer.open({
              content: '您已取消收藏！'
              ,btn: '我知道了'
             }); 
          }else if(className=='icon_star'){
             target.className='collected_star'
             layer.open({
              content: '收藏成功！'
              ,btn: '我知道了'
             }); 
          }
          
      }
   }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
</style>
