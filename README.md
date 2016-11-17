# wxent-api-redis
微信企业号API，使用Redis保存AccessToken

## 示例

```
import WxApi from 'wxent-api-redis';

const wxapi = new WxApi('corpId', 'secret', agentId, 'redis://localhost:6379');
// 返回一个'wechat-enterprise-api'的api对象
// 详见：http://doxmate.cool/node-webot/wechat-enterprise-api/api.html#api_api_common
const client = wxapi.getClient();
client.getUser(msg.FromUserName, function (err, user) {

});

```


## CHANGELOG

### v2.0
1. 重新设计API (BREAKING CHANGE)
