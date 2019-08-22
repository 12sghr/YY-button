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

$(function(){
  $.getJSON("./voices_list.json", null, function(data) {
    console.log(data);
  })
  .success(function(data) {
    console.log("Success");
    for(var i = 0; i < data.length; i++) {
      voiceList.push(data[i]);
      $("#buttons").append("<button type='button' class='play " + data[i].id + "'>" + data[i].title + "</button>");
    };
  })
  .error(function(jqXHR, textStatus, errorThrown) {
    console.log("Error:" + textStatus);
  })
  .complete(function() {
    console.log("Finished!");
  });
});

$(function() {
  $(window).load(function(){
    playVoice(voice);
  });
});
