<template>
	<section>
    <div class="banner">
        <div class="title">Tickets</div>
        Create tickets and get support from PAX Team
    </div>
    <el-row class="toolbar">
      <el-col :span="24">
        <router-link to="/tickets/new">
          <el-button size="medium" type="primary" v-if="isPax">New Ticket</el-button>
        </router-link>
        &nbsp;&nbsp;
        Status: <el-radio-group v-model="filter.status" size="medium" @change="handleSelectStatus">
          <el-radio-button label="All"></el-radio-button>
          <el-radio-button label="Open"></el-radio-button>
          <el-radio-button label="Wait For Confirm"></el-radio-button>
          <el-radio-button label="Closed"></el-radio-button>
          <!-- <el-radio-button label="Canceled"></el-radio-button> -->
        </el-radio-group>
        <!-- &nbsp;&nbsp;
        Filter: <el-input placeholder="Search" v-model="filter.name" size="medium" style="width: 300px">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input> -->
        <p/>
        <el-table :data="tableData" v-loading="loading2"  @sort-change="handleSort">
          <el-table-column prop="code" label="ID"  sortable="custom" width="100"></el-table-column>
          <el-table-column label="Summary" width="300">
            <template slot-scope="scope">
              <router-link :to="{ name: 'Ticket', params: { code: scope.row.code }}">
                {{scope.row.title}}
              </router-link>
            </template>
          </el-table-column>
          <el-table-column prop="issueTypeName" label="Type"></el-table-column>
          <el-table-column prop="createRealName" label="Reporter">  
          </el-table-column>
          <el-table-column prop="status" label="Status" width="150">
            <template slot-scope="scope">
              {{statusDescDicts[scope.row.status]}}
            </template>
          </el-table-column>
          <el-table-column prop="createDate" label="Created" sortable='custom' :formatter="formatDate"></el-table-column>
          <el-table-column prop="lastReplyDate" label="Last Reply" :formatter="formatDate" ></el-table-column>
          </el-table>
      </el-col>
      <el-col>
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
import { listIssuesUsingGET, isvUserIdRealNameUsingGET } from "@/api";

export default {
  data() {
    return {
      newColumn: '',
      newDirection: '',
      loading2: true,
      dicts: [],
      filter: {
        name: "",
        status: "All"
      },
      filterStatusDicts: {
        All: "1,2,3,5",
        Open: "1,2",
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
      isPax: false
    };
  },
  computed: {
    statusDescDicts() {
      let result = [];
      let dicts = sessionStorage.getItem("dicts");
      dicts = JSON.parse(dicts);
      for (let item of dicts["Issue.status"]) {
        result[item.dictValue] = item.dictDesc;
      }
      return result;
    }
  },
  methods: {
    formatDate: function(row, column, cellValue) {
      if (cellValue != null) {
        return dateFormat(new Date(parseInt(cellValue)), "yyyy-mm-dd");
      } else {
        return "N/A";
      }
    },
  handleSort (column, prop, order ) {
      // console.log(column ,typeof column) 
      // typeof column == "object"
       this.newColumn = column.prop == 'code' ? 'CODE': 'CREATE_DATE';
        this.newDirection = column.order == 'ascending' ? 'ASC' : 'DESC'
      listIssuesUsingGET({
        sortColumn: this.newColumn,
        sortDirection: this.newDirection,
        onlyMyWatch:0,
        statuses: this.filterStatusDicts[this.filter.status],
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
          this.tableData = data.list;
          // console.log(data.list)
         this.loading2=false;
          this.total = data.total;
          this.currentPage = data.pageNum;
        }
      })
    },
    getTickets() {
      let me = this;
      listIssuesUsingGET({
         sortColumn: this.newColumn,
        sortDirection: this.newDirection,
        onlyMyWatch:0,
        statuses: this.filterStatusDicts[this.filter.status],
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }).then(response => {
        let { code, data, message } = response.data;
        if (code !== 0) {
          this.$message({
            message: message,
            type: "error"
          });
        } else {
          this.tableData = data.list;

          this.total = data.total;
          this.currentPage = data.pageNum;
          this.loading2 = false; //isvId
        }
      });
    },

    handleSelectStatus(val) {
      this.pageNum = 1;
      this.getTickets();
    },

    handleCurrentChange(val) {
      this.pageNum = val;
      this.getTickets();
    }
  },

  created() {
    this.getTickets();
    let user = JSON.parse(sessionStorage.getItem("user"));
    // console.log(user)
    if (user.type == 1) {
      this.isPax = false;
    } else {
      this.isPax = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>