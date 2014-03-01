InteractiveMap = function()
{
	// elements
	var speciesControl = $(".species").first();
	
	// variables
	var mapContainer = $(".googlemap").get(0);
	var map;
	var fusionLayer;
    var tableID = "1sAWNbQgSllzV5FOMFUXRxKV6PKMqjK9VPhEli5M";
    
    
    // start
    render();
    addFusionLayer();
    getBirds();
    
    
    // add controls
    speciesControl.on("change", function()
    {
    	fusionLayer.setOptions({
            query: {
                select: 'Latitude',
         	    from: tableID,
         	    where: "'Species' = '" + $(this).val() + "'"
            }
        });
    });
	
    
    // get the map and display it
	function render()
	{	
        // set map options
        var mapOptions = {
			Zoom: 2,
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
	
	
	// get all the data from the map
	function getBirds()
	{
		var query = 'https://www.googleapis.com/fusiontables/v1/query?sql=';
		query += 'SELECT * FROM 1sAWNbQgSllzV5FOMFUXRxKV6PKMqjK9VPhEli5M';
		query += '&key=AIzaSyD4pMRTNlh2pn6lfMLS8nG2v4O1Lh9IWMg';
		
		$.ajax({
			url: query,
			dataType: 'jsonp',
			crossDomain: true,
			success: function (data, textStatus, jqXHR) {
		        createDropdown(data);
		    }
		});
	}
	
	// add a list of unique species to the dropdown
	function createDropdown(data)
	{
		var rows = data.rows;
		
		var birds = new Array();
		var uniqueBirds = new Array();
		
		// add rows to array
		for(i = 0; i < rows.length; i++) {
			birds.push(rows[i][1]);
		}
		
		// remove duplicates
		$.each(birds, function(i, el){
		    if($.inArray(el, uniqueBirds) === -1) {
		    	uniqueBirds.push(el);
		    }
		});
		
		// sort unique birds in alphabetical order
		uniqueBirds.sort();
		
		// add each to the dropdown
		$.each(uniqueBirds, function(i, el){
			speciesControl.append("<option>" + el + "</option>");
		});
	}
};

$(function() 
{
    // new googleMap
	new InteractiveMap();
});

