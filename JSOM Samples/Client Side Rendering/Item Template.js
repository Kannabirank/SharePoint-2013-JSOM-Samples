<script type="text/javascript" language="javascript" src="http://spdev2013/QLDConnect/SiteAssets/jquery-1.10.2.min.js"></script>
<script type="text/javascript">
(function () {
    if (typeof SPClientTemplates === 'undefined')
    {
        alert('undefined');	
        return;
    }
    var calendarCtx = {};
    calendarCtx.Templates = {};
    calendarCtx.Templates.Header = "";
    calendarCtx.Templates.Item = formatItem;

    SPClientTemplates.TemplateManager.RegisterTemplateOverrides(calendarCtx);
})();

function formatItem(ctx) {
    var htmlSnippet = "<h2>" + ctx.CurrentItem.Title + "</h2>";
    var htmlSnippet = "<h2>hello</h2>";
    return htmlSnippet;
}
</script>