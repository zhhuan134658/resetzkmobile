<template>
  <div class="div_eacharts">
    <div class="charts_c">
      <div
        class="charts_c_item"
        v-for="(item, index) in titltList"
        @click="changeTitle(item, index)"
        :class="activeindex == index ? 'active' : ''"
      >
        {{ item.name }}
      </div>
    </div>
    <div class="div_list">
      <div v-if="tableList && tableList.length > 0">
        <div v-for="(item, index) in tableList" class="list_item">
          <div
            v-for="(list, dindex) in listList"
            :class="dindex == 0 ? 'item_top' : 'cont_one'"
          >
            <div v-if="dindex == 0" class="item_top">
              <img
                class="listimg"
                src="https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//frDQnmaz6w1654650583898.png"
                alt=""
              />
              <span> {{ item[list.val] }} </span>
            </div>
            <div v-else>
              {{ list.listname
              }}<span style="color: #0089ff">{{ item[list.val] }}</span>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="aaa">
        <!-- <img
          src="http://oazhukuai.zzdingyun.com/app/dist/static/img/bianji1.f4d09d63.png"
          alt=""
        /> -->
        <img
          src="https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/xiezhu//EBC6ydZ7Tj1663407965807.png"
          alt=""
        />
        <!-- <div>暂时还没有数据哦~快去添加</div> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    titlelist: Array,
    tableList: Array,
    listList: Array,
    title: String,
    titltList: Array,
    fatherMethod: {
      type: Function,
      default: null,
    },
    activeindex: Number,
  },
  data() {
    return {};
  },
  methods: {
    changeTitle(item, index) {
      if (this.fatherMethod) {
        this.fatherMethod(index + 1);
      }
    },
  },
  mounted() {},
  created() {},
};
</script>

<style>
</style>