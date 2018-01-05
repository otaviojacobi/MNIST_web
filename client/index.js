let click = false;
let xCoord, yCoord = "";
let canvas = document.getElementById("canvas");
let cntx = canvas.getContext("2d");
cntx.strokeStyle = "black";
cntx.lineWidth = 4;
cntx.lineCap = "round";
cntx.fillStyle = "#fff";
cntx.fillRect(0, 0, canvas.width, canvas.height);

let searchButton = document.getElementById("search");
let clearButton = document.getElementById("clear");
let label = document.getElementById("label");

document.addEventListener('mouseup', event => click = false);
clearButton.addEventListener('click', event => {
    label.innerHTML = "-";
    cntx.clearRect(0, 0, canvas.width, canvas.height);
});
searchButton.addEventListener('click', event => {
    var image = new Image();
    image.id = "pic"
    image.src = canvas.toDataURL();
    window.fetch("http://127.0.0.1:5000/predict", {
        method: 'POST',
        body: JSON.stringify(image.src),
      }).then(resolve => { console.log(resolve); }, hein => {console.log("nope");});//label.innerHTML = "1");

});
canvas.addEventListener('mousedown', event => {
    click = true;
    cntx.save();
    xCoord = event.pageX - canvas.offsetLeft;
    yCoord = event.pageY - canvas.offsetTop
});
canvas.addEventListener('click', event => click = false);
canvas.addEventListener('mousemove', event => {
    if (click == true) {
        cntx.beginPath();
        cntx.moveTo(event.pageX - canvas.offsetLeft, event.pageY - canvas.offsetTop);
        cntx.lineTo(xCoord, yCoord);
        cntx.stroke();
        cntx.closePath();
        xCoord = event.pageX - canvas.offsetLeft;
        yCoord = event.pageY - canvas.offsetTop
    }
});