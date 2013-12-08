module.exports = function(myname){
    $.global.get('ipcRouterTable')[myname] = '^\/?$';

    $.global.set('serviceList', []);

    return function(e, matchResult){
        e.response.end([
            'internet.im.xmpp-CA32-BF47 Using XMPP to reach Bob.',
            'internet.im.xmpp-B70ADC932E60CA49 Test',
        ].join('\n'));
    };
};
