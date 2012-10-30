/*
 * iTabbar
 * Copyright (c) Gino Cote & Pascal Carmoni
 * Dual licensed under the MIT or GPL Version 2 licenses.
 */
var count = $("#tabbar li").length;
var pourcent = 100 / count;
$("#tabbar li").css("width", pourcent + "%");
//alert(pourcent);

//if ((navigator.standalone) || (!OSName)) {

if((navigator.userAgent.match(/iPhone/i))||(navigator.userAgent.match(/iPod/i))||(navigator.userAgent.match(/iPad/i))){
		
	if (navigator.standalone) {
    //alert ('Running full screen');
    $("#tabbar").css("bottom", "0");
	} else {
    //alert ('Running in a browser No adress bar');
    $("#tabbar").css("bottom", "-60px");
	//$("#wrapper").css("bottom", "0");
	}
} else {
    //alert ('else2 Running in a browser');
    $("#tabbar").css("bottom", "0");
	//$("current #wrapper").css("bottom", "0");
}

//touchstart Jquery/Zepto
$(function() {
    $("#tabbar a").bind('touchstart',function() {
        $("#tabbar a").not(this).removeClass("current");
        $("#tabbar div").not(this).removeClass("current");
    });
});

//touchstart
var links = document.querySelectorAll("#tabbar a"), //All the links on this page
i, //iterator
isTouching = false; //Flag for whether or not the user is currently touching the screen

//Iterate through the links
for(i=0; i<links.length; ++i) {
  links[i].addEventListener("touchstart", onTouchStart); //Listen for the user to start touching
  //if(i==1) continue; //Skip "Item 2" — using as an example for click
  links[i].addEventListener("touchmove", onTouchMove); //Listen for movement
  links[i].addEventListener("touchend", onTouchEnd); //Listen for the user to stop touching
}

/**
 * Fired when an item is being touched.
 */
function onTouchStart(e) {
  var item = e.currentTarget;
  if(isTouching) return;
  e.currentTarget.moved = false;
  console.log("Start: " + e.currentTarget.innerHTML);
  isTouching = true;
  
  //iOS and Android do not redraw the view while they are scrolling.
  //This introduces a problem if the user very quickly swiped his/her finger to scroll.
  //The element would have been given the "active" class (being highlighted) and it would have
  //stayed highlighted even while scrolling (despite not having the active class anymore).
  //To get around that, we create our own very slight delay. Not perfect, nor ideal, but it generally does the job.
  setTimeout(function(){
    if(item.moved===false) { //Make sure the property exists and is false
      item.className = "current";
    }
  },20);
}
/**
 * Fired when the user moves his/her finger.
 * If we detect a move, we're not interested in the "tap" anymore
 */
function onTouchMove(e) {
  console.log("Move: " + e.currentTarget.innerHTML);
  e.currentTarget.moved = true;
  e.currentTarget.className = "";
}
/**
 * Fired when the touch has ended.
 * If e.currentTarget.moved is true, then the user moved his/her finger while
 * touching this item so we "cancel" the tap.
 */
function onTouchEnd(e) {
  var item = e.currentTarget;
  
  console.log("Stop: " + item.innerHTML);
  isTouching = false;
  
  if(!item.moved) { //Show the
    item.className = "current";
  }
  
  //setTimeout(function() {
 //   item.className = "";
 // },1000);

  delete item.moved; //Don't need our flag anymore
}