<template>
  <div>
    <!--头部-->
    <nav-header >
       <span slot="headTitle">病案质控</span>
       <a class="queryRecord"slot="tools" @click="queryRecord()">
         质控记录
       </a>
    </nav-header>
    <div class="content">
       <form class="search_medical_form">
        <div class="input_row">
            <label for="idNumber">病 案 号</label>
            <input type="text" id="idNumber" placeholder="病 案 号" v-model="idNumber"/>
        </div>
        <div class="input_row">
            <label for="patientName">患者姓名</label>
            <input type="text" id="patientName" placeholder="患者姓名" v-model="patientName"/>
        </div>
        <div class="input_row">
            <label for="idCard">身份证号</label>
            <input type="text" id="idCard" placeholder="身份证号" v-model="idCard"/>
        </div>
        <div class="input_row" style="border-bottom:none">
             <label>质控项目:</label>
             <input type="text"  readonly="readonly" placeholder="选择评价项目"   @focus='showPicker(1)' v-model="firstPro"/>
        </div>
        <div class="input_row" style="border-bottom:none">
             <label></label>
             <input  type="text" readonly="readonly" placeholder="选择二级评价项目" @focus='showPicker(2)' v-model="secondPro"/>
        </div>
        <div class="input_row">
             <label></label>
             <input type="text" readonly="readonly" placeholder="选择三级评价项目" @focus='showPicker(3)' v-model="thirdPro"/>
        </div>
        <div class="input_row">
             <label>扣　　分:</label>
             <input type="text" readonly placeholder="" v-model="score"/>
        </div>
        <div class="input_row">
             <label>质控描述:</label>
             <textarea v-model="medControlDesc" style="flex:5;width:100%;height:90px;margin-top:10px;border: #e3e5e4 solid 1px">
             </textarea>
        </div>
       </form>
       <!--<router-link :to="{path:'/borrowMedical_result',query: {idNumber: this.idNumber,patientName:this.patientName,idCard:this.idCard,outDateStart:this.outDateStart,outDateEnd:this.outDateEnd,outDepartment:this.outDepartment,outDepartmentId:this.outDepartmentId}}" class="search_medical_btn">查询</router-link>-->
       <a class="search_medical_btn" @click='submit'>保存</a>
    </div>
   
    <!-- 科室选择列表-->
    <mt-popup v-model="popupVisible" position="bottom">
       <div class="picker-toolbar">
        <span class="mint-datetime-action mint-datetime-cancel" @click="cancle()">取消</span> 
        <span class="mint-datetime-action mint-datetime-confirm" @click="select">确定</span>
       </div>
        <mt-picker ref='pickerObj' :slots="slots" valueKey=""></mt-picker>
    </mt-popup>
  </div>
</template>

