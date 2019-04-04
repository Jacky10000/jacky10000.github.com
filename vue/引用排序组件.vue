<template>
     <div class='printBilling-container' >
     <el-dialog title="打印销售退货清单" :visible.sync="dialogPrintBilling" width='900px' :before-close="closeDia" :modal='false'>
       	<div  class='orderPrint' >
	      <div v-for='key in saleBillData' class="printPage">          
	       <div class='form-container'>	          
	         <div class='form-container-middle'>
	           <table :data="key.itemList" border='1' cellspacing="0" bordercolor="#000000" width = "100%" style="border-collapse:collapse;">
               <tr>
                 <th style='padding: 10px 0;'>序号</th>
                 <th style='padding: 10px 0;' @click="show('productNo',$event)"  >配件编码<sort ref='productNo' :datalist='key.itemList' kind='productNo' :flag='flag' ></sort></th>
                 <th style='padding: 10px 0;' @click="show('productName',$event)" >配件名称<sort ref='productName' :datalist='key.itemList' kind='productName' :flag='flag' ></sort></th>
                 <th style='padding: 10px 0;' @click="show('carType',$event)" >车型<sort ref='carType' :datalist='key.itemList' kind='carType' :flag='flag' ></sort></th>
                 <th style='padding: 10px 0;' @click="show('brand',$event)" >产地/品牌<sort ref='brand' :datalist='key.itemList' kind='brand' :flag='flag' ></sort></th>
                 <th style='padding: 10px 0;' @click="show('quality',$event)" >品质<sort ref='quality' :datalist='key.itemList' kind='quality' :flag='flag' ></sort></th>
                 <th style='padding: 10px 0;' @click="show('refundsAmount',$event)" >退货价<sort ref='refundsAmount' :datalist='key.itemList' kind='refundsAmount' :flag='flag' ></sort></th>
                 <th style='padding: 10px 0;' @click="show('count',$event)" >数量<sort ref='count' :datalist='key.itemList' kind='count' :flag='flag' ></sort></th>
                 <!--<th>库号</th>-->
                 <th style='padding: 10px 0;' @click="show('warehouseName',$event)" >仓号<sort ref='warehouseName' :datalist='key.itemList' kind='warehouseName' :flag='flag' ></sort></th>
               </tr>
               <tr v-for='(item, index) in key.itemList' align='center' :key="index">
                 <td style=' padding: 10px 0;'>{{index+1}}</td>
                 <td style=' padding: 10px 0;'>{{item.productNo}}</td>
                 <td style=' padding: 10px 0;'>{{item.productName}}</td>
                 <td style=' padding: 10px 0;'>{{item.carType}}</td>
                 <td style=' padding: 10px 0;'>{{$store.state.optionsModule.formatOptions.brand[item.brand]}}</td>
                 <td style=' padding: 10px 0;'>{{$store.state.optionsModule.formatOptions.quality[item.quality]}}</td>
                 <td style=' padding: 10px 0;'>{{item.refundsAmount}}</td>
                 <td style=' padding: 10px 0;'>{{item.count}}</td>
                 <td style=' padding: 10px 0;'>{{item.warehouseName}}</td>
                 <!--<td>{{item.warehouseName}}</td>-->
               </tr>
	           </table>
	         </div>	            
	       </div>
	       
	      </div>
        </div>
        <div slot="footer" class="dialog-footer" id="printArea">
										
         <button type="primary" @click="printOparate" class='print-sure'>打 印</button>
         <button @click="closeDialong" class='print-cancel'>取 消</button>
        </div>
     </el-dialog>    
   </div>
</template>
<script>
   import sort from '@/components/sort'
   export default {
   	props:['printData','dialogPrintBilling'],
       data(){
         return{
			carTypeFormatData: {},
			qualityFormatData: {},          
            saleBillDatas:[],
            saleBillData: [],
            formLabelWidth: '120px',
            tableData: [],
            totalNum:'',
            moneyChinese:'',
            printTime:'',
            CreatedOKLodop7766:null,
            flag:0,
            kind:'',     //判断点击的是否同一组件
         }
       },
       watch:{
       		'dialogPrintBilling':function(val){
       			if(val==true){
       				this.loadPrintBillData();
       		 	}
       		}
         },
        components:{
          sort
        },
       	methods:{       		        
          show(value,e){
            let target = e.target;            
            let dom = target.children[0].__vue__            
            let list = target.parentNode.children;
            for(let i = 0;i<list.length;i++){
              if(list[i] == target){
                continue
              }
              this.$utils.removeClass(list[i],'ascending')
              this.$utils.removeClass(list[i],'descending')              
            }           
            if(!this.$utils.hasClass(target,'ascending')&&!this.$utils.hasClass(target,'descending')){
              this.$utils.addClass(target,'ascending') 
              dom.sortOrder()
            }else if(this.$utils.hasClass(target,'ascending')){
              this.$utils.addClass(target,'descending')             
              this.$utils.removeClass(target,'ascending')
              dom.sortInverted()
            }else if(this.$utils.hasClass(target,'descending')){
              this.$utils.removeClass(target,'ascending')
              this.$utils.removeClass(target,'descending')
            }
          },
          hasClass(el, cls) {
			if (!el || !cls) return false;
			if (cls.indexOf(' ') !== -1) throw new Error('className should not contain space.');
			if (el.classList) {
			  return el.classList.contains(cls);
			} else {
			  return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1;
			}
		  },
		  addClass(el, cls) {
			if (!el) return;
			var curClass = el.className;
			var classes = (cls || '').split(' ');
	
			for (var i = 0, j = classes.length; i < j; i++) {
			  var clsName = classes[i];
			  if (!clsName) continue;
	
			  if (el.classList) {
				el.classList.add(clsName);
			  } else if (!hasClass(el, clsName)) {
				curClass += ' ' + clsName;
			  }
			}
			if (!el.classList) {
			  el.className = curClass;
			}
		  },
		  removeClass(el, cls) {
			if (!el || !cls) return;
			var classes = cls.split(' ');
			var curClass = ' ' + el.className + ' ';
			for (var i = 0, j = classes.length; i < j; i++) {
			  var clsName = classes[i];
			  if (!clsName) continue;
	
			  if (el.classList) {
				el.classList.remove(clsName);
			  } else if (hasClass(el, clsName)) {
				curClass = curClass.replace(' ' + clsName + ' ', ' ');
			  }
			}
			if (!el.classList) {
			  el.className = trim(curClass);
			}
		  },
       }
   }
</script>
<style scoped>
  .ascending >>> .el-icon-caret-top{
    color: #409EFF;
  }
  .descending >>> .el-icon-caret-bottom{
    color: #409EFF;
  }
</style>
