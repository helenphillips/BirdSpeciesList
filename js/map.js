InteractiveMap = function()
{
	// variables
	var mapContainer = $(".googlemap").get(0);
	var map;
	var fusionLayer;
    var tableID = "1qgC8C0cjXot5wIV19wnv7Kq-zOndiBKiwoiPTbM";
    
    render();
    addFusionLayer();
	
    
    // get the map and display it
	function render()
	{	
        // set map options
        var mapOptions = {
			Zoom: 5,
			center: new google.maps.LatLng(52.38049822, -1.747476),
			mapTypeId: google.maps.MapTypeId.ROADMAP
		}
        
        // add the map to the container on the page
		map = new google.maps.Map(mapContainer, mapOptions);
	}
	
	
	// add the fusion table layer to the map
	function addFusionLayer()
	{
		fusionLayer = new google.maps.FusionTablesLayer({
            styles: [{ 
                 markerOptions: {
                    iconName: 'binoculars'
                 }
               }],
               query: {
            	   select: 'Latitude',
            	   from: tableID
              }
        });
		
		fusionLayer.setMap(map);
	}
};

$(function() 
{
    // new googleMap
	new InteractiveMap();
});