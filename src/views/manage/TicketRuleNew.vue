<template>
	<section>
	  <bread-crumb>
    </bread-crumb>
    <el-row class="toolbar">
      <el-col :span="21">
				<el-form :model="form" ref="form" label-width="180px">
          <el-form-item label="Name" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>

					<!-- <el-form-item label="When Status Changed To" required>
						<el-select v-model="form.editors">
              <el-option
                v-for="item in triggerEventList"
                :key="item.id"
                :label="item.label"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item> -->

					<el-form-item label="Meet All Conditions">
						<div v-for="item in allRules" :key="item.pkId">
							<dict-select v-model="item.content" :dictList="conditionDictList"></dict-select><el-button type="danger" @click="delItemInAllRules(item)">Del</el-button>
							<p/>
						</div>
						<el-button type="" size="medium" @click="addItemInAllRules">Add Condition</el-button>
          </el-form-item>

					<el-form-item label="Meet Any Condition">
						<div v-for="item in anyRules" :key="item.pkId">
							<dict-select v-model="item.content" :dictList="conditionDictList"></dict-select><el-button type="danger" @click="delItemInAnyRules(item)">Del</el-button>
							<p/>
						</div>
						<el-button type="" size="medium" @click="addItemInAnyRules">Add Condition</el-button>
          </el-form-item>

					<el-form-item label="Action">
						<div v-for="item in actions" :key="item.pkId">
							<dict-select v-model="item.content" :dictList="actionDictList"></dict-select><el-button type="danger" @click="delItemInActions(item)">Del</el-button>
							<p/>
						</div>
						<el-button type="" size="medium" @click="addItemInActions">Add Action</el-button>
          </el-form-item>

					<el-form-item>
          	<el-button @click="$router.push({path: '/manage/rule'})">Cancel</el-button>
          	<el-button type="primary" @click="onSubmit">Confirm</el-button>
        	</el-form-item>
        </el-form>
      </el-col>
    </el-row>
	</section>
</template>

<script>
	import dateFormat from 'dateformat';
	import { listTriggersUsingGET, listDictsUsingGET_2 } from "@/api"

	export default {
		data() {
			return {
				form: {},
				conditionDictList: [],
				actionDictList: [],
				allRules: [],
				anyRules: [],
				actions: [],
        currentPage: 1,
        pageNum: 1,
				total: 0,
			}
    },
		methods: {
			getDictList(){
				listDictsUsingGET_2({ type: 1, actioned: 0 }).then(response => {
					this.conditionDictList = response.data.data
				})
				listDictsUsingGET_2({ type: 1, actioned: 1 }).then(response => {
					this.actionDictList = response.data.data
				})
			},

			onSubmit(){
				let form = {
					actions: [
						{
							actionTarget: "string",
							actionValue: 0,
							mailContent: "string",
							mailTitle: "string",
							// triggerSettingId: 0
						}
					],
					conditions: [
						{
							firstValue: 0,
							secondValue: "string",
							thirdValue: "string",
							required: 0,
							// "triggerSettingId": 0
						}
					],
					enabled: 1,
					name: "",
					type: 0
				}
			},

			addItemInAllRules(){
				this.allRules.push({pkId: new Date().getTime(), content: {required: 1}})
			},

			delItemInAllRules(item){
				let index = this.allRules.indexOf(item) 
        this.allRules.splice(index, 1)
			},

			addItemInAnyRules(){
				this.anyRules.push({pkId: new Date().getTime(), content: {required: 0} })
			},

			delItemInAnyRules(item){
				let index = this.anyRules.indexOf(item) 
        this.anyRules.splice(index, 1)
			},

			addItemInActions(){
				this.actions.push({pkId: new Date().getTime(), content: {} })
			},

			delItemInActions(item){
				let index = this.actions.indexOf(item) 
        this.actions.splice(index, 1)
			}

		},
		created(){
      this.getDictList()
		}
	}
</script>

<style lang="scss" scoped>

</style>
