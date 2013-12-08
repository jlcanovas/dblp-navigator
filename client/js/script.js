function initGraph() {
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

    sigInst.addNode('1',{
        label: '1',
        x: Math.random(),
        y: Math.random(),
        color: '#358753',
        cluster: 'A'
    }).addNode('2',{
        label: '2',
        x: Math.random(),
        y: Math.random(),
        color: '#358753',
        cluster: 'A'
    }).addNode('3',{
        label: '3',
        x: Math.random(),
        y: Math.random(),
        color: '#358753',
        cluster: 'A'
    }).addNode('4',{
        label: '4',
        x: Math.random(),
        y: Math.random(),
        color: '#ea7d10',
        cluster: 'B'
    }).addNode('5',{
        label: '5',
        x: Math.random(),
        y: Math.random(),
        color: '#ea7d10',
        cluster: 'B'
    }).addNode('6',{
        label: '6',
        x: Math.random(),
        y: Math.random(),
        color: '#ea7d10',
        cluster: 'B'
    }).addEdge('12','1','2').addEdge('13','1','3').
       addEdge('45','4','5').addEdge('46','4','6').
       addEdge('16','1','6').addEdge('26','2','6').draw();

    var layoutRunning = false;
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


    document.getElementById('search').addEventListener('click', function() {
        var searchTopic = document.getElementById('topic').value;
        $.ajax({
            url : "/search",
            type : "GET",
            dataType : "json",
            crossDomain : true,
            success : function(data) {
                console.log(data);
            },
            error : function(xhr, status) {
                console.log('Request Status: ' + xhr.status + ' Status Text: ' + xhr.statusText + ' - ' + xhr.responseText);
            }
        });
    });

    sigInst.draw();
}

if(document.addEventListener) {
    document.addEventListener("DOMContentLoaded", initGraph, false);
} else {
    window.onload = initGraph;
}
