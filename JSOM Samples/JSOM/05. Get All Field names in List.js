<script type="text/javascript" language="javascript" src="http://spdev2013/QLDConnect/SiteAssets/jquery-1.10.2.min.js"></script>
<script type="text/javascript" language="javascript">
    
    function getFields()
    {
        //load script on demand
        SP.SOD.executeFunc('SP.js','SP.ClientContext', function() {
            //do something
            var clientContext;
            var oWebsite;
            var oList;
            var itemCreateInfo;
            var fieldsColl;

            clientContext = new SP.ClientContext.get_current();
            oWebsite = clientContext.get_web();
            //get list
            oList = oWebsite.get_lists().getByTitle("Announcements");
            //get fields collection
            fieldsColl = oList.get_fields();

            clientContext.load(this.fieldsColl);
            clientContext.executeQueryAsync(
                Function.createDelegate(this, successHandler),
                Function.createDelegate(this, errorHandler)
            );
            function successHandler() {
                resultpanel.innerHTML = "";
            }
            function errorHandler() {
                resultpanel.innerHTML = "Request failed: " + arguments[1].get_message();
            }
        });
    }

    $(document).ready(function() {
	
	    //load script on demand
	    SP.SOD.executeFunc('SP.js','SP.ClientContext', function() {
	        //do something
	    });
    });

</script>
<H1>Get All field names in a List</H1>
<input onclick="getFields()" name="createItem" type="button" value="Create List Item"></input>
<div id="resultpanel"></div>