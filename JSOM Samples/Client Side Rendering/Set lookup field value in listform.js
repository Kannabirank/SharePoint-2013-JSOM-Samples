
<script type="text/javascript" language="javascript">
(function () {    
    var ctx = {};
    ctx.Templates = {};
    ctx.Templates.Fields = {
        'Discussion_x0020_Topic': {
            'NewForm': setDiscussionTopic
        },
        'Are_x0020_You_x0020_Going_x003f_': { 
            'NewForm': setAreYouGoing
        }
    };
    SPClientTemplates.TemplateManager.RegisterTemplateOverrides(ctx);
})();


function setDiscussionTopic(ctx) {
    var discussionId= GetUrlKeyValue('ID'); 
    if (discussionId)
    {
        ctx.CurrentFieldValue =  discussionId;  
    }
    return SPFieldLookup_Edit(ctx);
}
function setAreYouGoing(ctx) {
    var goNogo = GetUrlKeyValue('gng'); 
    if (goNogo)
    {
        if (goNogo=="y") {
            ctx.CurrentFieldValue =  "I'm Going";  
        } else if(goNogo=="n") {
            ctx.CurrentFieldValue = "Can't Attend";
        }
    }
    return SPFieldChoice_Edit(ctx);
}

</script>