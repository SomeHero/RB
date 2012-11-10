//GLOBAL VARS
var viewport = {
    width: $(window).width(),
    height: $(window).height(),
    panelwidth: $('#all-container').width()
};

var appui = {
    footerHeight: 49,
    headerHeight: 47
};

var myScroll = null;
var newsScroll = null;
var eventsScroll = null;
var homeScroll = null;
var actionScroll = null;
var bundlesScroll = null;
var pullDownEl, pullDownOffset, pullUpEl, pullUpOffset, generatedCount = 0;

var loader = $('<div class="loader"><p><span class="offset" /><span class="loader-image" /></span><span class="loader-message" /></span></span></div>');

var aboutModal = {
    ModalID: "modal-about",
    PageID: "about",
    PageHeading: "About",
    PageTitle: "The About Page",
    PageContent: '<p>Lorem ipsum dolor sit amet, sed inermis persequeris deterruisset eu, ei quod solet commodo quo. Cum an bonorum nominavi voluptua, has at hinc audiam. Eirmod reformidans mea ei, has cetero eligendi ullamcorper et. Eu nibh prima eum, quem hinc splendide eu vel. Graeco percipit prodesset mei et, ex duo vide omnis. Nulla postulant imperdiet per et, sanctus graecis honestatis duo et, ei pro eripuit apeirian.</p>'
};
var createSomethingModal = {
    ModalID: "modal-create",
    PageID: "create",
    PageHeading: "Create",
    PageTitle: "Create",
    PageContent: '<p>Here you can create something, I believe.</p><div id="create-buttons-holder"><button type="button" id="poll-button" class="rb-btn blue">+ Create Poll</button><button type="button" id="petition-button" class="rb-btn blue">+ Create Petition</button><button type="button" id="campaign-button" class="rb-btn blue">+ Create Campaign</button><button type="button" id="bundle-button" class="rb-btn blue">+ Create Bundle</button></div>'
};
var createAccountContent = '<div class="fb-button"><button type="button" id="fb-btn" class="rb-btn fb">Connect with Facebook</button></div><div class="or"> - &nbsp;OR&nbsp; -</div><div id="signin-form"><form action="#"  method="post"><span class="form-holder"><input type="email" id="join-username" class="required" placeholder="Email Address" name="Email"></span><span class="form-holder"><input type="password" id="join-password" class="required" placeholder="Password" name="Password"></span><button type="button" id="create-account-submit" class="rb-btn blue">Create Account</button></form></div><div id="main-body-sub-links"><p style="text-align: center"><a href="#">Already a member?  Sign In</a></p></div>';
var createAccountModal = {
    ModalID: "modal-create-account",
    PageID: "create-account",
    PageHeading: "Create Account",
    PageTitle: "Create a Mobylyze Account",
    PageContent: createAccountContent
};

var youContentAnon = {
    ContentID: "you-content-anon",
    PageContent: '<div class="fb-button"><button type="button" id="fb-btn" class="rb-btn fb">Connect with Facebook</button></div><div class="or"> - &nbsp;OR&nbsp; -</div><div id="signin-form"><span class="form-holder"><input type="email" id="signin-username" class="required" placeholder="Email Address" name="Email"></span><span class="form-holder"><input type="password" id="signin-password" class="required" placeholder="Password" name="Password"></span><button type="button" id="signin-submit" class="rb-btn blue">Sign In with Email</button></div><div id="main-body-sub-links"><p style="text-align: center"><a href="#">Forgot password?</a>&nbsp; | &nbsp;<a id="btn-create-account" href="#" data-ajax="false">Create Account</a></p></div>'
};
var youContentAuth = {
    ContentID: "you-content-auth",
    PageContent: '<button type="button" id="user-profile-button" class="rb-btn blue">Profile</button><button type="button" id="user-network-button" class="rb-btn blue">Network</button><button type="submit" id="user-actions-button" class="rb-btn blue">Actions</button><button type="submit" id="user-events-button" class="rb-btn blue">Events</button><button type="submit" id="user-bundles-button" class="rb-btn blue">Bundles</button><button type="button" id="signout-submit" class="rb-btn orange">Sign Out</button>'
};

var transitionEnd = 'webkitTransitionEnd';




