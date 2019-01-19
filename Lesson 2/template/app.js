console.log("test...")

var c = document.getElementById("myCanvas");
//var c = $("#myCanvas") same thing
var ctx = c.getContext("2d");
 ctx.moveTo (0,0);
 ctx.lineTo (200,100);
ctx.strokeStyle= "blue";
ctx.lineWdith = 5
 ctx.stroke();
 ctx.fillStyle = "rgb(200,50,10)";
 ctx.fillRect (75,125,150,100);
 ctx.strokeStyle = "green"
 ctx.strokeRect(50,100,200,150);
 ctx.clearRect(125,150,50,50)
var b = document.getElementById("Aden");
var btx = b.getContext("2d");
btx.fillRect(250,250,250,250);
