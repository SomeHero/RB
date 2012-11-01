/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
/*  Here is what a node looks like *
 var node = {
 title: "Sample Article",
 body: {
 und: [{
 value: "Sample Body"
 }]
 },
 type: 'article',
 language: 'und'
 }; */
function onLeftNavButton() {
    alert('Left Button Pressed');
};
    
function onRightNavButton() {
    alert('Right Button Pressed');
};
function successCallback() {
    console.log('success');
};
function nodeSuccessCallback(result) {
    var nodes = result.nodes;
    for (var i = 0; i < nodes.length; i++) {
        var html = "<li data-nid='" + nodes[i].nid + "'><img src='" + nodes[i].logo + "' />" + nodes[i].title + "<br />" + nodes[i].teaser + "</li>";
        $(html).appendTo( '#home-items' );
    }
    
    $("#home-items").listview("refresh");

};
function failureCallback() {
    console.log('failed');
};
var app = {
    // Application Constructor
    initialize: function() {
        console.log('initialze app');
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // `load`, `deviceready`, `offline`, and `online`.
    bindEvents: function() {
        console.log('bindEvents app');
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of `this` is the event. In order to call the `receivedEvent`
    // function, we must explicity call `app.receivedEvent(...);`
onDeviceReady: function() {
    //app.receivedEvent('deviceready');

    window.plugins.drupal.openAnonymousSession(successCallback, failureCallback);
    window.plugins.drupal.nodeGetIndexWithType("petitions", nodeSuccessCallback,failureCallback);
    
   
},
   
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },
};
