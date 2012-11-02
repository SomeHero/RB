
//GLOBAL VARS
var viewport = {
    width  : $(window).width(),
    height : $(window).height(),
	panelwidth : $('#all-container').width()
};
var myScroll;
var youScroll;

var aboutModal = {ModalID: "modal-about", PageID: "about", PageHeading: "About", PageTitle: "The About Page", PageContent: "<p>Lorem ipsum dolor sit amet, sed inermis persequeris deterruisset eu, ei quod solet commodo quo. Cum an bonorum nominavi voluptua, has at hinc audiam. Eirmod reformidans mea ei, has cetero eligendi ullamcorper et. Eu nibh prima eum, quem hinc splendide eu vel. Graeco percipit prodesset mei et, ex duo vide omnis. Nulla postulant imperdiet per et, sanctus graecis honestatis duo et, ei pro eripuit apeirian.</p>"};


//GLOBAL FUNCTIONS		
function resetSizing(){
$('#profile-container').css('width', (viewport.panelwidth  - 48) + 'px');
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
//APP-UI JUNK END
		


//ON READY		
$(document).ready(function(){
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
				
});

