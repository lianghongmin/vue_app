<template>
  <div>
    <!--头部-->
    <nav-header >
       <span slot="headTitle">病案检索查询</span>
    </nav-header>
    <div class="content"  style="height:100%;padding-bottom:1.1rem" :style="{'-webkit-overflow-scrolling': scrollMode}">
        <v-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">
            <div class="wrapper">
                <ul class="search_medical_result">
                <li v-for="item in list">
                            <!--<router-link :to="{path:'/medical_detail',query: {guid:item.firstGuid}}">-->
                            <a @click='getDetail(item.firstGuid)'>
                                <p>姓名：<span>{{item.patient_name}}</span>&nbsp;病案号：<span>{{item.mr_id}}</span></p>
                                <p>出院科室：<span>{{item.office_name}}</span></p>
                                <p>出院日期：<span>{{item.out_hospital_date}}</span></p>
                                <!--<p>所属机构：<span>{{ item.outInstitution}}</span></p>-->
                                <span class="icon_star"  @click.prevent='collectedToggle($event,item.guid)'></span>
                           </a>
                           <!-- </router-link>-->
                    </li>
                </ul>
            </div>
       </v-loadmore>
    </div> 
  </div>
</template>
<script>
import navHeader from "@/components/header"
import { Indicator } from 'mint-ui';
import {Loadmore} from 'mint-ui';

export default {
  data () {
    return {
      token:"",
      page:1,
     // pageSize:10,
      allLoaded: false, //是否可以上拉属性，false可以上拉，true为禁止上拉，就是不让往上划加载数据了
      scrollMode:"auto", //移动端弹性滚动效果，touch为弹性滚动，auto是非弹性滚动
      totalpage:0,
      bottomText: '',
      list: [],//后台数据,

      idNumber:"",
      patientName:"",
      idCard:"",
      outDateStart:"",
      outDateEnd:"",
      outDepartment:"",
      outDepartmentId:"",
    }
  },
 components:{
   navHeader,
   'v-loadmore':Loadmore
  },
  mounted:function(){
      this.idNumber=this.$route.query.idNumber;
      this.patientName=this.$route.query.patientName;
      this.idCard=this.$route.query.idCard;
      this.outDateStart=this.$route.query.outDateStart;  
      this.outDateEnd=this.$route.query.outDateEnd;
      this.outDepartment=this.$route.query.outDepartment; 
      this.outDepartmentId=this.$route.query.outDepartmentId; 
      this.token=window.localStorage.getItem("token");
      if(!this.token){
        this.$router.push({
              name: 'login',
              params: {
                     
              }
          });
          return; 
      }
      this. loadPageList();
  },
   methods:{
    loadBottom:function() {
      // 上拉加载
      this.more();// 上拉触发的分页查询
      this.$refs.loadmore.onBottomLoaded();// 固定方法，查询完要调用一次，用于重新定位
    },
    loadPageList:function (){
       var url=this.api+'/medRecord/ajaxMedicalSearch';
       // var url='/phr-mobile/medRecord/ajaxMedicalSearch';
        Indicator.open({
            text: '加载中...',
            spinnerType: 'fading-circle'
        });
        var params={'token':this.token,'page':this.page,'mrId':this.idNumber,'name':this.patientName,'idCard':this.idCard,'outHospitalStartDate':this.outDateStart,'outHospitalEndDate':this.outDateEnd,'outHospitalOfficeId':this.outDepartmentId}
        this.axios.post(url,this.qs.stringify(params)).then((data)=>{
            Indicator.close();
            var resultData=data.data;
           // console.log( resultData)
            if(resultData.success){
              if(resultData.status==999){
                window.localStorage.removeItem("token")
                layer.open({
                   content: 'token过期！'
                   ,btn: '我知道了'
                })
                this.$router.push({
                        name: 'login',
                        params: {
                         
                        }
                    });
                    return;
              }
              if(resultData.data.list.length>0){
                this.list=resultData.data.list;
                this.totalpage=resultData.data.totalPage;
                if(this.totalpage==1){
                    this.allLoaded=true
                }
                this.isHaveMore();
                this.$nextTick(function () {
                  // 是否还有下一页，加个方法判断，没有下一页要禁止上拉
                  this.scrollMode = "touch";
                 
                  });
              }else{
                layer.open({
                  content: '暂无数据！'
                  ,btn: '我知道了'
                 });
              } 
            }else{
               layer.open({
                  content: "请求失败"
                  ,btn: '我知道了'
                 });
            }
       }).catch((error)=>{
             Indicator.close();
             layer.open({
                  content: "网络异常,请求超时"
                  ,btn: '我知道了'
                 });
       })
    },
    more:function (){
      // 分页查询
      if(this.totalpage == 1){
        this.page = 1;
        this.allLoaded = true;
      }else{
        this.page= parseInt(this.page) + 1;
        this.allLoaded = false;
      }
     var url=this.api+'/medRecord/ajaxMedicalSearch';
     //var url='/phr-mobile/medRecord/ajaxMedicalSearch';    
     var params={'token':this.token,'page':this.page,'mrId':this.idNumber,'name':this.patientName,'idCard':this.idCard,'outHospitalStartDate':this.outDateStart,'outHospitalEndDate':this.outDateEnd,'outHospitalOfficeId':this.outDepartmentId}
        
     this.axios.post(url,this.qs.stringify(params)).then((data)=>{
        var resultData=data.data;
        if(resultData.success){
           if(resultData.status==999){
                window.localStorage.removeItem("token")
                layer.open({
                   content: 'token过期！'
                   ,btn: '我知道了'
                })
                this.$router.push({
                        name: 'login',
                        params: {
                         
                        }
                    });
                    return;
              }
            this.list = this.list.concat(resultData.data.list);
            this.isHaveMore();
        }
      }).catch((error)=>{
             layer.open({
                  content: "网络异常,请求超时"
                  ,btn: '我知道了'
                 });
       })
    },
    isHaveMore:function(){
      // 是否还有下一页，如果没有就禁止上拉刷新
      //this.allLoaded = false; //true是禁止上拉加载
      if(this.page == this.totalpage){
        this.allLoaded = true; 
      }
   
    },
    //查看病案详情
    getDetail(guid){
     var url=this.api+'/medRecord/generateMedicalDetail';
     var params={token:this.token,visitGuid:guid};
     //location.href='http://localhost:28083/phr-print/print/addPrintRecordPage?firstGuid=ec70d2d60ecc4385a7193a8901e7741f&printReason=1&copies=1';
     this.axios.get(url,{params:params}).then((result)=>{
       var resultData=result.data;
       if(resultData.success){
          location.href=resultData.data.medicalDetailUrl+'?token='+resultData.data.token;
       }else {
           layer.open({
                  content: "网络异常，请求失败"
                  ,btn: '我知道了'
           });
       }
     }).catch((error)=>{
             layer.open({
                  content: "网络异常,请求超时"
                  ,btn: '我知道了'
              });
       })
    }
   }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
</style>
