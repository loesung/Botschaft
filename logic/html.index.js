module.exports = function(myname){
    $.global.get('htmlRouterTable')[myname] = '^\/?$';
    return function(e, matchResult){
        e.response.end('hi');
    };
};
