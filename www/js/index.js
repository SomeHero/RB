
//GLOBAL VARS
var viewport = {
    width  : $(window).width(),
    height : $(window).height(),
	panelwidth : $('#all-container').width()
};
var myScroll;
var currentView;

var aboutModal = {ModalID: "modal-about", PageID: "about", PageHeading: "About", PageTitle: "The About Page", PageContent: "<p>Lorem ipsum dolor sit amet, sed inermis persequeris deterruisset eu, ei quod solet commodo quo. Cum an bonorum nominavi voluptua, has at hinc audiam. Eirmod reformidans mea ei, has cetero eligendi ullamcorper et. Eu nibh prima eum, quem hinc splendide eu vel. Graeco percipit prodesset mei et, ex duo vide omnis. Nulla postulant imperdiet per et, sanctus graecis honestatis duo et, ei pro eripuit apeirian.</p>"};
var createAccountContent = '<div class="fb-button"><button type="button" id="fb-btn" class="rb-btn fb">Connect with Facebook</button></div><div class="or"> - &nbsp;OR&nbsp; -</div><div id="signin-form"><form action="#"  method="post"><span class="form-holder"><input type="email" id="username" class="required" placeholder="Email Address" name="Email"></span><span class="form-holder"><input type="password" id="password" class="required" placeholder="Password" name="Password"></span><button type="submit" id="signin-submit" class="rb-btn blue">Create Account</button></form></div><div id="main-body-sub-links"><p style="text-align: center"><a href="#">Already a member?  Sign In</a></p></div>'
var createAccountModal = {ModalID: "modal-create-account", PageID: "create-account", PageHeading: "Create Account", PageTitle: "Create a Mobylyze Account", PageContent: createAccountContent};

//GLOBAL FUNCTIONS

function whichTransitionEvent(){
    var t;
    var el = document.createElement('fakeelement');
    var transitions = {
      'transition':'transitionEnd',
      'OTransition':'otransitionend',
      'MSTransition':'msTransitionEnd',
      'MozTransition':'transitionend',
      'WebkitTransition':'webkitTransitionEnd'
    }

    for(t in transitions){
        if( el.style[t] !== undefined ){
            return transitions[t];
        }
    }
}

function resetSizing(){
	$('#profile-container').css('width', (viewport.panelwidth  - 48) + 'px');
    $('#pages > div.page').css('width', viewport.panelwidth  + 'px');
    $('#all-container').css('height', viewport.height + 'px');
    $('#wrapper').css('height', (viewport.height - 93) + 'px');
    $('#main-content').css('height', $('#pages > div.page.current').height() + 'px');
    $('div.page').css('min-height', viewport.height + 'px');
}
function resetViewport(){
    viewport.height = $(window).height();
    viewport.width = $(window).width();
    viewport.panelwidth = $('#all-container').width();
}
function resetPositioning(){
	$('body, html').css('top', '0px');
    $('.container').css('top', '0px');
    $('.container.slid-right').css("left", (viewport.panelwidth - 48) + "px");
	$('.modal-container.slid-up').css("top", "0px");
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

function createModal(modalName) {
var source   = $("#modal-template").html();
var template = Handlebars.compile(source);
var data = modalName;
var modal = template(data);
$('#all-container').append(modal);
resetSizing();
$('.modal-container#modal-'+ modalName.PageID).css("top", "0px");
$('.modal-container#modal-'+ modalName.PageID).addClass("slid-up");
$('.modal-container').removeClass("active");
$('.modal-container#modal-'+ modalName.PageID).addClass("active");
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

//DRUPAL STUFF?
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
};
function failureCallback() {
    console.log('failed');
};

function getUser() {
    if(window.localStorage["user"] != null)
    {
        var currentUser = JSON.parse(window.localStorage["user"]);

        return currentUser;
    }
    
    return null;
};
function loginUser() {
    
};
function logoutUser(success, failed) {
    
    window.plugins.drupal.logout(function() {
                                 console.log('user has been logged out');
                                 success();
                                 }, function() {
                                 console.log('logout failed');
                                 failed();
                                 });
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
        
        //Ryan - I had to comment this out to run correctly from the simulator
		//document.addEventListener('DOMContentLoaded', this.onDeviceReady, false); //THIS IS JUST FOR DEBUGGING!
    },
    // deviceready Event Handler
    //
    // The scope of `this` is the event. In order to call the `receivedEvent`
    // function, we must explicity call `app.receivedEvent(...);`
	onDeviceReady: function() {
    //app.receivedEvent('deviceready');
    
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
				   resetPositioning();
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
                    var user = getUser();
                    
                    if(user == null)
                    {
                    $("signin").show();
                    $("profile").hide();
                    } else {
                    $("signin").hide();
                    $("profile").show();
                    }
                    $('#tab-container').addClass("slid-right");
                    $('#tab-container').css("left", (viewport.panelwidth - 48) + "px");
                    $(this).addClass("slid");
                    $(this).removeClass("unslid");
                    $('#profile-closer').css("display", "block");
                    });
    $('.btn-about').on('click', function(e){
                       e.preventDefault();
                       createModal(aboutModal);
                       });
