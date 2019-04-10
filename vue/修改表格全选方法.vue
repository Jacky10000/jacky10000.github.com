<template>
	<div class="billing-container" v-loading="loading" element-loading-background="transparent" id="transfer">
		<div class="billing-content">
			<div class="billing-search clearfix">
				<div class="">
           <el-form :inline="true" class="demo-form-inline" @submit.native.prevent>
           <el-form-item label="">
           <el-input v-model="searchInfo.exportsNo" placeholder="填入客户或出库单号" class="customer-list" size="mini"></el-input>
           </el-form-item>
            <el-form-item label="">
              <el-input v-model="searchInfo.orderNo" placeholder="填入关联单号" class="customer-list" size="mini"></el-input>
            </el-form-item>
            <el-form-item label="出库日期："  class="ttqpDatePicker">
              <el-date-picker
                v-model="searchInfo.startTime"
                type="date"
                placeholder="选择日期" size="mini" value-format="yyyy-MM-dd">
              </el-date-picker> -
              <el-date-picker
                v-model="searchInfo.endTime"
                type="date"
                placeholder="选择日期" size="mini" value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>          
            <el-form-item label="仓号"  class="ttqpDatePicker">
              <el-select size="mini" class="check-input" popper-class="selectname" clearable filterable multiple collapse-tags v-model="searchInfo.warehouseIds" placeholder="请选择">
                <el-option
                    v-for="item in usedWarehouse"
                    :key="item.id"
                    :label="item.warehouseName"
                    :value="item.warehouseId">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="出库状态"  class="ttqpDatePicker">
              <el-select size="mini" class="check-input" style="width:215px" popper-class="selectname" v-model="searchInfo.exportsStatus" filterable placeholder="全部" multiple>
                <el-option
                  v-for="item in allocationStatus"
                  :key="item.keyS"
                  :label="item.note"
                  :value="item.keyS"
                >
                </el-option>
              </el-select>
            </el-form-item>            
            <el-form-item>
              <button class='proceeds-btn-checked' @click="searchOrder(1)">查询</button>
            </el-form-item>
            <el-form-item>
              <el-checkbox v-model="showDetail" @change="changeShowDetail">不显示已出库明细</el-checkbox>
            </el-form-item>  
            <el-form-item>
              <button class='proceeds-btn' @click="printBill" v-if="$store.state.jurisdictionModule.findByRole.show('MENU1003017003004')" >打印</button>
              <button class='proceeds-btn' @click="exportClose" v-if="$store.state.jurisdictionModule.findByRole.show('MENU1003017003002')">关单</button>
              <button class='proceeds-btn' @click="importTransfer('MENU1003013003002')" v-if="$store.state.jurisdictionModule.findByRole.show('MENU1003013003002')">导入</button>
              <button class='proceeds-btn-confirm' @click="confirm"  v-if="$store.state.jurisdictionModule.findByRole.show('MENU1003013002')">确认出库</button>
            </el-form-item> 
          </el-form>


				  	<!-- <label>						
	            <el-input v-model="searchInfo.exportsNo" placeholder="填入客户或出库单号" class="customer-list" size="mini"></el-input>
						</label>
            <label>						
	            <el-input v-model="searchInfo.orderNo" placeholder="填入关联单号" class="customer-list" size="mini"></el-input>
						</label>
            <div class="pull-right checkbox"><el-checkbox v-model="showDetail" @change="changeShowDetail">不显示已出库明细</el-checkbox></div>
	          <button class='proceeds-btn-checked' @click="searchOrder" v-if="$store.state.jurisdictionModule.findByRole.show('MENU1003013001')">搜索</button>	          
            <div style="float:right;margin-left:10px">
              <span>出库状态</span>
              <el-select size="mini" class="check-input" style="width:215px" popper-class="selectname" v-model="searchInfo.exportsStatus" filterable placeholder="全部" multiple>
                <el-option
                  v-for="item in allocationStatus"
                  :key="item.keyS"
                  :label="item.note"
                  :value="item.keyS"
                >
                </el-option>
              </el-select>
            </div>		 
            <div style="float:right;margin-left:10px">
              <span>仓号</span>
              <el-select size="mini" class="check-input" popper-class="selectname" clearable filterable multiple collapse-tags v-model="searchInfo.warehouseIds" placeholder="请选择">
                <el-option
                    v-for="item in usedWarehouse"
                    :key="item.id"
                    :label="item.warehouseName"
                    :value="item.warehouseId">
                </el-option>
              </el-select>
            </div>		 
            <div class='searchDate'>
              <span>出库日期</span>
                <el-date-picker
              v-model="searchInfo.startTime"
              type="date"
              placeholder="选择日期" size="mini" value-format="yyyy-MM-dd">
            </el-date-picker> -
            <el-date-picker
              v-model="searchInfo.endTime"
              type="date"
              placeholder="选择日期" size="mini" value-format="yyyy-MM-dd">
            </el-date-picker>
					</div>                    					 -->
					</div>
					<!-- <div class="pull-right num-right">
	          <button class='proceeds-btn' @click="printBill">打印</button>		 
            <button class='proceeds-btn' @click="exportClose" v-if="$store.state.jurisdictionModule.findByRole.show('MENU1003017003002')">关单</button>
	          <button class='proceeds-btn' @click="importTransfer" v-if="$store.state.jurisdictionModule.findByRole.show('MENU1003013003002')">导入</button>
	          <button class='proceeds-btn-confirm' @click="confirm"  v-if="$store.state.jurisdictionModule.findByRole.show('MENU1003013002')">确认出库</button>
					</div> -->
				</div>
			</div>					
			<!-- start表格 -->
			<div class="billing-table">
				<div class="my-offer-content">
					<el-table ref="orderTable" stripe :data='datalist' tooltip-effect="dark" style="width: 100%" height="200"  highlight-current-row @row-click="handleSupplierChange" v-loadmore="loadmore">
					<el-table-column type="index" label=" " align="center" width="30" style="background: #4CBFFA;">
						<template slot-scope="scope">
							<div class="first-row-area">
								<div class="oparate-table-row">
									<i class="el-icon-caret-right"></i>
								</div>
								<div class="first-row">
									<!--<span>{{scope.$index+1}}</span>-->
									<i class="el-icon-caret-right"></i>
								</div>
							</div>
						</template>
					</el-table-column>
					<el-table-column prop="exportsNo" label="出库单号" align="center"></el-table-column>
					<el-table-column prop="operTime" label="出库日期" align="center"></el-table-column>
					<el-table-column prop="clientName" label="收货方" align="center"></el-table-column>	          				
          <el-table-column prop="exportsStatusDesc"  label="出库状态" align="center">						
					</el-table-column>
          <el-table-column prop="isCloseDesc"  label="关单状态" align="center">						
					</el-table-column>
          <el-table-column prop="warehouseName"  label="仓号" align="center">						
					</el-table-column>
					<el-table-column prop="totalQuantity"  label="出库总数" align="center">						
					</el-table-column>
					<el-table-column prop="hasExportsQuantity" label="已开单数" align="center"></el-table-column>
          <el-table-column prop="hasOutputQuantity" label="已出库数" align="center"></el-table-column>
          <el-table-column prop="totalSellPrice" label="销售总价" align="center" v-if="$store.state.jurisdictionModule.findPermissionByRole.getPermission('BILL015001')"></el-table-column>
					<el-table-column prop="totalCostPrice" label="成本总价" align="center" v-if="$store.state.jurisdictionModule.findPermissionByRole.getPermission('BILL015002')"></el-table-column>				
					<el-table-column prop="operator" label="操作人" align="center"></el-table-column>
          <el-table-column prop="orderTypeDesc" label="关联单据类型" align="center"></el-table-column>
          <el-table-column prop="orderNo" label="关联单号" align="center"></el-table-column>	
          <el-table-column prop="remark" label="备注" align="center"></el-table-column>					
					</el-table>
				</div>			
			</div>
				<!-- end 表格-->
        <!-- 第二个明细表 -->
      <span class="second-title">出库单明细</span>
      <div class="billing-table bill-detail-table">
				<el-table ref="billDetailTable" :data='orderDetail' border stripe  :span-method="objectSpanMethod" @row-click="billDetailRowChange" highlight-current-row  style="width: 100%;margin-top: 20px;" height="300" @select="handleSelectionChange" @select-all="selectAll" v-loadmore="loadmoreDetail">
					<el-table-column
				      type="selection"
				      width="35">
				    </el-table-column>         
				    <el-table-column prop="productNo" align="center" label="配件编码">
					</el-table-column>
					<el-table-column prop="productName" align="center" label="配件名称">
					</el-table-column>
					<el-table-column prop="carType" label="车型" align="center">
            <template slot-scope="scope">
							<span>{{scope.row.carType}}</span>
						</template>
          </el-table-column>
					<el-table-column prop="brand" label="品牌" align="center">
						<template slot-scope="scope">
							<span>{{$store.state.optionsModule.formatOptions.brand[scope.row.brand]}}</span>
						</template>
					</el-table-column>
					<el-table-column prop="quality" label="品质" align="center">
            <template slot-scope="scope">
							<span>{{$store.state.optionsModule.formatOptions.quality[scope.row.quality]}}</span>
						</template>
					</el-table-column>
          <el-table-column prop="totalQuantity" align="center" label="出库总数量">
					</el-table-column>
          <el-table-column prop="hasExportsQuantity" align="center" label="已开单数量">
					</el-table-column>
          <el-table-column prop="noExportsQuantity" align="center" label="未开单数量">
					</el-table-column>
          <el-table-column prop="hasOutputQuantity" align="center" label="已出库数">
					</el-table-column>
					<el-table-column prop="unit" label="单位" align="center">	
            <template slot-scope="scope">
							<span>{{$store.state.optionsModule.formatOptions.unit[scope.row.unit]}}</span>
						</template>				
					</el-table-column>
					<el-table-column prop="warehouseName" align="center" label="仓号">
					</el-table-column>
          <el-table-column prop="receiverName" align="center" label="收货方">
					</el-table-column>
					<el-table-column prop="costPrice" align="center" label="单据成本价" v-if="$store.state.jurisdictionModule.findPermissionByRole.getPermission('BILL015003')">
					</el-table-column>
          <el-table-column prop="skuCostPrice" align="center" label="仓库成本价" v-if="$store.state.jurisdictionModule.findPermissionByRole.getPermission('BILL015004')">
					</el-table-column>
          <el-table-column  align="left" label="发货数量" class-name="addNewdata" width="140px">
            <template slot-scope="scope">
						   <span :class="{redStyle:scope.row.redStyle}"><el-input v-model="scope.row.quantity" @blur="checkImportCount(scope.row,scope.$index)"></el-input></span>
               <span class="el-icon-circle-plus icon" @click="addNewdata(scope.row,scope.$index)" v-if="scope.row.adviseDeliverList && scope.row.adviseDeliverList.length>1"></span>
               <span class="el-icon-remove icon" @click="deleData(scope.row,scope.$index)" v-if="scope.row.adviseDeliverList && scope.row.adviseDeliverList.length>1"></span>
						</template>
					</el-table-column>
					<el-table-column prop="position" align="center" label="库位" width="150px">
            			<template slot-scope="scope">
              				<!--<el-select v-model="scope.row.positionVal" placeholder="请选择库位" class="position" @change="getInfo(scope.row,scope.$index)">
								<el-option v-for="item in scope.row.adviseDeliverList" 
									:key="item.key" 
									:value="item.positionId" 
									:label="item.position">                  
								</el-option>
							</el-select>-->
							<!-- <el-select filterable remote reserve-keyword v-model="scope.row.positionVal" @change="getInfo(scope.row,scope.$index)">
	                            <el-option v-for="item in scope.row.adviseDeliverList" :key="item.key" :label="item.position" :value="item.position"></el-option>
	                        </el-select> -->
							<!--<el-cascader
							    :options="positionList"
							    v-model="scope.row.positionLib"
							    :props="cascaderTreeprops"
							    @change="handleChange">
							</el-cascader>-->

              <el-autocomplete
                popper-class="my-autocomplete"
                :class="{red:scope.row.noExit}"
                v-model="scope.row.positionVal"
                :fetch-suggestions="querySearch"
                placeholder="请输入内容"
                @select="handleSelect($event,scope.row,scope.$index)"
                @input.native="getValue($event,scope.row)"
              >
                <template slot-scope="{ item }">
                  <!-- <span class="addr">{{ item.tips }}</span>											 -->
                  <div class="name">{{ item.path }}<span class="addr" v-if="item.tips ">({{ item.tips }})</span></div>
                </template>
              </el-autocomplete>

						</template>
					</el-table-column>
          <el-table-column prop="stock" align="center" label="库存数量" v-if="$store.state.jurisdictionModule.findPermissionByRole.getPermission('BILL015005')">
					</el-table-column>
          <el-table-column align="center" label="批次、数量、可用批次库存" v-if="useBatchStatus" width="300px">
            <template slot-scope="scope">
              <div v-for="(item,i) in scope.row.batchArr" :key="i" v-show="scope.row.useBatch == 1?true:false">
                <el-select filterable v-model="item.batchSkuId" @change="getOtherMsg(scope.row.currBatchList,item.batchSkuId,item,i,scope.row.batchArr)" style="width:130px!important; height:30px">
                  <el-option v-for="(val,index) in scope.row.currBatchList" :key="index" :value="val.batchSkuId" :label="val.batchNo"></el-option>
                </el-select>
						    <el-input style="width:50px" @blur="checkBatch(scope.row,item)" v-model.number="item.batchSkuQuantity"></el-input>
                <el-input style="width:50px" disabled v-model="item.batchAvailableStock"></el-input>
                <span class="el-icon-circle-plus icon" @click="addBatch(scope.row,i)"></span>
                <span class="el-icon-remove icon" @click="delBatch(scope.row,i)"></span>
              </div>
						</template>
					</el-table-column>
          				 
				</el-table>
			</div>

      <!-- 打印组件 -->
      <print-transfer-manage :printData="allData" :dialogPrintBilling="openPrintDailog" @closeDialong="closeDialong"></print-transfer-manage>
	</div>

