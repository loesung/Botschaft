/*
 * A sample but useful deliver server
 *
 * This server DOES NOT run on the same hardware of the kernel(KERN.-).
 * The IPC client, which is used as the only way of communication with
 * the kernel, should be connected via a hardware tunnel with hardware
 * switch. The hardware tunnel should bind the two UNIX-Socket together.
 *
 * This server itself, provides a WebUI and should be able to be controlled
 * via some MODERN web browser, such like FIREFOX. This is considered, that
 * the hardware, on which this server runs, is not trustworthy besides that
 * it can do what is required(but may do others evil, or such process may
 * be captured by virus), e.g. send what we want it to send, exactly and
 * not modified. Therefore, we can operate the whole server on a normal PC, 
 * on which a modern browser like firefox will not experience problems.
 */

require('./lib/baum.js');
require('./lib/_.js');
CONFIG = $.config.createConfig('./config/');

var logic = require('./logic/__init__.js');
var port = CONFIG.get('http-port'),
    rezeptionSocketPath = CONFIG.get('rezeption-socket-path'),
    socketPath = CONFIG.get('socket-path');

var HTTPServer = $.net.HTTP.server(port);
String('HTTP Server created at port: ' + port).NOTICE();

var IPCServer = $.net.IPC.server(socketPath);
String('IPC Server created at: ' + socketPath).NOTICE();

$.global.set('rezeption', $.net.IPC.client(rezeptionSocketPath));
String('Connect to Rezeption Server at: ' + rezeptionSocketPath);

$.global.set('postoffice', _.postoffice());
$.global.set('identity', _.identity());

HTTPServer.on('data', logic);
HTTPServer.start();

IPCServer.on('data', logic);
IPCServer.start();

$.nodejs.memwatch.on('leak', function(e){
    String('MEMWATCH detected potential memory leak:' + e).WARNING();
});

// load workers
require('./xmpp/__init__.js')();
