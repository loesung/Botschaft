module.exports = function(myname){
    $.global.get('ipcRouterTable')[myname] = {
        rule: '^\/submit\/?$',
        method: '^post$',
    };

    return function(e, matchResult){
        e.response.end([
            'internet.im.xmpp-alice@site1-bob@site2 Using XMPP to reach Bob.',
            'internet.im.xmpp-bob@site1-alice@site2 Using XMPP to reach Alice.',
        ].join('\n'));
    };
};
