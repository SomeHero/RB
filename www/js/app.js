var myScroll;
function loaded() {
	setTimeout(function () {
               myScroll = new iScroll('wrapper');
               }, 100);
}
//window.addEventListener('load', loaded, false);

/* Use this for high compatibility (iDevice + Android)*/
document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
document.addEventListener('DOMContentLoaded', setTimeout(function () { loaded(); }, 200), false);
</script>

<script type="text/javascript" charset="utf-8">
if((navigator.userAgent.match(/iPhone/i))||(navigator.userAgent.match(/iPod/i))||(navigator.userAgent.match(/iPad/i))){
	var jQT = new $.jQTouch({
                            //cacheGetRequests: false,
                            icon: 'img/iTab-glossy.png',
                            icon4: 'img/iTab-glossy.png',
                            addGlossToIcon: false,
                            startupScreen: 'img/istartup.png',
                            themeSelectionSelector: '#jqt #themes ul',
                            useFastTouch: true,
                            statusBar: 'default',
                            preloadImages: [
                                            'img/loading.gif',
                                            'img/iTab-glossy.png',
                                            'img/pinstripes2.gif',
                                            'img/UIBack.png',
                                            'img/UIBackPressed.png',
                                            ]
                            });
} else {
	var jQT = new $.jQTouch({
                            //statusBar: 'black-translucent',
                            themeSelectionSelector: '#jqt #themes ul',
                            useFastTouch: false,
                            statusBar: 'default',
                            preloadImages: [
                                            'img/loading.gif',
                                            'img/iTab-glossy.png',
                                            'img/pinstripes2.gif',
                                            'img/UIBack.png',
                                            'img/UIBackPressed.png',
                                            ]
                            });
	//alert('is not iPhone');
}

var mydata = '';

