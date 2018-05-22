<template>
  <div>
    <!--头部-->
    <nav-header >
       <span slot="headTitle">山东省立医院</span>
    </nav-header>
    <div class="content">
      <div class="banner">
        <mt-swipe :auto="4000" :show-indicators="false">
          <mt-swipe-item><img src='@/assets/images/banner.jpg'></mt-swipe-item>
          <mt-swipe-item><img src='@/assets/images/banner.jpg'></mt-swipe-item>
          <mt-swipe-item><img src='@/assets/images/banner.jpg'></mt-swipe-item>
        </mt-swipe>
      </div>
      <div class="nav">
          <ul class="clearfix">
              <li><router-link to="/searchMedical" class="bottom_border"><img src="@/assets/images/search_medical.png" alt=""/><p>病案检索</p></router-link></li>
              <li><router-link to="/borrowMedical" class="bottom_border left_border"><img src="@/assets/images/borrow_medical.png" alt=""/><p>病案借阅</p></router-link></li>
              <li><router-link to="/borrowRecord" class="bottom_border"><img src="@/assets/images/borrow_record.png" alt=""/><p>借阅记录</p></router-link></li>
              <li><router-link to="/manageMedical" class="bottom_border left_border"><img src="@/assets/images/collect_medical.png" alt=""/><p>管理检索</p></router-link></li>
              <li><router-link to="/queryMedical" class="bottom_border"><img src="@/assets/images/qc.png" alt=""/><p>病案质控</p></router-link></li>
              <li><a style="height:2.86rem;"class="bottom_border left_border"></a></li>
            </ul>
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
     window.localStorage.removeItem("msg");
     window.localStorage.removeItem("dislist");
     window.localStorage.removeItem("searchQuery");
     window.localStorage.removeItem("borrowQuery");
     this.token=window.localStorage.getItem("token");
     if(!this.token){
          this.$router.push({
              name: 'login',
              params: {
                     
              }
          });
          return; 
      }
  },
  components:{
    navHeader
  },
  methods:{
   
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  img{width:100%;height:100%;}
</style>
