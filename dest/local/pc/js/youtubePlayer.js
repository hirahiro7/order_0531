// pageConstructor
var pageConstructor = (function(){
  var tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
})();

var ytPlayer;

function onYouTubeIframeAPIReady(){
  ytPlayer = new YTPlayer('player','jvJgmfi47uU');
}// youtube callback

function onPlayerReady(e) {
  ytPlayer.playerObj.setPlaybackQuality('highres');
  ytPlayer.playerObj.mute();
  ytPlayer.playerObj.playVideo();
  $(window).bind('resize',function(){
    ytPlayer.windowResize();
  });
}

function onPlayerStateChange(e) {
}

// youtubePlayer object
var YTPlayer = (function(){

  //private

  //constructor
  var _YTPlayer = function(playerid, videoid){
    var setWidth = window.innerWidth;
    var setHeight = window.innerHeight;

    //youtubeの縦横比に合わせる
    if( ( (setWidth/setHeight) > 16/9 ) ){
      setHeight = setWidth * (9/16);
    }else{
      setWidth =  setHeight * (16/9);
    }
    this.playerId = playerid;
    this.playerObj = new YT.Player(
      playerid,
      {
        width: setWidth,
        height: setHeight,
        videoId: videoid,
        playerVars: {
          loop: 1,
          playlist: videoid,
          rel: 0,
          controls: 0,
          showinfo: 0,
          playsinline: 1,
          modestbranding: 1
        },
        events: {
          'onReady': onPlayerReady,
          'onStateChange': onPlayerStateChange,
        }
      }
    );
  };

  var pub = _YTPlayer.prototype;
  pub.windowResize = function(){
    var setWidth = window.innerWidth;
    var setHeight = window.innerHeight;
    var playeridSel = '#' + this.playerId;

    //youtubeの縦横比に合わせる
    if( ( (setWidth/setHeight) > 16/9 ) ){
      setHeight = setWidth * (9/16);
    }else{
      setWidth =  setHeight * (16/9);
    }
    $(playeridSel).width(setWidth).height(setHeight);
  }
  return _YTPlayer
})();



// function onYouTubeIframeAPIReady(){
//   alert("eee");
// }
