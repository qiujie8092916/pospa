import App from './product_list.vue'
import mixins from '../../globalMixin.js'
import $ from 'jquery'
export default {
  mixins: [mixins],
  data () {
    return {
      title: '商品页'
    }
  },
  mounted () {
    this.getNormal()
    // this.getJsonp();
  },
  methods: {
    getNormal () {
      $.ajax({
        url: 'http://localhost:8080/api/data/post?sn=Q1234567890&requesttime=21345432',
        type: 'post',
        dataType: 'json',
        contentType: 'application/json;charset=UTF-8',
        cache: false,
        data: JSON.stringify({
          'id': '7457',
          'data': 'return',
          'return': [{
            'id': '1',
            'result': '0'
          }, {
            'id': '2',
            'result': '0'
          }]
        }),
        success: function () {
          console.log('success')
        },
        error: function () {
          console.error('error')
        }
      })
    },
    getJsonp () {
      this.$http.jsonp('http://localhost:8080/gateway/api/jsonrpc.jsp', {
        params: {
          query: JSON.stringify({
            jsonrpc: '2.0',
            method: 'bizadmin.listStoreOrRepositoryByCompanyId',
            id: String(new Date().getTime()),
            params: [{
              'isRepository': false
            }]
          })
        },
        jsonp: 'listStoreOrRepositoryByCompanyId'
      }).then(function (r) {
        console.log('请求成功！！！', r)
      }, function (e, s) {
        console.log('请求失败！！！', e, s)
      })
    }
  },
  ...App
}
