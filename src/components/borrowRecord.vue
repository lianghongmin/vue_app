<template>
  <div>
    <!--头部-->
    <nav-header >
       <span slot="headTitle">借阅记录(<i class="txt">{{headertxt}}</i>)</span>
       <a class="more" slot="tools" @click='shadeToggle'></a>
    </nav-header>
    <div class="moreShade" v-show='isShow'>
      <ul>
          <li><a @click='choice("1")'>未批复</a></li>
          <li><a @click='choice("2")'>已批准</a></li>
          <li><a @click='choice("3")'>已拒绝</a></li>
          <li><a @click='choice("4")'>已过期</a></li>
      </ul>
    </div>
    <div class="content" style="height:100%;padding-bottom:1.1rem" :style="{'-webkit-overflow-scrolling': scrollMode}">
           <v-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">
            <div class="wrapper">
                <ul class="search_medical_result">
                    <li v-for="item in list">
                        <a @click="medical_detail(item.firstGuid)">
                                <p>姓名：<span>{{item.NAME}}</span>&nbsp;病案号：<span>{{item.mrId}}</span></p>
                                <p>出院科室：<span>{{item.outOfficeName}}</span></p>
                                <p>出院日期：<span>{{item.outHospitalDate}}</span></p>
                                <span :class="{'icon_agree':borrowId=='2','icon_noAgree':borrowId=='1','icon_refused':borrowId==''}" @click.prevent='collectedToggle($event,item.firstGuid)'></span>
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
import {Indicator} from "mint-ui";
import {Loadmore} from "mint-ui";
//let token=window.localStorage.getItem("username");
export default {
  name: 'borrowRecord',
  data () {
    return {
      token:"",
      isShow:false,
      headertxt:'已批准',
      borrowId:"2",//1待审核,2审核通过,3审核拒绝,4过期

      page:1,
     // pageSize:10,
      allLoaded: false, //是否可以上拉属性，false可以上拉，true为禁止上拉，就是不让往上划加载数据了
      scrollMode:"auto", //移动端弹性滚动效果，touch为弹性滚动，auto是非弹性滚动
      totalpage:0,
      bottomText: '',
      list: [],//后台数据,
    }
  },
  created(){
      this.token=window.localStorage.getItem("token");
      if(!this.token){
          this.$router.push({
                    name: 'login',
                    params: {
                     
                    }
                    });
            return; 
      }
      this.getData(this.borrowId);
  },
  components:{
    navHeader,
    'v-loadmore':Loadmore
  },
  methods:{
      loadBottom:function() {
      // 上拉加载
      this.more();// 上拉触发的分页查询
      this.$refs.loadmore.onBottomLoaded();// 固定方法，查询完要调用一次，用于重新定位
    },
     //从后台获取数据
      getData(borrowId){
         let url=this.api+'/borrow/getBorrowMedByLoginNameAndDays';
         //let url='/phr-mobile/borrow/getBorrowMedByLoginNameAndDays';
         Indicator.open({
            text: '加载中...',
            spinnerType: 'fading-circle'
        });
        //this.axios.post(url,{params:{'sessionId':this.sessionId}}).then((result)=>{
         this.axios.get(url,{params:{'token':this.token,'page':this.page,'status':borrowId}}).then((data)=>{
            Indicator.close();
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
                 if(resultData.data.list.length>0){
                   this.list=resultData.data.list;
                    // console.log(this.list)
                    this.totalpage=resultData.data.totalPage;
                    if(this.totalpage==1){
                        this.allLoaded=true
                    }
                    // 是否还有下一页，加个方法判断，没有下一页要禁止上拉
                    this.isHaveMore();
                    this.$nextTick(function () {
                       //// 原意是DOM更新循环结束时调用延迟回调函数，大意就是DOM元素在因为某些原因要进行修改就在这里写，要在修改某些数据后才能写，  
                      // 这里之所以加是因为有个坑，iphone在使用-webkit-overflow-scrolling属性，就是移动端弹性滚动效果时会屏蔽loadmore的上拉加载效果， 
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
                        content: '网络异常，请求超时！'
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
            this.page = parseInt(this.page) + 1;
            this.allLoaded = false;
        }
        let url=this.api+'/borrow/getBorrowMedByLoginNameAndDays';
       // let url='/phr-mobile/borrow/getBorrowMedByLoginNameAndDays';
        this.axios.get(url,{params:{'token':this.token,'page':this.page,'status':this.borrowId}}).then((data)=>{
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
                this.list = this.list.concat(resultData.data.list);
                this.isHaveMore();
            }
        }).catch((error)=>{
              layer.open({
                        content: '网络异常，请求超时！'
                        ,btn: '我知道了'
                        });
         })
        },
      isHaveMore:function(){
            // 是否还有下一页，如果没有就禁止上拉刷新
            //this.allLoaded = false; //true是禁止上拉加载
            if(this.page== this.totalpage){
                this.allLoaded = true; 
            }
        
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
           //未批准
            this.headertxt='未批准';
       }else if(val=="2"){
           this.headertxt='已批准';
       }else if(val=="3"){
            this.headertxt='已拒绝';
       }else if(val=="4"){
            this.headertxt='已过期';
       }
       this.isShow=!this.isShow;
       this.list=[];
       this.page=1;
       this.allLoaded=false;
       this.getData(val);
      },
      medical_detail(guid){
        //console.log(guid);
       // console.log(this.borrowId)
        if(this.borrowId==1){//1代表未批复
            layer.open({
                  content: '此病案暂未批复,无法查看病案详情！'
                  ,btn: '我知道了'
                 });
        }else if(this.borrowId==2){//已批复
            /*this.$router.push({
                        name: 'medical_detail',
                        params: {
                          guid:guid
                        }
                      })*/
             var url=this.api+'/medRecord/generateMedicalDetail';
             var params={token:this.token,visitGuid:guid};
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
            // location.href=result.data.data.medicalDetailUrl+'?token='+result.data.data.token;
             }).catch((error)=>{
                layer.open({
                    content: "网络异常,请求超时"
                    ,btn: '我知道了'
                    });
            })          
        }else if(this.borrowId==3){//已拒绝
           layer.open({
                  content: '此病案已被拒绝借阅,无法查看病案详情！'
                  ,btn: '我知道了'
                 });
        }else if(this.borrowId==4){
             layer.open({
                  content: '此病案借阅期限已过期,无法查看病案详情！'
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
