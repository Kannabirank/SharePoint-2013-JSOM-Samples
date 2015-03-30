<script type="text/javascript" language="javascript" src="http://spdev2013/QLDConnect/SiteAssets/jquery-1.10.2.min.js"></script>
<script type="text/javascript" language="javascript">
	$(document).ready(function() {
	
		//load script on demand
		SP.SOD.executeFunc('SP.js','SP.ClientContext', function() {

			$('#pageContextInfo').append("alertsEnabled = " + _spPageContextInfo.alertsEnabled + "<br />");
			$('#pageContextInfo').append("allowSilverlightPrompt = " + _spPageContextInfo.allowSilverlightPrompt + "<br />");
			$('#pageContextInfo').append("clientServerTimeDelta = " + _spPageContextInfo.clientServerTimeDelta + "<br />");
			$('#pageContextInfo').append("crossDomainPhotosEnabled = " + _spPageContextInfo.crossDomainPhotosEnabled + "<br />");
			$('#pageContextInfo').append("currentLanguage = " + _spPageContextInfo.currentLanguage + "<br />");
			$('#pageContextInfo').append("currentUICultureName = " + _spPageContextInfo.currentUICultureName + "<br />");
			$('#pageContextInfo').append("layoutsUrl = " + _spPageContextInfo.layoutsUrl + "<br />");
			$('#pageContextInfo').append("pageListId = " + _spPageContextInfo.pageListId + "<br />");
			$('#pageContextInfo').append("pagePersonalizationScope = " + _spPageContextInfo.pagePersonalizationScope + "<br />");
			$('#pageContextInfo').append("serverRequestPath = " + _spPageContextInfo.serverRequestPath + "<br />");
			$('#pageContextInfo').append("siteAbsoluteUrl = " + _spPageContextInfo.siteAbsoluteUrl + "<br />");
			$('#pageContextInfo').append("siteClientTag = " + _spPageContextInfo.siteClientTag + "<br />");
			$('#pageContextInfo').append("siteServerRelativeUrl = " + _spPageContextInfo.siteServerRelativeUrl + "<br />");
			$('#pageContextInfo').append("systemUserKey = " + _spPageContextInfo.systemUserKey + "<br />");
			$('#pageContextInfo').append("tenantAppVersion = " + _spPageContextInfo.tenantAppVersion + "<br />");
			$('#pageContextInfo').append("userId = " + _spPageContextInfo.userId + "<br />");
			$('#pageContextInfo').append("tenantAppVersion = " + _spPageContextInfo.tenantAppVersion + "<br />");
			$('#pageContextInfo').append("webAbsoluteUrl = " + _spPageContextInfo.webAbsoluteUrl + "<br />");
			$('#pageContextInfo').append("webLanguage = " + _spPageContextInfo.webLanguage + "<br />");
			$('#pageContextInfo').append("webLogoUrl = " + _spPageContextInfo.webLogoUrl + "<br />");
			$('#pageContextInfo').append("webPermMasks = " + _spPageContextInfo.webPermMasks + "<br />");
			$('#pageContextInfo').append("webServerRelativeUrl = " + _spPageContextInfo.webServerRelativeUrl + "<br />");
			$('#pageContextInfo').append("webTemplate = " + _spPageContextInfo.webTemplate + "<br />");
			$('#pageContextInfo').append("webTitle = " + _spPageContextInfo.webTitle + "<br />");
		});
	});
</script>
<h1>_spPageContextInfo object properties</h1>
<div id="pageContextInfo"></div>
