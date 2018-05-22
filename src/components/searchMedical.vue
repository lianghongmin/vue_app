<template>
  <div>
    <!--头部-->
    <nav-header >
       <span slot="headTitle">病案检索</span>
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
                <input type="text" readonly="readonly" class="outDateStart" placeholder="起始日期"  @click="openStartPicker" v-model="outDateStart"/>
                <span>-</span>
                <input type="text"readonly="readonly" class="outDateEnd" placeholder="结束日期" @click="openEndPicker" v-model="outDateEnd"/>
            </div>
        </div>
        <div class="input_row">
            <label for="outDepartment">出院科室</label>
            <input type="text" id="outDepartment"  readonly v-model="outDepartment"/>
            <!--<input type="text" id="outDepartment" placeholder="出院科室" @focus='showPicker' v-model="outDepartment"/>-->
        </div>
       </form>
       <!--<router-link :to="{path:'/searchMedical_result',query: {idNumber: idNumber,patientName:patientName,idCard:idCard,outDateStart:outDateStart,outDateEnd:outDateEnd,outDepartment:outDepartment,outDepartmentId:outDepartmentId}}" class="search_medical_btn">查询</router-link>-->
       <a class="search_medical_btn" @click="submit">查询</a>
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
                        @confirm="closepickerStart">
    </mt-datetime-picker>
    <mt-datetime-picker ref="endpicker" 
                        type="date" 
                         v-model="mytime"
                        :startDate="startDate" 
                        :endDate="endDate" 
                        year-format="{value} 年"
                        month-format="{value} 月"
                        date-format="{value} 日" 
                        @confirm="closepickerEnd">
    </mt-datetime-picker>
    <!-- 科室选择列表-->
    <!--<mt-popup v-model="popupVisible" position="bottom">
       <div class="picker-toolbar">
        <span class="mint-datetime-action mint-datetime-cancel" @click="cancle">取消</span> 
        <span class="mint-datetime-action mint-datetime-confirm" @click="select">确定</span>
       </div>
        <mt-picker ref='pickerObj' :slots="slots" valueKey=""></mt-picker>
    </mt-popup>-->
  </div>
</template>

<script>
import navHeader from "@/components/header"
export default {
  data () {
    return {
      token:"",
      isShow:false,
      popupVisible:false,
      idNumber:"",
      patientName:"",
      idCard:"",
      outDateStart:"",
      outDateEnd:"",
      outDepartment:"",
      outDepartmentId:"",
      mytime:new Date(),
      startDate:new Date('1970'),
      endDate:new Date(),
     // slots:[] 
    }
  },
  components:{
   navHeader
  },
  mounted:function(){

    this.token=window.localStorage.getItem("token");
    let Storedata=eval('(' + window.localStorage.getItem("data") + ')');
    this.outDepartmentId= Storedata.officeCode;
    this.outDepartment= Storedata.officeName;
    let medicalQuery=eval('(' + window.localStorage.getItem("searchQuery") + ')');
    if(!this.token){
          this.$router.push({
              name: 'login',
              params: {
                     
              }
          });
      } 
    if(medicalQuery){
        this.idNumber=medicalQuery.idNumber;
        this.patientName=medicalQuery.patientName;
        this.idCard=medicalQuery.idCard;
        this.outDateStart=medicalQuery.outDateStart;
        this.outDateEnd=medicalQuery.outDateEnd;
    }
  },
  methods:{
    //打开日期选择
    openStartPicker:function(){
        this.$refs.startpicker.open();
    },
    openEndPicker:function(){
        this.$refs.endpicker.open();
    },
    //关闭日期选择框
    closepickerStart(value){
         this.outDateStart=this.getValueDate(value);
         this.mytime=new Date();
    },
    closepickerEnd(value){
         this.outDateEnd=this.getValueDate(value);
         this.mytime=new Date();
    },
    /*showPicker(){//科室类型选择框
            this.popupVisible=true;//激活picker组件
            this.slots=
                [{
                  defaultIndex:0,
                  flex: 1,
                  values: ['呼吸内科', '眼鼻喉科', '泌尿科','呼吸内科', '眼鼻喉科', '泌尿科'],//职业类型
                  className: 'slot1',
                  textAlign: 'center'
                }];
           
    },*/
    select(){
            var pickerVal=this.$refs.pickerObj.getValues();
            this.outDepartment=pickerVal[0];
            //console.log(this.$refs.pickerObj)
            //console.log(this.$refs.pickerObj.slotValueChange());
           // console.log(this.$refs.pickerObj.getValues());
            this.popupVisible=false;
    },
    cancle(){
            this.popupVisible=false;
    },
    submit(){
        var query={
                    idNumber: this.idNumber,
                    patientName:this.patientName,
                    idCard:this.idCard,
                    outDateStart:this.outDateStart,
                    outDateEnd:this.outDateEnd,
                    outDepartment:this.outDepartment,
                    outDepartmentId:this.outDepartmentId      
                   };
        window.localStorage.setItem("searchQuery",JSON.stringify(query));
        this.$router.push({
                     name: 'searchMedical_result',
                     query:query
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
