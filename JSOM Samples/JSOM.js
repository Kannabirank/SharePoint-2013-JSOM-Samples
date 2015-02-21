<script type="text/javascript" language="javascript" src="http://spdev2013/QLDConnect/SiteAssets/jquery-1.10.2.min.js"></script>
<script type="text/javascript" language="javascript">

    function getLists()
    {
        SP.SOD.executeFunc('SP.js','SP.ClientContext', function() {
            var clientContext;
            var oWebsite;

            clientContext = new SP.ClientContext.get_current();
            oWebsite = clientContext.get_web();

            this.collList = oWebsite.get_lists();
            clientContext.load(this.collList);

            clientContext.executeQueryAsync(
                Function.createDelegate(this, successHandler),
                Function.createDelegate(this, errorHandler)
            );

            function successHandler() {
                var listInfo;
                var listEnumerator;

                listEnumerator = this.collList.getEnumerator();
        
                listInfo = "";
                while (listEnumerator.moveNext()) {
                    var oList = listEnumerator.get_current();
                    listInfo += "Title: " + oList.get_title() + " Created: " +
                        oList.get_created().toString() + "<br/>";
                    alert(listInfo);
                }

                listTitle.innerHTML = listInfo;
            }

            function errorHandler() {
                listTitle.innerHTML = "Request failed: " + arguments[1].get_message();
            }
        });
    }

    function createListItem()
    {
        SP.SOD.executeFunc('SP.js','SP.ClientContext', function() {
            alert('method call');
            var clientContext = SP.ClientContext.get_current();
            var webSite = clientContext.get_web();
            var list = webSite.get_lists().getByTitle('Site Pages');
            clientContext.load(list,'Include(Name)');
            clientContext.executeQueryAsync(
                Function.createDelegate(this, successHandler), Function.createDelegate(this, errorHandler)
                );

            function successHandler() {
                $('#listTitle').text(list.get_title());
            }

            function errorHandler() {
                $('#listTitle').text("error occured");
            }
            
        });
    }
    
    function getCurrentUser()
    {
        var userid= _spPageContextInfo.userId;
        var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/getuserbyid(" + userid + ")";
        var requestHeaders = { "accept" : "application/json;odata=verbose" };
        $.ajax({
            url : requestUri,
            contentType : "application/json;odata=verbose",
            headers : requestHeaders,
            success : onSuccess,
            error : onError
        });

        function onSuccess(data, request){
            var loginTitle = data.d.Title;
            $('#CurrentUser').text(loginTitle);
            var loginName = data.d.LoginName;
            $('#loginName').text(loginName);
        }

        function onError(error) {
            $('#CurrentUser').text("error has occured");
        }
    }
    
    $(document).ready(function() {

        SP.SOD.executeFunc('SP.js','SP.ClientContext', function() {
            var clientContext;
            clientContext = SP.ClientContext.get_current();
            this.webSite = clientContext.get_web();
            clientContext.load(this.webSite);
            getCurrentUser();

            clientContext.executeQueryAsync(
                Function.createDelegate(this, successHandler), Function.createDelegate(this, errorHandler)
                );

            function successHandler() {
                $('#SiteUrl').text(this.webSite.get_title());
            }

            function errorHandler() {
                $('#SiteUrl').text("error occured");
            }
        });
    });
</script>

<div id="SiteUrl">Click Me</div>
<div id="CurrentUser">Current User</div>
<div id="loginName"></div>
<div id="listTitle"></div>
<input onclick="createListItem()" name="createItem" type="button" value="Create List Item"></input>
