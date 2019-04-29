<template>
	<div class="row">
	    <div class="col-8">
	      <h3>Draggable table</h3>
		  <draggable class="list-group" :list="list1" group="people" >  <!--只要两个draggable组件的group的值相同，就能互相拖拽-->
	        <div
	          class="list-group-item"
	          v-for="(element, index) in list1"
	          :key="index"
	        >
	          {{ element}}
	        </div>
	      </draggable>
	      <table class="table table-striped">
	        <thead class="thead-dark">
	          <draggable v-model="headers" tag='tr' group = "people" @change = "log">   
	            <th v-for="header in headers" :key="header" scope="col" @click="add">
	              {{ header }}
	            </th>
	          </draggable>
	        </thead>
	        <tbody>
	          <tr v-for="item in list" :key="item.name">
	            <td v-for="header in headers" :key="header">{{ item[header] }}</td>
	          </tr>
	        </tbody>
	      </table>
	    </div>
	
  </div>
</template>

<script>
import draggable from "vuedraggable";
export default {
  name: "table-column-example", 
  components: {
    draggable
  },
  data() {
    return {
      headers: ["id", "name", "sport"],
      list: [
        { id: 1, name: "Abby", sport: "basket" },
        { id: 2, name: "Brooke", sport: "foot" },
        { id: 3, name: "Courtenay", sport: "volley" },
        { id: 4, name: "David", sport: "rugby" }
      ],
      dragging: false,
      list1:[
      	"age"
      ],
      
    };
  },
  methods:{
  	log(val){
  		console.log(this.headers)
		this.list.map((item,index) =>{
			this.$set(item,'age',index)
		})
  	},
  	add(){
  		alert(1)
  	}
  }
};
</script>

<style>
	.table{
		width: 300px;
	}
</style>