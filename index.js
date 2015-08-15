var API = require('wechat-enterprise-api');
var AccessToken = require('access-token-redis');

var Wxapi = function () {
    this.corpId = corpId;
    this.secret = secret;
    this.agentId = agentId;
    
    this.at = new AccessToken();
};
module.exports = function (corpId, secret, agentId, redis_host, redis_port) {
    redis_host = redis_host || 'localhost';
    redis_port = redis_port || 6379;
    var at = new AccessToken(redis_host, redis_port, corpId, 7000);

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