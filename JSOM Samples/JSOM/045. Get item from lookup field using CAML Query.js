/*
CAML Query to get value from look up column
get value from loopup field
*/
<script type="text/javascript" language="javascript" src="http://spdev2013/QLDConnect/SiteAssets/jquery-1.10.2.min.js"></script>
<script type="text/javascript" language="javascript">
    

    function getCurrentUserFromRestApi() {
        var userid = _spPageContextInfo.userId;
        var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/getuserbyid(" + userid + ")";
        var requestHeaders = { "accept": "application/json;odata=verbose" };
        
        $.ajax({
            url: requestUri,
            contentType: "application/json;odata=verbose",
            headers: requestHeaders,
            success: onSuccess,
            error: onError
        });

        function onSuccess(data, request) {
            var loginTitle = data.d.Title; //returns full name... for ex., Kannan Karmegam
            $('#CurrentUser').text(loginTitle);

            var loginName = data.d.LoginName; // i:0#.w|sphome\kannan
            $('#loginName').text(loginName);
        }

        function onError(error) {
            $('#CurrentUser').text("error has occured");
        }
    }

    $(document).ready(function() {
	
        //load script on demand
        SP.SOD.executeFunc('SP.js','SP.ClientContext', function() {
            
            var context = new SP.ClientContext.get_current();
            var web = context.get_web();
            var list = web.get_lists().getByTitle("Going / NotGoing");
            var camlQuery = new SP.CamlQuery();
            camlQuery.set_viewXml("<View><Query><Where>" +
                                    "<And>" + 
                                        "<Eq><FieldRef Name='Discussion_x0020_Topic' LookupId='TRUE'/>" + 
                                        "<Value Type='Lookup'>1</Value></Eq>" +
                                        "<Eq><FieldRef Name='Author' LookupId='TRUE'/>" + 
                                        "<Value Type='Integer'>9</Value></Eq>" +
                                    "</And>" + 
                                    "</Where></Query></View>"
                                );
            var colItems = list.getItems(camlQuery);
            context.load(list); 
            context.load(colItems,"Include(ID,Discussion_x0020_Topic,Author)");
            
            context.executeQueryAsync(
                Function.createDelegate(this, successHandler),
                Function.createDelegate(this, errorHandler));

            function successHandler() {
                var itemEnumerator = colItems.getEnumerator();
                while (itemEnumerator.moveNext()) {
                    var item = itemEnumerator.get_current();
                    var lookUpField = item.get_item("Discussion_x0020_Topic").get_lookupValue();
                    var userLookUp = item.get_item("Author").get_lookupValue();
                    $("#innerHTML").append(item.get_item("ID") + " --> " + lookUpField + " " + userLookUp + "<br />").css("background-color","yellow");
                }
            }
            function errorHandler(){
                $("#innerHTML").text(arguments[1].get_message()).css("background-color","yellow");
            }
        });
    });

</script>
<H2>Get items by ID using CAML Query</H2>
<div id="innerHTML"></div>
