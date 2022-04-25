obj = {
    name: 'card1',
    basePath: 'cards'
}

var CardConfiguration = (function (obj) {
    var instance
    
    var SingletonTemp = function () {
        this.name = obj.name
        this.basePath = obj.basePath
    };
    
    return function () {
        if (!instance) {
            instance = new SingletonTemp()
        }
        return instance
    }
})(obj);

module.exports = CardConfiguration
