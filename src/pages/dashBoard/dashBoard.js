import App from './dashBoard.vue';
import leftSideBar from '../../components/leftSideBar';
export default {
  data() {
    return {
      title: '主页'
    };
  },
  components: {
    'leftSideBar': leftSideBar
  },
  ...App
};