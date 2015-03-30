<script type="text/javascript" language="javascript" src="http://spdev2013/QLDConnect/SiteAssets/jquery-1.10.2.min.js"></script>
<script type="text/javascript" language="javascript">
    
    function CheckPermissionOnWeb() 
    {
        context = new SP.ClientContext.get_current();
        web = context.get_web();
        this._currentUser = web.get_currentUser();
        context.load(this._currentUser);
        context.load(web,'EffectiveBasePermissions');

        context.executeQueryAsync(Function.createDelegate(this, this.onSuccessMethod), Function.createDelegate(this, this.onFailureMethod));        

        function onSuccessMethod(sender, args) 
        {
            if (web.get_effectiveBasePermissions().has(SP.PermissionKind.editListItems)) 
            {
                //User Has Edit Permissions
                alert('YEAH, edit list permissions!');
            }
        }
    } 

    function createListItem()
    {
        //load script on demand
        SP.SOD.executeFunc('SP.js','SP.ClientContext', function() {
            //do something
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
