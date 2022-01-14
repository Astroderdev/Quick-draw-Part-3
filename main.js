quick_draw_data_set=["sweater","shoe","bag","line","hat"];
random_number = Math.floor((Math.random()*quick_draw_data_set.length)+1);
console.log(quick_draw_data_set[random_number]);
sketch = quick_draw_data_set[random_number];
data = sketch;
document.getElementById("to_be_drawn").innerHTML = "Sketch to be drawn: " + data;
timer_counter=0;
timer_check="";
drawn_sketch="";
answer_holder="";
score=0;

function preload(){
   classifier = ml5.imageClassifier('DoodleNet');
}
function setup(){
   canvas = createCanvas(280,280);
   canvas.center();
   background("white");
   canvas.mouseReleased(classifyCanvas);
}
function classifyCanvas(){
   classifier.classify(canvas, gotResult);
}
function clearCanvas(){
    background("white");
}
function draw(){
   strokeWeight(10);
   stroke('blue');
   if(mouseIsPressed){
      line(pmouseX, pmouseY, mouseX, mouseY);
   }
    check_sketch();
    if(drawn_sketch == sketch){
        answer_holder = "set";
        score = score+1;
        document.getElementById("Score").innerHTML = "Score: " + score;
    }
}

function check_sketch(){
        timer_counter = timer_counter+1;
        document.getElementById("Time_Left").innerHTML = "Time Left: " + timer_counter;
        console.log(timer_counter);
        if(timer_counter > 1000){
            timer_counter = 0;
            timer_check = "completed";
        }
        if(timer_check == "completed" || answer_holder == "set"){
            timer_check = "";
            answer_holder = "";
            updateCanvas();
        }
    }

function updateCanvas(){
    background("white");
    random_number = Math.floor((Math.random()*quick_draw_data_set.length)+1);
    console.log(quick_draw_data_set[random_number]);
    sketch = quick_draw_data_set[random_number];
    document.getElementById("to_be_drawn").innerHTML = "Sketch to be drawn: " + sketch;
}

function classifyCanvas(){
    classifier.classify(canvas, gotResult);
}
function gotResult(error, results){
    if(error){
        console.error(error);
    }
    if(results){
        console.log(results);
        drawn_sketch = results[0].label;
        document.getElementById("your_sketch").innerHTML = "Your Sketch: " + drawn_sketch;
        document.getElementById("confidence").innerHTML = "Confidence: " + Math.round(results[0].confidence * 100) + "%";
    }

}