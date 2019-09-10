var voice = new Audio("/voices/ところで俺のオフィスの場所はどこなんだ.m4a");
var voiceList = [];
var id;

function playVoice(voiceData) {
  $(".play").click(function() {
    id = $(this).attr('class').split(" ")[1];
    voiceData.src = voiceList[id].src;
    $("body").append(voiceData);
    voiceData.play();
  });
};

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
    for(var i = 0; i < data.length; i++) {
      voiceList.push(data[i]);
      $("#buttons").append("<button type='button' class='play " + data[i].id + "'>" + data[i].title + "</button>");
    };
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