</template>
<script>
import configFile from "./../../api/index.js";
import printTransferManage from '@/components/product/printTransferManage'
export default {
  name: 'transferManageMENU1003013',
  components: {printTransferManage},
  data() {
    return {
      id:'',
      warehouseId: '', 
      useBatchStatus: false,
      usedWarehouse: [],
      noChangeDetail:[],  //不会改变所有明细数据
      allDetail:[],       //保存所有明细数据
      detailCount:0,      //明细数据的总数量
      showDetail:true,   //不显示未出库位为0的明细
	  	count:0,
	    allocationStatus:[],
	    idArr:[],
	    searchInfo:{
	      exportsNo:'',  //出库单号
	      startTime:'',
	      endTime:'',
	      exportsStatus:'',      //状态
	      page:1,       //当前页码
	      pageSize:10,  //每页查询的条数
	    },
	      currTableNo:1, //操作的是哪个表格
	      currRowIndex:0, //第一个表格的序列号
	      orderDetail:[], //第二个表格的明细数据
	      commitOrder:[], //选择出库的数据
	      loading: false,          
	      loadSign: true,
	      totalPay: 0, //总应付
	      totalReceipt: 0,//总应收
	      datalist:[],
	      suggestion:'',
	      exportsId:'',  //出库单ID
	      exportsNo:'',  //出库单单号
	      operTime:'',  //出库日期       
	      remark: '',   //备注
	      positionList:[],
        cascaderTreeprops: {
            label: 'name',
            value: 'id',
            children: 'childPositionVoList'
         },
        newOrderDetail:[],    //不显示已出库的明细
        canClose:false,       //能否点击关单
        isClosed:'',          //当前数据关单状态
        printData:null,       //选择的当行主表数据
        allData:[],           //需要打印的数据
        openPrintDailog:false,   //打开打印框
        requstStatus:false,      //获取数据是否成功
        canPrint:false,
        currBillDetailData:null,  //点击的当前明细行
    };
  },
  activated() {
    this.upDownMove(); //监听上下键盘移动   
  },
  deactivated() {
    document.removeEventListener('keydown', this.keyEvent, false);
  },
  
  beforeDestroy () {
    document.removeEventListener('keydown', this.keyEvent, false);
  },
  watch: {
    orderDetail: { // 深度监听
        handler (newVal,oldVal) {
          this.multipleSelection = oldVal
        },
        immediate: true, // 立即执行
        deep:true // 开启深度监听
    },
    'requstStatus': function(val){//监测打印数据的请求是否完成
      if(val){
        this.openPrintDailog = true;//打开打印弹窗
      }
    }
  },
  methods: {
    


    
    //详情表格的单选
    handleSelectionChange(val){
      console.log(val)
      this.commitOrder = val
      // console.log(this.commitOrder)
      return;
      // if(this.commitOrder.length == 0 || this.commitOrder.length<this.orderDetail.length){   //初始选中数据为空     
      //   this.commitOrder = val
      // }else if(this.orderDetail.length<=50){       
      //     this.commitOrder = [];
      //     this.commitOrder = val.concat(this.allDetail)
          
      // }else{
      //   this.commitOrder = val
      // }
      
      // let item = val;
      // // console.log(...item)
      // let length = this.orderDetail.length;
      
      // this.commitOrder.splice(0,length,...item)
      // console.log(this.commitOrder)
            
      // let idList = val;
      // let idArr = [];
      // idList.forEach((item)=>{
      //     idArr.push(item.transferNo);
      //   })
      //   this.ids = idArr.toString()
    }, 

    //详情表格的全选
    selectAll(val){ 
      // 数据量不大于50
      if(this.detailCount <= 50){
        this.commitOrder = val
      }else{
        if(this.commitOrder.length<this.detailCount){ 
          this.commitOrder = []    //全选
          this.orderDetail.forEach(item=>{            
              this.commitOrder.push(item) 
              this.$refs.billDetailTable.toggleRowSelection(item,true);                       
          })
          if(this.allDetail.length>50){
            this.allDetail.forEach(item=>{                      
                this.commitOrder.push(item) 
                this.$refs.billDetailTable.toggleRowSelection(item,true);                         
            })
          }
        }else{
          this.orderDetail.forEach(item=>{                        
              this.$refs.billDetailTable.toggleRowSelection(item,false);                       
          })
          if(this.allDetail.length>50){
            this.allDetail.forEach(item=>{                                  
                this.$refs.billDetailTable.toggleRowSelection(item,false);                         
            })
          }
          this.commitOrder = [];
        }     
      }

      
      // return   
      // if(val.length == 0){
      //   this.commitOrder = [];
      // }else{
      //   this.commitOrder = [];
      //   if(this.showDetail){          
      //     this.noChangeDetail.forEach(item=>{            
      //       if(item.quantity>0) {            
      //         this.commitOrder.push(item)         
      //       }
      //     })
      //   }else{                 
      //      this.noChangeDetail.forEach(item=>{                                   
      //         this.commitOrder.push(item)         
      //     })
      //   }
      // }
      // console.log(this.commitOrder)
    },

    

 
  }
};
</script>

