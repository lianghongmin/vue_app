<template>
  <div>
    <!--头部-->
    <nav-header :index="firstindex" :sessionId="sessionId">
       <span slot="headTitle">影像列表</span>
    </nav-header>
    <div class="content">
       <div class="loading" v-show="loadShow">
          <div>
            <i class="fa fa-spinner fa-spin"></i>
            <!--<img src="../../static/image/spinner.gif">-->
          </div>
       </div>
       <ul  v-for="(item,index) in medicalInfo">
           <li :data-guid="item.seriesInstanceUid" @click="getImg(item.studyInstanceUid,item.seriesInstanceUid,firstindex,index)">
                    <div class="l_left medical_img">
                        <img :src="''|url(api,sessionId,item.studyInstanceUid,item.seriesInstanceUid,item.instanceList[0].sopInstanceUid)">
                        <!-- <img src="http://192.168.21.85:28080/reception/picture/createFlow?sessionId=b6977098-e759-4711-ac41-3ca44a864ba6&studyUid=1.2.840.113619.2.55.3.2831208458.335.1327645842.912&seriesUid=1.2.840.113619.2.55.3.2831208458.335.1327645842.916&instanceUid=1.2.840.113619.2.55.3.2831208458.335.1327645842.923.7" class="" alt=""/>
                        {{api}}"/reception/picture/createFlow?sessionId="{{sessionId}}"&studyUid="{{item.studyInstanceUid}}"&seriesUid="{{item.seriesInstanceUid}}"&instanceUid="{{item.instanceList[0].seriesInstanceUid}}-->
                      </div>
                    <div class="l_left text">
                        <h3 class="medical_name">{{item.modality}}</h3>
                        <p class="medical_totle">(<span>{{item.instanceList.length}}</span>&nbsp;images)</p>
                    </div>
                    <img src="../../static/image/into_30.png" class="r_right r_arrow"/>
           </li>
       </ul>
   </div>
    <!--<nav-footer :Uid="uid" ></nav-footer>-->
  </div>
</template>

<script>
import navHeader from "@/components/header"
//import navFooter from "@/components/Common/footer"
//var medicalData= JSON.parse(window.localStorage.getItem("medicalData"));
//var sessionId=window.localStorage.getItem("sessionId");

export default {
  data () {
    return {
       loadShow:false,
       uid:"",
       medicalInfo:[],
       firstindex:0,
       sessionId:""
    }
  },
  mounted(){
      //获取扫码的sessionId
     //this.getParams();
     this.sessionId=this.$route.query.sessionId||this.$route.params.sessionId;
     //console.log(this.sessionId);
    // console.log(typeof(this.sessionId));
    //alert(!this.sessionId)
    if(!this.sessionId){
        this.sessionId=window.localStorage.getItem("sessionId");
       // alert(this.sessionId)
    }
     
     window.localStorage.setItem("sessionId",this.sessionId);
     this.getMedical();
     
     //this.sessionId=sessionId;
     //this.firstindex=this.$route.params.index;
    // this.medicalData=medicalData[this.firstindex].seriesList;
    // this.uid=medicalData.studyInstanceUid;
     //console.log(this.medicalData)
     //window.localStorage.setItem('firstindex',this.firstindex);
  },
  methods:{
    getMedical(){
        //console.log(this.$route.params)
        var url=this.api+'/dcm-patient/dicom/getASessionJson';
        this.loadShow=true;
        this.axios.get(url,{params:{'sessionId':this.sessionId}}).then((result)=>{
              this.loadShow=false;
            //  console.log(result);
            if(result.data.success){
                if(result.data.data){
                   var reqData=result.data.data;
                  //var reqData=result.data.data.slice(0,result.data.data.length-1);
                   this.medicalData=reqData.studyList;
                   this.medicalInfo=this.medicalData[0].seriesList;
                   //this.sessionId=reqData.session.sessionId;
                   var medicalData=JSON.stringify(this.medicalData);
                   //window.localStorage.setItem("sessionId",this.sessionId);
                   window.localStorage.setItem("medicalData",medicalData);
                }else{
                  layer.open({
                    content: '影像数据为空'
                   ,btn: '确定'
                 });
                  return;
                } 
           }else{
               layer.open({
                    content: '获取影像数据失败'
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
    getImg(studyUid,seriesUid,firstindex,secondindex){
         this.$router.push({
          name: 'medicalImg',
          params: {
            studyUid:studyUid,
            seriesUid:seriesUid,
            firstindex:firstindex,
            secondindex:secondindex
          }
        })
    }
  },
  components:{
    navHeader,
   // navFooter
  },
 filters: {
        url: function(v,api,sessionId,studyInstanceUid,seriesUid,InstanceUid) {
            return v+api+"/dcm-patient/picture/createFlow?sessionId="+sessionId+"&studyUid="+studyInstanceUid+"&seriesUid="+seriesUid+"&instanceUid="+InstanceUid;
        }
 }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.loading{position:absolute;top:50%;left:50%;margin-top:-1rem;margin-left:-2rem;width:4rem;height:2rem;background:#373636;border-radius:5px;}
.loading div{
    height:.8rem;
    width:.8rem;
    margin:.6rem auto;
}
.loading div i{font-size:.8rem; color:#fff;}
.content{position:fixed;top:1rem;bottom:.8rem;width:100%;overflow:auto;background-color: #262626;}
.content ul{width:100%;}
.content ul li{height:1.8rem;border-top:1px solid #f0f0f0;font-size:.3rem;color: #c2c2c2;}
.content ul li:last-of-type{border-bottom:1px solid #f0f0f0;}
.content ul li a{width:100%;height:100%;display:block;color: #c2c2c2;}
.content ul li .medical_img{
    height:1.75rem;
    width:1.75rem;
}
.content ul li .medical_img img{
    width:100%;
    height:100%;
}
.content ul li .text{
    padding:.2rem .2rem .2rem .3rem;
    width:4.5rem;
    overflow: hidden;
}
.content ul li .text h3,.content ul li .text p{
    line-height:.7rem;
}
.content ul li .text .medical_title,.content ul li .text .medical_totle{
    font-size:.28rem;
}
.content ul li .r_arrow{
    height:.4rem;
    width:.4rem;
    margin-top:.7rem;
    margin-right:.3rem;
}
</style>