//GLOBAL FUNCTIONS

//USER FUNCTIONS

function getUser() {
    if (window.localStorage.length !== 0 && window.localStorage["user"] !== null) {
        var currentUser = JSON.parse(window.localStorage["user"]);
        return currentUser;
    }
    return null;
}

function loginUser() {

}

function logoutUser(success, failed) {

    window.plugins.drupal.logout(function() {
        console.log('user has been logged out');
        success();
    }, function() {
        console.log('logout failed');
        failed();
    });
}


function whichTransitionEvent() {
    var t;
    var el = document.createElement('fakeelement');
    var transitions = {
        'transition': 'transitionEnd',
        'OTransition': 'otransitionend',
        'MSTransition': 'msTransitionEnd',
        'MozTransition': 'transitionend',
        'WebkitTransition': 'webkitTransitionEnd'
    };

    for (t in transitions) {
        if (el.style[t] !== undefined) {
            return transitions[t];
        }
    }
}

function resetSizing() {
    $('#profile-container').css('width', (viewport.panelwidth - 48) + 'px');
    $('#pages > div.page').css('width', viewport.panelwidth + 'px');
    $('#all-container').css('height', viewport.height + 'px');
    $('#wrapper').css('height', (viewport.height - (appui.footerHeight + appui.headerHeight) + 'px'));
    $('.scroller.wf').css('height', (viewport.height - (appui.footerHeight + appui.headerHeight) + 'px'));
    $('#main-content').css('height', $('#pages > div.page.current').height() + 'px');
    $('div.page').css('min-height', viewport.height + 'px');
}

function resetViewport() {
    viewport.height = $(window).height();
    viewport.width = $(window).width();
    viewport.panelwidth = $('#all-container').width();
}

function resetPositioning() {
    $('body, html').css('top', '0px');
    $('.container').css('top', '0px');
    $('.container.slid-right').css("left", (viewport.panelwidth - 48) + "px");
    $('.modal-container.slid-up').css("top", "0px");
}

function hideOtherPages() {
    $('#pages > div.page').css("display", "none");
    $('#pages > div.page.current').css("display", "block");
}

function showEmptyLoader(message) {
    $('.loader').remove();
    $('.page.current').prepend(loader);
    if (message) {
        $(".loader-message").text(message);
    } else {
        $(".loader-message").empty();
    }
    $('.loader').css('display', 'block');
}

function hideEmptyLoader() {
    $('.loader').fadeOut('fast', function() {
        $('.loader').remove();
    });
}

function initScroll() {
    setTimeout(function() {
        homeScroll = new iScroll('home-scroller', {
            hideScrollbar: true,
            scrollbarClass: 'myScrollbar'
        });
        newsScroll = new iScroll('news-scroller', {
            hideScrollbar: true,
            scrollbarClass: 'myScrollbar'
        });
        eventsScroll = new iScroll('events-scroller', {
            hideScrollbar: true,
            scrollbarClass: 'myScrollbar'
        });
        actionScroll = new iScroll('action-scroller', {
            hideScrollbar: true,
            scrollbarClass: 'myScrollbar'
        });
        bundlesScroll = new iScroll('bundles-scroller', {
            hideScrollbar: true,
            scrollbarClass: 'myScrollbar'
        });
        //hideOtherPages();
    }, 100);
}


function pullDownAction() {
    var el, li, i;
    el = document.getElementById('home-list');

    for (i = 0; i < 3; i++) {
        li = document.createElement('li');
        li.innerText = 'New Home Item ' + (++generatedCount);
        el.insertBefore(li, el.childNodes[0]);
    }

    homeScroll.refresh();
}


