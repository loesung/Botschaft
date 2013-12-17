function identity($, _){

    this.list = function(){
        return [
            {id: 'deadbeef', description: 'dummy'},
        ];
    };

};

module.exports = function($, _){
    return function(){
        return new identity($, _);
    };
};
