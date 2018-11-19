<template>
	<section>
    <bread-crumb>
    </bread-crumb>
    <el-row class="toolbar">
      <el-col :span="24">
        Status: <el-radio-group v-model="filter.status" size="medium" @change="handleFilter">
          <el-radio-button label="All" ></el-radio-button>
          <el-radio-button label="Submitted"></el-radio-button>
          <el-radio-button label="Processing"></el-radio-button>
          <el-radio-button label="Wait For Confirm"></el-radio-button>
          <el-radio-button label="Closed"></el-radio-button>
          <el-radio-button label="Canceled"></el-radio-button>
        </el-radio-group>
        <p/>
        Assignee: <el-select v-model="AssigneeFilter.assigneeId" clearable filterable size="medium" @change="handleFilter">
          <el-option
            v-for="item in paxUserList"
            :key="item.id"
            :label="item.realName"
            :value="item.id">
          </el-option>
        </el-select>
         &nbsp;&nbsp;&nbsp;&nbsp;
        ISV: <el-select v-model="filter.isvId" clearable filterable size="medium" @change="handleFilter">
          <el-option
            v-for="item in filter.isvList"
            :key="item.pkId"
            :label="item.companyName.substr(0,50)"
            :value="item.pkId">
          </el-option>
        </el-select>
         &nbsp;&nbsp;&nbsp;&nbsp;
       <!-- <div style="display:inline-block;"> -->
          Filter: <el-input v-model="title" size="medium" placeholder="Summary" clearable filterable style="vertical-align: bottom; display: inline-table; padding-left:10px;">
           <el-button slot="append" icon="el-icon-search" @click="handleFilter"></el-button>
        </el-input>
       <!-- </div> -->
        <p/>
        <el-table 
         v-loading="loading2"
        :data="tableData"
        @sort-change="handleSort"
         >
          <!--   :default-sort = "{prop: 'date', order: 'descending'}"-->
          <el-table-column prop="code" label="ID" width="100" sortable="custom"></el-table-column>
          <el-table-column label="Summary" width="200">
            <template slot-scope="scope">
              <router-link :to="{ path: '/manage/tickets/'+scope.row.code }">
                {{scope.row.title}}
              </router-link>
            </template>
          </el-table-column>
          <el-table-column prop="issueTypeName" label="Type"></el-table-column>
          <el-table-column prop="status" label="Status" width="150">
            <template slot-scope="scope">
              {{statusDicts[scope.row.status]}}
            </template>
          </el-table-column>
          <el-table-column label="ISV">
            <template slot-scope="scope" v-if="scope.row.isvId">
              {{scope.row.isvName}}
            </template>
          </el-table-column>
          <el-table-column prop="createDate" label="Created" sortable='custom' :formatter="formatDate" width="120"></el-table-column>
          <el-table-column prop="assigneeRealName" label="Assignee">
          </el-table-column>
          <el-table-column prop="lastReplyDate" label="Last Reply" :formatter="formatDate"></el-table-column>
        </el-table>
        <p/>
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="pageSize"
          :total="total"
          layout="total, prev, pager, next">
        </el-pagination>
      </el-col>
    </el-row>
	</section>
</template>

<script>
import dateFormat from "dateformat";
import { listIssuesUsingGET, listDictsSortedUsingGET } from "@/api";
import { listIsvUsingGET, userListUsingGET } from "@/api";
import { Loading } from 'element-ui';

