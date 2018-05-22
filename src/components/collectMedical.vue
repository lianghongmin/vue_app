<template>
  <div>
    <!--头部-->
    <nav-header >
       <span slot="headTitle">收藏夹</span>
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
                            <span class="collected_star" @click.prevent='collectedToggle($event,item.guid)'></span>
                        </router-link>
                </li>
            </ul>
        </div>
    </mt-loadmore>
    </div>
    <!--<div class="wrapper">
            <ul class="search_medical_result">
                <li>
                    <router-link to="/medical_detail">
                        <p>姓名：<span>张秀清</span>&nbsp;病案号：<span>6356345</span></p>
                        <p>出院科室：<span>呼吸内科病房</span></p>
                        <p>出院日期：<span>2018-04-08</span></p>
                        <span class="collected_star" @click.prevent="collectedToggle($event,item.guid)"></span>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>-->
  </div>
</template>

<script>
import navHeader from "@/components/header"
export default {
  name: 'index',
  data () {
    return {
      list: [],
      allLoaded: false,
      topStatus: ''
    }
  },
  created(){
    this.getcollectData();
  },
  components:{
    navHeader
  },
  methods:{
    //从后台拿收藏夹数据
    getcollectData(){
       var url=this.api+'/medicalData';
        //Indicator.open({
       // text: '加载中...',
       // spinnerType: 'fading-circle'
       // });
        //this.axios.post(url,{params:{'sessionId':this.sessionId}}).then((result)=>{
         this.axios.post(url,{params:{}}).then((data)=>{
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
          var i =0, len=10;
          for (; i< len; i++){
               var obj={};
               obj.index='Top'+i;
               obj.guid=i;
               self.list.push(obj);
          }
         self.$refs.loadmore.onTopLoaded();
         }, 2000);            
    },
    loadBottom () { // 加载更多数据的操作
          var self = this;
          setTimeout(function () {
          self.getcollectData();
          self.$refs.loadmore.onBottomLoaded();
         }, 2000);  
    },
    handleTopChange: function (status) {
            this.topStatus = status;
    },
    itemClick: function (data) {
           console.log('item click, msg : ' + data);
    },
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
  img{width:100%;height:100%;}
</style>
