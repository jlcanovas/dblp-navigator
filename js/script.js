function init() {
    var sigInst = sigma.init(document.getElementById("graph")).drawingProperties({
        defaultLabelColor: "#fff",
        defaultLabelSize: 14,
        defaultLabelBGColor: "#fff",
        defaultLabelHoverColor: "#000",
        labelThreshold: 6,
        defaultEdgeType: 'curve',
    }).graphProperties({
        minNodeSize: 0.5,
        maxNodeSize: 5,
        minEdgeSize: 1,
        maxEdgeSize: 1
    }).mouseProperties({
        maxRatio: 4
    });

    sigInst.addNode('hello',{
        label: 'Hello',
        color: '#358753',
        cluster: 'A'
    }).addNode('world',{
        label: 'World !',
        color: '#358753',
        cluster: 'B'
    }).addEdge('hello_world','hello','world').draw();

    var layoutRunning = false;
    console.log(document.getElementById("layout"));
    document.getElementById("layout").addEventListener("click", function() {
        if(layoutRunning) {
            layoutRunning = false;
            document.getElementById("layout").innerHTML = 'Start Layout';
            sigInst.stopForceAtlas2();
        } else {
            layoutRunning = true;
            document.getElementById("layout").innerHTML = 'Stop Layout';
            sigInst.startForceAtlas2();
        }
    });

    document.getElementById('rescale').addEventListener('click',function(){
        sigInst.position(0,0,1).draw();
    },true);

    sigInst.draw();
}

if(document.addEventListener) {
    document.addEventListener("DOMContentLoaded", init, false);
} else {
    window.onload = init;
}
