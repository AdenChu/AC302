var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

var img = new Image();
var bw = new Image();
var capt = new Image();
var hawkeye = new Image();
var hulk = new Image();
var im = new Image();
var thor = new Image();

bw.src ="Black-Widow.png";
capt.src = "capt.png";
hawkeye.src = "hawkeye.png";
hulk.src = "hulk.png";
im.src = "Iron_Man.png";
thor.src = "thor.png";
img.src = "MyFace.jpeg";


img.onload = function(){
	ctx.drawImage(img,100,0,100,100)
}
bw.onload = function(){
	ctx.drawImage(bw,600,250,150,200)
}
capt.onload = function(){
	ctx.drawImage(capt,350,250,200,200)
}
hawkeye.onload = function(){
	ctx.drawImage(hawkeye,25,100,150,190)
}
hulk.onload = function(){
	ctx.drawImage(hulk,200,100,200,200)
}
im.onload = function(){
	ctx.drawImage(im,450,100,200,200)
}
thor.onload = function(){
	ctx.drawImage(thor,150,250,200,180)
}


ctx.fillStyle = "sandybrown";
ctx.fillRect(0, 380, 800, 150);
ctx.fillStyle = "midnightblue";
ctx.fillRect(0,0,800, 380);

ctx.beginPath();

//Add Circle Here

ctx.closePath();
ctx.fillStyle = 'ivory';
ctx.fill();

ctx.font = "60px Impact"
ctx.fillStyle = 'ivory';
ctx.fillText("AVENGERS ASSEMBLE!", 210, 80);

