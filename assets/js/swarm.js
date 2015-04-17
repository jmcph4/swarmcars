var canvas;
var context;
var obj = new Array();
var timer;
var img = new Array();
var runs = 0;
var vertical = Math.floor(Math.random() * 800) + 1;
var horizontal = Math.floor(Math.random() * 600) + 1;

var n = 8; // total number of cars
var variance = 10; // how much each "random" movement is
var frequency = 4; // how often "random" movements occur (in runs, not seconds)

function Obj(x, y, side){
  this.x = x;
  this.y = y;
  this.side = side;
  this.dx = 0;
  this.dy = 0;
}

function init(){
  // populate objects and their respective images
  for(var k=0;k<n;k++){
    obj.push(new Obj(Math.floor(Math.random() * 800) + 1, Math.floor(Math.random() * 800) + 1, 16));
    img.push(document.getElementById("car"));
  }

  // get screen and context and set timer
  canvas = document.getElementById("screen");
  context = canvas.getContext("2d");
  timer = setInterval(draw, 100);
  
  return timer;
}

function draw(){
  runs++;
  context.clearRect(0, 0, canvas.width, canvas.height);
  
  context.fillStyle = "red";
  context.fillRect(vertical,horizontal,10,10);
  
  for(var i=0;i<obj.length;i++){
    context.drawImage(img[i], obj[i].x, obj[i].y);
	var origx = obj[i].x;
	var origy = obj[i].y;
	
	if(runs % frequency != 0){
	  if(obj[i].x < vertical){
	    obj[i].x += 10;
		obj[i].dx = obj[i].x - origx;
		
		if(obj[i].y < horizontal){
		  obj[i].y += 10;
		  obj[i].dy = obj[i].y - origy;
		}
	  }
	  else{
	    obj[i].x -= 10;
		obj[i].dx = obj[i].x - origx;
	    
		if(obj[i].y < horizontal){
		  obj[i].y += 10;
		  obj[i].dy = obj[i].y - origy;
		}
		else{
		  obj[i].y -= 10;
		  obj[i].dy = obj[i].y - origy;
		}
	  }
    }
	else{
	  obj[i].x += averageMotion();
	  obj[i].y += averageMotion();
	}
  }
}

function averageMotion(){
  var sumx = 0;
  var sumy = 0;
  
  for(var j=0;j<obj.length;j++){
    sumx += obj[j].dx;
    sumy +=	obj[j].dy;
  }
  
  var mean = ((sumx / 4) + (sumy / 4)) / 2;

  return mean;
  
}