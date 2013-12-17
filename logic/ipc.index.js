module.exports = function(myname){
    $.global.get('ipcRouterTable')[myname] = '^\/?$';

    $.global.set('serviceList', []);

    return function(e, matchResult){
        var allTunnels = $.global.get('postoffice').listRegistered();
        for(var i in allTunnels)
            allTunnels[i] = allTunnels[i][0] + ' ' + allTunnels[i][1];
        console.log(allTunnels);
        e.response.end(allTunnels.join('\n'));
    };
};
