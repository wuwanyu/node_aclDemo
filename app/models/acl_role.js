//新闻表
var Waterline = require('waterline');
var uuid = require('node-uuid');

module.exports = Waterline.Collection.extend({
    //identity: 'tb_user',
    tableName:'acl_role',
    connection: 'localMongo',
    schema: true,
    attributes: {
        id:{
            type:'string',
            primaryKey: true,
            unique: true,
            defaultsTo: function() {
                return uuid.v4();
            }
        },
        name: {
            type:'string',
        },
    },

});

