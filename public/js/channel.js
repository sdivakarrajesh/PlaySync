var iframe;
var play = 1;
var playPauseBtn = document.getElementById("playPauseBtn");
var player;

play = 1;
playPauseBtn.children[0].className = "glyphicon glyphicon-pause"

var fullscreenToggle = $("#fullscreenToggle");
fullscreenToggle.click(function () {
    player.playVideo();
    var requestFullScreen = iframe.requestFullScreen || iframe.mozRequestFullScreen || iframe.webkitRequestFullScreen;
    console.log(requestFullScreen);
    if (requestFullScreen) {
        requestFullScreen.bind(iframe)();
    }
});
progressBarLoop();
function seek(event) {
    var clickOffset = evt.pageX - $('#progressBar').offset().left;
    console.log(clickOffset);

}

function progressBarLoop() {
    var play = 1;
    var socket = io();

    $("#playPauseBtn").click(function () {
        if (play === 1) {
            play = 0;
            player.pauseVideo();
            socket.emit('pause');
            console.log("current Time : " + player.getCurrentTime());
            playPauseBtn.children[0].className = "glyphicon glyphicon-play"
            socket.emit('newTime', {
                newTime: player.getCurrentTime()
            });
        }
        else {
            play = 1;
            player.playVideo();
            socket.emit('play');
            playPauseBtn.children[0].className = "glyphicon glyphicon-pause"
        }
    });
    var progressBar = $("#progressBar");
    var progressSlider = $("#square");

    socket.on('connect', function () {
        console.log("Connected to server");
        var params = jQuery.deparam(window.location.search);
        console.log(params);
        socket.emit('join', params, function (err) {
            if (err) {
                alert(err);
                window.location.href = '/';
            }
        });

    });
    socket.on('syncTime', function (newTime) {
        console.log(`New Time received ${newTime.time}`);
        player.seekTo(newTime.time, true);
    });
    socket.on('play', function (newTime) {
        console.log("Playing");
        player.playVideo();
        playPauseBtn.children[0].className = "glyphicon glyphicon-pause"
    });
    socket.on('pause', function (newTime) {
        console.log("Pausing");
        player.pauseVideo();
        playPauseBtn.children[0].className = "glyphicon glyphicon-play"
    });
    socket.on('disconnect', function () {
        console.log("Disconnected to server");
    });

    socket.on('updateUserList', function (users) {
        console.log(users);
    });

    progressBar.click(function (event) {
        if (player == null || progressBar == null) {
            return;
        }

        var divOffset = event.pageX - $(this).offset().left;
        var fraction = (divOffset) / 550;//550=> actual width of the progressbar
        console.log(`Fraction ${fraction}`);
        progressSlider.css("left", fraction.toString() + "%");
        var seekNewTime = fraction * player.getDuration();
        console.log(`seeking to ${seekNewTime}`);
        player.seekTo(seekNewTime, true);
        socket.emit('newTime', {
            newTime: seekNewTime
        });

    });
    setInterval(function () {
        if (player == null || progressBar == null) {
            return;
        }
        var fraction = (player.getCurrentTime()) / player.getDuration() * 100;
        progressSlider.css("left", fraction.toString() + "%");
    });

}

// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '480',
        width: '640',
        videoId: 'XZmGGAbHqa0',
        playerVars: { 'controls': 0 },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }

    });
}


// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
    //event.target.playVideo();
    event.target.pauseVideo();
    var playPauseBtn = document.getElementById("playPauseBtn");
    console.log(playPauseBtn.children[0]);
    playPauseBtn.children[0].className = "glyphicon glyphicon-play";
    var $ = document.querySelector.bind(document);
    iframe = $('#player');
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !done) {
        //setTimeout(stopVideo, 6000);
        done = true;
    }
}
function stopVideo() {
    player.stopVideo();
}