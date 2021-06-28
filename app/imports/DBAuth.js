const redis = require("redis");
const url = require("url");

var rtg = url.parse(process.env.REDISTOGO_URL);

var client = redis.createClient(rtg.port, rtg.hostname,{ 
    return_buffers:false, 
    enable_offline_queue:true 
});
client.auth(rtg.auth.split(":")[1]);

module.exports = client;
