//    'CREATE TABLE queue(id TEXT, name TEXT)',

module.exports = function($, _, CRUD, sqldb){
    var self = this;
    var config = {
        create: {},
        retrive: {
            columns: ['id', 'name'],
        },
        retriveOne: {},
        update: {},
        delete: {},

        db: {
            table: 'identity',
        },
    };

    var filterRules = {
        id: /^[0-9a-f]{16}$/i,
        name: /^[0-9a-z\_]+$/i,
    };

    function filter(what){
        return (function(){
            return function(i){
                try{
                    return filterRules[what](i);
                } catch(e){
                    return false;
                };
            };
        })();
    };

    // unique
    config.create.unique = function(doc){
        var id = filter('id')(doc.id);
        if(!id) return false;
        
        // not so good. we have not reused this hash result.
        return {
            id: id.toLowerCase(),
        };
    };
    // to insert a new record, firstly use following function to derive
    // the needed format.
    config.create.gen = function(doc){
        var id = filter('id')(doc.id);
        if(!id) return false;
        if(!filter('name')(doc.name)) return false;

        return {
            id: id.toLowerCase(),
            name: doc.name,
        };
    };

    // to specify one or more records, use this to generate conditon.
    config.retrive.condition
    = config.retriveOne.condition
    = config.delete.condition
    = config.update.condition = function(condition){
        var allow = ['id', 'name'];
        return filtrieren(condition, allow);
    };

    config.update.gen = function(sets){
        return false;   // close this function
    };

    function filtrieren(input, allow){
        var result = {};
        for(var item in input){
            if(allow.indexOf(item) >= 0){
                if(undefined != filterRules[item])
                    if(!filter(item)(input[item])) return false;
                result[item] = input[item];
            };
        };
        return result;
    };

    return new CRUD($, _, sqldb, config);
};


