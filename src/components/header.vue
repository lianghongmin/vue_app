<template>
  <header>
    <a href="javascript:;" class="back" v-show="isShow" @click="goback"></a>
    <slot name="headTitle"></slot>
    <slot name="tools"></slot>
  </header>
</template>

<script>
export default {
   data () {
    return {
      isShow:true
    }
  },
  created(){
    this.isShow=true;
    if(this.$route.path=='/'||this.$route.path=='/index'){
          this.isShow=false;
    }
  },
   methods:{
    //返回
    goback() {
        this.$router.go(-1);
       /* if(this.$route.path=="/medicalReport"||this.$route.path=="/medicalRecord"||this.$route.path=="/medicalImg"){
        
        this.$router.push({
             name:"medicalIndex",
             params:{
               index:this.index,
               sessionId:this.sessionId
             }
         })
       }
      else if(this.$route.path.indexOf('/medicalIndex')>-1){
           this.$router.push({
             name:"medicalLine",
             params:{
              // index:this.index
             }
         })
       }else{
          this.$router.go(-1);
       }*/
    }
  },
  watch:{
      '$route':function(newValue,oldValue){
        this.isShow=true;
        if(newValue.path=='/:'||newValue.path=='/medicalLine'){
          this.isShow=false;
        }
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