// Main functions:
$(function() {
  
  $('#single').bind('pageAnimationEnd', function(e, info) {
                    
                    if (info.direction == 'in'){
                    //$("#postcat").empty();
                    if (myScroll) {
                    myScroll.destroy();
                    myScroll = null;
                    //alert('destroy iscroll')
                    }
                    
                    if ($('div#' + e.target.id + ' #wrapper').get(0)) {
                    setTimeout(function() {
                               myScroll = new iScroll($('div#' + e.target.id + ' #wrapper').get(0));
                               }, 0);
                    }
                    }
                    
                    }); //pageAnimationEnd
  
  // RSS List
  $('#categories').bind('pageAnimationEnd', function(e, info) {
                        
                        if (info.direction == 'in'){
                        var mydata = '';
                        $("#postcat").empty();
                        $("#rssfeed .toolbar H1").empty(); // Empty H1 header for autotitle
                        if (myScroll) {
                        myScroll.destroy();
                        myScroll = null;
                        //alert('destroy iscroll')
                        }
                        
                        if ($('div#' + e.target.id + ' #wrapper').get(0)) {
                        setTimeout(function() {
                                   myScroll = new iScroll($('div#' + e.target.id + ' #wrapper').get(0));
                                   //alert('New iscroll');
                                   }, 0);
                        }
                        }
                        
                        }); //pageAnimationEnd
  
  $('#home').bind('pageAnimationEnd', function(e, info) {
                  if (myScroll) {
                  myScroll.destroy();
                  myScroll = null;
                  //alert('destroy iscroll')
                  }
                  
                  if ($('div#' + e.target.id + ' #wrapper').get(0)) {
                  setTimeout(function() {
                             myScroll = new iScroll($('div#' + e.target.id + ' #wrapper').get(0));
                             //alert('New iscroll');
                             }, 0);
                  }
                  //alert('New iscroll');
                  }); //pageAnimationEnd
  
  
  $('#twitterlist').bind('pageAnimationEnd', function(e, info) {
                         if (info.direction == 'in'){
                         var mydata = '';
                         $("#tweetappend").empty();
                         $("#tweet .toolbar H1").empty(); // Empty H1 header for autotitle
                         if (myScroll) {
                         myScroll.destroy();
                         myScroll = null;
                         //alert('destroy iscroll')
                         }
                         
                         if ($('div#' + e.target.id + ' #wrapper').get(0)) {
                         setTimeout(function() {
                                    myScroll = new iScroll($('div#' + e.target.id + ' #wrapper').get(0));
                                    //alert('New iscroll');
                                    }, 0);
                         }
                         
                         }
                         }); //pageAnimationEnd
  
  //#flickrlist
  $('#flickrlist').bind('pageAnimationEnd', function(e, info) {
                        if (info.direction == 'in'){
                        var mydata = '';
                        $("#flickrappend").empty();
                        $("#flickr .toolbar H1").empty(); // Empty H1 header for autotitle
                        if (myScroll) {
                        myScroll.destroy();
                        myScroll = null;
                        //alert('destroy iscroll')
                        }
                        
                        if ($('div#' + e.target.id + ' #wrapper').get(0)) {
                        setTimeout(function() {
                                   myScroll = new iScroll($('div#' + e.target.id + ' #wrapper').get(0));
                                   }, 0);
                        }
                        }
                        
                        }); //pageAnimationEnd
  
  $('#youtubelist').bind('pageAnimationEnd', function(e, info) {
                         if (info.direction == 'in'){
                         var mydata = '';
                         $("#youtubeappend").empty();
                         $("#youtube .toolbar H1").empty(); // Empty H1 header for autotitle
                         if (myScroll) {
                         myScroll.destroy();
                         myScroll = null;
                         //alert('destroy iscroll')
                         }
                         
                         if ($('div#' + e.target.id + ' #wrapper').get(0)) {
                         setTimeout(function() {
                                    myScroll = new iScroll($('div#' + e.target.id + ' #wrapper').get(0));
                                    //alert('New iscroll');
                                    }, 0);
                         }
                         }
                         }); //pageAnimationEnd
  
  // RSS Feed
  $('#rssfeed').bind('pageAnimationEnd', function(e, info) {
                     
                     if (info.direction == 'in'){
                     
                     $("#single .toolbar H1").empty(); // Empty H1 header for autotitle
                     
                     if (myScroll) {
                     myScroll.destroy();
                     myScroll = null;
                     }
                     
                     if ($('div#' + e.target.id + ' #wrapper').get(0)) {
                     setTimeout(function() {
                                myScroll = new iScroll($('div#' + e.target.id + ' #wrapper').get(0));
                                //alert('New iscroll'+ e.target.id);
                                }, 0);
                     }
                     }
                     
                     if ((info.direction == 'in') && ($('ul#postcat').is(':empty'))) { //if empty load ajax
                     //$("#postcat").empty();
                     $("#singleappend").empty();
                     
                     showLoading();
                     
                     $.YQL("select * from feed where url='"+mydata+"' limit 10", function (data) {
                           
                           if (myScroll) {
                           myScroll.destroy();
                           myScroll = null;
                           //alert('destroy iscroll')
                           }
                           
                           if ($('div#' + e.target.id + ' #wrapper').get(0)) {
                           setTimeout(function() {
                                      myScroll = new iScroll($('div#' + e.target.id + ' #wrapper').get(0));
                                      //alert('New iscroll');
                                      }, 0);
                           }
                           
                           $.each(data.query.results.item, function (i) {
                                  
                                  var rss_feed = '<li onclick="goto_item('+i+')"id="'+i+'" style="height:88px; overflow:hidden; class="blog-title arrow"><a id="'+i+'" href="#single">';
                                  rss_feed += '<h1>'+this.title+'</h1>';
                                  rss_feed += '<p>' +  strip_tags(this.description, '<p>,<img>,<br>,<a>')+ '</p></a></li>';
                                  
                                  $('#postcat').append(rss_feed);
                                  
                                  
                                  }); //each
                           
                           hideLoading();
                           
                           }); //YQL
                     
                     } //direction in end
                     
                     }); //pageAnimationEnd
  
  
  // Tweet
  $('#tweet').bind('pageAnimationEnd', function(e, info) {
                   
                   if (info.direction == 'in') {
                   
                   showLoading();
                   
                   $.getJSON('https://api.twitter.com/1/statuses/user_timeline.json?include_entities=true&include_rts=true&screen_name=' + mydata + '&count=10&callback=?', function(data) {
                             
                             if (myScroll) {
                             myScroll.destroy();
                             myScroll = null;
                             //alert('destroy iscroll')
                             }
                             
                             if ($('div#' + e.target.id + ' #wrapper').get(0)) {
                             setTimeout(function() {
                                        myScroll = new iScroll($('div#' + e.target.id + ' #wrapper').get(0));
                                        //alert('New iscroll');
                                        }, 0);
                             }
                             
                             content = '<ul class="rounded">';
                             
                             $.each(data, function(i) {
                                    var tweet = ify.clean(this['text']);
                                    var d = new Date(this['created_at']);
                                    var date_show = d.getDate() + '/' + d.getMonth() + '/' + d.getFullYear() + ' ' + d.getHours() + ':' + d.getMinutes();
                                    content += '<li><img src="' + this.user.profile_image_url + '" style="float:left;" width="48" height="48"/><p>' + tweet + '</p> (<date>' + date_show + '</date>)</li>';
                                    }); //each
                             content += '</ul>';
                             $('#tweetappend').html(content);
                             
                             //alert ('data empty');
                             hideLoading();
                             
                             }); // getjson
                   
                   } //direction in end
                   }); //pageAnimationEnd
  
  
  // flickr
  $('#flickr').bind('pageAnimationEnd', function(e, info) {
                    
                    if (info.direction == 'in') {
                    
                    showLoading();
                    
                    $.getJSON('http://api.flickr.com/services/feeds/photos_public.gne?id=' + mydata + '&lang=en-us&format=json&jsoncallback=?', function(data) {
                              
                              if (myScroll) {
                              myScroll.destroy();
                              myScroll = null;
                              //alert('destroy iscroll')
                              }
                              
                              if ($('div#' + e.target.id + ' #wrapper').get(0)) {
                              setTimeout(function() {
                                         myScroll = new iScroll($('div#' + e.target.id + ' #wrapper').get(0));
                                         //alert('New iscroll');
                                         }, 0);
                              }
                              
                              content = '<ul class="edgecontent">';
                              
                              $.each(data.items, function(i) {
                                     
                                     content += '<li><h1>' + this.title + '</h1>';
                                     content += '<p>' + this.description + '</p>';
                                     content += '</li>';
                                     });//each
                              content += '</ul>';
                              $('#flickrappend').append(content);
                              
                              hideLoading();
                              
                              }); // getjson
                    } //direction in end
                    }); //pageAnimationEnd
  
  
  // Youtube
  $('#youtube').bind('pageAnimationEnd', function(e, info) {
                     
                     if (info.direction == 'in') {
                     
                     showLoading();
                     
                     $.getJSON('http://gdata.youtube.com/feeds/api/videos?q=' + mydata + '&alt=json-in-script&callback=?&max-results=1&start-index=1', function(data) {
                               
                               if (myScroll) {
                               myScroll.destroy();
                               myScroll = null;
                               //alert('destroy iscroll')
                               }
                               
                               if ($('div#' + e.target.id + ' #wrapper').get(0)) {
                               setTimeout(function() {
                                          myScroll = new iScroll($('div#' + e.target.id + ' #wrapper').get(0));
                                          //alert('New iscroll');
                                          }, 0);
                               }
                               
                               content = '<ul class="edgecontent">';
                               
                               $.each(data.feed.entry, function(i, item) {
                                      
                                      var title = item['title']['$t'];
                                      var video = item['id']['$t'];
                                      
                                      video = video.replace('http://gdata.youtube.com/feeds/api/videos/', 'http://www.youtube.com/watch?v='); //replacement of link
                                      videoID = video.replace('http://www.youtube.com/watch?v=', ''); // removing link and getting the video ID
                                      content += '<li><h1><a href="' + video + '"> ' + title + '</a></h1><br/><div class="videoWrapper"><iframe width="560" height="315" src="http://www.youtube.com/embed/' + videoID + '" frameborder="0" allowfullscreen></iframe></div></li>';
                                      }); //each
                               content += '</ul>';
                               $('#youtubeappend').html(content);
                               
                               hideLoading();
                               
                               }); // getjson
                     
                     } //direction in end
                     }); //pageAnimationEnd
  
  
  }); //end all function()



