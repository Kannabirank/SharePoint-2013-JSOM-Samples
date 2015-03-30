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
            var query = "<View Scope='RecursiveAll'><Query><Where><And><Eq><FieldRef Name='FileRef'/><Value Type='URL'>" + folderUrl + "</Value></Eq><Eq><FieldRef Name='FSObjType'/><Value Type='Integer'>1</Value></Eq></And></Where></Query></View>";
            var list = web.get_lists().getByTitle("Discussions List");
            var camlQuery = new SP.CamlQuery();
            camlQuery.set_viewXml(query);

            var colItems = list.getItems(camlQuery);
            context.load(list);
            context.load(colItems,"Include(Title, ID)");
            
            context.executeQueryAsync(
                Function.createDelegate(this, successHandler),
                Function.createDelegate(this, errorHandler));

            function successHandler() {
                var itemEnumerator = colItems.getEnumerator();
                while (itemEnumerator.moveNext()) {
                    var item = itemEnumerator.get_current();
                    $("#resultPanel").append(item.get_item("Title") + " ID=" + item.get_item("ID") + "<br />").css("background-color","yellow");
                }
            }
            function errorHandler(){
                $("#resultPanel").text(arguments[1].get_message()).css("background-color","red");
            }
        });
    });

</script>
<H2>Get items from list by folder url</H2>
<div id="resultPanel"></div>
