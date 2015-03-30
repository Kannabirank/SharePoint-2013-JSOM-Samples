<script type="text/javascript" language="javascript" src="http://spdev2013/QLDConnect/SiteAssets/jquery-1.10.2.min.js"></script>
<script type="text/javascript" language="javascript">
    
    $(document).ready(function() {
	
        //load script on demand
        SP.SOD.executeFunc('SP.js','SP.ClientContext', function() {
            
            var context = new SP.ClientContext.get_current();
            var web = context.get_web();
            var folder = web.getFolderByServerRelativeUrl("/QLDConnect/Lists/Community Discussion");
            var parentFolder = folder.get_parentFolder();
            context.load(parentFolder);
            
            context. executeQueryAsync(function(){
                var query = new SP.CamlQuery();
                query.set_folderServerRelativeUrl(parentFolder.get_serverRelativeUrl());
                var list = web.get_lists().getByTitle("Discussions List");
                var allItems = list.getItems(query);
                context.load(list);
                context.load(allItems, "Include(ID, Title, FileSystemObjectType, File, Modified, FileRef, FSObjType)");
                context.executeQueryAsync(function(){
                    var itemsEnumerator = allItems.getEnumerator();
                    while(itemsEnumerator.moveNext()){
                        var item = itemsEnumerator.get_current();
                        var fileType = item.get_fileSystemObjectType();
                        $("#innerHTML").append(item.get_item("Title") + " " + item.get_item("ID") + " FSObjType=" + item.get_item("FSObjType") + " " + item.get_item("FileRef") + "<br />").css("background-color","yellow");
                    }
                }, function(){});
            }, function(){});
        });
    });

</script>
<H2>Get all items from List</H2>
<div id="innerHTML"></div>
