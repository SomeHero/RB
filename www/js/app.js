// ==========================================================================
//   GLOBAL NAMESPACE
//   ========================================================================== 
var sh = sh || {};


// ==========================================================================
//   CONFIG
//   ========================================================================== 
sh.config = {
	drupal: {
		resturl: "http://ec2-54-242-131-102.compute-1.amazonaws.com/rest/"
	}
};

// ==========================================================================
//   INITIALIZE
//   ========================================================================== 

sh.init = function() {
	console.log('initialze app');
	sh.revup();
};

// ==========================================================================
//   REV UP
//   ========================================================================== 

sh.revup = function() {
	console.log('deciding how to begin');

	if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/) || window.PhoneGap) {

		console.log('running in phonegap - not accurate yet');
		document.addEventListener('deviceready', sh.onDeviceReady, false);

	} else if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/)) {

		console.log('running in mobile browser');

		if (document.readyState === "complete") {
			sh.onDeviceReady();
		} else {
			document.addEventListener('DOMContentLoaded', sh.onDeviceReady, false);
		}

	} else {

		console.log('running in desktop browser');

		if (document.readyState === "complete") {
			sh.onDeviceReady();
		} else {
			document.addEventListener('DOMContentLoaded', sh.onDeviceReady, false);
		}

	}

};
// ==========================================================================
//   ON READY
//   ========================================================================== 

sh.onDeviceReady = function() {


	//SET VARS
	sh.utils.transitionEnd = sh.utils.whichTransitionEvent();

	sh.ui.viewport = {
		width: $(window).width(),
		height: $(window).height(),
		panelwidth: $('#all-container').width()
	};



	//RUN SET UP FUNCTIONS
	sh.system.connect(function() {
		console.log('connected to drupal server success');
	}, function() {
		console.log('connection to drupal server failed');
	});

	console.log('attempting to load data');
	
	//GET ALL SET UP
	sh.ui.reset.viewport();
	sh.ui.reset.sizing();
	sh.ui.reset.positioning();
	
	
	//LOAD HOME
	sh.content.update.page('home');
	//LOAD NEWS
	sh.content.update.page('news');
	//LOAD HOME
	sh.content.update.page('events');



	//FASTCLICK
	new FastClick(document.body);

	// REMOVE SPLASH
	if (navigator.splashscreen) {
		navigator.splashscreen.hide();
	}

	sh.user.logout(function() {}, function() {});


	//EVENT BINDINGS
	sh.events.init();

};

// ==========================================================================
//   EVENT BINDINGS
//   ========================================================================== 


sh.events = {
	init: function() {
		//RESIZE
		$(window).on('resize', function() {
			sh.ui.reset.viewport();
			sh.ui.reset.sizing();
			sh.ui.reset.positioning();
			sh.ui.scroll.reset();
		});

		//TAB BAR
		$('#tab-bar a').on('click', function(e) {
			e.preventDefault();
			var toTab = $(this).parent().attr("tab");
			var currentTab = $('#tab-bar a.current').parent().attr("tab");
			$('#tab-bar a.current').removeClass("current").parent().removeClass("current");
			$(this).addClass("current").parent().addClass("current");
			sh.ui.page.change(toTab);
		});

		//TAB CONTAINER PAGE LOADING
		$("#tab-container").on('afterShow', '#news', function(e) {
			sh.content.update.page('news');
		});
		$("#tab-container").on('afterShow', '#events', function(e) {
			sh.content.update.page('events');
		});
		$("#tab-container").on('afterShow', '#home', function(e) {
			sh.content.update.page('home');
		});
		$("#tab-container").on('afterShow', '#action', function(e) {
			sh.content.update.page('action');
		});
		$("#tab-container").on('afterShow', '#bundles', function(e) {
			sh.content.update.page('bundles');
		});


		//PROFILE OPEN CLOSE
		$('#profile-closer').on('click', function(e) {
			e.preventDefault();
			sh.ui.container.profile.close();
		});

		$('#tab-container').on('click', '#profile-link.unslid', function(e) {
			e.preventDefault();
			sh.ui.container.profile.open();
		});

		//MODALS
		$('#all-container').on('click', '.btn-about', function(e) {
			e.preventDefault();
			sh.ui.modal.create(sh.content.tmpl.aboutModal);
		});
		$('#all-container').on('click', '.btn-create', function(e) {
			e.preventDefault();
			sh.ui.modal.create(sh.content.tmpl.createSomethingModal);
		});
		$('#all-container').on('click', '#btn-create-account', function(e) {
			e.preventDefault();
			sh.ui.modal.create(sh.content.tmpl.createAccountModal);
		});

		//CLOSE MODALS
		$('#all-container').on('click', '.modal-container.active .btn-modal-back', function(e) {
			e.preventDefault();
			sh.ui.modal.close();
		});


		//OPEN DETAILS
		$('#app-container').on('click', '.page ul li', function(e) {
			e.preventDefault();

			var temp = $(this).parent().attr('depth');
			depth = parseInt(temp);

			if (temp === undefined) {
				sh.ui.detail.load('detail-template', sh.content.tmpl.testDetail);
			} else if (depth == 1) {
				sh.ui.detail.load('detail-template', sh.content.tmpl.testDetail2);
			} else if (depth == 2) {
				sh.ui.detail.load('detail-template', sh.content.tmpl.testDetail3);
			} else if (depth == 3) {
				sh.ui.detail.load('detail-template', sh.content.tmpl.testDetail4);
			} else {
				alert('relax, friend...just testing here');
			}
		});

		//CLOSE DETAILS
		$('#app-container').on('click', '.detail-view.active-dt .btn-detail-back', function(e) {
			e.preventDefault();
			sh.ui.detail.back();
		});

		//FIX AFTER FORM ENTRY
		$('#all-container').on('blur', 'input', function() {
			sh.ui.reset.sizing();
			sh.ui.reset.positioning();
		});

		//FACEBOOK LOGIN
		$('#profile-container').on('click', '#fb-btn-signin', function(e) {
			console.log('facebook button submit');
			e.preventDefault();
			promptLogin();
		});
		//SIGN IN SUBMIT
		$('#profile-container').on('click', '#signin-submit', function(e) {
			e.preventDefault();
			sh.user.loginSubmit();
		});
		//SIGN OUT SUBMIT
		$('#profile-container').on('click', '#signout-submit', function(e) {
			e.preventDefault();
			sh.user.logoutSubmit();
		});

		//CONNECT WITH FACEBOOk
		$('#all-container').on('click', '#fb-btn-join', function(e) {
			promptLogin(function() {

				console.log('facebook join complete');

				var fbUser = JSON.parse(window.localStorage["facebookUser"]);

				var userName = fbUser.id;
				var email = '';
				var password = '';

				var user = {
					name: userName,
					mail: userName,
					pass: password
				};

				if (window.plugins !== undefined) {
					window.plugins.drupal.userSave(user, function() {
						alert('new user created');
					}, function() {
						alert('new user failed');
					});
				}
			});
		});

		//CREATE ACCOUNT
		$('#all-container').on('click', '#create-account-submit', function(e) {
			e.preventDefault();
			sh.user.createSubmit();
		});

	}
};

