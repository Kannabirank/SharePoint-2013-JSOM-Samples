<script type="text/javascript" language="javascript">
    
    $(document).ready(function() {
	
        //load script on demand
        SP.SOD.executeFunc('SP.js','SP.ClientContext', function() {

            function setTaxonomyControlObjectValue(webTaggingId, termValue) {
                var webTaggingCtl = $get(webTaggingId);
                var taxCtlObj = new Microsoft.SharePoint.Taxonomy.ControlObject(webTaggingCtl);
                taxCtlObj.enableControl(true);
                taxCtlObj.setRawText(termValue);
                taxCtlObj.retrieveTerms();
                taxCtlObj.validateAll();
            }

            function getTaxonomyControlObjectValue(webTaggingId) {
                var webTaggingCtl = $get(webTaggingId);

                var taxCtlObj = new Microsoft.SharePoint.Taxonomy.ControlObject(webTaggingCtl);
                var termValue = taxCtlObj.getRawText();
                return termValue;
            }


            //Getting TaxonomyWebTaggingControl control value
            function getTaxValue() {
                var webTaggingId = "ctl00_PlaceHolderMain_ctl02";
                setTaxonomyControlObjectValue(webTaggingId, "Business Services|b5fd1e51-9df5-4dbd-be69-302ceb542f39;Admin|e859fc77-2c38-4753-90d5-8045b5f61679");
                var termValue = getTaxonomyControlObjectValue(webTaggingId);
                alert(termValue);
            }          
            ExecuteOrDelayUntilScriptLoaded(getTaxValue, 'ScriptForWebTaggingUI.js');
        });
    });

</script>

