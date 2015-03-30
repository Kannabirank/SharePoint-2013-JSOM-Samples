(function () {
    if (typeof SPClientTemplates === 'undefined')
        return;

    var calendarCtx = {};
    calendarCtx.Templates = {};
    calendarCtx.Templates.Header = "";
    calendarCtx.Templates.Item = formatItem;
    calendarCtx.Templates.Footer = "";

    SPClientTemplates.TemplateManager.RegisterTemplateOverrides(calendarCtx);
})();

function formatItem(ctx) {
	
    var htmlSnippet = '<div style="width:100%;">';
    htmlSnippet += '<div style="width: 80%; float:left;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">';
    htmlSnippet += ctx.CurrentItem.Title;
    htmlSnippet += '</div>';
    htmlSnippet += '<div style="width: 20%; float:right">';
    htmlSnippet += ctx.CurrentItem.Title;
    htmlSnippet += '</div>';
    htmlSnippet += '</div>';
    
    return htmlSnippet;
}