function resetScroll(page) {
    setTimeout(function() {
        if (page == "home") {
            if (homeScroll !== null) {
                homeScroll.refresh();
            } else {
                homeScroll = new iScroll('home-scroller', {
                    hideScrollbar: true,
                    scrollbarClass: 'myScrollbar',
                    useTransition: true,
                    topOffset: pullDownOffset,
                    onRefresh: function() {
                        if (pullDownEl.className.match('loading')) {
                            pullDownEl.className = '';
                            pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Pull down to refresh...';
                        }
                    },
                    onScrollMove: function() {
                        if (this.y > 5 && !pullDownEl.className.match('flip')) {
                            pullDownEl.className = 'flip';
                            pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Release to refresh...';
                            this.minScrollY = 0;
                        } else if (this.y < 5 && pullDownEl.className.match('flip')) {
                            pullDownEl.className = '';
                            pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Pull down to refresh...';
                            this.minScrollY = -pullDownOffset;
                        }
                    },
                    onScrollEnd: function() {
                        if (pullDownEl.className.match('flip')) {
                            pullDownEl.className = 'loading';
                            pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Loading...';
                            pullDownAction(); // Execute custom function (ajax call?)
                        }
                    }
                });
            }
        } else if (page == "news") {
            if (newsScroll !== null) {
                newsScroll.refresh();
            } else {
                newsScroll = new iScroll('news-scroller', {
                    hideScrollbar: true,
                    scrollbarClass: 'myScrollbar'
                });
            }
        } else if (page == "events") {
            if (eventsScroll !== null) {
                eventsScroll.refresh();
            } else {
                eventsScroll = new iScroll('events-scroller', {
                    hideScrollbar: true,
                    scrollbarClass: 'myScrollbar'
                });
            }
        } else if (page == "action") {
            if (actionScroll !== null) {
                actionScroll.refresh();
            } else {
                actionScroll = new iScroll('action-scroller', {
                    hideScrollbar: true,
                    scrollbarClass: 'myScrollbar'
                });
            }
        } else if (page == "bundles") {
            if (bundlesScroll !== null) {
                bundlesScroll.refresh();
            } else {
                bundlesScroll = new iScroll('bundles-scroller', {
                    hideScrollbar: true,
                    scrollbarClass: 'myScrollbar'
                });
            }
        } else {

        }
    }, 0);
}

function page(toPage, tabNum) {
    var toPage = $(toPage),
        fromPage = $("#pages .current");
    if (toPage.hasClass("current")) {
        return;
    } else if (toPage === fromPage) {
        //attempt to fix odd bug where nothing is current
        $("#pages div.page.current").removeClass("current");
        $("#pages div.page").css("display", "none"); //hide all
        toPage.addClass("current");
        toPage.css("display", "block");
    } else {
        fromPage.removeClass("current");
        $("#pages div.page").css("display", "none"); //hide all
        toPage.addClass("current");
        toPage.css("display", "block");
        resetSizing();
    }

    if (tabNum == 3) {
        getHome();
        //$('header h1#hd-tab').empty();
        //$('header h1#hd-tab').addClass("hd-logo");
    } else {
        //not home tab
        //$('header h1#hd-tab').removeClass("hd-logo");
        if (tabNum == 1) {
            getNews();
            //$('header h1#hd-tab').text("News");
        } else if (tabNum == 2) {
            getEvents();
            //$('header h1#hd-tab').text("Events");
        } else if (tabNum == 4) {
            getAction();
            //$('header h1#hd-tab').text("Take Action");
        } else if (tabNum == 5) {
            getBundles();
            //$('header h1#hd-tab').text("Bundles");
        } else {

        }
    }

}

function createModal(modalName) {
    var source = $("#modal-template").html();
    var template = Handlebars.compile(source);
    var data = modalName;
    var modal = template(data);
    $('#all-container').append(modal);
    resetSizing();
    $('.modal-container#modal-' + modalName.PageID).css('top', (viewport.height + 40) + 'px');
    $('.modal-container#modal-' + modalName.PageID).css('display', 'block');
    $('.modal-container').removeClass("active");
    $('.modal-container#modal-' + modalName.PageID).addClass("active");
    $('.modal-container#modal-' + modalName.PageID).addClass("slid-up");
    $('.modal-container#modal-' + modalName.PageID).animate({
        top: "0px",
        useTranslate3d: true,
        leaveTransforms: false
    }, 400, function() {

    });

}

function compileTemplateStatic(content) {

}

