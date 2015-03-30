<script type="text/javascript" language="javascript" src="http://spdev2013/QLDConnect/SiteAssets/jquery-1.10.2.min.js"></script>
<script type="text/javascript" language="javascript">
    
    $(document).ready(function() {
	
        //load script on demand
        SP.SOD.executeFunc('SP.js','SP.ClientContext', function() {
            
            var context = new SP.ClientContext.get_current();
            var web = context.get_web();
            //var folder = web.getFolderByServerRelativeUrl("/QLDConnect/Lists/Community Discussion/Common Questions and Concerns about Skype for Business"); 
            var folder = web.getFolderByServerRelativeUrl("/QLDConnect/Lists/Announcements/folder1"); 
            context.load(folder);
            
            context.executeQueryAsync(
                Function.createDelegate(this, successHandler),
                Function.createDelegate(this, errorHandler));

            function successHandler() {
                var query = new SP.CamlQuery(); 
                query.set_folderServerRelativeUrl(folder.get_serverRelativeUrl()); 
                alert(folder.get_serverRelativeUrl());
                var list = web.get_lists().getByTitle("Announcements");
                var allItems = list.getItems(query); 
                context.load(allItems, "Include(Title, FileSystemObjectType, File)"); 
                context.executeQueryAsync(function(){
                    var itemsEnumerator = allItems.getEnumerator();
                    while(itemsEnumerator.moveNext()){ 
                        var item = itemsEnumerator.get_current(); 
                        var fileType = item.get_fileSystemObjectType(); 
                        $("#resultpanel").text(item.get_item("Title")).css("background-color","yellow");
                    }
                },function(){
                    $("#resultpanel").text(arguments[1].get_message()).css("background-color","red");
                });
            }
            function errorHandler() {
                resultpanel.innerHTML = "Request failed: " + arguments[1].get_message();
            }
        });
    });

</script>
<H2>Get all items from List</H2>
<div id="resultpanel"></div>
