/*
 * Dummy worker, a echoing worker.
 *
 * All you sent will be returned like echos.
 */

module.exports = function(){
    var identityList = $.global.get('identity').list(),
        postoffice = $.global.get('postoffice'),
        identityID, tunnelID;
    for(var i in identityList){
        identityID = identityList[i].id;
        tunnelID = $.security.object.get.tunnel.id(
            'internet',
            'etc',
            'dummy',
            identityID,
            identityID
        );
        var postbox = postoffice.register(
            tunnelID,
            'Dummy system. Echoing your message.'
        );
        console.log(tunnelID);
    };
};