//Show search
var visible = false;
function moveDown() {
    if(visible)
    {
        moveUp();
    }
    else
    {
        var height = $(".searchbox").height();
        $(".searchbox").css('-webkit-transform', 'translate3d(0px,+46px,0)');
		//$(".searchbox").show().css('-webkit-transform', 'translate3d(0px,+46px,0)');
		//$('#element').css('z-index');
    }
    visible = !visible;
}
function moveUp() {
    var height = $(".searchbox").height();
    $(".searchbox").css('-webkit-transform', 'translate3d(0px,0px,0)');
	//$(".searchbox").show().css('z-index', '200').css('-webkit-transform', 'translate3d(0px,0px,0)');
}

// if text input field value is not empty show the "X" button
$("#search").keyup(function() {
                   $("#x").show();
                   //if ($.trim($("#search").val()) == "") {
                   if ($("#search").val() == "") {
                   $("#x").hide();
                   }
                   });
// on click of "X", delete input field value and hide "X"
$("#x").click(function() {
              $("#search").val("");
              $(this).hide();
              });

// Strip_Tags http://phpjs.org/functions/strip_tags:535
function strip_tags(input, allowed) {
    
    allowed = (((allowed || "") + "").toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join(''); // making sure the allowed arg is a string containing only tags in lowercase (<a><b><c>)
    var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,
    commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
    return input.replace(commentsAndPhpTags, '').replace(tags, function ($0, $1) {
                                                         return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';
                                                         });
}

//Send ID and Search onclick
function send(x) {
    mydata = x;
	//$("#rssfeed .toolbar H1").empty();
}

function sget(v) {
    s = v;
	$("#postcat").empty();
}

//ajax loading animation
function showLoading() {
    //$("div.container").show();
	$("#loading").show(); // If image gif
}

function hideLoading() {
    //$("div.container").hide();
	$("#loading").hide();  // If image gif
}

//Hack, ajax jsonp search
$("#submit").tap(function(e) { // onclick event to the submit button - .tap or .click.
                 var s = $("#searchid").val(); // get the user-entered search term
                 sget(s)
                 //alert(s);
                 });

function buildiscroll() {
    if (myScroll) {
        myScroll.destroy();
        myScroll = null;
        //alert('destroy iscroll')
    }
    
    if ($('div#' + e.target.id + ' #wrapper').get(0)) {
        setTimeout(function() {
                   myScroll = new iScroll($('div#' + e.target.id + ' #wrapper').get(0));
                   //alert('New iscroll');
                   }, 0);
    }
}

// Copy RSS Feed item
function goto_item(number){
    var t = document.getElementById(number).innerHTML; //done with javascript, doesn't work with jquery code with Zepto
    document.getElementById('singleappend').innerHTML=t;
}