/*
CAML Query to get item by ID
*/
<script type="text/javascript" language="javascript" src="http://spdev2013/QLDConnect/SiteAssets/jquery-1.10.2.min.js"></script>
<script type="text/javascript" language="javascript">
    
    $(document).ready(function() {
	
        //load script on demand
        SP.SOD.executeFunc('SP.js','SP.ClientContext', function() {
            
            var context = new SP.ClientContext.get_current();
            var web = context.get_web();

            var folderUrl = "/QLDConnect/Lists/Community Discussion/Common Questions and Concerns about Skype for Business";
            var list = web.get_lists().getByTitle("Discussions List");
            var camlQuery = new SP.CamlQuery();
            camlQuery.set_viewXml('<View><Query><Where><Eq><FieldRef Name=\'ID\'/>' +
        '<Value Type=\'Number\'>5</Value></Eq></Where></Query>' +
        '<RowLimit>10</RowLimit></View>');

            var colItems = list.getItems(camlQuery);
            context.load(list);
            context.load(colItems,"Include(Title)");
            
            context.executeQueryAsync(
                Function.createDelegate(this, successHandler),
                Function.createDelegate(this, errorHandler));

            function successHandler() {
                var itemEnumerator = colItems.getEnumerator();
                while (itemEnumerator.moveNext()) {
                    var item = itemEnumerator.get_current();
                    $("#innerHTML").append(item.get_item("Title") + "<br />").css("background-color","yellow");
                }
            }
            function errorHandler(){
                $("#innerHTML").text(arguments[1].get_message()).css("background-color","red");
            }
        });
    });

</script>
<H2>Get items by ID using CAML Query</H2>
<div id="innerHTML"></div>
