var API = require('wechat-enterprise-api');
var AccessToken = require('access-token-redis');


module.exports = function (corpId, secret, agentId, redis_host, redis_port) {

    /*
    微信企业号有一个corpId和若干个secret，因此，这里的appId需要这两个参数共同确定。
    */
    var at = new AccessToken(redis_host, redis_port, corpId + secret, 7000);

    var wxapi = new API(corpId, secret, agentId,
        function(callback){
            at.getToken(callback)
        },
        function(token, callback){
            at.saveToken(token, callback);
        }
    );
    return wxapi;
};