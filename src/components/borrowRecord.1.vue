<template>
  <div>
    <!--头部-->
    <nav-header >
       <span slot="headTitle">借阅记录(<i class="txt">{{headertxt}}</i>)</span>
       <a class="more" slot="tools" @click='shadeToggle'></a>
    </nav-header>
    <div class="moreShade" v-show='isShow'>
      <ul>
          <li><a @click='choice("3")'>未批复</a></li>
          <li><a @click='choice("1")'>已批准</a></li>
          <li><a @click='choice("2")'>已拒绝</a></li>
      </ul>
    </div>
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
                            <span :class="{'icon_agree':borrowId=='1','icon_noAgree':borrowId=='3','icon_refused':borrowId=='2'}" @click.prevent='collectedToggle($event,item.guid)'></span>
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
export default {
  name: 'index',
  data () {
    return {
      isShow:false,
      headertxt:'已批准',
      borrowId:"1",//1代表已批准，3代表未批准，2代表已拒绝
      list: [],
      allLoaded: false,
      topStatus: ''
    }
  },
  created(){
      this.getData(this.borrowId);
  },
  components:{
    navHeader
  },
  methods:{
     //从后台获取数据
      getData(borrowId){
         var url=this.api+'/medicalData';
        //Indicator.open({
       // text: '加载中...',
       // spinnerType: 'fading-circle'
       // });
        //this.axios.post(url,{params:{'sessionId':this.sessionId}}).then((result)=>{
         this.axios.post(url,{params:{'borrowId':borrowId}}).then((data)=>{
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
      loadBottom () { // 加载更多数据的操作
          var self = this;
          setTimeout(function () {
          self.getData(this.borrowId);
          self.$refs.loadmore.onBottomLoaded();
         }, 2000);  
      },
      handleTopChange: function (status) {
            this.topStatus = status;
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
          
      },
      shadeToggle(){
        this.isShow=!this.isShow;
      },
      choice(val){
       this.borrowId=val;
       if(val=="1"){
           //批准
           this.headertxt='已批准';
       }else if(val=="3"){
           this.headertxt='未批准';
       }else if(val=="2"){
            this.headertxt='已拒绝';
       }
       this.isShow=!this.isShow;
       this.list=[];
       this.getData(val);
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
</style>
