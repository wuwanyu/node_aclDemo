//新闻表
var Waterline = require('waterline');
var uuid = require('node-uuid');


module.exports = Waterline.Collection.extend({
    //identity: 'tb_user',
    tableName:'acl_resource',
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
        pId:{
            type:'string',
            columnName: 'pId'
        },
    },

});

