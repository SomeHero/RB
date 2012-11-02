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
        var html = "<li data-nid='" + nodes[i].nid + "'><img src='" + nodes[i].logo + "' />" + nodes[i].title +  "</li>";
        $(html).appendTo( '#home-items' );
    }
    
    resetSizing();
    //initScroll();
    
    //$("#home-items").listview("refresh");

};
function failureCallback() {
    console.log('failed');
};
//GLOBAL VARS
var viewport = {
    width  : $(window).width(),
    height : $(window).height(),
	panelwidth : $('#all-container').width()
};
var myScroll;

var aboutModal = {ModalID: "modal-about", PageID: "about", PageHeading: "About", PageTitle: "The About Page", PageContent: "<p>Lorem ipsum dolor sit amet, sed inermis persequeris deterruisset eu, ei quod solet commodo quo. Cum an bonorum nominavi voluptua, has at hinc audiam. Eirmod reformidans mea ei, has cetero eligendi ullamcorper et. Eu nibh prima eum, quem hinc splendide eu vel. Graeco percipit prodesset mei et, ex duo vide omnis. Nulla postulant imperdiet per et, sanctus graecis honestatis duo et, ei pro eripuit apeirian.</p>"};


//GLOBAL FUNCTIONS
function resetSizing(){
    $('#pages > div.page').css('width', viewport.panelwidth  + 'px');
    $('#all-container').css('height', viewport.height + 'px');
    $('#wrapper').css('height', (viewport.height - 93) + 'px');
    $('#main-content').css('height', $('#pages > div.page.current').height() + 'px');
    $('div.page').css('min-height', viewport.height + 'px');
}

function initScroll() {
	setTimeout(function () {
               myScroll = new iScroll('wrapper', {hideScrollbar: true, scrollbarClass: 'myScrollbar' });
               }, 100);
}

function resetScroll(){
    if (myScroll != null || myScroll != undefined){
        setTimeout(function () {
                   myScroll.refresh();
                   }, 0);
	}else{
        //do nothing
        
	}
}

function resetViewport(){
    viewport.height = $(window).height();
    viewport.width = $(window).width();
    viewport.panelwidth = $('#all-container').width();
}

function page(toPage) {
    var toPage = $(toPage),
    fromPage = $("#pages .current");
    if (toPage.hasClass("current")){
		return;
    }else if (toPage === fromPage) {
        //attempt to fix odd bug where nothing is current
        $("#pages .current").removeClass("current");
        toPage.addClass("current");
	}else{
        fromPage.removeClass("current");
        toPage.addClass("current");
        toPage.show();
        resetSizing();
        resetScroll();
        myScroll.scrollToElement('#scroll-top', 0);
	}
}
//APP-UI JUNK
function loadView( title ) {
    
    var html = "<div style='min-height:100%; background:#FFF; padding: 3px 15px;'><h1>" + title + "</h1><strong>Cable television</strong> is a system of providing television programs to consumers via radio frequency (RF) signals transmitted to televisions through coaxial cables or digital light pulses through fixed optical fibers located on the subscriber's property. This can be compared to over-the-air method used in traditional broadcast television (via radio waves) in which a television antenna is required. FM radio programming, high-speed Internet, telephony, and similar non-television services may also be provided through cable television. Source: <a href='http://en.wikipedia.org/wiki/Cable_tv'>http://en.wikipedia.org/wiki/Cable_tv</a></div>";
    
    var iframeView = { title: title,
    backLabel: "Home",
    view: $(html),
    backCallback: handleNavigateBack
    };
    window.viewNavigator.pushView( iframeView );
}

function handleNavigateBack() {
    resetList();
    history.back();
}

