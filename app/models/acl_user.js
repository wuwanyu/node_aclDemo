//新闻表
var Waterline = require('waterline');
var uuid = require('node-uuid');

module.exports = Waterline.Collection.extend({
    //identity: 'tb_user',
    tableName:'acl_user',
    connection: 'localMongo',
    schema: true,
    attributes: {
        id:{
            type:'string',
            primaryKey: true,
            defaultsTo: function() {
                return uuid.v4();
            }
        },
        name: {
            type:'string',
            columnName: 'name'
        },
        account: {
            type:'string',
            columnName: 'account'
        },
        password: {
            type:'string',
            columnName: 'password'
        }
    },

});

