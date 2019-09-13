var voice = new Audio("/voices/Ancestors/なによあーた.m4a");
var voiceList = [];

function playVoice(voiceData) {
  $(".play").click(function() {
    var id = $(this).attr('class').split(" ")[1];
    console.log(voiceData);
    voiceData.src = voiceList[id].src;
    $("body").append(voiceData);
    voiceData.play();
    checkRoop();
  });
};

function checkRoop() {
  $("audio").on("ended", function() {
    var isRoop = $("#roop").prop("checked");
    if (isRoop == true) {
      this.play();
    } else {
      this.pause();
      this.currentTime = 0;
    }
  });
}

function getSliderValue() {
  $("#volume").on("input", function() {
    var volume = $(this).val()
    $("#displayVolume").text(volume);
    $("audio")[0].volume = volume.length == 1 ? "0.0" + volume : "0." + volume;
  });
}

$(function(){
  $.getJSON("./voices_list.json", null, function(data) {
  })
  .success(function(data) {
    for (var series in data) {
      $("#buttons").append("<h2 class='series'>" + series + "</h2>");
      for (var i = 0; i < data[series].length; i++) {
        voiceList.push(data[series][i]);
        $("#buttons").append("<button type='button' class='play " + data[series][i].id + "'>" + data[series][i].title + "</button>");
      }
    }
  })
  .error(function(jqXHR, textStatus, errorThrown) {
    console.log("Error:" + textStatus);
  })
  .complete(function() {
  });
});

$(function() {
  $(window).load(function(){
    voice.volume = 0.5;
    playVoice(voice);
    getSliderValue()
  });
});
