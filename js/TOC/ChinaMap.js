var map;
var mapView;
var tocLegend;
var JPLayer, JilinLayer;
require([
    "esri/Map", "esri/views/MapView", "esri/layers/MapImageLayer",
    "agsjs/dijit/TOC","dojo/domReady!"
], function (Map, MapView, MapImageLayer) {
    map = new Map({
       basemap:'topo',
    });

    mapView = new MapView({
        container: "mapDiv",
        map: map,
        zoom: 10,
        center: [126.50, 43.70]
    });
    JilinLayer = new MapImageLayer({
        url: "http://csis.viphk1.ngrok.org/arcgis/rest/services/public/吉林市/MapServer",
        visible: true
    });
    JPLayer = new MapImageLayer({
        url: "http://csis.viphk1.ngrok.org/arcgis/rest/services/public/日本地図/MapServer",
        visible: true
    });


    tocLegend = new agsjs.dijit.TOC({
        map: map,
        layerInfos: [],
        mapView: mapView,
    }, "tocDiv");

    tocLegend.startup();
    changeLayer("JilinLayer");

});
function test() {
    tocLegend.layerInfos = [];
    for (let i = 0; i < map.layers.length; i++) {
        tocLegend.layerInfos.push({
            layer: map.layers.items[i],
            title: map.layers.items[i].title,
            slider: true,
            autoToggle: false
        });
    }
    tocLegend.refresh();
}

function changeLayer(value) {
    map.removeAll();
    document.getElementById("tocDiv").innerHTML = "";

    switch (value) {
        case "JilinLayer":
            map.add(JilinLayer);
            mapView.goTo({
                center: [126.50, 43.70],
                zoom:10
            });
            refreshTOC();
            break;
        case "JPLayer":
            map.add(JPLayer);
            mapView.goTo({
                center: [126.50, 43.70],
                zoom: 7
            });
            refreshTOC();
            break;
        case "double":
            map.addMany([JPLayer,JilinLayer]);
            mapView.goTo({
                center: [126.50, 43.70],
                zoom: 9
            });
            refreshTOC();
            break;
    }
}
function refreshTOC() {
    tocLegend.layerInfos = [];
    var lyr = map.layers.items[map.layers.length - 1]
    if (lyr.loaded) {
        tocLegend.layerInfos = [];
        for (let i = 0; i < map.layers.length; i++) {
            tocLegend.layerInfos.push({
                layer: map.layers.items[i],
                title: map.layers.items[i].title,
                slider: true,
                autoToggle: false
            });
        }
        tocLegend.refresh();
    }
    else {
        lyr.on('layerview-create', function () {
            tocLegend.layerInfos = [];
            for (let i = 0; i < map.layers.length; i++) {
                tocLegend.layerInfos.push({
                    layer: map.layers.items[i],
                    title: map.layers.items[i].title,
                    slider: true,
                    autoToggle: false
                });
            }
            tocLegend.refresh();
        })
    }
}

