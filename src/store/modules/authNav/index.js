const auths = [{
  'hasChild': false,
  'parentOrderNum': null,
  'adminAuth': false,
  'authorityName': '商品',
  'confirmOperation': null,
  'reg': null,
  'authorityCode': 'productRoot',
  'authorityHtmlElement': 'product_list.jsp',
  'orderNum': 101,
  'id': 1,
  'check': false,
  'leaf': false,
  'parameters': null
}, {
  'hasChild': true,
  'parentOrderNum': null,
  'adminAuth': false,
  'authorityName': '销售',
  'confirmOperation': null,
  'reg': '^stock.*\\.jsp|^order.*\\.jsp|order_detail_for_stock.jsp|good_select_panel.jsp',
  'authorityCode': 'orderRoot',
  'authorityHtmlElement': null,
  'orderNum': 201,
  'id': 10,
  'check': false,
  'leaf': false,
  'parameters': null
}, {
  'hasChild': true,
  'parentOrderNum': 201,
  'adminAuth': false,
  'authorityName': '新建零售单',
  'confirmOperation': null,
  'reg': null,
  'authorityCode': 'orderNew',
  'authorityHtmlElement': 'order_detail_connection.jsp',
  'orderNum': 202,
  'id': 13,
  'check': false,
  'leaf': true,
  'parameters': '{type:\'FOR_SALES\'}'
}, {
  'hasChild': true,
  'parentOrderNum': 201,
  'adminAuth': false,
  'authorityName': '零售单',
  'confirmOperation': null,
  'reg': null,
  'authorityCode': 'orderList',
  'authorityHtmlElement': 'order_list.jsp',
  'orderNum': 203,
  'id': 11,
  'check': false,
  'leaf': true,
  'parameters': '{type:\'FOR_SALES\'}'
}, {
  'hasChild': true,
  'parentOrderNum': 201,
  'adminAuth': false,
  'authorityName': '零售退货单',
  'confirmOperation': null,
  'reg': null,
  'authorityCode': 'retreatList',
  'authorityHtmlElement': 'retreat_order_list.jsp',
  'orderNum': 204,
  'id': 126,
  'check': false,
  'leaf': true,
  'parameters': '{type:\'RETREAT\'}'
}, {
  'hasChild': true,
  'parentOrderNum': 201,
  'adminAuth': false,
  'authorityName': '销售出库单',
  'confirmOperation': null,
  'reg': null,
  'authorityCode': 'salesInventoryOutList',
  'authorityHtmlElement': 'inventory_out_order_list.jsp',
  'orderNum': 205,
  'id': 156,
  'check': false,
  'leaf': true,
  'parameters': '{type:\'INVENTORY_OUT\'}'
}, {
  'hasChild': true,
  'parentOrderNum': 201,
  'adminAuth': false,
  'authorityName': '新建销售出库单',
  'confirmOperation': null,
  'reg': null,
  'authorityCode': 'salesInventoryOutDetail',
  'authorityHtmlElement': 'selling_out_details.jsp',
  'orderNum': 206,
  'id': 157,
  'check': false,
  'leaf': true,
  'parameters': null
}]

function getAuths (auths) {
  let sortAuths = []
  auths.forEach(obj => {
    if (obj.parentOrderNum !== 1 &&
      obj.parentOrderNum !== 2) {
      sortAuths.push(obj)
    }
  })
  return sortAuths
}

exports.state = {
  auths: getAuths(auths)
}
