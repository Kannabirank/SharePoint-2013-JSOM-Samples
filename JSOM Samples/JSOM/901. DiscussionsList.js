<script type="text/javascript" language="javascript" src="http://spdev2013/QLDConnect/SiteAssets/jquery-1.10.2.min.js"></script>
<script type="text/javascript" language="javascript">

var discussionId;
var newformUrl = "/QLDConnect/Lists/GoingNotGoing/NewForm.aspx";

var options = { 
    url: newformUrl, 
    title: "Going/NotGoing form", 
    allowMaximize: true, 
    showClose: true, 
    width: 625, 
    height: 525, 
    dialogReturnValueCallback: silentCallback
}; 

function open(gng) {
    options.url = "";
    options.url = newformUrl + "?ID=" + discussionId;
    if (gng == 'y') {
        options.url = options.url + "&gng=y";
    }else if(gng == 'n'){
        options.url = options.url + "&gng=n";
    }
    SP.UI.ModalDialog.showModalDialog(options);
} 
function silentCallback(dialogResult, returnValue) { 
} 
function refreshCallback(dialogResult, returnValue) { 
    SP.UI.Notify.addNotification('Please wait'); 
    SP.UI.ModalDialog.RefreshPage(SP.UI.DialogResult.OK); 
} 

function getCurrentUser()
{
    SP.SOD.executeFunc('SP.js','SP.ClientContext', function() {
        var context = new SP.ClientContext.get_current();
        this.website = context.get_web();
        this.currentUser = website.get_currentUser();
        context.load(currentUser);
        context.executeQueryAsync(Function.createDelegate(this, this.onQuerySucceeded), Function.createDelegate(this, this.onQueryFailed));

        function onQuerySucceeded(sender, args)
        {
            alert(currentUser.get_loginName());
        }

        function onQueryFailed(sender, args)
        {
            alert('request failed ' + args.get_message() + '\n'+ args.get_stackTrace());
        }
    });
}

function checkGonoGoStatus()
{
    SP.SOD.executeFunc('SP.js','SP.ClientContext', function() {
        var context = new SP.ClientContext.get_current();
        var web = context.get_web();
        var list = web.get_lists().getByTitle("Going / NotGoing");

    });
}


$(document).ready(
  function() {

      $('#commandBar0 > span > ul > li:eq(1)')
            .after('<li class="ms-comm-cmdSpaceListItem ms-noList" id="going0"><a class="ms-secondaryCommandLink" \
      id="commandBar0-going-link" \
      href="javascript:open(\'y\')">I want to go</a></li>');

      $('#commandBar0 > span > ul > li:eq(2)')
        .after('<li class="ms-comm-cmdSpaceListItem ms-noList" id="notGoing0"><a class="ms-secondaryCommandLink" id="commandBar0-notGoing-link" href="javascript:open(\'n\')">Not Going</a></li>');

          //load script on demand
          SP.SOD.executeFunc('SP.js','SP.ClientContext', function() {
            
              //getCurrentUser();

              var context = new SP.ClientContext.get_current();
              var web = context.get_web();

              var folderUrl = GetUrlKeyValue('RootFolder');
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
                      //options.url = options.url + "?ID=" + item.get_item("ID");
                      discussionId = item.get_item("ID");
                  }

              }
              function errorHandler(){
                  //$("#resultPanel").text(arguments[1].get_message()).css("background-color","red");
              }
          });
  });

</script>