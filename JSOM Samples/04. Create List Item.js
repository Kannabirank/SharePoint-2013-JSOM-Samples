<script type="text/javascript" language="javascript" src="http://spdev2013/QLDConnect/SiteAssets/jquery-1.10.2.min.js"></script>
<script type="text/javascript" language="javascript">
    
    function createListItem()
    {
        //load script on demand
        SP.SOD.executeFunc('SP.js','SP.ClientContext', function() {
            //do something
            var clientContext;
            var oWebsite;
            var oList;
            var itemCreateInfo;

            clientContext = new SP.ClientContext.get_current();
            oWebsite = clientContext.get_web();
            oList = oWebsite.get_lists().getByTitle("Announcements");

            itemCreateInfo = new SP.ListItemCreationInformation();
            this.oListItem = oList.addItem(itemCreateInfo);
            this.oListItem.set_item("Title", "My New Item!");
            this.oListItem.set_item("Body", "Hello World!");
            this.oListItem.update();
    
            clientContext.load(this.oListItem);
            clientContext.executeQueryAsync(
                Function.createDelegate(this, successHandler),
                Function.createDelegate(this, errorHandler)
            );
            function successHandler() {
                resultpanel.innerHTML = "Go to the <a href='../Lists/Announcements'>list</a> to \
                        see your new item. Item id is " + this.oListItem.get_id() + " and \
                        Item title is " + this.oListItem.get_item('Title');
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
<H1>Create List Item</H1>
<input onclick="createListItem()" name="createItem" type="button" value="Create List Item"></input>
<div id="resultpanel"></div>