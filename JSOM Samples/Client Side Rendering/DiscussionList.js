<script type="text/javascript" language="javascript" src="http://spdev2013/QLDConnect/SiteAssets/jquery-1.10.2.min.js"></script>
<script type="text/javascript">
(function () {
    if (typeof SPClientTemplates === 'undefined')
        return;

    var listCtx = {};

    listCtx.Templates = {};
    listCtx.OnPostRender = method1;

    /*
    listCtx.Templates.Fields = {
        'RiskRating': {
            'View': riskRatingView,
            'NewForm': riskRatingNewForm
        }
    };*/

    SPClientTemplates.TemplateManager.RegisterTemplateOverrides(listCtx);

})();

function method1(ctx)
{
    var x = ctx.ListTitle;
    if (x == "Discussions List")
    {
        alert(ctx.ListData.Row[0].ID);
        alert($('#commandBar0-going-link').text());
    }

}
</script>