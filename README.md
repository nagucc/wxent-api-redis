# wxent-api-redis
微信企业号API，使用Redis保存AccessToken

## 示例

```

var API = require('wxent-api-redis');
var wxapi = API('corpId', 'secret', agentId, 'redis.host, 'redis.port');
wxapi.getUser(msg.FromUserName, function (err, user) {

});

```