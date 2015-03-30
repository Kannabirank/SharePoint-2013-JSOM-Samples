<script type="text/javascript" language="javascript" src="http://spdev2013/QLDConnect/SiteAssets/jquery-1.10.2.min.js"></script>
<script type="text/javascript" language="javascript">
    
    $(document).ready(function() {
	
        //load script on demand
        SP.SOD.executeFunc('SP.js','SP.ClientContext', function() {
            
            var context = new SP.ClientContext.get_current();
            var web = context.get_web();
            var list = web.get_lists().getByTitle("Discussions List");
            var folders = list.get_rootFolder().get_folders();
            
            //var folder = web.getFolderByServerRelativeUrl("/QLDConnect/Lists/Community Discussion");
            //var parentFolder = folder.get_parentFolder();
            context.load(list);
            context.load(folders,"Include(Name)");
            
            context.executeQueryAsync(
                Function.createDelegate(this, successHandler),
                Function.createDelegate(this, errorHandler));

            function successHandler() {
                var itemsEnumerator = folders.getEnumerator();
                while(itemsEnumerator.moveNext()){
                    var folder = itemsEnumerator.get_current();
                    alert(folder.get_name("Name"));
                }
            }
            function errorHandler() {
                resultpanel.innerHTML = "Request failed: " + arguments[1].get_message();
            }

            /*
            context. executeQueryAsync(function(){
                var query = new SP.CamlQuery();
                query.set_folderServerRelativeUrl(parentFolder.get_serverRelativeUrl());
                var list = web.get_lists().getByTitle("Discussions List");
                var allItems = list.getItems(query);
                context.load(list);
                context.load(allItems, "Include(ID, Title, FileSystemObjectType, File, Modified)");
                context.executeQueryAsync(function(){
                    var itemsEnumerator = allItems.getEnumerator();
                    while(itemsEnumerator.moveNext()){
                        var item = itemsEnumerator.get_current();
                        var fileType = item.get_fileSystemObjectType();
                        $("#innerHTML").append(item.get_item("Title") + " " + item.get_item("ID") + " " + item.get_item("Modified") + "<br />").css("background-color","yellow");
                    }
                }, function(){});
            }, function(){}); */
        });
    });

</script>
<H2>Get all items from List. Demonstrates the use of getEnumerator()</H2>
<div id="resultpanel"></div>
