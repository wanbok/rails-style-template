var data = [];

google.load('maps', '3', {
  other_params: 'sensor=false'
});

google.setOnLoadCallback(initialize);

var styles = [[{
  url: 'http://google-maps-utility-library-v3.googlecode.com/svn/tags/markerclusterer/1.0/images/people35.png',
  height: 35,
  width: 35,
  opt_anchor: [16, 0],
  opt_textColor: '#ff00ff',
  opt_textSize: 10
}, {
  url: 'http://google-maps-utility-library-v3.googlecode.com/svn/tags/markerclusterer/1.0/images/people45.png',
  height: 45,
  width: 45,
  opt_anchor: [24, 0],
  opt_textColor: '#ff0000',
  opt_textSize: 11
}, {
  url: 'http://google-maps-utility-library-v3.googlecode.com/svn/tags/markerclusterer/1.0/images/people55.png',
  height: 55,
  width: 55,
  opt_anchor: [32, 0],
  opt_textSize: 12
}], [{
  url: 'http://google-maps-utility-library-v3.googlecode.com/svn/tags/markerclusterer/1.0/images/conv30.png',
  height: 27,
  width: 30,
  anchor: [3, 0],
  textColor: '#ff00ff',
  opt_textSize: 10
}, {
  url: 'http://google-maps-utility-library-v3.googlecode.com/svn/tags/markerclusterer/1.0/images/conv40.png',
  height: 36,
  width: 40,
  opt_anchor: [6, 0],
  opt_textColor: '#ff0000',
  opt_textSize: 11
}, {
  url: 'http://google-maps-utility-library-v3.googlecode.com/svn/tags/markerclusterer/1.0/images/conv50.png',
  width: 50,
  height: 45,
  opt_anchor: [8, 0],
  opt_textSize: 12
}], [{
  url: 'http://google-maps-utility-library-v3.googlecode.com/svn/tags/markerclusterer/1.0/images/heart30.png',
  height: 26,
  width: 30,
  opt_anchor: [4, 0],
  opt_textColor: '#ff00ff',
  opt_textSize: 10
}, {
  url: 'http://google-maps-utility-library-v3.googlecode.com/svn/tags/markerclusterer/1.0/images/heart40.png',
  height: 35,
  width: 40,
  opt_anchor: [8, 0],
  opt_textColor: '#ff0000',
  opt_textSize: 11
}, {
  url: 'http://google-maps-utility-library-v3.googlecode.com/svn/tags/markerclusterer/1.0/images/heart50.png',
  width: 50,
  height: 44,
  opt_anchor: [12, 0],
  opt_textSize: 12
}]];

var markerClusterer = null;
var map = null;
var imageUrl = 'http://chart.apis.google.com/chart?cht=mm&chs=24x32&' +
'chco=FFFFFF,008CFF,000000&ext=.png';

function trackLocation(rawData) {
  data = rawData;
};

function refreshMap() {
  if (markerClusterer) {
    markerClusterer.clearMarkers();
  }

  var markers = [];
  
  var markerImage = new google.maps.MarkerImage(imageUrl,
    new google.maps.Size(24, 32));
  var bounds = new google.maps.LatLngBounds();

  for (var i = 0; i < data.length; ++i) {
    var latitude = data[i].latitude;
    var longitude = data[i].longitude;
    if (latitude === null || longitude === null ||
      latitude < 0 || longitude < 0) 
      continue;
    var latLng = new google.maps.LatLng(data[i].latitude,
      data[i].longitude);
    var marker = new google.maps.Marker({
      position: latLng,
      draggable: true,
      icon: markerImage
    });
    markers.push(marker);
    bounds.extend(latLng);
  };

  map.fitBounds(bounds);

  // var zoom = parseInt(document.getElementById('zoom').value, 10);
  // var size = parseInt(document.getElementById('size').value, 10);
  // var style = parseInt(document.getElementById('style').value, 10);
  var zoom = null;
  var size = null;
  var style = null;
  // zoom = zoom == -1 ? null : zoom;
  // size = size == -1 ? null : size;
  // style = style == -1 ? null: style;

  markerClusterer = new MarkerClusterer(map, markers, {
    maxZoom: zoom,
    gridSize: size,
    styles: styles[style]
  });
};

function initialize() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 5,
    center: new google.maps.LatLng(37.00, 127.38),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  var refresh = document.getElementById('refresh');
  google.maps.event.addDomListener(refresh, 'click', refreshMap);

  // var clear = document.getElementById('clear');
  // google.maps.event.addDomListener(clear, 'click', clearClusters);

  refreshMap();
}

function clearClusters(e) {
  e.preventDefault();
  e.stopPropagation();
  markerClusterer.clearMarkers();
}

