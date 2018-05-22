<template>
  <div>
    <!--头部-->
    <nav-header >
       <span slot="headTitle">病案借阅查询</span>
    </nav-header>
    <div class="content" style="height:100%;padding-bottom:1.1rem" :style="{'-webkit-overflow-scrolling': scrollMode}">
        <!--无数据-->
        <v-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">
            <div class="wrapper">
                <ul class="search_medical_result">
                <li v-for="item in list">
                            <a>
                                <p>姓名：<span>{{item.patient_name}}</span>&nbsp;病案号：<span>{{item.mr_id}}</span></p>
                                <p>出院科室：<span>{{item.office_name}}</span></p>
                                <p>出院日期：<span>{{item.out_hospital_date}}</span></p>
                                <!--<p>所属机构：<span>{{ item.outInstitution}}</span></p>-->
                                <span class="icon_borrow"  @click.once='collectedToggle($event,item.firstGuid)'></span>
                                
                                <span  v-for="borrowItem in borrowList" v-if="item.firstGuid==borrowItem.firstGuid" :status='borrowItem.checkStatus' class="icon_borrow"  @click.once='collectedToggle($event,item.firstGuid)'></span>
                            
                                <!--<span class="icon_borrow"  @click.once='collectedToggle($event,item.guid)'></span>-->
                            </a>
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
//let token=window.localStorage.getItem("token");
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
      borrowList:[],

      idNumber:"",
      patientName:"",
      idCard:"",
      outDateStart:"",
      outDateEnd:"",
      outDepartment:"",
      outDepartmentId:"",
      list: [],
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
      this.loadPageList();
  },
 
  methods:{
    loadBottom:function() {
      // 上拉加载
      this.more();// 上拉触发的分页查询
      this.$refs.loadmore.onBottomLoaded();// 固定方法，查询完要调用一次，用于重新定位
    },
    loadPageList:function (){
        Indicator.open({
            text: '加载中...',
            spinnerType: 'fading-circle'
        });
        var url=this.api+'/borrow/getMedicalBorrowListPage';
        //var url='/phr-mobile/borrow/getMedicalBorrowListPage';
        var params={'token':this.token,'page':this.page,'mrId':this.idNumber,'name':this.patientName,'idCard':this.idCard,'outHospitalStartDate':this.outDateStart,'outHospitalEndDate':this.outDateEnd,'outHospitalOfficeId':this.outDepartmentId}
        //this.axios.post(url,{params:{'sessionId':this.sessionId}}).then((result)=>{
        this.axios.post(url,this.qs.stringify(params)).then((data)=>{
            Indicator.close();
           // console.log(data)
            var resultData=data.data;
           // console.log(resultData)
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
              if(resultData.data.page.list.length>0){
                this.list=resultData.data.page.list;
                this.totalpage=resultData.data.page.totalPage;
                this.borrowList=resultData.data.borrowedFirstGuidList;
               // console.log(this.borrowList)
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
            }
       }).catch((error)=>{
            Indicator.close();
            layer.open({
                content: '网络异常，请求超时'
                ,btn: '确定'
            });
            return;
       })
    },
    more:function (){
      // 分页查询
      if(this.totalpage == 1){
        this.page = 1;
        this.allLoaded = true;
      }else{
        this.page = parseInt(this.page) + 1;
        this.allLoaded = false;
      }
     var url=this.api+'/borrow/getMedicalBorrowListPage';
     //var url='/phr-mobile/borrow/getMedicalBorrowListPage';
     var params={'token':this.token,'page':this.page,'mrId':this.idNumber,'name':this.patientName,'idCard':this.idCard,'outHospitalStartDate':this.outDateStart,'outHospitalEndDate':this.outDateEnd,'outHospitalOfficeId':this.outDepartmentId}
        
     this.axios.post(url,this.qs.stringify(params)).then((data)=>{
        var resultData=data.data;
        if(resultData.success){
            if(resultData.status==999){
                window.localStorage.removeItem("token");
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
            this.borrowList=this.borrowList.concat(resultData.data.borrowedFirstGuidList);
            this.list = this.list.concat(resultData.data.page.list);
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
    //从后台获取数据
     collectedToggle(ev,guid){
          
          let target=ev.target;
          let status=target.getAttribute("status");
          let className=target.className;
         // console.log(status)
          if(status){
              layer.open({
                 content: '此病案已借阅！'
                ,btn: '我知道了'
                });   
          }else{
               //let url='/phr-mobile/borrow/addMedicalBorrow';
               let url=this.api+'/borrow/addMedicalBorrow';
               let params={'token':this.token,'firstGuid':guid};
               this.axios.post(url,this.qs.stringify(params)).then((result)=>{
                 var data=result.data;
                 //console.log(result)
                 if(data.success){
                    if(data.status==999){
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
                    if(className=='icon_borrow'){
                        target.className='icon_borrowed'
                    }
                    layer.open({
                        content: '借阅申请成功！'
                        ,btn: '我知道了'
                    });  
                 }
               }).catch((error)=>{
                     layer.open({
                        content: '网络异常，借阅申请失败！'
                        ,btn: '我知道了'
                    });
               })
          }
      }
   }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
</style>
