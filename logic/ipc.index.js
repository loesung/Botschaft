module.exports = function(myname){
    $.global.get('ipcRouterTable')[myname] = '^\/?$';
    return function(e, matchResult){
        e.response.end('hi');
    };
};
