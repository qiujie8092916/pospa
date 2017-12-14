import App from './dashBoard.vue';
import leftSideBar from '../../components/leftSideBar';
export default {
  data() {
    return {
      title: '主页',
      input: 'Hello World!!!'
    };
  },
  components: {
    'leftSideBar': leftSideBar
  },
  ...App
};