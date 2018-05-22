<template>
  <div>
    <!--头部-->
    <nav-header >
       <span slot="headTitle">病案详情</span>
       <a class="collect" slot="tools">
       </a>
    </nav-header>
    <div class="content">
        <div class="print_size" id="print_pdf">
            <div class="print_page">
                <h4 align="center">大连大学附属中山医院</h4>
		            <h4 class="sub_title" align="center">住院病案首页</h4>
                <table style="width:755px" class="print_table" cellspacing="0" cellpadding="0">
                <tbody>
                      <tr>
                          <td  colspan="5" style="border: none;">
                            <label style="width: 380px;">医疗保险账户（手册/卡）号：<span id="medicalInsuranceNumber"></span></label>
                            <label style="width: 166px;">第&nbsp;&nbsp;<span id="visitNumber"></span>&nbsp;&nbsp;次住院</label>
                            <label style="width: 150px;">病案号：<span id="mrId"></span> </label>
                          </td>
                      </tr>
                        <tr>
                          <td colspan="5" style="border: none;">
                            <label style="width: 555px;">医疗付款方式：<span id="medicalPayTypeName"></span></label>
                            <label style="width: 150px;">识别号（ID）：<span id="onlyId"></span></label>
                          </td>
                      </tr>
                  <tr>
                    <td>
                      <label style="width: 120px;">姓名&nbsp;<span id="patientName"></span></label>
                      <label style="width: 100px;">性别&nbsp;<span id="sexName"></span></label>
                      <label style="width: 170px;">出生&nbsp;<span id="birthday"></span></label>
                      <label style="width: 80px;">年龄&nbsp;<span id="age"></span>&nbsp;岁</label>
                    </td>
                    <td style="line-height: 33px;" rowspan="11" colspan="4">
                    <p>人员类别:&emsp;<span id="personnelCategoryName"></span></p>
                    <p>隶属大单位:&emsp;<span id='majorUnitName'></span></p>
                    <p>勤务:&emsp;<span id='troopServiceName'></span></p>
                    <p>医疗体系:&emsp;<span id='medicalSystemName'></span></p>
                    <p>身份:&emsp;<span id='idTypeName'></span></p>
                    <p>费别:&emsp;<span id='costTypeName'></span></p>
                    <p>在职状况:&emsp;<span id='jobStateName'></span></p>
                    <p>军事训练伤:&emsp;<span id='militaryTrainingInjuryName'></span></p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label style="width: 120px;">婚姻&nbsp;<span id="marriageName"></span></label>
                      <label style="width: 150px;">职业&nbsp;<span id="professionName"></span></label>
                      <label style="width: 210px;">出生地&nbsp;<span id="birthAddress"></span></label>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label style="width: 120px;">民族&nbsp;<span id="nationName"></span></label>
                      <label style="width: 150px;">国籍&nbsp;<span id="nationalityName"></span></label>
                      <label style="width: 210px;">身份证号&nbsp;<span id="idNumber"></span></label>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label style="width: 360px;">工作单位&nbsp;<span id="workUnitName"></span></label>
                      <label style="width: 120px;">电话&nbsp;<span id="workUnitPhone"></span></label>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label style="width: 360px;">工作地址&nbsp;<span id="workUnitAddress"></span></label>
                      <label style="width: 100px;">邮编&nbsp;<span id="workUnitPostCode"></span></label>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label style="width: 360px;">户口/常住地址&nbsp;<span id="permanentAddress"></span></label>
                      <label style="width: 100px;">邮编&nbsp;<span id="permanentAddressPostCode"></span></label>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label style="width: 160px;">联系人姓名&nbsp;<span id="linkManName"></span></label>
                      <label style="width: 196px;">关系&nbsp;<span id="linkManRelativeRelationName"></span></label>
                      <label style="width: 120px;">电话&nbsp;<span id="linkManPhone"></span></label>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label style="width: 360px;">联系人地址&nbsp;<span id="linkManAddress"></span></label>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label style="width: 300px;">入院方式&nbsp;<span id="inHospitalTypeName"></span></label>
                      <label style="width: 150px;">入院时情况&nbsp;<span id="inHospitalStateName"></span></label>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label style="width: 340px;"><label style="width: 50px;">门(急)诊诊断</label>&nbsp;<span id="diseaseDiagName0" style="border-bottom: 1px #000 solid;display: inline-block;width: 229px;"></span></label>
                      <label style="width: 139px;">ICD&nbsp;<span id="diseaseDiagCode0" style="border-bottom: 1px #000 solid;display: inline-block;width: 59px;"></span></label>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label style="width: 260px;">接诊日期&nbsp;<span id="clinicalReceptionDateTime"></span></label>
                      <label style="width: 110px;">门诊医生&nbsp;<span id="outpatientOfDoctorName"></span></label>
                      <label style="width: 110px;">经办人&nbsp;<span id="responsiblePersonName"></span></label>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label style="width: 200px;"><span id="inHospitalDateTime" style="border-bottom: 1px #000 solid;display: inline-block;"></span></label><!-- 入院日期 -->
                      <label style="width: 294px;">入&nbsp;<span id="inDeptName" style="border-bottom: 1px #000 solid;display: inline-block;width:200px;"></span>科</label><!-- 入院科室 -->
                    </td>
                    <td rowspan="3" colspan="4">
                      <p>确诊日期&nbsp;<span id="diagConfirmedDateTime"></span></p>
                      <p>确诊天数&nbsp;<span id="diagConfirmedDayNumber"></span>&nbsp;天</p>
                      <p>住院天数&nbsp;<span id="inHospitalDayNumber"></span>&nbsp;天</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label style="width: 200px;"><span id="outHospitalDateTime" style="border-bottom: 1px #000 solid;display: inline-block;"></span></label><!-- 出院日期 -->
                      <label style="width: 294px;">从&nbsp;<span id="outDeptName" style="border-bottom: 1px #000 solid;display: inline-block;width: 200px;"></span>科&nbsp;出院</label><!-- 出院科室 -->
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label style="width: 299px;"><label style="width: 50px;">入院初步诊断</label>&emsp;<span id="diseaseDiagName2" style="border-bottom: 1px #000 solid;display: inline-block;width: 229px;"></span></label>
                      <label style="width: 169px;">ICD&emsp;<span id="diseaseDiagCode2" style="border-bottom: 1px #000 solid;display: inline-block;width: 79px;"></span></label>
                    </td>
                  </tr>
                  <tr>
                    <td align="center" style="border-top:none;">
                      <label style="width:520px;">出院诊断</label>
                    </td>
                    <td align="center" style="border-top:none;padding-left:0;">
                      确诊日期
                    </td>
                    <td align="center" style="border-top:none;padding-left:0;">
                      出院情况
                    </td>
                    <td align="center" style="border-top:none;padding-left:0;">
                      治疗天数
                    </td>
                    <td align="center" style="border-top:none;padding-left:0;">
                      ICD
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label style="width: 320px;">主要诊断&nbsp;<span id="diseaseDiagName1"></span></label>
                    </td>
                    <td  align="center">
                      <span id="confirmedDateTime1"></span>
                    </td>
                    <td >
                      <span id="treatResultName1"></span>
                    </td>
                    <td  align="center">
                      <span id="treatDayNumber1"></span>
                    </td>
                    <td  align="center">
                      <span id="diseaseDiagCode1"></span>
                    </td>
                  </tr>
                  <!--次要诊断 -->
                  <tbody id="otherdiseaseDiag" >
                    <tr>
                      <td>
                        <label style="width: 320px;">其他诊断&nbsp;<span id="otherdiseaseDiagName1"></span></label>
                      </td>
                      <td  width="90" align="center">
                        <label style="width: 79px;"><span id="otherconfirmedDateTime1"></span></label>
                      </td>
                      <td  width="22">
                        <label style="width: 35px;"><span id="othertreatResultName1"></span></label>
                      </td>
                      <td  width="22" align="center">
                        <label style="width: 35px;"><span id="othertreatDayNumber1"></span></label>
                      </td>
                      <td  width="70" align="center">
                        <label style="width: 60px;"><span id="otherdiseaseDiagCode1"></span></label>
                      </td>
                    </tr>
                </tbody>
                <tbody id="hospitaldiseaseDiag">
                  <tr>
                    <td>
                      <label style="width: 320px;">医院感染名称&nbsp;<span id="otherdiseaseDiagName1"></span></label>
                    </td>
                    <td  width="90" align="center">
                      <label style="width: 79px;"><span id="otherconfirmedDateTime1"></span></label>
                    </td>
                    <td  width="22">
                      <label style="width: 35px;"><span id="othertreatResultName1"></span></label>
                    </td>
                    <td  width="22" align="center">
                      <label style="width: 35px;"><span id="othertreatDayNumber1"></span></label>
                    </td>
                    <td  width="70" align="center">
                      <label style="width: 60px;"><span id="otherdiseaseDiagCode1"></span></label>
                    </td>
                  </tr>
                </tbody>
                  <tr>
                    <td>
                      <label style="width: 320px;">&nbsp;<span id="otherdiseaseDiagName1"></span></label>
                    </td>
                    <td  width="90" align="center">
                      <label style="width: 79px;"><span id="otherconfirmedDateTime1"></span></label>
                    </td>
                    <td  width="22">
                      <label style="width: 35px;"><span id="othertreatResultName1"></span></label>
                    </td>
                    <td  width="22" align="center">
                      <label style="width: 35px;"><span id="othertreatDayNumber1"></span></label>
                    </td>
                    <td  width="70" align="center">
                      <label style="width: 60px;"><span id="otherdiseaseDiagCode1"></span></label>
                    </td>
                  </tr>
                  <tr>
                    <td width="753" colspan="5">
                      <label style="width: 550px;"><label style="width: 40px;">病理诊断</label><span id="dis_diseaseDiagName" style="border-bottom: 1px #000 solid;display: inline-block;width: 480px;"></span></label>
                      <label style="width: 183px;">ICD&emsp;<span id="dis_diseaseDiagCode" style="border-bottom: 1px #000 solid;display: inline-block;width: 119px;"></span></label>
                    </td>
                  </tr>
                  <tr>
                    <td width="753" colspan="5">
                      <label style="width: 600px;">损伤、中毒的外部原因&emsp;<span id="pos_diseaseDiagName"  style="width: 400px;"></span></label>
                      <label style="width: 113px;">ICD&emsp;<span id="pos_diseaseDiagCode" style="width: 69px;"></span></label>
                    </td>
                  </tr>
                  <tr>
                    <td width="753" colspan="5">
                      <label style="width: 380px;">根本死亡原因&emsp;<span id="die_diseaseDiagName" style="width: 230px;"></span></label>
                      <label style="width: 180px;">ICD&emsp;<span id="die_diseaseDiagCode"  style="width: 69px;"></span></label>
                      <label style="width: 163px;">尸检&emsp;<span id="autopsyCode" style="border: 1px #000 solid;width: 18px;display: inline-block;text-align:center;"></span>&emsp;1.是&nbsp;2.否</label>
                    </td>
                  </tr>
                </tbody>
              </table>
              
            </div>
            <div class="print_page">
              <h4 align="center">大连大学附属中山医院</h4>
              <h4 class="sub_title" align="center">住院病案首页</h4>
              <table style="width: 756px;" class="print_table" cellspacing="0" cellpadding="0">
                
                  <tr>
                    <td rowspan="2" style="width: 15%" align="center">
                      <label>手术、操作日期</label>
                    </td>
                    <td rowspan="2"  style="width: 20%"  align="center">
                      <label>手术、操作名称</label>
                    </td>
                    <td colspan="3" style="width: 24%" align="center">
                      <label>手术、操作医师</label>
                    </td>
                    <td rowspan="2" style="width: 10%" align="center">
                      <label>麻醉方式</label>
                    </td>
                    <td rowspan="2" style="width: 11%" align="center">
                      <label>切口愈合等级</label>
                    </td>
                    <td rowspan="2" style="width: 10%" align="center">
                      <label>麻醉医师</label>
                    </td>
                    <td rowspan="2" style="width: 10%" align="center">
                      <label>手术、操作编码</label>
                    </td>
                  </tr>
                  <tr>
                    <td align="center" style="width: 8%">
                      <label>术者</label>
                    </td>
                    <td align="center" style="width: 8%">
                      <label>I助</label>
                    </td>
                    <td align="center" style="width: 8%">
                      <label>II助</label>
                    </td>
                  </tr>
                  
                  <tbody style="display:none">
                    <tr id="operate_tr">
                      <td style="height: 40px" align="center">
                        <label><span></span></label>
                      </td>
                      <td style="height: 40px" align="center">
                        <label><span></span></label>
                      </td>
                      <td style="height: 40px" align="center">
                        <label><span></span></label>
                      </td>
                      <td style="height: 40px" align="center">
                        <label><span></span></label>
                      </td>
                      <td style="height:40px" align="center">
                        <label><span></span></label>
                      </td>
                      <td style="height: 40px" align="center">
                        <label><span></span></label>
                      </td>
                      <td style="height: 40px" align="center">
                        <label><span ></span></label>
                      </td>
                      <td style="height: 40px" align="center">
                        <label><span></span></label>
                      </td>
                      <td style="height: 40px" align="center">
                        <label><span></span></label>
                      </td>
                    </tr>
                  </tbody>
                  <tbody id="operateRecords">
                      <tr>
                      <td style="height: 40px" align="center">
                        <label><span></span></label>
                      </td>
                      <td style="height: 40px" align="center">
                        <label><span></span></label>
                      </td>
                      <td style="height: 40px" align="center">
                        <label><span></span></label>
                      </td>
                      <td style="height: 40px" align="center">
                        <label><span></span></label>
                      </td>
                      <td style="height:40px" align="center">
                        <label><span></span></label>
                      </td>
                      <td style="height: 40px" align="center">
                        <label><span ></span></label>
                      </td>
                      <td style="height: 40px" align="center">
                        <label><span ></span></label>
                      </td>
                      <td style="height: 40px" align="center">
                        <label><span></span></label>
                      </td>
                      <td style="height: 40px" align="center">
                        <label><span></span></label>
                      </td>
                      </tr>
                    </tbody>
                 </table>
                <table style="width: 756px;" class="print_table" cellspacing="0" cellpadding="0">
                    <tr>
                      <td colspan="9" style="width: 754px;border-top: none;" id="diagAccordRecords">
                      <label style="width: 120px;">诊断符合情况:</label>
                      <label style="width: 156px;">门诊与出院:
                        <span id="accord0" style="border: 1px #000 solid;width: 18px;display: inline-block;text-align:center;"
                          ></span>
                      </label>
                      <label style="width: 156px;">入院与出院:
                        <span id="accord1" style="border: 1px #000 solid;width: 18px;display: inline-block;text-align:center;"
                        ></span>
                      </label>
                      <label style="width: 156px;">术前与术后:
                        <span id="accord2" style="border: 1px #000 solid;width: 18px;display: inline-block;text-align:center;"
                        ></span>
                      </label>
                      <label style="width: 128px;">临床与病理:
                        <span id="accord3" style="border: 1px #000 solid;width: 18px;display: inline-block;text-align:center;"></span>
                      </label>
                      <label style="width:120px;"></label>
                      
                      <label style="width: 186px;">放射与病理:
                        <span id="accord4" style="border: 1px #000 solid;width: 18px;display: inline-block;text-align:center;"></span>
                      </label>
                      <label style="width: 316px;">
                        <span id="">0.未做&emsp;1.符合&emsp;2.不符合&emsp;3.不肯定&emsp;</span>
                      </label>
                    </td>
                    </tr>
                    <tr>
                      <td colspan="9" style="width: 754px;">
                        <label style="width: 70px;">住院期间:</label>
                        <label style="width: 133px;">病危
                          <span id="criticalDayNumber" style="border-bottom:1px #000 solid;width: 30px;display: inline-block;text-align:center;"></span>天
                        </label>
                        <label style="width: 133px;">病重
                          <span id="sickDayNumber" style="border-bottom:1px #000 solid;width: 30px;display: inline-block;text-align:center;"></span>天
                        </label>
                        <label style="width: 133px;">抢救
                          <span id="rescueNumber" style="border-bottom:1px #000 solid;width: 30px;display: inline-block;text-align:center;"></span>次
                        </label>
                        <label style="width: 133px;">抢救成功
                          <span id="rescueSucceedNumber" style="border-bottom:1px #000 solid;width: 30px;display: inline-block;text-align:center;"></span>次
                        </label>
                        <label style="width: 98px;">ICU
                          <span id="icuNurseDayNumber" style="border-bottom:1px #000 solid;width: 30px;display: inline-block;text-align:center;"></span>天
                        </label>
                        <label style="width: 207px;padding-left: 74px;">CCU
                          <span id="ccuNurseDayNumber" style="border-bottom:1px #000 solid;width: 30px;display: inline-block;text-align:center;"></span>天
                        </label>
                        <label style="width: 133px;">特护 
                          <span id="specialNurseDayNumber" style="border-bottom:1px #000 solid;width: 30px;display: inline-block;text-align:center;"></span>天
                        </label>
                        <label style="width: 133px;">一级护理
                          <span id="firstLevelNurseDayNumber" style="border-bottom:1px #000 solid;width: 30px;display: inline-block;text-align:center;"></span>天
                        </label>
                        <label style="width: 125px;">二级护理
                          <span id="secondLevelNurseDayNumber" style="border-bottom:1px #000 solid;width: 30px;display: inline-block;text-align:center;"></span>天
                        </label>
                        <label style="width: 113px;">发生褥疮 
                          <span id="pressureSoreTimes" style="border-bottom:1px #000 solid;width: 30px;display: inline-block;text-align:center;"></span>次
                        </label>
                      </td>
                    </tr>
                    <tr>
                      <td colspan="9" style="width: 754px;">
                        <label style="width: 700px;">药物过敏</label>
                      </td>
                    </tr>
                    <tr>
                      <td colspan="9" style="width: 754px;">
                        <label style="width: 120px;">HBsAg&emsp;
                          <span id="hbsAgeResultCode" style="border: 1px #000 solid;width: 18px;display: inline-block;text-align:center;"></span>
                        </label>
                        <label style="width: 120px;">HCV-Ab&emsp;
                          <span id="hcvAbResultCode" style="border: 1px #000 solid;width: 18px;display: inline-block;text-align:center;"></span>
                        </label>
                        <label style="width: 120px;">HIV-Ab&emsp;
                          <span id="hivAbResultCode" style="border: 1px #000 solid;width: 18px;display: inline-block;text-align:center;"></span>
                        </label>
                        <label style="width: 50px;">
                          0.未做
                        </label>
                        <label style="width: 50px;">
                          1.阴性
                        </label>
                        <label style="width: 50px;">
                          2.阳性
                        </label>
                      </td>
                    </tr>
                    <tr>
                      <td colspan="9" style="width: 754px;">
                        <label style="width: 300px;">手术、治疗、检查、诊断为本院第一例&emsp;
                          <span id="" style="border: 1px #000 solid;width: 18px;display: inline-block;text-align:center;"></span>
                        </label>
                        <label style="width: 50px;">
                          1.是
                        </label>
                        <label style="width: 50px;">
                          2.否
                        </label>
                      </td>
                    </tr>
                    <tr>
                      <td colspan="9" style="width: 754px;">
                        <label style="width: 80px;">随诊&nbsp;
                          <span id="followUpClinicLimitCode" style="border: 1px #000 solid;width: 18px;display: inline-block;text-align:center;">2</span>
                        </label>
                        <label style="width: 50px;">
                          1.是
                        </label>
                        <label style="width: 50px;">
                          2.否
                        </label>
                        <label style="width: 300px;">随诊期限&emsp;
                          <span id="followUpClinicWeekNumber" style="border-bottom: 1px #000 solid;width: 28px;display: inline-block;text-align:center;"></span>周
                          <span id="followUpClinicMonthNumber" style="border-bottom: 1px #000 solid;width: 28px;display: inline-block;text-align:center;"></span>月
                          <span id="followUpClinicYearNumber" style="border-bottom: 1px #000 solid;width: 28px;display: inline-block;text-align:center;"></span>年
                        </label>
                      </td>
                    </tr>
                    <tr>
                      <td colspan="9" style="width: 754px;">
                        <label style="width: 80px;">血型
                        <span id="bloodTypeCode" style="border: 1px #000 solid;width: 18px;display:inline-block;text-align:center;">0</span>
                        </label>
                        <label style="width: 220px;">
                          1.A&emsp;2.B&emsp;3.O&emsp;4.AB&emsp;5.其他
                        </label>
                        <label style="width: 50px;">RH
                          <span id="rhBloodTypeCode" style="border: 1px #000 solid;width: 18px;display: inline-block;text-align:center;"></span>
                        </label>
                        <label style="width: 80px;">
                          1.阴&emsp;2.阳
                        </label>
                        <label style="width:120px;">输血
                          <span id="infusionBloodTimes" style="border-bottom: 1px #000 solid;width: 48px;display: inline-block;text-align:center;"></span>次
                        </label>
                        <label style="width: 150px;">输血反应
                          <span id="infusionBloodReactTimes" style="border-bottom: 1px #000 solid;width: 48px;display: inline-block;text-align:center;"></span>次
                        </label>
                        <label style="width: 235px;">输血品种:&nbsp;1.红细胞
                          <span id="blood1" style="border-bottom: 1px #000 solid;width: 48px;display: inline-block;text-align:center;"></span>单位
                        </label>
                        <label style="width: 145px;">2.血浆
                          <span id="blood2" style="border-bottom: 1px #000 solid;width: 48px;display: inline-block;text-align:center;"></span>单位
                        </label>
                        <label style="width: 185px;">3.血小板:机采
                          <span id="blood3" style="border-bottom: 1px #000 solid;width: 48px;display: inline-block;text-align:center;"></span>单位
                        </label>
                        <label style="width: 150px;">,手分工
                          <span id="blood4" style="border-bottom: 1px #000 solid;width: 48px;display: inline-block;text-align:center;"></span>单位
                        </label>
                        <label style="width: 235px;padding-left: 80px;">4.全血
                          <span id="blood5" style="border-bottom: 1px #000 solid;width: 48px;display: inline-block;text-align:center;"></span>单位
                        </label>
                        <label style="width: 170px;">5.其他(&emsp;)
                          <span id="blood6" style="border-bottom: 1px #000 solid;width: 48px;display: inline-block;text-align:center;"></span>单位
                        </label>
                        <label style="width: 120px;">自身输血&nbsp;
                          <span id="blood7" style="border: 1px #000 solid;width: 18px;display: inline-block;text-align:center;"></span>
                        </label>
                        <label style="width: 30px;">
                          1.是
                        </label>
                        <label style="width: 50px;">
                          2.否
                        </label>
                        <label style="width: 100px;">共
                          <span id="infusionBloodTotalVolume" style="border-bottom: 1px #000 solid;width: 48px;display: inline-block;text-align:center;"></span>ml
                        </label>
                      </td>
                    </tr>
                    <tr>
                      <td colspan="9" style="width: 754px;">
                        <label style="width: 200px;">住院费用总计(元)&emsp;
                          <span id="totalCost" style="border-bottom: 1px #000 solid;width: 48px;display: inline-block;text-align:center;"></span>
                        </label>
                        <label style="width: 104px;">床位&nbsp;
                          <span id="costMoney1" style="border-bottom: 1px #000 solid;width: 48px;display: inline-block;text-align:center;"></span>
                        </label>
                        <label style="width: 104px;">西药&nbsp;
                          <span id="costMoney2" style="border-bottom: 1px #000 solid;width: 48px;display: inline-block;text-align:center;"></span>
                        </label>
                        <label style="width: 104px;">中药&nbsp;
                          <span id="costMoney3" style="border-bottom: 1px #000 solid;width: 48px;display: inline-block;text-align:center;"></span>
                        </label>
                        <label style="width: 104px;">检验&nbsp;
                          <span id="costMoney4" style="border-bottom: 1px #000 solid;width: 48px;display: inline-block;text-align:center;"></span>
                        </label>
                        <label style="width: 104px;">放射&nbsp;
                          <span id="costMoney5" style="border-bottom: 1px #000 solid;width: 48px;display: inline-block;text-align:center;"></span>
                        </label>
                        <label style="width: 104px;">特检&nbsp;
                          <span id="costMoney6" style="border-bottom: 1px #000 solid;width: 48px;display: inline-block;text-align:center;"></span>
                        </label>
                        <label style="width: 104px;">治疗&nbsp;
                          <span id="costMoney7" style="border-bottom: 1px #000 solid;width: 48px;display: inline-block;text-align:center;"></span>
                        </label>
                        <label style="width: 104px;">输血&nbsp;
                          <span id="costMoney8" style="border-bottom: 1px #000 solid;width: 48px;display: inline-block;text-align:center;"></span>
                        </label>
                        <label style="width: 104px;">手术&nbsp;
                          <span id="costMoney9" style="border-bottom: 1px #000 solid;width: 48px;display: inline-block;text-align:center;"></span>
                        </label>
                        <label style="width: 104px;">护理&nbsp;
                          <span id="costMoney10" style="border-bottom: 1px #000 solid;width: 48px;display: inline-block;text-align:center;"></span>
                        </label>
                        <label style="width: 104px;">其他&nbsp;
                          <span id="costMoney11" style="border-bottom: 1px #000 solid;width: 48px;display: inline-block;text-align:center;"></span>
                        </label>
                      </td>
                    </tr>
                    <tr>
                      <td colspan="9" style="width: 754px;">
                        <label style="width: 150px;">科主任　
                          <span id="cureWorkers0" style="border-bottom: 1px #000 solid;width: 80px;display: inline-block;text-align:center;"></span>
                        </label>
                        <label style="width: 215px;">主(副主)任医师　
                          <span id="cureWorkers1" style="border-bottom: 1px #000 solid;width: 80px;display: inline-block;text-align:center;"></span>
                        </label>
                        <label style="width: 180px;">主治医生　
                          <span id="cureWorkers2" style="border-bottom: 1px #000 solid;width: 80px;display: inline-block;text-align:center;"></span>
                        </label>
                        <label style="width: 180px;">住院医师　
                          <span id="cureWorkers3" style="border-bottom: 1px #000 solid;width: 80px;display: inline-block;text-align:center;"></span>
                        </label>
                      </td>
                    </tr>
                    <tr>
                      <td colspan="9" style="width: 754px;">
                        <label style="width: 170px;">进修医师&emsp;
                          <span id="cureWorkers4" style="border-bottom: 1px #000 solid;width: 80px;display: inline-block;text-align:center;"></span>
                        </label>
                        <label style="width: 215px;">研究生实习医师&emsp;
                          <span id="cureWorkers5" style="border-bottom: 1px #000 solid;width: 80px;display: inline-block;text-align:center;"></span>
                        </label>
                        <label style="width: 180px;">实习医师&emsp;
                          <span id="cureWorkers6" style="border-bottom: 1px #000 solid;width: 80px;display: inline-block;text-align:center;"></span>
                        </label>
                        <label style="width: 160px;">编码员&emsp;
                          <span id="cureWorkers7" style="border-bottom: 1px #000 solid;width: 80px;display: inline-block;text-align:center;"></span>
                        </label>
                      </td>
                    </tr>
                    <tr>
                      <td colspan="9" style="width: 754px;">
                        <label style="width: 130px;">病案质量&emsp;
                          <span id="medicalRecordQualityName"></span>
                        </label>
                        <label style="width: 180px;">质控医师&emsp;
                          <span id="cureWorkers8" style="border-bottom: 1px #000 solid;width: 80px;display: inline-block;text-align:center;"></span>
                        </label>
                        <label style="width: 180px;">质控护士&emsp;
                          <span id="cureWorkers9" style="border-bottom: 1px #000 solid;width: 80px;display: inline-block;text-align:center;"></span>
                        </label>
                        <label style="width:200px;">日期&nbsp;
                        <span id="qualityControlDateTime"></span>
                        </label>
                      </td>
                    </tr>
                    <tr>
                      <td colspan="9" style="width: 754px;">
                        <label style="width: 715px;">
                          说明:&emsp;医疗付款方式&emsp;
                          1.社会基本医疗保险&emsp;&emsp;
                          2.公费医疗&emsp;&emsp;
                          3.大病统筹&emsp;&emsp;
                          4.商业保险&emsp;&emsp;
                          5.自费医疗
                          <label style="padding-left: 46px;">6.军队医疗&emsp;</label>
                          7.其他&emsp;&emsp;
                          住院费用总计&emsp;凡可由计算机提供住院费用清单的,住院首页中可不填
                        </label>
                      </td>
                    </tr>
                </table>
			      </div>
            <!--临时医嘱-->
            <div class="print_page">
		   
		          <h4 align="center">大连大学附属中山医院</h4>
		          <h4 class="sub_title" align="center">临时医嘱记录单</h4>
              <table style="width: 756px;" class="print_table" id="doctorAdviceTemporaryTable" cellspacing="0" cellpadding="0">
                <tbody id="doctorAdviceTemporaryInfoTbody">
                  <tr>
                    <td style="width:750px;border: none;"  colspan="6">
                      <label style="width: 690px;padding-left: 510px;">ID号:&nbsp;
                        <span class="patientId"></span>
                      </label>
                    </td>
                  </tr>
                  <tr>
                    <td style="width: 750px;border: none;" colspan="6">
                            <label style="width: 185px;">姓名:&nbsp;<span class="patientName"></span></label>
                            <label style="width: 200px;">科室:&nbsp;<span class="deptName"></span></label>
                            <label style="width: 100px;">床号:&nbsp;<span class="bedName"></span></label>
                            <label style="width: 150px;">病案号:&nbsp;<span class="mrId"></span></label>
                            <label style="width: 85px;">第&nbsp;<span class="indexNumber"></span>&nbsp;页</label>
                    </td>
                  </tr>
                  <tr>
                    <td style="width: 79px;" align="center">
                      <label style="width: 75px;">日期</label>
                    </td>
                    <td style="width: 49px;" align="center">
                      <label style="width: 45px;">时间</label>
                    </td>
                    <td style="width: 400px;" align="center">
                      <label style="width: 400px;">医嘱</label>
                    </td>
                    <td style="width: 79px;" align="center">
                      <label style="width: 75px;">医师签名</label>
                    </td>
                    <td style="width: 69px;" align="center">
                      <label style="width: 75px;">护士签名</label>
                    </td>
                    <td style="width: 49px;" align="center">
                      <label style="width: 45px;">执行时间</label>
                    </td>
                  </tr>
                    <tr id="doctorAdviceContent" hidden="true">
                      <td style="width: 80px;height: 40px;border-bottom:none;border-top: none;" align="center">
                        <label style="width: 75px;"><span class="presupposeDateTimeymd"></span></label>
                      </td>
                      <td style="width: 50px;border-bottom:none;border-top: none;" align="center">
                        <label style="width: 45px;"><span class="presupposeDateTimehms"></span></label>
                      </td>
                      <td style="width: 400px;border-bottom:none;border-top: none;">
                        <label style="width: 400px;"><span class="doctorAdviceContent"></span></label>
                      </td>
                      <td style="width: 80px;border-bottom:none;border-top: none;" align="center">
                        <label style="width: 75px;"><span class="doctorName"></span></label>
                      </td>
                      <td style="width: 70px;border-bottom:none;border-top: none;" align="center">
                        <label style="width: 65px;"><span class="nurseName"></span></label>
                      </td>
                      <td style="width: 50px;border-bottom:none;border-top: none;" align="center">
                        <label style="width: 45px;"><span class="executionDateTime"></span></label>
                      </td>
                    </tr>
                  </tbody>
                    <tr>
                      <td style="border-bottom:none;border-top: none;">
                        <label style="width: 75px;"></label>
                      </td>
                      <td style="border-bottom:none;border-top: none;">
                        <label style="width: 45px;"></label>
                      </td>
                      <td style="border-bottom:none;border-top: none;">
                        <label style="width: 400px;"></label>
                      </td>
                      <td style="border-bottom:none;border-top: none;">
                        <label style="width: 75px;"></label>
                      </td>
                      <td style="border-bottom:none;border-top: none;">
                        <label style="width: 65px;"></label>
                      </td>
                      <td style="border-bottom:none;border-top: none;">
                        <label style="width: 45px;"></label>
                      </td>
                    </tr>
                    <tr>
                      <td style="border-top: none;">
                        <label></label>
                      </td>
                      <td style="border-top: none;">
                        <label></label>
                      </td>
                      <td style="border-top: none;">
                        <label></label>
                      </td>
                      <td style="border-top: none;">
                        <label></label>
                      </td>
                      <td style="border-top: none;">
                        <label></label>
                      </td>
                      <td style="border-top: none;">
                        <label></label>
                      </td>
                    </tr>
                </table>
              </div>
            <!--长期医嘱-->
            <div class="print_page">
                <h4 align="center">大连大学附属中山医院</h4>
                <h4 class="sub_title" align="center">长期医嘱单</h4>
          
                <table style="width: 754px;" class="print_table" id='longTermDoctorListTableModel' cellspacing="0" cellpadding="0">
                <tbody id="longTermDoctorListTbody">
                  <tr>
                    <td style="width:750px;border: none;"  colspan="9">
                      <label style="width: 690px;padding-left: 510px;">ID号:&nbsp;
                        <span class='patientId'></span>
                      </label>
                    </td>
                  </tr>
                  <tr>
                    <td style="width: 750px;border: none;" colspan="9">
                            <label style="width: 180px;">姓名:&nbsp;<span class="patientName"></span></label>
                            <label style="width: 200px;">科室:&nbsp;<span class="deptName"></span></label>
                            <label style="width: 105px;">床号:&nbsp;<span class="bedName"></span></label>
                            <label style="width: 140px;">病案号:&nbsp;<span class="mrId"></span></label>
                            <label style="width: 90px;">第&nbsp;<span class='indexNumber'></span>&nbsp;页</label>
                        </td>
                  </tr>
                  <tr>
                    <td colspan="5" align="center" style="width: 520px;">
                      <label style="width: 500px;">开始</label>
                    </td>
                    <td colspan="4" align="center" style="width: 234px;">
                      <label style="width: 200px;">停止</label>
                    </td>
                  </tr>
                  <tr>
                    <td style="width: 60px;" align="center">
                      <label style="width: 60px;">日期</label>
                    </td>
                    <td style="width: 40px;" align="center">
                      <label style="width: 40px;">时间</label>
                    </td>
                    <td style="width: 260px;" align="center">
                      <label style="width: 260px;">医嘱</label>
                    </td>
                    <td style="width: 60px;" align="center">
                      <label style="width: 60px;">医师签名</label>
                    </td>
                    <td style="width: 60px;" align="center">
                      <label style="width: 60px;">护士签名</label>
                    </td>
                    <td style="width: 40px;" align="center">
                      <label style="width: 40px;">日期</label>
                    </td>
                    <td style="width: 40px;" align="center">
                      <label style="width: 40px;">时间</label>
                    </td>
                    <td style="width: 60px;" align="center">
                      <label style="width: 60px;">医师签名</label>
                    </td>
                    <td style="width: 60px;" align="center">
                      <label style="width: 60px;">护士签名</label>
                    </td>
                  </tr>
                  <tr id='doctorListContent' hidden="true">
                    <td style="height: 31px;border-bottom:none;border-top: none;">
                      <label style="width: 60px;"><span class="doctorAdviceStartDate"></span></label>
                    </td>
                    <td style="height: 31px;border-bottom:none;border-top: none;">
                      <label style="width: 40px;"><span class="doctorAdviceStartTime"></span></label>
                    </td>
                    <td style="height: 31px;border-bottom:none;border-top: none;">
                      <label style="width: 260px;"><span class="doctorAdviceContent"></span></label>
                    </td>
                    <td style="height: 31px;border-bottom:none;border-top: none;">
                      <label style="width: 60px;"><span class="doctorAdviceStartDoctorName"></span></label>
                    </td>
                    <td style="height: 31px;border-bottom:none;border-top: none;">
                      <label style="width: 60px;"><span class="doctorAdviceStartNurseName"></span></label>
                    </td>
                    <td style="height: 31px;border-bottom:none;border-top: none;">
                      <label style="width: 40px;"><span class="doctorAdviceEndDate"></span></label>
                    </td>
                    <td style="height: 31px;border-bottom:none;border-top: none;">
                      <label style="width: 40px;"><span class="doctorAdviceEndTime"></span></label>
                    </td>
                    <td style="height: 31px;border-bottom:none;border-top: none;">
                      <label style="width: 60px;"><span class="doctorAdviceEndDoctorName"></span></label>
                    </td>
                    <td style="height: 31px;border-bottom:none;border-top: none;">
                      <label style="width: 60px;"><span class="doctorAdviceEndNurseName"></span></label>
                    </td>
                  </tr>
                  <tr>
                    <td style="border-bottom:none;border-top: none;">
                      <label style="width: 60px;"></label>
                    </td>
                    <td style="border-bottom:none;border-top: none;">
                      <label style="width: 40px;"></label>
                    </td>
                    <td style="border-bottom:none;border-top: none;">
                      <label style="width: 260px;"></label>
                    </td>
                    <td style="border-bottom:none;border-top: none;">
                      <label style="width: 60px;"></label>
                    </td>
                    <td style="border-bottom:none;border-top: none;">
                      <label style="width: 60px;"></label>
                    </td>
                    <td style="border-bottom:none;border-top: none;">
                      <label style="width: 40px;"></label>
                    </td>
                    <td style="border-bottom:none;border-top: none;">
                      <label style="width: 40px;"></label>
                    </td>
                    <td style="border-bottom:none;border-top: none;">
                      <label style="width: 60px;"></label>
                    </td>
                    <td style="border-bottom:none;border-top: none;">
                      <label style="width: 60px;"></label>
                    </td>
                  </tr>
                  <tr>
                      <td style="border-top: none;"><label></label></td>
                      <td style="border-top: none;"><label></label></td>
                      <td style="border-top: none;"><label></label></td>
                      <td style="border-top: none;"><label></label></td>
                      <td style="border-top: none;"><label></label></td>
                      <td style="border-top: none;"><label></label></td>
                      <td style="border-top: none;"><label></label></td>
                      <td style="border-top: none;"><label></label></td>
                      <td style="border-top: none;"><label></label></td>
                  </tr>
                  </tbody>
                </table>
            </div>
            <!--检验报告单-->
            <div class="print_page">
              <h4 align="center">大连大学附属中山医院检验报告单</h4>
              <table style="width: 754px;" class="print_table" id="reportsRecordTableTemplate" cellspacing="0" cellpadding="0">
                <tbody id="reportsRecordsTbody">
                  <tr>
                    <td style='width: 244px;border: none;padding-left: 15px;'>
                      <label style='width: 240px;'>姓&nbsp;名:<span class="patientName"></span></label>
                      <label style='width: 240px;'>性&nbsp;别:<span class="sexName"></span></label>
                      <label style='width: 240px;'>年&nbsp;龄:<span class="ageName"></span></label>
                      <label style='width: 240px;'>病&nbsp;案:<span class="mrId"></span></label>
                    </td>
                    <td style='width: 244px;border: none;'>
                      <label style='width: 250px;'>科&nbsp;别:<span class="deptCategoryName"></span></label>
                      <label style='width: 250px;'>床&nbsp;位:<span class="bedName"></span></label>
                      <label style='width: 250px;'>费&nbsp;别:<span class="costName"></span></label>
                      <label style='width: 250px;'>送检医师:<span class="submittingPhysicianName"></span></label>
                    </td>
                    <td style='width: 244px;border: none;'>
                      <label style='width: 240px;'>样本编号<span class="specimenCode"></span></label>
                      <label style='width: 240px;'>条码编号:<span class="barCode"></span></label>
                      <label style='width: 240px;'>标本种类:<span class="specimenTypeName"></span></label>
                      <label style='width: 240px;'>临床诊断:<span class="clinicalDiagnosisName"></span></label>
                    </td>
                  </tr>
                  <tr>
                    <td style="width: 754px;border-left: none;border-right:none;padding-left: 15px;" colspan="4">
                      <label style="width: 260px;font-weight:600;">项目名称</label>
                      <label style="width: 170px;font-weight:600;">结果</label>
                      <label style="width: 130px;font-weight:600;">单位</label>
                      <label style="width: 140px;font-weight:600;">参考值</label>
                    </td>
                  </tr>
                  <tr id="reportItemTrTemplate" hidden="true"> 
                    <td style="width: 754px;border:none;" colspan="4">
                      <label style="width: 15px;"><span class="index"></span></label>
                      <label style="width: 244px;"><span class="projectName"></span></label>
                      <label style="width: 64px;"><span class="examinationResult"></span></label>

                      <label style="width: 104px;"><span class="examinationResultMark"></span></label>
                      <label style="width: 130px;"><span class="examinationUnit"></span></label>
                      <label style="width: 140px;"><span class="referenceValues"></span></label>
                    </td>
                  </tr>
                <tr> 
                  <td style="border:none;" colspan="4">
                    <label></label>
                    <label></label>
                    <label></label>
                    <label></label>
                    <label></label>
                    <label></label>
                  </td>
                  </tr>
                </tbody>
                  <tr> 
                    <td style="border:none;" colspan="4">
                      <label></label>
                      <label></label>
                      <label></label>
                      <label></label>
                      <label></label>
                      <label></label>
                    </td>
                  </tr>
                  <tr style="border-top: 1px #000 solid;">
                    <td style="width: 754px;border:none;" colspan="4">
                      <label style="width: 254px;">采样时间:<span class="samplingDateTime"></span></label>
                      <label style="width: 254px;">送检时间:<span class="inspectDateTime"></span></label>
                      <label style="width: 180px;">检验者:<span class="inspectionDoctorName"></span></label>
                    </td>
                  </tr>
                  <tr>
                    <td style="border:none;" colspan="4">
                      <label style="width: 254px;">核收时间:<span class="acceptanceCheckDateTime"></span></label>
                      <label style="width: 254px;">报告时间:<span class="reportDateTime"></span></label>
                      <label style="width: 180px;">审核者:<span class="auditorDoctorName"></span></label>
                    </td>
                  </tr>
                  <tr>
                    <td style="border:none;" colspan="4">
                      <label style="width: 594px;">备注:<span class="remark"></span></label>
                    </td>
                  </tr>
              </table>
			    	</div>
        </div>
    </div>
  </div>
</template>

<script>
import navHeader from "@/components/header"
export default {
  name: 'index',
  data () {
    return {
      
    }
  },
  created(){
    
  },
  components:{
    navHeader
  },
  methods:{
   
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="css" scoped>
  @import './../assets/css/print.css'
</style>
