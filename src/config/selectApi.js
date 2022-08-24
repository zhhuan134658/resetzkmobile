import utils from './util.js';
const axiosPost = utils.axiosPost; //axios post 请求
export default {
  // !往来单位
  // 单位性质
  unit_naturelist: [
    { name: '事业', id: '事业' },
    { name: '企业', id: '企业' },
    { name: '社团', id: '社团' },
    { name: '自然人', id: '自然人' },
    { name: '其他', id: '其他' },
  ],
  // 纳税人类型
  taxpayer_typelist: [
    { name: '一般纳税人', id: '一般纳税人' },
    { name: '小规模纳税人', id: '小规模纳税人' },
    { name: '双定户', id: '双定户' },
  ],
  //   票种
  ticket_typelist: [
    { name: '增值税专票', id: '增值税专票' },
    { name: '增值税电子专票', id: '增值税电子专票' },
    { name: '增值税普票', id: '增值税普票' },
    { name: '增值税电子普票', id: '增值税电子普票' },
  ],
  //0 待指派  1 已完成 2 逾期  3 逾期完成 4进行中
  current_state_list: [
    { name: '待指派', id: '待指派' },
    { name: '已完成', id: '已完成' },
    { name: '逾期', id: '逾期' },
    { name: '逾期完成', id: '逾期完成' },
    { name: '进行中', id: '进行中' },
  ],
  // 往来单位- 单位类型
  async typeListS() {
    try {
      const res = await axiosPost('/baselibrary/suppliertypeList');
      return res.data.data;
    } catch (error) {
      console.log(error);
    }
  },
};
