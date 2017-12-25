import App from './dashBoard.vue';
import leftSideBar from '@/components/leftSideBar';
import formatInput from '@/components/formatInput';
export default {
  data() {
    return {
      title: '主页',
      input: 'Hello World!!!'
    };
  },
  components: {
    'leftSideBar': leftSideBar,
    'formatInput': formatInput
  },
  ...App
};