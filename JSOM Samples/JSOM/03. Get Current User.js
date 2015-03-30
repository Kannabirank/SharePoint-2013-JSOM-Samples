<script type="text/javascript" language="javascript" src="http://spdev2013/QLDConnect/SiteAssets/jquery-1.10.2.min.js"></script>
<script type="text/javascript" language="javascript">

    //Author: Kannan Karmegam
    //Date: 20/02/2014
    //To test this code create a page in  SitePages library and then insert a Script Editor Webpart
    //https://insmsmt.sharepoint.com/innovation/Ideas%20starting%20%20June%202014/QLD%20Connect/SiteAssets/jquery-1.10.2.min.js

    //Method 1 : call rest api... works!!!
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
            $('#CurrentUser').text(data.d.Title);

            var loginName = data.d.LoginName; // i:0#.w|sphome\kannan
            $('#loginName').text(loginName);
        }

        function onError(error) {
            $('#CurrentUser').text("error has occured");
        }
    }

    //Method 2: use _spPageContextInfo global object... don't use...not tested
    function getCurrentUserFromSPPageContextInfo() {
        var currentUser = _spPageContextInfo.userLoginName;
        alert(currentUser);
    }

    //Method 3: load current user to client context... don't use.. code not tested
    function getCurrentUserFromClientContext() {

        SP.SOD.executeFunc('SP.js', 'SP.ClientContext', function () {
            var clientContext = SP.ClientContext.get_current();
            this.webSite = clientContext.get_web();
            
            this.currentUser = this.webSite.get_currentUser();
            //clientContext.load(this.webSite);
            clientContext.load(this.currentUser);
            clientContext.executeQueryAsync(onSuccess, onFailure);
            function onSuccess() {
                alert(this.currentUser.get_title());
            }
            function onFailure() {
                alert('error');
            }
        });
    }

    $(document).ready(function () {

        //load script on demand
        SP.SOD.executeFunc('SP.js', 'SP.ClientContext', function () {

            getCurrentUserFromRestApi();
            //getCurrentUserFromSPPageContextInfo();
            getCurrentUserFromClientContext();

        });
    });
</script>
<div id="CurrentUser"></div>
<div id="loginName"></div>
