<script type="text/javascript" language="javascript" src="http://spdev2013/QLDConnect/SiteAssets/jquery-1.10.2.min.js"></script>
<script type="text/javascript" language="javascript">

    function openInspireMeLink()
    {
        // check if div tag is not empty
        if ($('#InspireMe ul li').length != 0){
            //get the items
            var randomlist = $('#InspireMe ul li');
            //generate random number and get index
            var randomNum = Math.random()*randomlist.length;
            randomNum = Math.floor(randomNum);
            //get url
            var externalUrl = $("#InspireMe ul li:eq(" + randomNum + ")").text();
            if (externalUrl)  {
                window.open(externalUrl);    
            }
        }
    }

    $(document).ready(function() {
	
        //load script on demand
        SP.SOD.executeFunc('SP.js','SP.ClientContext', function() {
	
            var clientContext = new SP.ClientContext.get_current();
            //alert(clientContext.get_site());
            var oWebsite = clientContext.get_site().get_rootWeb();	        
            var list = oWebsite.get_lists().getByTitle("InspireMe");
            
            var camlQuery = new SP.CamlQuery();
            camlQuery.set_viewXml('<View><RowLimit>100</RowLimit></View>');
            this.items = list.getItems(camlQuery);
            clientContext.load(items,"Include(Title,ExternalUrl)");
            clientContext.executeQueryAsync(onSuccess, onFailure);
            function onSuccess()
            {
                if ($("#InspireMe ul").length == 1){
                    $("#InspireMe ul").remove();
                }
                var itemsEnumerator = items.getEnumerator();
                
                var inspireMeDiv= $("#InspireMe").append('<ul></ul>').find('ul');
                while(itemsEnumerator.moveNext()){
                    var item = itemsEnumerator.get_current();
                    inspireMeDiv.append('<li>' + item.get_item("ExternalUrl") + '</li>');
                }
                //
            }
            function onFailure()
            {

            }
        });
    });


</script>

<div id="InspireMe"></div>
<h2>Random Item Selected</h2>
<div id="RandomItem"></div>
<input type="button" value="Click Me!!!" onclick="openInspireMeLink()">
<div id="ranItem"></item>

