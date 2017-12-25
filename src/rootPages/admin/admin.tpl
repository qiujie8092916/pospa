<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
  <title>
    <%= htmlWebpackPlugin.options.title %>
  </title>
  <meta name="keywords" content="DoRay 冰点云 都睿科技 眼镜行业SAAS平台 都睿网络科技有限公司" />
  <meta name="description" content="DoRay-冰点云-上海都睿网络科技有限公司" />
  <meta name="author" content="DoRay--上海都睿网络科技有限公司" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="theme-color" content="#5395ce">
  <meta http-equiv="cache-control" content="no-cache">
  <meta http-equiv="expires" content="0">
  <link rel="shortcut icon" href="https://icepointcloud.com/img/homeIcon/home_icon.png" />
  <% for (var i in htmlWebpackPlugin.options.cdn.css) { %>
    <link rel="stylesheet" href="<%= htmlWebpackPlugin.options.cdn.css[i] %>" />
    <% } %>
</head>

<body>
  <div id="admin"></div>
  <% for (var i in htmlWebpackPlugin.options.cdn.js) { %>
    <script src="<%= htmlWebpackPlugin.options.cdn.js[i] %>"></script>
    <% } %>
</body>

</html>