function getNews() {

    if (window.plugins !== undefined && ($('#news-list li').length === 0)) {
        showEmptyLoader("Getting News...");
        window.plugins.drupal.openAnonymousSession(successCallback, failureCallback);
        window.plugins.drupal.newsGetIndex(function(result) {

            var source = $("#newsitem-template").html();
            var template = Handlebars.compile(source);
            var data = {
                nodes: result
            };
            var item = template(result);
            $('.loader').remove();
            $('#news-list').append(item);
            resetSizing();
            resetScroll("news");
        }, failureCallback);
    } else {
        resetSizing();
        resetScroll("news");
    }
}

function getEvents() {

    if (window.plugins !== undefined && ($('#events-list li').length === 0)) {
        showEmptyLoader("Getting Events...");
        window.plugins.drupal.openAnonymousSession(successCallback, failureCallback);
        window.plugins.drupal.eventsGetIndex(function(result) {

            var source = $("#eventitem-template").html();
            var template = Handlebars.compile(source);
            var data = {
                nodes: result
            };
            var item = template(result);
            $('.loader').remove();
            $('#events-list').append(item);

            resetSizing();
            resetScroll("events");
        }, failureCallback);
    } else {
        resetSizing();
        resetScroll("events");
    }
}

function getHome() {
    pullDownEl = document.getElementById('pullDown');
    pullDownOffset = pullDownEl.offsetHeight;

    document.addEventListener('touchmove', function(e) {
        e.preventDefault();
    }, false);

    if (window.plugins !== undefined && ($('#home-list li').length === 0)) {
        window.plugins.drupal.openAnonymousSession(successCallback, failureCallback);
        window.plugins.drupal.petitionsGetIndex(function(result) {
            $("#home-list").empty();

            var source = $("#homeitem-template").html();
            var template = Handlebars.compile(source);
            var data = {
                nodes: result
            };
            var item = template(result);
            $('.loader').remove();
            $('#home-list').append(item);

            resetSizing();
            resetScroll("home");

        }, failureCallback);
    } else {
        resetSizing();
        resetScroll("home");
    }
}

function getAction() {
    resetSizing();
    resetScroll("action");
}

function getBundles() {
    resetSizing();
    resetScroll("bundles");
}



//DRUPAL STUFF

function successCallback() {
    console.log('success');
}

function nodeSuccessCallback(result) {
    var nodes = result.nodes;
    for (var i = 0; i < nodes.length; i++) {
        var html = "<li data-nid='" + nodes[i].nid + "'><img src='" + nodes[i].logo + "' />" + nodes[i].title + "</li>";
        $(html).appendTo('#home-items');
    }
    resetSizing();
}

function failureCallback() {
    console.log('failed');
}



