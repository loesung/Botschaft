var htmlRouterTable = {},
    ipcRouterTable = {};

$.global.set('htmlRouterTable', htmlRouterTable);
$.global.set('ipcRouterTable', ipcRouterTable);

var desiredHandlers = [
    'ipc.index.js',
];

for(var filename in desiredHandlers) require('./' + desiredHandlers);

module.exports = function(e){
    var routerTable = {};
    if('ipc' == e.protocol)
        routerTable = ipcRouterTable;
    else
        routerTable = htmlRouterTable;


};
