Template.loading.rendered = function() {
    var cl = new CanvasLoader('canvasloader-container');
    cl.setColor('#008cba'); // default is '#000000'
    cl.setShape('spiral'); // default is 'oval'
    cl.setDiameter(80); // default is 40
    cl.setDensity(90); // default is 40
    cl.setRange(0.8); // default is 1.3
    cl.setFPS(51); // default is 24
    cl.show(); // Hidden by default

    // This bit is only for positioning - not necessary
//    var loaderObj = document.getElementById("canvasLoader");
//    loaderObj.style.position = "relative";
//    loaderObj.style["top"] = cl.getDiameter() * +2 + "px";
//    loaderObj.style["left"] = cl.getDiameter() * -0.5 + "px";

}