<script>
import navHeader from "@/components/header"
//import { Toast } from 'mint-ui';
//let token=window.localStorage.getItem("token");
export default {
  data () {
    return {
      token:"",
      backshow:true,
      guid:"",
      idNumber:"",
      patientName:"",
      idCard:"",
      firstPro:"",
      secondPro:"",
      thirdPro:"",
      firstProId:"",
      secondProId:"",
      thirdProId:"",
      medControlDesc:"",
      departData:[],//评价级别带有id的数组
      val:['请选择'],//科室名字数组
      slots:[],
      popupVisible:false,
      selectId:'',//评级别的选择判断
      score:""
    }
  },
  components:{
   navHeader
  },
  created:function(){
      this.token=window.localStorage.getItem("token");
      if(!this.token){
          this.$router.push({
              name: 'login',
              params: {
                     
              }
          });
          return; 
      }
      this.idNumber=this.$route.query.mr_id;
      this.patientName=this.$route.query.name;
      this.idCard=this.$route.query.idCard;
      this.guid=this.$route.query.firstGuid;
      this.selectId=1;
      this.getfirstPro();
  },
  methods:{
      //获取一级评价
      getfirstPro(){
        var url=this.api+'/quality/getFirstStandard';
       // var url='/phr-mobile/basicInfo/getMedicalOfficesByHospitalId';
        this.axios.get(url, {
            params:{'token':this.token}
            },
            ).then((result)=>{
          // console.log(result);
           var data=result.data;
           if(data.success){
                if(data.status==999){
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
               var DepartData=eval('(' + data.data + ')');
               var Depart=DepartData;
               this.departData=Depart;
               for(var i=0;i<Depart.length;i++){
                 this.val.push(Depart[i].project)
               }
           }
        })
      },
      getsecondPro(){
        var url=this.api+'/quality/getSecondStandard';
       // var url='/phr-mobile/basicInfo/getMedicalOfficesByHospitalId';
        this.axios.get(url, {
            params:{'token':this.token,'parentId':this.firstProId}
            },
            ).then((result)=>{
          // console.log(result);
           var data=result.data;
           if(data.success){
                if(data.status==999){
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
               var DepartData=eval('(' + data.data + ')');
               var Depart=DepartData;
               this.departData=Depart;
               for(var i=0;i<Depart.length;i++){
                 this.val.push(Depart[i].project)
               }
           }
        })
      },
    getthirdPro(){
       var url=this.api+'/quality/getThirdStandard';
       // var url='/phr-mobile/basicInfo/getMedicalOfficesByHospitalId';
        this.axios.get(url, {
            params:{'token':this.token,'secondId':this.secondProId}
            },
            ).then((result)=>{
          // console.log(result);
           var data=result.data;
           if(data.success){
                if(data.status==999){
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
               var DepartData=eval('(' + data.data + ')');
               var Depart=DepartData;
               this.departData=Depart;
               for(var i=0;i<Depart.length;i++){
                 this.val.push(Depart[i].project)
               }
           }
        })
    },
    showPicker(z){//类型选择框
            this.selectId=z;
            this.val=['请选择'];
            if(z==1){
                
                this.getfirstPro();
            }else if(z==2){
                this.getsecondPro();
            }else if(z==3){
                this.getthirdPro();
            }
            let val=this.val;
            this.popupVisible=true;//激活picker组件
            this.slots=
                [{
                  defaultIndex:0,
                  flex: 1,
                  values: val,//出院科室或者所属机构
                  className: 'slot1',
                  textAlign: 'center'
                }];
           
    },
    select(){
            var pickerVal=this.$refs.pickerObj.getValues();
            if(pickerVal[0]=="请选择"){
                pickerVal[0]="";
            }
            if(this.selectId==1){
             this.firstPro=pickerVal[0];
             for(var i=0;i<this.departData.length;i++){
                if(this.firstPro==this.departData[i].project){
                    this.firstProId=this.departData[i].id;
                    continue;
                }
             }
                this.secondProId="";
                this.thirdProId="";
                this.secondPro="";
                this.thirdPro="";
                this.score="";
            }else if(this.selectId==2){
             this.secondPro=pickerVal[0];
            // console.log(this.secondPro)
             for(var i=0;i<this.departData.length;i++){
                if(this.secondPro==this.departData[i].project){
                    this.secondProId=this.departData[i].id;
                    
                    continue;
                }
             } 
            }else if(this.selectId==3){
             this.thirdPro=pickerVal[0];
            // console.log(this.thirdPro)
             for(var i=0;i<this.departData.length;i++){
                if(this.thirdPro==this.departData[i].project){
                    this.thirdProId=this.departData[i].id;
                    this.score=this.departData[i].score;
                    continue;
                }
             } 

            }
            this.popupVisible=false;
    },
    cancle(){
            this.popupVisible=false;
    },
    submit(){
      if(!this.thirdProId){
         layer.open({
            content: '请选择评价项目'
            ,btn: '我知道了'
        });
        return;
      }
      let url=this.api+'/quality/ajaxAddMedQualityCont';
      let params={token:this.token,firstGuid:this.guid,medControlDesc:this.medControlDesc,qcDockPoints:this.score,firstProId:this.firstProId,secondProId:this.secondProId,thirdProId:this.thirdProId};
      this.axios.post(url,this.qs.stringify(params)).then((result)=>{
          var data=result.data;
          if(data.success){
            if(data.status==999){
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
             layer.open({
                content: '质控记录添加成功！'
                ,skin: 'msg'
                ,time: 3 //2秒后自动关闭
            });
            this.medControlDesc="";
            this.score="";
            this.firstProId="";
            this.secondProId="";
            this.thirdProId="";
            this.firstPro="";
            this.secondPro="";
            this.thirdPro="";
          }   
      })
    },
    queryRecord(){
      this.$router.push({
                     name: 'queryMedical_record',
                     query:{
                         guid:this.guid,
                         idNumber:this.idNumber,
                         patientName:this.patientName,
                         idCard:this.idCard
                     }
                    });
    },
    getValueDate(value){
       function PrefixInteger(num, length) {
          return (Array(length).join('0') + num).slice(-length);
        }
        var time = new Date(value);
        var year = time.getFullYear();
        var mouth = PrefixInteger((time.getMonth() + 1), 2);
        var day = PrefixInteger(time.getDate(), 2);
        var date=year+"-"+mouth+"-"+day;
        return date;
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .picker-toolbar{
      width:100%;
  }
  .mint-popup{
      width:100%;
  }
  .queryRecord{
      position:absolute;
      right:.28rem;
      color:#fff;
      font-size:.3rem;
  }
</style>
