<template>
  <div>
    <!--头部-->
    <nav-header >
       <span slot="headTitle">病案借阅</span>
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
        <div class="input_row">
            <label>出院日期</label>
            <div class="outDate">
                <input type="text" readonly="readonly" class="outDateStart" placeholder="起始日期"  @click="openPicker('start')" v-model="outDateStart"/>
                <span>-</span>
                <input type="text"readonly="readonly" class="outDateEnd" placeholder="结束日期" @click="openPicker('end')" v-model="outDateEnd"/>
            </div>
        </div>
        <div class="input_row">
            <label for="outDepartment">出院科室</label>
            <input type="text" id="outDepartment" readonly="readonly"  placeholder="出院科室" @focus='showPicker(1)' v-model="outDepartment"/>
        </div>
        <!--<div class="input_row">
            <label for="hospital">所属机构</label>
            <input type="text" id="hospital" placeholder="所属机构" @focus='showPicker(2)' v-model="outInstitution"/>
        </div>-->
       </form>
       <!--<router-link :to="{path:'/borrowMedical_result',query: {idNumber: this.idNumber,patientName:this.patientName,idCard:this.idCard,outDateStart:this.outDateStart,outDateEnd:this.outDateEnd,outDepartment:this.outDepartment,outDepartmentId:this.outDepartmentId}}" class="search_medical_btn">查询</router-link>-->
       <a class="search_medical_btn" @click='submit'>查询</a>
    </div>
    <!-- 出院日期-->
    <mt-datetime-picker ref="startpicker" 
                        type="date" 
                        v-model="mytime"
                        :startDate="startDate" 
                        :endDate="endDate" 
                        year-format="{value} 年"
                        month-format="{value} 月"
                        date-format="{value} 日" 
                        @confirm="closepicker">
    </mt-datetime-picker>
    <!--<mt-datetime-picker ref="endpicker" 
                        type="date" 
                         v-model="mytime"
                        :startDate="startDate" 
                        :endDate="endDate" 
                        year-format="{value} 年"
                        month-format="{value} 月"
                        date-format="{value} 日" 
                        @confirm="closepickerEnd">
    </mt-datetime-picker>-->
    <!-- 科室选择列表-->
    <mt-popup v-model="popupVisible" position="bottom">
       <div class="picker-toolbar">
        <span class="mint-datetime-action mint-datetime-cancel" @click="cancle">取消</span> 
        <span class="mint-datetime-action mint-datetime-confirm" @click="select">确定</span>
       </div>
        <mt-picker ref='pickerObj' :slots="slots" valueKey=""></mt-picker>
    </mt-popup>
  </div>
</template>

<script>
import navHeader from "@/components/header"
//let token=window.localStorage.getItem("token");
export default {
  data () {
    return {
      token:"",
      backshow:true,
      idNumber:"",
      patientName:"",
      idCard:"",
      outDateStart:"",
      outDateEnd:"",
      outDepartment:"",
      outDepartmentId:"",
      //outInstitution:'',
      startDate:new Date('1977'),
      endDate:new Date(),
      mytime:new Date(),
      departData:[],//科室带有id的数组
      val:['请选择'],//科室名字数组
      slots:[],
      popupVisible:false,
      selectId:'',//科室和机构的选择判断
      
    }
  },
  components:{
   navHeader
  },
  created:function(){
      this.token=window.localStorage.getItem("token");
      let borrowQuery=eval('(' + window.localStorage.getItem("borrowQuery") + ')');
      if(!this.token){
          this.$router.push({
              name: 'login',
              params: {
                     
              }
          });
          return; 
      }
     
      if(borrowQuery){
        this.idNumber=borrowQuery.idNumber;
        this.patientName=borrowQuery.patientName;
        this.idCard=borrowQuery.idCard;
        this.outDateStart=borrowQuery.outDateStart;
        this.outDateEnd=borrowQuery.outDateEnd;
        this.outDepartment=borrowQuery.outDepartment;
        this.outDepartmentId=borrowQuery.outDepartmentId;
    }
    this.getDepartment();
  },
  methods:{
      //获取出院科室
      getDepartment(){
        var url=this.api+'/basicInfo/getMedicalOfficesByHospitalId';
       // var url='/phr-mobile/basicInfo/getMedicalOfficesByHospitalId';
        this.axios.get(url, {
            params:{'hospitalId':1,'token':this.token}
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
              // console.log(data.data)
              // var DepartData=JSON.parse(data.data);
               var DepartData=eval('(' + data.data + ')');
               var Depart=DepartData.medicalOfficesList;
               this.departData=Depart;
               for(var i=0;i<Depart.length;i++){
                 this.val.push(Depart[i].name)
               }
           }
        })
      },
    //打开日期选择
    openPicker:function(val){
        this.selectId=val;
        this.$refs.startpicker.open();
    },
    //关闭日期选择框
    closepicker(value){
        if(this.selectId=='start'){//出院开始日期
           this.outDateStart=this.getValueDate(value);
        }else if(this.selectId=='end'){//出院结束日期
           this.outDateEnd=this.getValueDate(value);
        }
         this.mytime=new Date();
         this.selectId="";
    },
    showPicker(z){//类型选择框
            this.selectId=z;
            let val=this.val;
           // console.log(val)
            /*if(z==1){//出院科室
              val=['呼吸内科', '眼鼻喉科', '泌尿科','呼吸内科', '眼鼻喉科', '泌尿科']
            }else if(z==2){//所属机构
              val=['解放军305医院']
            }*/
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
            this.outDepartment=pickerVal[0];
           // console.log(this.outDepartment)
            for(var i=0;i<this.departData.length;i++){
                if(this.outDepartment==this.departData[i].name){
                    this.outDepartmentId=this.departData[i].id;
                    continue;
                }
            }
           /* if(this.selectId==1){//科室
                this.outDepartment=pickerVal[0];
            }else if(this.selectId==2){//机构
                this.outInstitution=pickerVal[0];
            }*/
           
            this.popupVisible=false;
    },
    cancle(){
            this.popupVisible=false;
    },
    submit(){
       var borrowquery={
                    idNumber: this.idNumber,
                    patientName:this.patientName,
                    idCard:this.idCard,
                    outDateStart:this.outDateStart,
                    outDateEnd:this.outDateEnd,
                    outDepartment:this.outDepartment,
                    outDepartmentId:this.outDepartmentId      
                   };
        window.localStorage.setItem("borrowQuery",JSON.stringify(borrowquery));
        this.$router.push({
                     name: 'borrowMedical_result',
                     query:borrowquery
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
</style>
