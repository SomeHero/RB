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
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
        nativeControls = new NativeControls();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // `load`, `deviceready`, `offline`, and `online`.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of `this` is the event. In order to call the `receivedEvent`
    // function, we must explicity call `app.receivedEvent(...);`
onDeviceReady: function() {
    //app.receivedEvent('deviceready');
    console.log("PhoneGap ready");

    newLoc = location.href.substring(0, location.href.lastIndexOf("/")+1);
    
    // Initializating TabBar
    nativeControls.createTabBar();
    nativeControls.createNavBar();
    
    // Back Button
    nativeControls.createTabBarItem(
                                    "news",
                                    "News",
                                    "www/images/pound.png",
                                    {"onSelect": function() {
                                    newsClicked();
                                    }}
                                    );
    
    // Home tab
    nativeControls.createTabBarItem(
                                    "events",
                                    "Events",
                                    "www/images/pound.png",
                                    {"onSelect": function() {
     
                                    
                                    }}
                                    );
    
    // About tab
    nativeControls.createTabBarItem(
                                    "home",
                                    "Home",
                                    "www/images/question.png",
                                    {"onSelect": function() {
       
                                    }}
                                    );
    
    // About tab
    nativeControls.createTabBarItem(
                                    "actions",
                                    "Actions",
                                    "www/images/question.png",
                                    {"onSelect": function() {

                                    }}
                                    );
    
    // About tab
    nativeControls.createTabBarItem(
                                    "donate",
                                    "Donate",
                                    "www/images/question.png",
                                    {"onSelect": function() {
                                    
                                    }}
                                    );
    
    // Compile the TabBar
    nativeControls.showTabBar();
    nativeControls.showTabBarItems("news", "events", "home", "actions", "donate");
    
    selectedTabBarItem = "home";
    nativeControls.selectTabBarItem("home");
    
    // Setup NavBar
    nativeControls.setNavBarTitle("Roots Builder");
    
    nativeControls.setupLeftNavButton(
                                      "?",
                                      "",
                                      "onLeftNavButton"
                                      );
    
    //nativeControls.hideLeftNavButton();
    
    nativeControls.setupRightNavButton(
                                       "About",
                                       "",
                                       "onRightNavButton"
                                       );
    
    nativeControls.showNavBar({});
    
    console.log("PhoneGap done");
    
   
},
   
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
},
onLeftNavButton = function() {
    alert('hello james');
},
                                    newsClicked = function() {
                                    alert('news');
                                    }
