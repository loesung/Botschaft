module.exports = function(myname){
    $.global.get('ipcRouterTable')[myname] = '^\/?$';

    $.global.set('serviceList', []);

    return function(e, matchResult){
        e.response.end([
            'internet.im.xmpp-5E5755757A4B93DE Test',
            'internet.email.126-5E5755757A4B93DE Send to his mailbox.',
            'mobile.email.126-5E5755757A4B93DE Dial to his phone.',
            'satellite.email.yeah-5E5755757A4B93DE Use Iridium System.',
        ].join('\n'));
    };
};
