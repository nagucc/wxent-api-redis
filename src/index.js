import { createClient } from 'redis';
import WxeApi from 'wechat-enterprise-api';

export default class WxeApiClient {
  constructor({ corpId, secret, agentId }, redisUrl, expire = 7000) {
    console.log('start to create Redis Client');
    this.corpId = corpId;
    this.secret = secret;
    this.agentId = agentId;
    this.redisUrl = redisUrl;
    this.expire = expire;
    this.redisClient = createClient(this.redisUrl);
    console.log('redis client created.');
  }
  getClient() {
    const { corpId, secret, agentId, redisClient, expire } = this;
    console.log('start to create WxeApi');
    const wxeapi = new WxeApi(
      corpId, secret, agentId,
      cb => redisClient.get(`${corpId}.expire`, (err, date) => {
        const now = Date.now();
        if (err) {
          console.log('redis get exprie Error:', err);
          cb(err);
        } else if (date && date - now > 0) {
          redisClient.get(`${corpId}.token`, (err2, token) => {
            if (err2 || !token) {
              console.log('redis get token Error:', err2);
              cb(err2 || 'token is not valid');
            } else {
              cb(null, JSON.parse(token));
            }
          });
        }
      }),
      (token, cb) => {
        if (!Number.isInteger(expire)) {
          cb('expire is not valid');
          return;
        }
        const now = +Date.now();
        redisClient.set(`${corpId}.expire`, now + (expire * 1000));
        redisClient.set(`${corpId}.token`, JSON.stringify(token));
        cb(null, token);
      }
    );
    return wxeapi;
  }
}
