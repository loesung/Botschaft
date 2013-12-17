_ = new function(){
    var self = this;

    this.postoffice = require('./postoffice.js')($, this);
    this.identity = require('./identity.js')($, this);

    return this;
};