// ==========================================================================
//   SYSTEM
//   ========================================================================== 
sh.system = {
	connect: function(success, failed) {
		// Define the URL to register this user
		var url = sh.config.drupal.resturl + "system/connect";
		console.log(url);

		// Use $.ajax to POST the new user
		$.ajax({
			type: "POST",
			url: url,
			dataType: "json",
			contentType: "application/json",
			// On success we pass the response as res
			success: function(res) {
				success();
			},
			error: function(jqXHR, textStatus, errorThrown) {
				failed();
			}
		});

	},
	//do we use these?
	successCallback: function() {
		console.log('success');
	},

	failureCallback: function() {
		console.log('failed');
	},

	nodeSuccessCallback: function(result) {
		var nodes = result.nodes;
		for (var i = 0; i < nodes.length; i++) {
			var html = "<li data-nid='" + nodes[i].nid + "'><img src='" + nodes[i].logo + "' />" + nodes[i].title + "</li>";
			$(html).appendTo('#home-items');
		}
		sh.ui.reset.sizing();
	}

};

// ==========================================================================
//   USER
//   ========================================================================== 

sh.user = {

	//GET
	get: function() {
		console.log('getting user from local storage');
		if (window.localStorage.length !== 0 && window.localStorage['user'] !== null) {
			var currentUser = null;

			try {
				JSON.parse(window.localStorage['user']);
				return currentUser;
			} catch (err) {
				return null;
			}
		}
		return null;
	},

	//CREATE USER
	createSubmit: function() {
		console.log('creating new user');
		var userName = $("#join-username").val();
		var password = $("#join-password").val();
		var firstName = $("#join-first").val();
		var lastName = $("#join-first").val();
		var zipCode = $("#join-zip").val();

		sh.user.create(userName, password, firstName, lastName, zipCode, function() {
			console.log('login user complete');
			sh.content.update.profile();
		}, function() {
			alert('Unable to Create Account');
		});
	},

	//CREATE
	create: function(userName, password, firstName, lastName, zipCode, success, failed) {
		var newUser = {
			"name": userName,
			"pass": password,
			"mail": userName,
			"field_firstname": {
				"und": [{
					"value": firstName
				}]
			},
			"field_lastname": {
				"und": [{
					"value": lastName
				}]
			},
			"field_zipcode": {
				"und": [{
					"value": zipCode
				}]
			}
		};

		console.log(newUser);

		// Define the URL to register this user
		var url = sh.config.drupal.resturl + "user/register.json";
		console.log(url);

		// Use $.ajax to POST the new user
		$.ajax({
			type: "POST",
			url: url,
			dataType: "json",
			data: JSON.stringify(newUser),
			contentType: "application/json",

			success: function(res) {
				console.log('account created');
				window.localStorage["user"] = JSON.stringify(res);
				success();


			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.log('Error Occured ' + textStatus);
				failed();
			}
		});

	},

	loginSubmit: function() {
		var userName = $("#signin-username").val();
		var password = $("#signin-password").val();

		sh.user.login(userName, password, function() {
			console.log('signin user complete');
			sh.content.update.profile();
		}, function() {
			alert('Unable to login');
		});
	},
	//LOGIN
	login: function(userName, password, success, failed) {

		var user = {
			username: userName,
			password: password
		};

		var url = sh.config.drupal.resturl + 'user/login';

		$.ajax({
			type: "POST",
			url: url,
			dataType: "json",
			data: JSON.stringify(user),
			contentType: "application/json",

			success: function(res) {
				console.log('account logged in');
				console.log(res);
				window.localStorage["user"] = JSON.stringify(res);
				success();
			},

			error: function(jqXHR, textStatus, errorThrown) {
				console.log('Error Occured ' + textStatus);
				failed();
			}
		});
	},
	//LOGOUT SUBMIT

	logoutSubmit: function() {
		sh.user.logout(function() {
			console.log("signout complete");
			sh.content.update.profile();
		}, function() {
			console.log("signout failed");
			sh.content.update.profile();
		});
	},
	//LOGOUT
	logout: function(success, failed) {
		var url = sh.config.drupal.resturl + 'user/login';

		$.ajax({
			type: "POST",
			url: url,
			dataType: "json",
			data: JSON.stringify(user),
			contentType: "application/json",
			// On success we pass the response as res
			success: function() {
				console.log('account logged out');
				window.localStorage.removeItem("user");

				success();
			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.log('Error Occured ' + textStatus);
				window.localStorage.removeItem("user");
				failed();
			}
		});
	},
	//FACEBOOK
	fb: {


		loggedIn: function(callback) {
			console.log('facebook user logged in');

			var fbUser = JSON.parse(window.localStorage["facebookUser"]);
			console.log(fbUser);

			if (fbUser !== null) {
				loginUser(fbUser.id, '', function(result) {
					console.log('drupal login complete');

					window.localStorage["user"] = JSON.stringify(result);
					console.log('login success');

				}, function() {
					console.log('login failed');
				});
				callback();
			} else {
				callback();
			}
		},

		joined: function(callback) {

			var fbUser = JSON.parse(window.localStorage["facebookUser"]);

			var userName = fbUser.id;
			var email = 'null-randomstring@localhost.com';
			var password = 'password';

			var user = {
				name: userName,
				mail: email,
				pass: password
			};

			if (window.plugins !== undefined) {
				window.plugins.drupal.userSave(user, function() {
					alert('new user created');
				}, function() {
					alert('new user failed');
				});
			}
			callback();
		}
	}
};