function resetList() {
    window.defaultView.find("a").each(function(i){
                                      $(this).removeClass( "listSelected" );
                                      });
}
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
    //APP-UI JUNK
    window.viewNavigator = new ViewNavigator( '#tab-container', 'headerButton' );
    //APP-UI JUNK END
    
    
    viewport = {
        width  : $(window).width(),
        height : $(window).height(),
        panelwidth : $('#all-container').width()
    };
    
    resetSizing();
    initScroll();
    
    $(window).bind('resize', function () {
                   resetViewport();
                   resetSizing();
                   resetScroll();
                   });
    
    $('#tab-bar a').on('click', function(e){
                       e.preventDefault();
                       var toPage = $(this.hash);
                       var fromPage = $("#pages .current");
                       $('#tab-bar a.current').removeClass("current");
                       $(this).addClass("current");
                       page(toPage);
                       });
    
    $('#profile-closer').on('click', function(e){
                            $('#profile-closer').css("display", "none");
                            e.preventDefault();
                            $('#tab-container').removeClass("slid-right");
                            $('#tab-container').css("left", "0px");
                            $(this).addClass("unslid");
                            $(this).removeClass("slid");
                            });
    $('.unslid').on('click', function(e){
                    e.preventDefault();
                    $('#tab-container').addClass("slid-right");
                    $('#tab-container').css("left", (viewport.panelwidth - 48) + "px");
                    $(this).addClass("slid");
                    $(this).removeClass("unslid");
                    $('#profile-closer').css("display", "block");
                    });
    $('.btn-about').on('click', function(e){
                       e.preventDefault();
                       var source   = $("#modal-template").html();
                       var template = Handlebars.compile(source);
                       var data = aboutModal;
                       var modal = template(data);
                       $('#all-container').append(modal);
                       resetSizing();
                       $('#modal-about').css("top", "0px");
                       $('#modal-about').addClass("slid-up");
                       });
    $('#all-container').on('click', '.btn-about-back', function(e){
                           e.preventDefault();
                           $('#modal-about').css("top", "105%");
                           $('#modal-about').removeClass("slid-up");
                           });
    
    //APP-UI JUNK
    $('.page ul li').on('click', function(e){
                        alert('SHOW DETAILS');
                        //loadView( "TEST" );
                        });
    
    $('#home')
    .bind('beforeShow', function() {

    })
    .bind('afterShow', function() {
    
    })
    .show(1000, function() {
          window.plugins.drupal.openAnonymousSession(successCallback, failureCallback);
          window.plugins.drupal.petitionsGetIndex(function(result) {
                                                     $("#home-list").empty();
                                                     
                                                     var source   = $("#homeitem-template").html();
                                                     var template = Handlebars.compile(source);
                                                     var data = { nodes: result }
                                                     var modal = template(result);
                                                     $('#home-list').append(modal);
                                                     
                                                     resetSizing();
                                                     //initScroll();
                                                     
                                                     //$("#home-items").listview("refresh");
                                                     
                                                     },failureCallback);
    })
    .show();
    
    $('#news')
    .bind('beforeShow', function() {
          
          })
    .bind('afterShow', function() {
          
          })
    .show(1000, function() {
          window.plugins.drupal.openAnonymousSession(successCallback, failureCallback);
          window.plugins.drupal.newsGetIndex(function(result) {
                                                     $("#news-list").empty();
                                                     
                                                     var source   = $("#newsitem-template").html();
                                                     var template = Handlebars.compile(source);
                                                     var data = { nodes: result }
                                                     var modal = template(result);
                                                     $('#news-list').append(modal);
                                                     
                                                     resetSizing();
                                                     //initScroll();
                                                     
                                                     //$("#home-items").listview("refresh");
                                                     
                                                     },failureCallback);
          })
    .show();
    
    $('#events')
    .bind('beforeShow', function() {
          
          })
    .bind('afterShow', function() {
          
          })
    .show(1000, function() {
          window.plugins.drupal.openAnonymousSession(successCallback, failureCallback);
          window.plugins.drupal.petitionsGetIndex(function(result) {
                                                     $("#events-list").empty();
                                                     
                                                     var source   = $("#eventitem-template").html();
                                                     var template = Handlebars.compile(source);
                                                     var data = { nodes: result }
                                                     var modal = template(result);
                                                     $('#events-list').append(modal);
                                                     
                                                     resetSizing();
                                                     //initScroll();
                                                     
                                                     //$("#home-items").listview("refresh");
                                                     
                                                     },failureCallback);
          })
    .show();

    $("#signin-submit").on('click', function(e) {
                           e.preventDefault();
                           
                           var userName = "admin";
                           var password = "turnkey";
                           
                           window.plugins.drupal.login(userName, password, function() {
                                                       alert('login success');
                                                       }, function() {
                                                       alert('login failed');
                                                       });
     });
    
   
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
                        jQuery(function($) {
                               
                               var _oldShow = $.fn.show;
                               
                               $.fn.show = function(speed, oldCallback) {
                               return $(this).each(function() {
                                                   var
                                                   obj         = $(this),
                                                   newCallback = function() {
                                                   if ($.isFunction(oldCallback)) {
                                                   oldCallback.apply(obj);
                                                   }
                                                   
                                                   obj.trigger('afterShow');
                                                   };
                                                   
                                                   // you can trigger a before show if you want
                                                   obj.trigger('beforeShow');
                                                   
                                                   // now use the old function to show the element passing the new callback
                                                   _oldShow.apply(obj, [speed, newCallback]);
                                                });
                               }
                            });
                               
                               
