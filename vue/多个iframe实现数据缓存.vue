<template>
  <div class="billing-container" id="billing">
    <!-- start content -->
    <div class="billing-content">      
      <!-- <iframe width="99%" height="700" style="border: 0;" :src="iframeUrls" id='id'></iframe> -->
      <div v-for="(item,index) in crumbsData" :key="index" v-show = "iframeId == item.id">
        <iframe width="99%" height="700" style="border: 0;" :src="item.iframeURL" v-once></iframe>
      </div>  
    </div>
  </div>
</template>

<script>
export default {
  props:['iframeUrls','addIframe','iframeId'],
  data() {
    return {
      iframeUrl: "",
      crumbsData:[],
    };
  },
  // mounted(){
  //   console.log(this.$parent.crumbsData)
  // },
  watch: {
     'iframeUrls':function(now,old){
        let dataArr = [];
        let crumbsData = this.$parent.crumbsData;
        crumbsData.map((item,index)=>{
          if(item.iframeURL){
            item.iframeURL = item.iframeURL+'&ware_user=' + window.sessionStorage.userId
            dataArr.push(item)
          }
        })
        this.crumbsData = dataArr
        console.log(this.crumbsData)
        // this.iframeUrl = now
        // let url = this.iframeUrls;         
        // let iframeId = this.iframeId;
        // let add = $('.billing-content').children().is(`'#${iframeId}'`);
        // // console.log(this.addIframe)
        // // if(!this.addIframe){
        //   console.log('触发地址变化'+add)
        //   if(!add){
        //     let param = `<div class="showyou"  id="${iframeId}"><iframe width="99%" height="700" style="border: 0;" src="${url}" ></iframe></div>`;
           
        //     $('.billing-content').append(param)
        //     console.log($(`#${iframeId}`))
        //     console.log($(`#${iframeId}`).siblings())
        //     $(`#${iframeId}`).removeClass('showyou')
        //     $(`#${iframeId}`).siblings().addClass('unshow')
           
        //     // $('.billing-content').bind('DOMSubtreeModified',function(){
        //     //     alert('111111');
        //     //     $(`#${iframeId}`).addClass('unshow')           
        //     // });
        //   }else{
  
        //     // $(`'#${iframeId}'`).addClass('unshow')
        //     // $(`'#${iframeId}'`).siblings().addClass('unshow')
        //   }
        // }               
     },
     'addIframe':function(val){
      //  if(val){    //js增加一个iframe                 
      //    let url = this.iframeUrls;         
        //  let iframeId = this.iframeId;
      //    let add = $('.billing-content').children().is(`'#${iframeId}'`);
      //   //  console.log($('.billing-content').children().is(`'#${iframeId}'`)) 
      //   console.log(add)        
      //    if(!add){
      //      let param = `<iframe width="99%" height="700" style="border: 0;" src="${url}" id="${iframeId}" ></iframe>`
      //      $('.billing-content').append(param)           
      //    }else{
      //      $(`'#${iframeId}'`).removeClass('unshow')
      //     //  $(`'#${iframeId}'`).siblings().addClass('unshow')
      //    }
      //  }
          // if(val){
          //   // $(`#${iframeId}`).addClass('unshow')
          //   // $(`#${iframeId}`).trigger("create");
          //   console.log('非iframe菜单跳转')
          // }
     } 
  },
  methods:{
    checkHas(val){
      let param = this.$parent.crumbsData;
      console.log(param)
      param.map((item,index)=>{
        if(item.id == val){
          console.log(item.id)
          console.log(val)
          return false
        }
      })
      return true;
    }
  },
};
</script>
<style scoped>
.billing-container {
  margin-top: 95px;
  padding: 20px 20px 20px 94px;
}
.billing-content {
  background: #fff;
  padding: 0 20px 20px 20px;
  height: 800px;
}

</style>

