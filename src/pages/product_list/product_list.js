import App from './product_list.vue';
export default {
  data() {
    return {
      title: '商品页',
      input: ''
    };
  },
  mounted() {
    console.log('mounted product list');
  },
  ...App
};