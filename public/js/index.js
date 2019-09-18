$(function() {
  var voice = new Audio("");
  var voiceList = [];
  var seriesLength;
  var isRand = false;

  function playVoice(voiceData, target) {
    var id = target.attr('class').split(" ")[1];
    voiceData.src = voiceList[id].src;
    $("body").append(voiceData);
    voiceData.play();
    checkRoop(voiceData);
  };

  function random(voiceData) {
    $("#random").click(function() {
      playRandom(voiceData);
      checkRoop(voiceData);
    });
  }

  function randomRoop(voiceData) {
    $("#roopStart").click(function() {
      $(this).prop("disabled", true);
      isRand = true;
      playRandom(voiceData);
      checkRoop(voiceData);
    });

    $("#roopStop").click(function() {
      isRand = false;
    });
  }

  function playRandom(voiceData) {
    var id = Math.floor(Math.random() * (seriesLength) + 1);
    voiceData.src = voiceList[id].src;
    $("body").append(voiceData);
    voiceData.play();
  }

  function checkRoop(voiceData) {
    $("audio").on("ended", function() {
      var isRoop = $("#roop").prop("checked");
      if (isRand == true) {
        setTimeout(playRandom, 500, voiceData);
      } else if (isRoop == true) {
        this.play();
      } else if (isRand == false) {
        $("audio").remove();
        $("#roopStart").prop("disabled", false);
        this.pause();
        this.currentTime = 0;
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

  $.getJSON("./voices_list.json", null, function(data) {
  })
  .success(function(data) {
    seriesLength = data["Ancestors"][0].nums - 1;

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
    voice.volume = 0.5;
    $(".play").click(function() {
      var target = $(this);
      playVoice(voice, target);
    });
    getSliderValue();
    random(voice);
    randomRoop(voice);
  });
});
