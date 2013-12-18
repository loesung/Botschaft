function identity($, _){

    this.list = function(){
        return [
            {id: '5e5755757a4b93de', description: 'dummy'},
        ];
    };

};

module.exports = function($, _){
    return function(){
        return new identity($, _);
    };
};
