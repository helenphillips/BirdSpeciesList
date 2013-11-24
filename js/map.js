InteractiveMap = function()
{
	// variables
	var mapContainer = $(".googlemap").get(0);
	var map;
	var fusionLayer;
    var tableID = "";
    
    render();
    addFusionLayer();
	
    
    // get the map and display it
	function render()
	{	
        // set map options
        var mapOptions = {
			Zoom: 10,
			center: "UK",
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
                    iconName: 'large_green'
                 }
               }],
               query: {
            	   select: 'Longitude',
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