export default {
  data() {
    return {
      newColumn: '',
      newDirection: '',
      loading2:true,
      dicts: [],
      statusDicts: [],
      isvNameDicts: {},
      titleFilter: {
        status: "All",
        title: "",
        titleList: []
      },
      AssigneeFilter: {
        status: "All",
        assigneeId: "",
        agList: []
      },
      filter: {
        status: "All",
        isvId: "",
        isvList: []
      },
      filterStatusDicts: {
        Open: "1",
        Submitted: "1",
        Processing: "2",
        "Wait For Confirm": "3",
        Closed: 5,
        Canceled: "7"
      },
      tableData: [],
      loading: false,
      currentPage: 1,
      pageNum: 1,
      pageSize: 20,
      total: 0,
      title: "",
      paxUserList: [],
      isViewISV: false //pax用户没有查看ISV信息
    };
  },
  
  methods: {
    formatDate: function(row, column, cellValue) {
      if (cellValue != null) {
        return dateFormat(new Date(parseInt(cellValue)), "yyyy-mm-dd");
      } else {
        return "N/A";
      }
    },
    getUsers() {
      if(sessionStorage.getItem('allUser')){
        var user=JSON.parse(sessionStorage.getItem('allUser'));
        this.paxUserList =user.list;      
      }else{
        userListUsingGET({ type: 1, pageSize: 0, noMessage: 1 }).then(
        response => {
          let { code, data, message } = response.data;
          if (code !== 0) {
            this.$message({
              message: message,
              type: "error"
            });
          } else {
            // console.log(data.list)
            sessionStorage.setItem('allUser',JSON.stringify(data))            
            
            this.paxUserList = data.list;
            // sessionStorage.setItem("pax",JSON.stringify(data.list))
           
          }
        }
      );
      }
      
    },
    

    statusDesc(id) {
      let item = this.dicts["Issue.status"].filter(
        item => item.dictValue == id
      );
      return item.dictDesc;
    },
    handleSort (column, prop, order ) {
      // console.log(column ,typeof column) 
      // typeof column == "object"
       this.newColumn = column.prop == 'code' ? 'CODE': 'CREATE_DATE';
        this.newDirection = column.order == 'ascending' ? 'ASC' : 'DESC'
      listIssuesUsingGET({
        statuses: this.filterStatusDicts[this.filter.status],
        isvId: this.filter.isvId,
        title: this.title,
        assigneeId: this.AssigneeFilter.assigneeId,
        sortColumn: this.newColumn,
        sortDirection: this.newDirection,
        onlyMyWatch:0,
        pageNum: 1,
        pageSize: this.pageSize
      }).then(response => {
        let { code, data, message } = response.data;
        if (code == 10008) {
        } else if (code !== 0) {
          this.$message({
            message: message,
            type: "error"
          });
        } else {
          this.titleFilter.titleList = data.list;
          this.AssigneeFilter.agList = data.list;
          this.tableData = data.list;
          // console.log(data.list)
         this.loading2=false;
          this.total = data.total;
          this.currentPage = data.pageNum;
        }
      })
    },
    getTickets() {
      listIssuesUsingGET({
        sortColumn: this.newColumn,
        sortDirection: this.newDirection,
        onlyMyWatch:0,
        statuses: this.filterStatusDicts[this.filter.status],
        isvId: this.filter.isvId,
        title: this.title,
        assigneeId: this.AssigneeFilter.assigneeId,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }).then(response => {
        let { code, data, message } = response.data;
        if (code == 10008) {
        } else if (code !== 0) {
          this.$message({
            message: message,
            type: "error"
          });
        } else {
          this.titleFilter.titleList = data.list;
          this.AssigneeFilter.agList = data.list;
        
          this.tableData = data.list;
         this.loading2=false;
          this.total = data.total;
          this.currentPage = data.pageNum;
        }
      });
    },

    getDicts() {
      listDictsSortedUsingGET().then(response => {
        this.dicts = response.data.data;
        for (let item of this.dicts["Issue.status"]) {
          this.statusDicts[item.dictValue] = item.dictDesc;
        }
      });
    },

    handleFilter(val) {
      this.pageNum = 1;
      this.getTickets();
    },

    getIsvs() {
      listIsvUsingGET({ pageSize: 0, ndaStatus: 1 }).then(response => {
        let { code, data, message } = response.data;
        if (code == 1008) {
        } else if (code !== 0) {
          this.$message({
            message: message,
            type: "error"
          });
        } else {
          this.filter.isvList = data.list;
          for (let item of data.list) {
            this.isvNameDicts[item.pkId] = item.companyName;
          }
        }
      });
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getTickets();
    }
  },

  mounted() {
    this.getTickets();
    this.getDicts();
    this.getIsvs();
    this.getUsers();
  },
  created() {
    // const loading = this.$loading({
    //       lock: true,
    //       text: 'Loading',
    //       spinner: 'el-icon-loading',
    //       background: 'rgba(0, 0, 0, 0.7)',
    //        target: document.querySelector('el-table')
    //     });
    //     setTimeout(() => {
    //       loading.close();
    //     }, 2000);
    ///
  }
};
</script>

<style lang="scss" scoped>
.el-select {
  width: 15%;
}

.el-input {
  width: 240px;
}

</style>