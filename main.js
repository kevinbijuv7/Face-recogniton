Webcam.set({
    width:350,
    height:300,
    image_format : 'png',
    png_quality:90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function modelLoaded() {
    console.log("Model Loaded!!!");
}

function check()
{
    img = document.getElementById("captured_image");
    classifier.classify(img, gotResult);
}

function draw() {
    image(video,0, 0, 300, 300);
    classifier.classify(video, gotResult);
  }
  
  var previous_result = " ";
function gotResult(error, results) {
    if(error) {
      console.error(error);
    } else {
      if((results[0].confidence > 0.5) && (previous_result != results[0].
        label)){
        console.log(results);
        previous_result = results[0].label;
        var synth = window.speechSynthesis;
        speak_data = "Person Is Detected As - "+results[0].label;
        var utterThis = new SpeechSynthesisUtterance(speak_data);
        synth.speak(utterThis)
  
        document.getElementById("result_object_name").innerHTML = results
        [0].label
        document.getElementById("result_object_accuracy").innerHTML = results
        [0].confidence.toFixed(3)
      }
    }
  }

function take_snapshot()
{
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}
console.log('ml5 version', ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/H1d32apkq/model.json',modelLoaded);

