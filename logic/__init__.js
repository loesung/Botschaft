var htmlRouterTable = {},
    ipcRouterTable = {};

$.global.set('htmlRouterTable', htmlRouterTable);
$.global.set('ipcRouterTable', ipcRouterTable);

var desiredHandlers = [
    'ipc.index.js',
    'ipc.submit.js',

    'html.index.js',
];
var handlers = {};

for(var i in desiredHandlers){
    var filename = desiredHandlers[i];
    handlers[filename] = require('./' + filename)(filename);
};

module.exports = function(e){
    try{
        var routerTable = {};
        if('ipc' == e.protocol)
            routerTable = ipcRouterTable;
        else
            routerTable = htmlRouterTable;

        String(
            e.protocol.toUpperCase()
            + ' ' 
            + e.method.toUpperCase() 
            + ': ' + e.request.url
        ).NOTICE();

        for(var filename in routerTable){
            var definition = routerTable[filename];
            var regexp = null;
            if($.types.isString(definition))
                regexp = new RegExp(definition);
            else {
                regexp = new RegExp(definition.rule);
                if(definition.method)
                    if(!new RegExp(definition.method).test(e.method)) break;
            };
            var testResult = regexp.exec(e.request.url);
            if(null != testResult){
                handlers[filename](e, testResult);
                return;
            }
        };
    } catch(e) {
    };
    e.response.writeHead(404);
    e.response.end('Bad request.');
};
