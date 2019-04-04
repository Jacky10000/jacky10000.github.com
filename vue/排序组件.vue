<template>
    <div class="sort">
        <i  class="el-icon-caret-top" ></i>
        <i  class="el-icon-caret-bottom" ></i>
    </div>    
    
</template>

<script>
export default {
    props:['datalist','kind'],
    
    data(){
        return {
            info:'',            
        }
    },    
    methods:{
        sortOrder(){          
            let kind = this.kind;           
            this.sortData.sort((a,b)=>{
                let val1 = a[kind]; 					
                let val2 = b[kind];
                if (val1 < val2) {
                    return -1;
                } else if (val1 > val2) {
                    return 1;
                } else {
                    return 0;
                }
            })
                 
        },
        sortInverted(){                      
            let kind = this.kind;                      
            this.sortData.sort((a,b)=>{
                let val1 = a[kind]; 					
                let val2 = b[kind];               
                if (val1 < val2) {
                    return 1;
                } else if (val1 > val2) {
                    return -1;
                } else {
                    return 0;
                }
            })                
        }
    }
}
</script>

<style scoped>
    .sort{
        /* margin-top: 95px;
		padding: 20px 20px 20px 94px; */
        float: right;
        width: 30px;
        display: flex;
        flex-flow: column;
    }
    .el-icon-caret-top{
        color: #c0c4cc;
    }
    .el-icon-caret-bottom{
        color: #c0c4cc;
    }
    /* .hasClick{
        color: #409EFF;
    } */
</style>


