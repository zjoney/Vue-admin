<template>
  <section style="display: inline">
    <div class="rule" v-for="(item,index) in columns" :key="index">
      <el-select v-model="columns[index].value" v-if="item.cascadeType == 2" @change="handleChange(index)" clearable style="width: 150px">
        <el-option v-for="item in columns[index].cascadeDicts" :key="item.pkId" :label="item.descEn" :value="item.pkId"></el-option>
      </el-select>
      <el-input v-model="columns[index].value" v-if="item.cascadeType == 3" style="width: 150px"></el-input>
      &nbsp;
    </div>
  </section>
</template>

<script>
export default {
  name: "dict-select",
  props: {
    dictList: {
      type: Array,
      required: true
    },
    value: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      columns: [{ cascadeType: 2, cascadeDicts: this.dictList }]
    };
  },
  methods: {
    handleChange(index) {
      // 读取当前是第几级，把后面的都清除掉
      this.columns.splice(index + 1);
      //去掉清空的情况
      if (this.columns[index].value) {
        // 用id从dicts里查子元素
        let item = this.findListItem(this.columns[index].value, this.dictList);
        // 创建下级输入
        if (item.cascadeType != 1) {
          this.columns.push({
            cascadeType: item.cascadeType,
            cascadeDicts: item.cascadeDicts
          });
        }
        switch (index) {
          case 0:
            this.value["firstValue"] = this.columns[index].value;
            break;
          case 1:
            this.value["secondValue"] = this.columns[index].value;
            break;
          default:
            this.value["thirdValue"] = this.columns[index].value;
        }
      }
    },

    findListItem(pkId, list) {
      if (list instanceof Array) {
        for (let item of list) {
          if (item.pkId == pkId) {
            return item;
          } else {
            let result = this.findListItem(pkId, item.cascadeDicts);
            if (result) {
              return result;
            }
          }
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.rule {
  display: inline-block;
}
</style>