var app = {
    // Application Constructor
    initialize: function() {
        console.log('initialze app');
        this.bindEvents();
    },
    // Bind Event Listeners
    bindEvents: function() {
        console.log('bindEvents app');
        document.addEventListener('deviceready', this.onDeviceReady, false);
	document.addEventListener('DOMContentLoaded', this.onDeviceReady, false); //THIS IS JUST FOR DEBUGGING!
    },
    //DEVICE READY
    onDeviceReady: function() {
        //SET VARS
        transitionEnd = whichTransitionEvent();
        viewport = {
            width: $(window).width(),
            height: $(window).height(),
            panelwidth: $('#all-container').width()
        };

        //SET UP FUNCTIONS
        getHome();
        resetSizing();
        resetScroll('home');
        
        // remove splash screen
		if (navigator.splashscreen){
        navigator.splashscreen.hide();
		}
		
		//check if logged in
		var user = getUser();
        if (user !== null) {
		$('#create-link').removeClass('hidden');
		$('#about-link').addClass('hidden');
        }
		
		
		
		//EVENT BINDINGS
        $(window).bind('resize', function() {
            resetViewport();
            resetSizing();
            resetPositioning();
            resetScroll();
        });

		
        $('#tab-bar a').on('click', function(e) {
            e.preventDefault();
            var toPage = $(this.hash);
            var fromPage = $("#pages .current");
            $('#tab-bar a.current').removeClass("current");
            $(this).addClass("current");
            $('#tab-bar li.current').removeClass("current");
            $(this).parent().addClass("current");
            page(toPage, $(this).parent().attr("tab"));
        });

        $('#profile-closer').on('click', function(e) {
            //ANIMATE PROFILE OUT
            e.preventDefault();
		
		//check if logged in now		
		var user = getUser();
        if (user !== null) {
		$('#create-link').removeClass('hidden');
		$('#about-link').addClass('hidden');
        }else{
		$('#about-link').removeClass('hidden');
		$('#create-link').addClass('hidden');
		}
		
            $('#profile-closer').css("display", "none");
            $('#tab-container').animate({
                left: "0px",
                useTranslate3d: true,
                leaveTransforms: false
            }, 300, function() {
                $('#tab-container').removeClass("slid-right");
                $('#profile-link').removeClass("slid").addClass("unslid");
            });



        });
        $('#tab-container').on('click', '#profile-link.unslid', function(e) {
            //ANIMATE PROFILE IN
            e.preventDefault();
            $('#profile.page').empty();
            var user = getUser();

            var source = $("#html-content-template").html();
            var template = Handlebars.compile(source);
            var data = youContentAnon;
            if (user !== null) {
                data = youContentAuth;
            }
            var content = template(data);
            $('#profile.page').append(content);

            $('#tab-container').animate({
                left: (viewport.panelwidth - 48) + "px",
                useTranslate3d: true,
                leaveTransforms: false
            }, 300, function() {
                $('#profile-link').removeClass("unslid").addClass("slid");
                $('#tab-container').addClass("slid-right");
                $('#profile-closer').css("display", "block");
            });

        });
        $('.btn-about').on('click', function(e) {
            e.preventDefault();
            createModal(aboutModal);
        });
		$('.btn-create').on('click', function(e) {
            e.preventDefault();
            createModal(createSomethingModal);
        });
        $('#all-container').on('click', '.modal-container.active .btn-modal-back', function(e) {
            e.preventDefault();
            $('.modal-container.active').removeClass("slid-up");
            $('.modal-container.active').animate({
                top: (viewport.height + 40) + 'px',
                useTranslate3d: true,
                leaveTransforms: false
            }, 400, function() {
                $('.modal-container.active').remove();
                $('#all-container .modal-container').last().addClass("active");
            });


        });
        $('#all-container').on('click', '#btn-create-account', function(e) {
            e.preventDefault();
            createModal(createAccountModal);
        });

        $('#all-container').on('blur', 'input', function() {
            console.log('resetting');
            resetPositioning();
        });

        //DEBUG
        $('div.page ul li').on('click', function(e) {
            alert('SHOW DETAILS');
        });

        //SIGN IN SUBMIT
        $('#profile-container').on('click', '#signin-submit', function(e) {
            e.preventDefault();
            var userName = $("#signin-username").val();
            var password = $("#signin-password").val();

            window.plugins.drupal.logout(function() {
                console.log('user logout success');
            }, function() {
                console.log('user logout failed');
            });
            window.plugins.drupal.login(userName, password, function(result) {
                window.localStorage["user"] = JSON.stringify(result);

                $('#profile.page').empty();
                var source = $("#html-content-template").html();
                var template = Handlebars.compile(source);
                var data = youContentAnon;
                var user = getUser();
                if (user !== null) {
                    data = youContentAuth;
                }
                var content = template(data);
                $('#profile.page').append(content);
            }, function() {
                alert('login failed');
            });
        });
        //SIGN OUT SUMMIT
        $('#profile-container').on('click', '#signout-submit', function(e) {
            e.preventDefault();

            window.plugins.drupal.logout(function(result) {
                window.localStorage.removeItem("user");
                $('#profile.page').empty();
                var source = $("#html-content-template").html();
                var template = Handlebars.compile(source);
                var data = youContentAnon;

                var content = template(data);
                $('#profile.page').append(content);
            }, function(result) {
                console.log('logout failed');
            });
        });
        
        //CREATE ACCOUNT
        $('#profile-container').on('click', '#create-account-submit', function(e) {
                                   e.preventDefault();
                                   alert('create account');
        });



    },//END DEVICE READY
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');
        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
        console.log('Received Event: ' + id);
    }
}; //END APP


jQuery(function($) {

    var _oldShow = $.fn.show;

    $.fn.show = function(speed, oldCallback) {
        return $(this).each(function() {
            var
            obj = $(this),
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
    };
});


/*  Here is what a node looks like 
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