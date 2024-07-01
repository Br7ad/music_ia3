let capture;
let poseNet;
let poses = [];
let video;

function setup() {
  // Criar a tela e centralizá-la
  createCanvas(640, 480);
  capture = createCapture(VIDEO);
  capture.size(640, 480);
  capture = createCapture(VIDEO);
capture.size(640, 480);
capture.hide(); // Ocultar o elemento HTML extra criado
capture.parent('webcamContainer');
capture = createCapture(VIDEO);poseNet = ml5.poseNet(capture, modelLoaded);
poseNet.on('pose', gotPoses);
createCanvas(800, 600); // Cria uma tela de 800x600 pixels
createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);

  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses);

  video.hide();


}

function draw() {
  // Desenhar a visualização da webcam na tela
  image(capture, 0, 0, 640, 480);
  background(200);
  image(capture, 0, 0, 640, 480);
  background(200); // Define a cor de fundo para um tom de cinza
  background(0, 128, 255); // Define a cor de fundo para azul (RGB: 0, 128, 255)
  background(200);
  
  fill(0, 102, 153);
  textSize(32);
  text('Meu Nome', 50, 50);
  
  if (poses.length > 0) {
    let leftWristX = poses[0].pose.leftWrist.x;
    let rightWristX = poses[0].pose.rightWrist.x;

    let difference = Math.abs(leftWristX - rightWristX);
    difference = floor(difference);

    textSize(difference);
    text('Nome Dinâmico', 100, 100);
  }
}

  drawPoses();

function gotPoses(results) {
    if (results.length > 0) {
    poses = results; 
    let leftWristX = results[0].pose.leftWrist.x;
    let rightWristX = results[0].pose.rightWrist.x;
    
    let difference = Math.abs(leftWristX - rightWristX);
    difference = floor(difference);

    textSize(difference);
  }
}


function drawPoses() {
    // Desenhar as poses detectadas
    for (let i = 0; i < poses.length; i++) {
      let pose = poses[i].pose;
      for (let j = 0; j < pose.keypoints.length; j++) {
        let keypoint = pose.keypoints[j];
        if (keypoint.score > 0.2) {
          fill(255, 0, 0);
          noStroke();
          ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
        }
      }
    }
  }
  function modelLoaded() {
    console.log('PoseNet está inicializado');
  }