$('#all-container').on('click', '.modal-container.active .btn-modal-back', function(e){
                           e.preventDefault();
                           $('.modal-container.active').css("top", "105%");
                           $('.modal-container.active').removeClass("slid-up");
						   var transitionEnd = whichTransitionEvent();
						   
						   $('.modal-container.active').on(transitionEnd, function(e){
						   $('.modal-container.active').remove();
						   $('#all-container .modal-container').last().addClass("active");
						   });
						   
                           });
$('#btn-create-account').on('click', function(e){
                           e.preventDefault();
                           createModal(createAccountModal);
                           });
	
    $(document).on('blur', 'input', function () {
                   console.log('resetting');
                   resetPositioning();
                       });
    
    //APP-UI JUNK
    $('.page ul li').on('click', function(e){
                        alert('SHOW DETAILS');
                        });
    
    $('#home-list').bind('inview', function(event, isInView) {
                         
          if(isInView && currentView != 'home'){
          
          currentView = 'home';
                         
          console.log("home show");
          
          $("#home-list").empty();
                         
          window.plugins.drupal.eventsGetIndex(function(result) {
                                               
                                               var currentUser = getUser();
                                               if(currentUser != null)
                                               {
                                                   console.log(currentUser.user.name);
                                               }
                                               
                                                     var source   = $("#homeitem-template").html();
                                                     var template = Handlebars.compile(source);
                                                     var data = { nodes: result }
                                                     var item = template(result);
                                                     $('#home-list').append(item);
                                                     
                                                     resetSizing();
                                                     resetScroll();
                                                     
                                                     //$("#home-items").listview("refresh");
                                                     
                                                     },failureCallback);
                         }
                         });
    
    $('#news-list').bind('inview', function(event, isInView) {
        
         if (isInView && currentView != 'news') {

         currentView = news;
         console.log("news show");
                         $("#news-list").empty();
                         
          window.plugins.drupal.newsGetIndex(function(result) {
                                                    
                                                     var source   = $("#newsitem-template").html();
                                                     var template = Handlebars.compile(source);
                                                     var data = { nodes: result }
                                                     var item = template(result);
                                                     $('#news-list').append(item);
                                                     
                                                     resetSizing();
                                                     resetScroll();
                                                     
                                                     //$("#home-items").listview("refresh");
                                                     
                                                     },failureCallback);
                                             }
    });
    
        $('#events-list').bind('inview', function(event, isInView) {
            
            if (isInView && currentView != 'events') {
                               
                               currentView = events;
                               console.log("events show");
                               
                               $("#events-list").empty();
                               
          window.plugins.drupal.eventsGetIndex(function(result) {
                                                     
                                                     var source   = $("#eventitem-template").html();
                                                     var template = Handlebars.compile(source);
                                                     var data = { nodes: result }
                                                     var item = template(result);
                                                     $('#events-list').append(item);
                                                     
                                                     resetSizing();
                                                     resetScroll();
                                                     },failureCallback);
                               }
                          });

    $("#signin-submit").on('click', function(e) {
                           e.preventDefault();
                           
                           var userName = "admin";
                           var password = "turnkey";
 
                           window.plugins.drupal.login(userName, password, function(result) {
                                                       window.localStorage["user"] =  JSON.stringify(result);
                                                       
                                                       $('#profile-closer').css("display", "none");
                                                       $('#tab-container').removeClass("slid-right");
                                                       $('#tab-container').css("left", "0px");
                                                       $(this).addClass("unslid");
                                                       $(this).removeClass("slid");
                                                       
                                                       }, function() {
                                                       alert('login failed');
                                                       });
     });
        $("#user-logout-button").on('click', function(e) {
                                    e.preventDefault();
                                    
                                    logoutUser(function() {
                                               console.log('user logged out');
                                               },
                                               function() {
                                               console.log('user logged in');
                                               });
                                    
                                    });
    
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
	   
