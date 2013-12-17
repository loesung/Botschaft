/*
 * Managing globally all incoming and outgoing messages.
 *
 * class 'postoffice' will provides services of:
 *  1. allocate a 'postbox', for each worker.
 *  2. collect all incoming messages from all allocated postboxes.
 *
 * class 'postbox' is a tool for a worker, e.g. a sub-program for actually
 * sending and receiving messages.
 * by listening on the 'outgoing' event on postbox, the worker program can get
 * new messages that will be sent via this worker.
 * by listening on the 'incoming' event on postbox, the postoffice class will
 * collect incoming messages, and thus emit a event for actually using IPC to
 * send it to our kernel.
 */

function postbox($, _, tunnelManager){
    $.nodejs.events.EventEmitter.call(this);
    var self = this;

    var queue = {
        outgoing: [],
        incoming: [],
    };

    this.send = function(message){
        self.queue.outgoing.push(message);
        self.emit('outgoing', queue.outgoing);
    };

    this.receive = function(message){
        self.queue.incoming.push(message);
        self.emit('incoming', queue.incoming);
    };

    return this;
};

function postoffice($, _){
    $.nodejs.events.EventEmitter.call(this);
    var self = this;

    var incoming = [],
        registered = {};

    this.register = function(tunnelID, description){
        if(undefined != registered[tunnelID]) return false;

        var newPostbox = new postbox($, _, self);
        newPostbox.on('incoming', function(queue){
            var poped;
            do{
                poped = queue.pop();
                if(undefined != poped) incoming.push(poped);
            } while(undefined != poped);

            self.emit('incoming', incoming);
        });

        registered[tunnelID] = [newPostbox, description];
        return newPostbox;
    };

    this.listRegistered = function(){
        var ret = [];
        for(var id in registered) ret.push([id, registered[id][1]]);
        return ret;
    };

    return this;
};

module.exports = function($, _){
    $.nodejs.util.inherits(postbox, $.nodejs.events.EventEmitter);
    $.nodejs.util.inherits(postoffice, $.nodejs.events.EventEmitter);
    return function(){
        return new postoffice($, _);
    };
};
