/**
 * Phonegap Drupal plugin
 * Copyright Jeff Linwood 2011
 * MIT License
 *
 */



     var DrupalPlugin = function() {

    }

    DrupalPlugin.prototype.openAnonymousSession = function(successCallback, failureCallback) {
        return cordova.exec(successCallback, failureCallback, "DrupalPlugin", "openAnonymousSession", []);
    }
     
     DrupalPlugin.prototype.login = function(username,password,successCallback, failureCallback) {
        var options = {
                        username: username,
                        password: password
        }
        // successCallback required
        if (typeof successCallback != "function") {
            console.log("Drupal Error: successCallback is not a function");
            return;
        }


        // failureCallback optional
        if (failureCallback && (typeof failureCallback != "function")) {
            console.log("Drupal Error: failureCallback is not a function");
            return;
        }
        return cordova.exec(successCallback, failureCallback, "DrupalPlugin", "login", [options]);
     }


     DrupalPlugin.prototype.logout = function(successCallback, failureCallback) {
        // successCallback required
        if (typeof successCallback != "function") {
            console.log("Drupal Error: successCallback is not a function");
            return;
        }


        // failureCallback optional
        if (failureCallback && (typeof failureCallback != "function")) {
            console.log("Drupal Error: failureCallback is not a function");
            return;
        }
        return cordova.exec(successCallback, failureCallback, "DrupalPlugin", "logout", []);
    }

    DrupalPlugin.prototype.nodeGet = function(nid, successCallback, failureCallback) {
        return cordova.exec(successCallback, failureCallback, "DrupalPlugin", "nodeGet", [{nid: nid}]);
    }

    DrupalPlugin.prototype.nodeSave = function(node, successCallback, failureCallback) {
        return cordova.exec(successCallback, failureCallback, "DrupalPlugin", "nodeSave", [{node: node}]);
    }

    DrupalPlugin.prototype.nodeDelete = function(nid, successCallback, failureCallback) {
        return cordova.exec(successCallback, failureCallback, "DrupalPlugin", "nodeDelete", [{nid: nid}]);
    }

    DrupalPlugin.prototype.nodeGetIndex = function(successCallback, failureCallback) {
        return cordova.exec(successCallback, failureCallback, "DrupalPlugin", "nodeGetIndex", []);
    }

    DrupalPlugin.prototype.petitionsGetIndex = function(successCallback, failureCallback) {
        return cordova.exec(successCallback, failureCallback, "DrupalPlugin", "petitionsGetIndex", []);
    }
    DrupalPlugin.prototype.newsGetIndex = function(successCallback, failureCallback) {
        return cordova.exec(successCallback, failureCallback, "DrupalPlugin", "newsGetIndex", []);
    }
DrupalPlugin.prototype.eventsGetIndex = function(successCallback, failureCallback) {
    return cordova.exec(successCallback, failureCallback, "DrupalPlugin", "eventsGetIndex", []);
}

    DrupalPlugin.prototype.viewGet = function(viewName, successCallback, failureCallback) {
        return cordova.exec(successCallback, failureCallback, "DrupalPlugin", "viewGet", [{viewName: viewName}]);
    }

    DrupalPlugin.prototype.fileSave = function(file, successCallback, failureCallback) {
        return cordova.exec(successCallback, failureCallback, "DrupalPlugin", "fileSave", [{file: file}]);
    }

    cordova.addConstructor(function()
    {
        if(!window.plugins)
        {
            window.plugins = {};
        }
                           
        window.plugins.drupal = new DrupalPlugin();
    });


