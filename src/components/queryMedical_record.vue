<template>
  <div>
    <!--头部-->
    <nav-header >
       <span slot="headTitle">病案质控记录</span>
    </nav-header>
    <div class="content">
       <form class="search_medical_form" style="margin-bottom:0;padding-bottom:.2rem;">
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
       </form>
       <table cellpadding="0" cellspacing="0" style="width:100%;">
                <tr>
                    <td class="tb_1"style="width:30%;">评价项目</td>
                    <td class="tb_1"style="width:10%;">扣分</td>
                    <td class="tb_1"style="width:30%;">质控描述</td>
                    <td class="tb_1"style="width:15%;">质控人</td>
                    <td class="tb_1"style="width:15%;">操作</td>
                </tr>
                <tr v-for="item in queryList">
                    <td class="tdLabel_5">{{item.project}}</td>
                    <td class="tdLabel_5">{{item.score}}</td>
                    <td class="tdLabel_5">{{item.qualityDes}}</td>
                    <td class="tdLabel_5">{{item.qualityName}}</td>
                    <td class="tdLabel_5">
                        <a class="int" @click="delet($event,item.medQuaFunId,item.mqId)">删除</a>
	                </td>  		
                </tr>	
            </tbody>
        </table>
    </div>
  
    <!-- 科室选择列表-->
    <!--<mt-popup v-model="popupVisible" position="bottom">
       <div class="picker-toolbar">
        <span class="mint-datetime-action mint-datetime-cancel" @click="cancle">取消</span> 
        <span class="mint-datetime-action mint-datetime-confirm" @click="select">确定</span>
       </div>
        <mt-picker ref='pickerObj' :slots="slots" valueKey=""></mt-picker>
    </mt-popup>-->
    <!-- 修改弹框-->
    <!--<div class="modal" v-show="isShow">
       <form class="search_medical_form">
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
             <input type="text" readonly placeholder=""/>
        </div>
        <div class="input_row" style="margin-bottom:.5rem;">
             <label>质控描述:</label>
             <textarea style="flex:5;width:100%;height:90px;margin-top:10px;border: #e3e5e4 solid 1px">
             </textarea>
        </div>
        <div class="search_btn">
          <a  @click='cancel'>取消</a>
          <a  @click='submit'>修改</a>
        </div>
       </form>
    </div>-->
  </div>
</template>

<script>
import navHeader from "@/components/header"
var myVue = {}
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
      queryList:[]
    }
  },
  components:{
   navHeader
  },
  beforeCreate () {
    myVue = this
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
     this.idNumber=this.$route.query.idNumber;
     this.patientName=this.$route.query.patientName;
     this.idCard=this.$route.query.idCard;
     this.guid=this.$route.query.guid;
     this.getQuery();
  },
  methods:{
      //获取一级评价
    getQuery(){
        var url=this.api+'/quality/ajaxDetailControl';
       // var url='/phr-mobile/basicInfo/getMedicalOfficesByHospitalId';
        this.axios.get(url, {
            params:{'token':this.token,'firstGuid':this.guid}
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
               
               if(data.data&& data.data.qualityList){
                 this.queryList=data.data.qualityList;
               }
           }
        })
    },
    
    delet(event,medQuaFunId,mqId){
      let target=event.target;

      layer.open({
        content: '您确定要删除此条质控记录吗？'
        ,btn: ['确定', '取消']
        ,yes: function(index){
            let url=myVue.api+"/quality/deleteQuality";
            let params={token:myVue.token,medQuaFunId:medQuaFunId,mqId:mqId};
            myVue.axios.post(url,myVue.qs.stringify(params)).then((result)=>{
                //console.log(result)
                var data=result.data;
                if(data.success){
                  if(data.status==999){
                    window.localStorage.removeItem("token");
                    layer.open({
                    content: 'token过期！'
                    ,btn: '我知道了'
                    })
                    myVue.$router.push({
                            name: 'login',
                            params: {
                            
                            }
                        });
                    return;
                }
                //删除
                target.parentNode.parentNode.parentNode.removeChild(target.parentNode.parentNode);
                layer.open({
                    content: '质控记录删除成功！'
                    ,skin: 'msg'
                    ,time: 3 //2秒后自动关闭
                });
              }
            })
            layer.close(index);
        }
     });
    },
    submit(){
       
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
  .tb_1{
      height:1rem;
      line-height:1rem;
      background:#9E7831;
      color:#fff;
      text-align:center;
  }
  .tdLabel_5{
      height:auto;
      border:#f1f1f1 1px solid;
      text-align:center;
  }
  .int{
      display:inline-block;
      padding:.1rem;
      background:#9E7831;
      color:#fff;
  }
  .modal{
      background:rgba(0,0,0,.5);
      position:fixed;
      z-index:2000;
      width:100%;
      height:100%;
      padding-top:2rem;
  }
  .search_medical_form{
      background:#fff;
      padding-bottom:.5rem;
  }
  .search_btn {
    width: 80%;
    margin: 0 10%;
}
 .search_btn a{
     display:inline-block;
     width:48%;
     height: 1rem;
    line-height: 1rem;
    text-align: center;
    background: #9E7831;
    border: none;
    font-size: .34rem;
    color: #fff;
}
</style>
