_ = new function(){
    var self = this;

    this.postoffice = require('./postoffice.js')($, this);

    return this;
};
