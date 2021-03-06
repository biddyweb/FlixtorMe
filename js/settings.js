//External modules
var fs = require('fs');
var data_path = global.window.nwDispatcher.requireNwGui().App.dataPath;

var Settings = function() {

    this.readConfig = function(section) {
        if ( !fs.existsSync(data_path+'/config.json') ) {
            var defaults = {"language":"en","cacheDir":"./data","subtitle":"","connectionLimit":"100","dht":"500","streamingPort":"","clearCache":true};
            var stringifyDefaults = JSON.stringify(defaults);
            try {
                fs.writeFile(data_path+'/config.json', stringifyDefaults, function (err) {
                    if(err) {
                        console.log(err);
                    }
                    else {
                        var file = fs.readFileSync(data_path+'/config.json');
                        var fileContent;
                        try {
                            fileContent = JSON.parse(file);
                            var value = fileContent[section];
                            return value;
                        }
                        catch (err) {
                            console.log(err);
                            return false;
                        }
                    }
                });
            }
            catch (err) {
                console.log(err);
            }
        }
        else {
            var file = fs.readFileSync(data_path+'/config.json');
            var fileContent;
            try {
                fileContent = JSON.parse(file);
                var value = fileContent[section];
                return value;
            }
            catch (err) {
                console.log(err);
                return false;
            }
        }
    };

    this.writeConfig = function(section, value) {
        // possible sections language, cacheDir, keepCache
        $ = window.$;
        var file = fs.readFileSync(data_path+'/config.json');
        var fileContent;
        try {
            fileContent = JSON.parse(file);
            $.each(fileContent, function(i, val) {
                if( i == section ) {
                    fileContent[section] = value ;
                }
            });
            var stringifyContent = JSON.stringify(fileContent);
            fs.writeFile(data_path+'/config.json', stringifyContent, function (err) {
                if(err) {
                    console.log(err);
                }
            });
        }
        catch (err) {
            console.log(err);
        }
    };

    this.restoreConfig = function() {
        var defaults = {"language":"en","cacheDir":"./data","subtitle":"","connectionLimit":"100","dht":"500","streamingPort":"","clearCache":true};
        var stringifyDefaults = JSON.stringify(defaults);
        try {
            fs.writeFile(data_path+'/config.json', stringifyDefaults, function (err) {
                if(err) {
                    console.log(err);
                }
            });
        }
        catch (err) {
            console.log(err);
        }
    };

};

module.exports = new Settings();
