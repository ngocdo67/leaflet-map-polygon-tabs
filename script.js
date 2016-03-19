// Edit the initial year to match your GeoJSON data and tabs in index.html
var year = "1910";

// Edit the center point and zoom level
var map = L.map('map', {
  center: [41.79, -72.6],
  zoom: 10,
  scrollWheelZoom: false
});

// Edit links to your GitHub repo and data source credit
map.attributionControl
.setPrefix('View <a href="http://github.com/jackdougherty/leaflet-map-polygon-tabs">data and code on GitHub</a>, created with <a href="http://leafletjs.com" title="A JS library for interactive maps">Leaflet</a>; design by <a href="http://ctmirror.org">CT Mirror</a>');

// Basemap layer
new L.tileLayer('http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
}).addTo(map);

// Edit to upload GeoJSON data file from your local directory; removed var = geoJsonLayer since this is declared above
$.getJSON("town-home-value-index.geojson", function (data) {
  geoJsonLayer = L.geoJson(data, {
    style: style,
    onEachFeature: onEachFeature
  }).addTo(map);
});

// Edit ranges and colors to match your data; see http://colorbrewer.org
function getColor(d) {
  return d > 2.0 ? '#006d2c' :
         d > 1.5 ? '#2ca25f' :
         d > 1.0 ? '#66c2a4' :
         d > 0.5 ? '#b2e2e2' :
         d > 0.1 ? '#edf8fb' :
                   '#ffffff' ;
}

// Edit the getColor property to match data properties in your GeoJSON file
// In this example, columns follow this pattern: index1910, index1920...
function style(feature) {
  return {
    fillColor: getColor(feature.properties["index" + year]),
    weight: 1,
    opacity: 1,
    color: 'black',
    fillOpacity: 0.8,
  };
}

// This highlights the polygon on hover
function highlightFeature(e) {
  var layer = e.target;
  layer.setStyle({
    weight: 4,
    color: 'black',
    fillOpacity: 0.7
  });
  info.update(layer.feature.properties);
}

// This resets the highlight after hover moves away
function resetHighlight(e) {
  geoJsonLayer.setStyle(style);
  info.update();
}

// This instructs highlight and reset functions on hover movement
function onEachFeature(feature, layer) {
  layer.on({
    mouseover: highlightFeature,
    mouseout: resetHighlight,
    click: highlightFeature
  });
}

// Creates an info box on the map
var info = L.control();
info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
};

// Edit info box labels (such as props.town) to match properties of the GeoJSON data
info.update = function (props) {
  var winName =
  this._div.innerHTML = (props ?
    '<div class="townName">' + props.town + '</div>' : '<div class="townName faded">Hover over towns</div>') + '<div class="labelItem"><div class="rightLabel">Home Value Index</div>' +(props ? '' + (checkNull(props["index" + year])) : '--') + '</div>';
};

info.addTo(map);

// When a new tab is selected, this changes the year displayed
$(".tabItem").click(function() {
  $(".tabItem").removeClass("selected");
  $(this).addClass("selected");
  year = $(this).html();
  // year = $(this).html().split("-")[1];  /* use for school years, eg 2010-11 */
  geoJsonLayer.setStyle(style);
});

// In info.update, this checks if GeoJSON data contains a null value, and if so displays "--"
function checkNull(val) {
  if (val != null || val == "NaN") {
    return comma(val);
  } else {
    return "--";
  }
}

// Use in info.update if GeoJSON data needs to be displayed as a percentage
function checkThePct(a,b) {
  if (a != null && b != null) {
    return Math.round(a/b*1000)/10 + "%";
  } else {
    return "--";
  }
}

// Use info.update if GeoJSON data needs to be displayed with commas (such as 123,456)
function comma(val){
  while (/(\d+)(\d{3})/.test(val.toString())){
    val = val.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');
  }
  return val;
}