// ==========================================================================
//   UTILITIES
//   ========================================================================== 
sh.utils = {
	transitionEnd: 'webkitTransitionEnd',
	whichTransitionEvent: function() {
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
};

// ==========================================================================
//   USER INTERFACE
//   ========================================================================== 
sh.ui = {
	//UI SET UP
	setup: {
		footerHeight: 48,
		headerHeight: 47
	},
	//VIEWPORT
	viewport: {
		width: $(window).width(),
		height: $(window).height(),
		panelwidth: $('#all-container').width()
	},

	//CONTAINERS
	container: {
		//PROFILE
		profile: {
			open: function() {
				sh.content.update.profile();
				$('#tab-container').animate({
					left: (sh.ui.viewport.panelwidth - 48) + "px",
					useTranslate3d: true,
					leaveTransforms: false
				}, 260, function() {
					$('#profile-link').removeClass("unslid").addClass("slid");
					$('#tab-container').addClass("slid-right");
					$('#profile-closer').css("display", "block");
					$('#all-container').on('touchstart', '#profile-closer', sh.ui.slide.slideStart);
					$('#all-container').on('touchmove', '#profile-closer', sh.ui.slide.slide);
					sh.ui.reset.sizing();
					sh.ui.reset.positioning();
				});
			},
			close: function() {
				//CLOSE PROFILE
				$('#tab-container').animate({
					left: "0px",
					useTranslate3d: true,
					leaveTransforms: false
				}, 260, function() {
					$('#tab-container').removeClass("slid-right");
					$('#profile-link').removeClass("slid").addClass("unslid");
					$('#all-container').off('touchstart', '#profile-closer', sh.ui.slide.slideStart);
					$('#all-container').off('touchmove', '#profile-closer', sh.ui.slide.slide);
					$('#profile-closer').css("display", "none");
					sh.ui.reset.sizing();
					sh.ui.reset.positioning();
				});
			}
		}

	},
	//DETAILS
	detail: {

		load: function(template, content) {

			//PREPARE DETAIL VIEW
			var source = $("#" + template).html();
			var template = Handlebars.compile(source);
			var data = content;
			var detailview = template(data);

			//APPEND TO CONTAINER
			$('#detail-container').append(detailview);
			var viewToLoad = $('.detail-view#' + content.DetailID);

			//CHECK IF DETAIL CONTAINER IS ACTIVE AND SLIDE IN IF NOT
			if ($('#detail-container').hasClass('active')) {
				slideInDetailView();
			} else {
				slideInDetailContainer();
			}

			function slideInDetailContainer() {

				//SHOW AND POSITION DETAIL CONTAINER AND VIEW
				$('#detail-container').css('display', 'block');
				$('#detail-container').css('left', sh.ui.viewport.panelwidth + 'px');
				$('.detail-view#' + content.DetailID).css('display', 'block');
				$('.detail-view#' + content.DetailID).css('left', '0px');
				sh.ui.reset.sizing();

				//ADD FIRST CLASS TO DETAIL VIEW
				$('.detail-view#' + content.DetailID).addClass('first').addClass('active-dt');

				//SLIDE OUT TAB CONTAINER
				$('#tab-container').animate({
					left: -sh.ui.viewport.panelwidth + "px",
					useTranslate3d: true,
					leaveTransforms: false
				}, 300, function() {

				});

				//SLIDE IN DETAIL CONTAINER
				$('#detail-container').animate({
					left: "0px",
					useTranslate3d: true,
					leaveTransforms: false
				}, 260, function() {
					$('#detail-container').addClass('active');
				});

			}

			function slideInDetailView() {

				//SHOW AND POSITION DETAIL VIEW
				$('.detail-view#' + content.DetailID).css('display', 'block');
				$('.detail-view#' + content.DetailID).css('left', sh.ui.viewport.panelwidth + 'px');
				sh.ui.reset.sizing();

				$('.detail-view.active-dt').animate({
					left: -sh.ui.viewport.panelwidth + "px",
					useTranslate3d: true,
					leaveTransforms: false
				}, 300, function() {
					$('.detail-view.active-dt').removeClass('active-dt');
					$('.detail-view#' + content.DetailID).addClass('active-dt');
				});

				$('.detail-view#' + content.DetailID).animate({
					left: "0px",
					useTranslate3d: true,
					leaveTransforms: false
				}, 260, function() {

				});
			}


		},

		//BACK
		back: function() {

			var depth = parseInt($('.detail-view.active-dt').attr('depth'));
			var nextBack = depth - 1;
			var loadUp = $('#detail-container').find("[depth='" + nextBack + "']");

			if (nextBack === 0) {

				$('#tab-container').animate({
					left: "0px",
					useTranslate3d: true,
					leaveTransforms: false
				}, 260, function() {

				});

				$('#detail-container').animate({
					left: sh.ui.viewport.panelwidth + "px",
					useTranslate3d: true
				}, 400, function() {
					$('#detail-container').empty();
					$('#detail-container').removeClass('active');
				});


			} else {

				loadUp.css('left', -sh.ui.viewport.panelwidth + 'px');
				loadUp.css('opacity', '1');

				loadUp.animate({
					left: "0px",
					useTranslate3d: true,
					leaveTransforms: false
				}, 260, function() {

				});



				$('.detail-view.active-dt').animate({
					left: sh.ui.viewport.panelwidth + "px",
					useTranslate3d: true
				}, 400, function() {
					$('.detail-view.active-dt').remove();
					loadUp.addClass('active-dt');
				});

			}
		}
	},
	//MODALS
	modal: {
		create: function(modalName) {
			var source = $("#modal-template").html();
			var template = Handlebars.compile(source);
			var data = modalName;
			var modal = template(data);
			$('#all-container').append(modal);
			sh.ui.reset.sizing();
			sh.ui.reset.positioning();
			$('.modal-container#modal-' + modalName.PageID).css('top', (sh.ui.viewport.height + 40) + 'px');
			$('.modal-container#modal-' + modalName.PageID).css('display', 'block');
			$('.modal-container').removeClass("active");
			$('.modal-container#modal-' + modalName.PageID).addClass("active");
			$('.modal-container#modal-' + modalName.PageID).addClass("slid-up");
			$('.modal-container#modal-' + modalName.PageID).animate({
				top: "0px",
				useTranslate3d: true,
				leaveTransforms: false
			}, 300, function() {

			});

		},
		close: function() {
			$('.modal-container.active').removeClass("slid-up");
			$('.modal-container.active').animate({
				top: (sh.ui.viewport.height + 40) + 'px',
				useTranslate3d: true,
				leaveTransforms: false
			}, 300, function() {
				$('.modal-container.active').remove();
				$('#all-container .modal-container').last().addClass("active");
			});
		}
	},
	//PAGES
	page: {
		//CHANGE PAGE
		change: function(tabNum) {
			var toPage = $("#pages").find("[tabpanel='" + tabNum + "']");
			var fromPage = $("#pages .current");
			if (toPage.hasClass("current")) {
				return;
			} else if (toPage === fromPage) {
				//attempt to fix odd bug where nothing is current
				$("#pages div.page.current").removeClass("current");
				$("#pages div.page").css("display", "none"); //hide all
				toPage.addClass("current");
				toPage.css("display", "block");
				return;
			} else {

				fromPage.removeClass("current");
				$("#pages div.page").css("display", "none"); //hide all
				toPage.show(0);
				toPage.addClass("current");
				console.log('showed new tab');

			}

		},
		load: function(pageName) {

		}
	},

	//SCROLL
	scroll: {
		my: null,
		news: null,
		events: null,
		home: null,
		action: null,
		bundles: null,
		pullDownEl: null,
		pullDownOffset: null,
		generatedCount: 0,

		//SCROLL FUNCTIONS
		//PULL TO REFRESH (CURRENT)
		pullDownAction: function(pageName) {
			var el, li, i;
			
			el = document.getElementById(pageName + '-list');;

			for (i = 0; i < 3; i++) {
				li = document.createElement('li');
				li.innerText = 'New Item ' + (++sh.ui.scroll.generatedCount);
				el.insertBefore(li, el.childNodes[0]);
			}
			sh.ui.scroll.reset(pageName);
		},

		//RESET
		reset: function(page) {
			setTimeout(function() {
				if (page == "home") {
					sh.ui.scroll.pullDownEl = document.getElementById('pull-home');
					sh.ui.scroll.pullDownOffset = sh.ui.scroll.pullDownEl.offsetHeight;
					if (sh.ui.scroll.home !== null) {
						sh.ui.scroll.home.refresh();
					} else {
						sh.ui.scroll.home = new iScroll('home-scroller', {
							hideScrollbar: true,
							scrollbarClass: 'myScrollbar',
							useTransition: true,
							topOffset: sh.ui.scroll.pullDownOffset,
							onRefresh: function() {
								if (sh.ui.scroll.pullDownEl.className.match('loading')) {
									sh.ui.scroll.pullDownEl.className = '';
									sh.ui.scroll.pullDownEl.className += ' pullDown';
									sh.ui.scroll.pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Pull down to refresh...';
								}
							},
							onScrollMove: function() {
								if (this.y > 5 && !sh.ui.scroll.pullDownEl.className.match('flip')) {
									sh.ui.scroll.pullDownEl.className = 'flip';
									sh.ui.scroll.pullDownEl.className += ' pullDown';
									sh.ui.scroll.pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Release to refresh...';
									this.minScrollY = 0;
								} else if (this.y < 5 && sh.ui.scroll.pullDownEl.className.match('flip')) {
									sh.ui.scroll.pullDownEl.className = '';
									sh.ui.scroll.pullDownEl.className += ' pullDown';
									sh.ui.scroll.pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Pull down to refresh...';
									this.minScrollY = -sh.ui.scroll.pullDownOffset;
								}
							},
							onScrollEnd: function() {
								if (sh.ui.scroll.pullDownEl.className.match('flip')) {
									sh.ui.scroll.pullDownEl.className = 'loading';
									sh.ui.scroll.pullDownEl.className += 'pullDown';
									sh.ui.scroll.pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Loading...';
									sh.ui.scroll.pullDownAction('home'); 
								}
							}
						});

					}
			} else if (page == "news") {
				sh.ui.scroll.pullDownEl = document.getElementById('pull-news');
				sh.ui.scroll.pullDownOffset = sh.ui.scroll.pullDownEl.offsetHeight;
				if (sh.ui.scroll.news !== null) {
					sh.ui.scroll.news.refresh();
				} else {
					sh.ui.scroll.news = new iScroll('news-scroller', {
							hideScrollbar: true,
							scrollbarClass: 'myScrollbar',
							useTransition: true,
							topOffset: sh.ui.scroll.pullDownOffset,
							onRefresh: function() {
								if (sh.ui.scroll.pullDownEl.className.match('loading')) {
									sh.ui.scroll.pullDownEl.className = '';
									sh.ui.scroll.pullDownEl.className += ' pullDown';
									sh.ui.scroll.pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Pull down to refresh...';
								}
							},
							onScrollMove: function() {
								if (this.y > 5 && !sh.ui.scroll.pullDownEl.className.match('flip')) {
									sh.ui.scroll.pullDownEl.className = 'flip';
									sh.ui.scroll.pullDownEl.className += ' pullDown';
									sh.ui.scroll.pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Release to refresh...';
									this.minScrollY = 0;
								} else if (this.y < 5 && sh.ui.scroll.pullDownEl.className.match('flip')) {
									sh.ui.scroll.pullDownEl.className = '';
									sh.ui.scroll.pullDownEl.className += ' pullDown';
									sh.ui.scroll.pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Pull down to refresh...';
									this.minScrollY = -sh.ui.scroll.pullDownOffset;
								}
							},
							onScrollEnd: function() {
								if (sh.ui.scroll.pullDownEl.className.match('flip')) {
									sh.ui.scroll.pullDownEl.className = 'loading';
									sh.ui.scroll.pullDownEl.className += 'pullDown';
									sh.ui.scroll.pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Loading...';
									sh.ui.scroll.pullDownAction('news'); 
								}
							}
						});

				}
			} else if (page == "events") {
			sh.ui.scroll.pullDownEl = document.getElementById('pull-events');
			sh.ui.scroll.pullDownOffset = sh.ui.scroll.pullDownEl.offsetHeight;
			
				if (sh.ui.scroll.events !== null) {
					sh.ui.scroll.events.refresh();
				} else {
					sh.ui.scroll.events = new iScroll('events-scroller', {
							hideScrollbar: true,
							scrollbarClass: 'myScrollbar',
							useTransition: true,
							topOffset: sh.ui.scroll.pullDownOffset,
							onRefresh: function() {
								if (sh.ui.scroll.pullDownEl.className.match('loading')) {
									sh.ui.scroll.pullDownEl.className = '';
									sh.ui.scroll.pullDownEl.className += ' pullDown';
									sh.ui.scroll.pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Pull down to refresh...';
								}
							},
							onScrollMove: function() {
								if (this.y > 5 && !sh.ui.scroll.pullDownEl.className.match('flip')) {
									sh.ui.scroll.pullDownEl.className = 'flip';
									sh.ui.scroll.pullDownEl.className += ' pullDown';
									sh.ui.scroll.pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Release to refresh...';
									this.minScrollY = 0;
								} else if (this.y < 5 && sh.ui.scroll.pullDownEl.className.match('flip')) {
									sh.ui.scroll.pullDownEl.className = '';
									sh.ui.scroll.pullDownEl.className += ' pullDown';
									sh.ui.scroll.pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Pull down to refresh...';
									this.minScrollY = -sh.ui.scroll.pullDownOffset;
								}
							},
							onScrollEnd: function() {
								if (sh.ui.scroll.pullDownEl.className.match('flip')) {
									sh.ui.scroll.pullDownEl.className = 'loading';
									sh.ui.scroll.pullDownEl.className += 'pullDown';
									sh.ui.scroll.pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Loading...';
									sh.ui.scroll.pullDownAction('events'); 
								}
							}
						});
			
				}
			} else if (page == "action") {
			
			sh.ui.scroll.pullDownEl = document.getElementById('pull-action');
			sh.ui.scroll.pullDownOffset = sh.ui.scroll.pullDownEl.offsetHeight;
			
				if (sh.ui.scroll.action !== null) {
					sh.ui.scroll.action.refresh();
				} else {
					sh.ui.scroll.action = new iScroll('action-scroller', {
							hideScrollbar: true,
							scrollbarClass: 'myScrollbar',
							useTransition: true,
							topOffset: sh.ui.scroll.pullDownOffset,
							onRefresh: function() {
								if (sh.ui.scroll.pullDownEl.className.match('loading')) {
									sh.ui.scroll.pullDownEl.className = '';
									sh.ui.scroll.pullDownEl.className += ' pullDown';
									sh.ui.scroll.pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Pull down to refresh...';
								}
							},
							onScrollMove: function() {
								if (this.y > 5 && !sh.ui.scroll.pullDownEl.className.match('flip')) {
									sh.ui.scroll.pullDownEl.className = 'flip';
									sh.ui.scroll.pullDownEl.className += ' pullDown';
									sh.ui.scroll.pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Release to refresh...';
									this.minScrollY = 0;
								} else if (this.y < 5 && sh.ui.scroll.pullDownEl.className.match('flip')) {
									sh.ui.scroll.pullDownEl.className = '';
									sh.ui.scroll.pullDownEl.className += ' pullDown';
									sh.ui.scroll.pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Pull down to refresh...';
									this.minScrollY = -sh.ui.scroll.pullDownOffset;
								}
							},
							onScrollEnd: function() {
								if (sh.ui.scroll.pullDownEl.className.match('flip')) {
									sh.ui.scroll.pullDownEl.className = 'loading';
									sh.ui.scroll.pullDownEl.className += 'pullDown';
									sh.ui.scroll.pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Loading...';
									sh.ui.scroll.pullDownAction('action'); 
								}
							}
						});
					
				}
			} else if (page == "bundles") {
			sh.ui.scroll.pullDownEl = document.getElementById('pull-bundles');
			sh.ui.scroll.pullDownOffset = sh.ui.scroll.pullDownEl.offsetHeight;
					
				if (sh.ui.scroll.bundles !== null) {
					sh.ui.scroll.bundles.refresh();
				} else {
					sh.ui.scroll.bundles = new iScroll('bundles-scroller', {
							hideScrollbar: true,
							scrollbarClass: 'myScrollbar',
							useTransition: true,
							topOffset: sh.ui.scroll.pullDownOffset,
							onRefresh: function() {
								if (sh.ui.scroll.pullDownEl.className.match('loading')) {
									sh.ui.scroll.pullDownEl.className = '';
									sh.ui.scroll.pullDownEl.className += ' pullDown';
									sh.ui.scroll.pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Pull down to refresh...';
								}
							},
							onScrollMove: function() {
								if (this.y > 5 && !sh.ui.scroll.pullDownEl.className.match('flip')) {
									sh.ui.scroll.pullDownEl.className = 'flip';
									sh.ui.scroll.pullDownEl.className += ' pullDown';
									sh.ui.scroll.pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Release to refresh...';
									this.minScrollY = 0;
								} else if (this.y < 5 && sh.ui.scroll.pullDownEl.className.match('flip')) {
									sh.ui.scroll.pullDownEl.className = '';
									sh.ui.scroll.pullDownEl.className += ' pullDown';
									sh.ui.scroll.pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Pull down to refresh...';
									this.minScrollY = -sh.ui.scroll.pullDownOffset;
								}
							},
							onScrollEnd: function() {
								if (sh.ui.scroll.pullDownEl.className.match('flip')) {
									sh.ui.scroll.pullDownEl.className = 'loading';
									sh.ui.scroll.pullDownEl.className += 'pullDown';
									sh.ui.scroll.pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Loading...';
									sh.ui.scroll.pullDownAction('bundles'); 
								}
							}
						});
				}
			} else {

			}
			}, 10);
	}
},

//SLIDE
slide: {
	sliding: 0,
	startClientX: 0,
	startPixelOffset: 0,
	pixelOffset: 0,

	//SLIDE FUNCTIONS
	slideStart: function(e) {
		if (e.originalEvent.touches) {
			e = e.originalEvent.touches[0];
		}
		if (sliding === 0) {
			sliding = 1;
			startClientX = e.clientX;
		}
	},

	slide: function(e) {
		e.preventDefault();
		if (e.originalEvent.touches) {
			e = e.originalEvent.touches[0];
		}
		var deltaSlide = e.clientX - startClientX;

		if (sliding == 1 && deltaSlide !== 0) {
			sliding = 2;
		}

		if (sliding == 2) {
			if (deltaSlide < 0) {
				sh.ui.container.profile.close();
				sliding = 0;
			}

		}
	}
},

//RESETTERS
reset: {
	sizing: function() {
		$('#profile-container').css('width', (sh.ui.viewport.panelwidth - 48) + 'px');
		$('#pages > div.page').css('width', sh.ui.viewport.panelwidth + 'px');
		$('.container').css('height', sh.ui.viewport.height + 'px');
		$('#wrapper').css('height', (sh.ui.viewport.height - (sh.ui.setup.footerHeight + sh.ui.setup.headerHeight) + 'px'));
		$('.scroller.wf').css('height', (sh.ui.viewport.height - (sh.ui.setup.footerHeight + sh.ui.setup.headerHeight) + 'px'));
		$('#main-content').css('height', $('#pages > div.page.current').height() + 'px');
		$('div.page').css('min-height', sh.ui.viewport.height + 'px');
	},

	viewport: function() {
		sh.ui.viewport.height = $(window).height();
		sh.ui.viewport.width = $(window).width();
		sh.ui.viewport.panelwidth = $('#all-container').width();
	},

	positioning: function() {
		$('body, html').css('top', '0px');
		$('.container').css('top', '0px');
		$('.container.slid-right').css("left", (sh.ui.viewport.panelwidth - 48) + "px");
		$('.modal-container.slid-up').css("top", "0px");
	}

}

};

// ==========================================================================
//   CONTENT
//   ========================================================================== 
sh.content = {
	//UPDATE
	update: {

		//PROFILE
		profile: function() {
			$('#profile-container').empty();
			var user = sh.user.get();
			var source = $('#profile-template').html();
			var template = Handlebars.compile(source);
			var data = sh.content.tmpl.youContentAnon;
			if (user !== null) {
				data = sh.content.tmpl.youContentAuth;
			}
			var content = template(data);
			$('#profile-container').append(content);
			sh.ui.reset.positioning();
			sh.ui.reset.sizing();
		},
		//PAGE (TAB BAR)
		page: function(pageName) {

			sh.ui.scroll.pullDownEl = $('.page.current .pullDown');
			sh.ui.scroll.pullDownOffset = sh.ui.scroll.pullDownEl.offsetHeight;

			document.addEventListener('touchmove', function(e) {
				e.preventDefault();
			}, false);

			if ($('#' + pageName + ' ul.main-list li').length === 0) {

				var url = sh.config.drupal.resturl + pageName;

				// Use $.ajax to POST the new user
				$.ajax({
					type: "GET",
					url: url,
					dataType: "json",
					data: JSON.stringify(user),
					contentType: "application/json",
					// On success we pass the response as res
					success: function(result) {
						console.log(result);
						var source = $('#' + pageName + 'item-template').html();
						var template = Handlebars.compile(source);
						var data = {
							nodes: result
						};
						var item = template(data);
						$('#' + pageName + ' ul').append(item);

						//directly inputting success for now
						sh.content.hideLoader(pageName);
						sh.ui.reset.sizing();
						sh.ui.scroll.reset(pageName);

					},
					error: function(jqXHR, textStatus, errorThrown) {
						console.log('Error Occured ' + textStatus);
						sh.content.hideLoader(pageName);
						sh.ui.reset.sizing();
						sh.ui.scroll.reset(pageName);
					}
				});

			} else {
				sh.content.hideLoader(pageName);
				sh.ui.reset.sizing();
				sh.ui.scroll.reset(pageName);
			}
		}
	},
	//show loader
	showLoader: function(pageName) {
		$('#' + pageName + ' .loader').css('display', 'block');
		$('#' + pageName + ' .loader').css('opacity', '1.0');
		$('#' + pageName + ' .loader').css("height", '50px');
	},
	hideLoader: function(pageName) {
		$('#' + pageName + ' .loader').css('opacity', '0');
		$('#' + pageName + ' .loader').css("height", '0px');
	},
	tmpl: {
		aboutModal: {
			ModalID: "modal-about",
			PageID: "about",
			PageHeading: "About",
			PageTitle: "The About Page",
			PageContent: '<p>Lorem ipsum dolor sit amet, sed inermis persequeris deterruisset eu, ei quod solet commodo quo. Cum an bonorum nominavi voluptua, has at hinc audiam. Eirmod reformidans mea ei, has cetero eligendi ullamcorper et. Eu nibh prima eum, quem hinc splendide eu vel. Graeco percipit prodesset mei et, ex duo vide omnis. Nulla postulant imperdiet per et, sanctus graecis honestatis duo et, ei pro eripuit apeirian.</p>'
		},

		createSomethingModal: {
			ModalID: "modal-create",
			PageID: "create",
			PageHeading: "Create",
			PageTitle: "Create",
			PageContent: '<p>Here you can create something, I believe.</p><div id="create-buttons-holder"><button type="button" id="poll-button" class="rb-btn blue">+ Create Poll</button><button type="button" id="petition-button" class="rb-btn blue">+ Create Petition</button><button type="button" id="campaign-button" class="rb-btn blue">+ Create Campaign</button><button type="button" id="bundle-button" class="rb-btn blue">+ Create Bundle</button></div>'
		},

		createAccountModal: {
			ModalID: "modal-create-account",
			PageID: "create-account",
			PageHeading: "Create Account",
			PageTitle: "Create a Mobylyze Account",
			PageContent: '<div class="fb-button"><button type="button" id="fb-btn-join" class="rb-btn fb">Connect with Facebook</button></div><div class="or"> - &nbsp;OR&nbsp; -</div><div id="join-form"><form id="the-join-form" name="join-form"><div class="field-grouper"><input type="text" id="join-first" class="required" placeholder="First Name" name="FirstName"><input type="text" id="join-last" class="required" placeholder="Last Name" name="LastName"><input type="email" id="join-username" class="required" placeholder="Email Address" name="Email"><input type="text" id="join-zip" class="required" placeholder="Zip Code" name="ZipCode"><input type="password" id="join-password" class="required" placeholder="Password" name="Password"></div><button type="button" id="create-account-submit" class="rb-btn red">Create Account</button></form></div><div id="main-body-sub-links"></div>'
		},
		testDetail: {
			DetailID: "details-test",
			PageID: "details",
			Depth: "1",
			PageHeading: "Item Details",
			PageContent: '<ul id="test-list" depth="1"><li>Some Stuff</li><li>More Stuff</li><li>Big Stuff</li><li>Small Stuff</li><li>Geek Stuff</li><li>Nerd Stuff</li><li>Fast Stuff</li></ul>'
		},
		testDetail2: {
			DetailID: "details-test-2",
			PageID: "details",
			Depth: "2",
			PageHeading: "Item Details 2",
			PageContent: '<ul id="test-list" depth="2"><li>Some Stuff</li><li>More Stuff</li><li>Big Stuff</li><li>Small Stuff</li><li>Geek Stuff</li><li>Nerd Stuff</li><li>Fast Stuff</li></ul>'
		},
		testDetail3: {
			DetailID: "details-test-3",
			PageID: "details",
			Depth: "3",
			PageHeading: "Item Details 3",
			PageContent: '<ul id="test-list" depth="3"><li>Some Stuff</li><li>More Stuff</li><li>Big Stuff</li><li>Small Stuff</li><li>Geek Stuff</li><li>Nerd Stuff</li><li>Fast Stuff</li></ul>'
		},
		testDetail4: {
			DetailID: "details-test-4",
			PageID: "details",
			Depth: "4",
			PageHeading: "Item Details 4",
			PageContent: '<ul id="test-list" depth="4"><li>Some Stuff</li><li>More Stuff</li><li>Big Stuff</li><li>Small Stuff</li><li>Geek Stuff</li><li>Nerd Stuff</li><li>Fast Stuff</li></ul>'
		},
		youContentAnon: {
			PageID: "page-anonymous",
			PageHeading: "Log In",
			ContentID: "you-content-anon",
			PageContent: '<div class="fb-button"><button type="button" id="fb-btn-signin" class="rb-btn fb">Connect with Facebook</button></div><div class="or"> - &nbsp;OR&nbsp; -</div><div id="signin-form"><div class="field-grouper"><input type="email" id="signin-username" class="required" placeholder="Email Address" name="Email"><input type="password" id="signin-password" class="required" placeholder="Password" name="Password"></div><button type="button" id="signin-submit" class="rb-btn red">Log In</button></div><br><div id="main-body-sub-links">Don\'t have an account? <a id="btn-create-account" href="#" data-ajax="false">Create One Now</a></p></div>'
		},
		youContentAuth: {
			PageID: "page-authenticated",
			PageHeading: "You",
			ContentID: "you-content-anon",
			PageContent: '<button type="button" id="user-profile-button" class="rb-btn blue">Profile</button><button type="button" id="user-network-button" class="rb-btn blue">Network</button><button type="submit" id="user-actions-button" class="rb-btn blue">Actions</button><button type="submit" id="user-events-button" class="rb-btn blue">Events</button><button type="submit" id="user-bundles-button" class="rb-btn blue">Bundles</button><button type="button" id="signout-submit" class="rb-btn orange">Sign Out</button>'
		}
	}
};



// ==========================================================================
//   NAMESPACE END
//   ========================================================================== 


//ANOTHER NEW SHOW BINDING
(function($) {
	var _oldShow = $.fn.show;

	$.fn.show = function( /*speed, easing, callback*/ ) {
		var argsArray = Array.prototype.slice.call(arguments),
			duration = argsArray[0],
			easing, callback, callbackArgIndex;

		// jQuery recursively calls show sometimes; we shouldn't
		//  handle such situations. Pass it to original show method.
		if (!this.selector) {
			_oldShow.apply(this, argsArray);
			return this;
		}

		if (argsArray.length === 2) {
			if ($.isFunction(argsArray[1])) {
				callback = argsArray[1];
				callbackArgIndex = 1;
			} else {
				easing = argsArray[1];
			}
		} else if (argsArray.length === 3) {
			easing = argsArray[1];
			callback = argsArray[2];
			callbackArgIndex = 2;
		}

		return $(this).each(function() {
			var obj = $(this),
				oldCallback = callback,
				newCallback = function() {
					if ($.isFunction(oldCallback)) {
						oldCallback.apply(obj);
					}

					obj.trigger('afterShow');
				};

			if (callback) {
				argsArray[callbackArgIndex] = newCallback;
			} else {
				argsArray.push(newCallback);
			}

			obj.trigger('beforeShow');

			_oldShow.apply(obj, argsArray);
		});
	};
})(jQuery);