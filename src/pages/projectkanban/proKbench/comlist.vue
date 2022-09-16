<!--  -->
<template>
  <div id="">
    <div class="earchtitle">
      <div
        class="earchtitle_item"
        v-for="(item, index) in topList"
        @click="titleClick(item, index)"
        :class="activetop == index ? 'acyive' : ''"
        :key="index"
      >
        {{ item.name }}
      </div>
    </div>
    <div class="div_unit">
      <div class="unit_table" v-if="botmlist.length > 0">
        <div
          class="unit_table_item"
          v-for="(item, index) in botmlist"
          :key="index"
        >
          <div class="unit_table_item_left">
            <div
              :class="
                index == 0
                  ? 'unit_table_item_left_one'
                  : 'unit_table_item_left_two'
              "
              v-for="(list, dindex) in listList"
              :key="dindex"
            >
              {{ list.listname
              }}<span style="color: #0089ff">{{ item[list.val] }}</span>
            </div>
            <!-- <div class="unit_table_item_left_two">职务：技术</div>
            <div class="unit_table_item_left_two">电话：13303772773</div> -->
          </div>

          <!-- <div class="unit_table_item_right">
            <van-icon name="ellipsis" size="20" />
          </div> -->
        </div>
      </div>
      <div class="unit_table" style="line-height: 4rem" v-else>
        暂时还没有数据哦~快去添加
      </div>
    </div>
  </div>
</template>
<script>
import * as dd from 'dingtalk-jsapi';
export default {
  name: '',
  props: {
    botmlist: Array,
    listList: Array,
  },
  data() {
    return {
      activetop: 0,
    };
  },
  //监听属性类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //⽅法集合
  methods: {
    titleClick(item, index) {
      this.activetop = index;
      this.$emit('getqualityUnitProblem', index);
    },
  },
  //⽣命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //⽣命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  //beforeCreate() {}, //⽣命周期 - 创建之前
  //beforeMount() {}, //⽣命周期 - 挂载之前
  //beforeUpdate() {}, //⽣命周期 - 更新之前
  //updated() {}, //⽣命周期 - 更新之后
  //beforeDestroy() {}, //⽣命周期 - 销毁之前
  //destroyed() {}, //⽣命周期 - 销毁完成
  //activated() {}, //如果页⾯有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='less'>
</style>