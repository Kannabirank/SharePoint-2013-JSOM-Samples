//CSR template properties

<script type="text/javascript" language="javascript" src="http://spdev2013/QLDConnect/SiteAssets/jquery-1.10.2.min.js"></script>
<script type="text/javascript">

var options = {
    OnPreRender: /* function or array of functions */,
    Templates: {
        View: /* function or string */,
        Body: /* function or string */,
        Header: /* function or string */,
        Footer: /* function or string */,
        Group: /* function or string */,
        Item: /* function or string */,
        Fields: {
            'Field1 Internal Name': {
                View: /* function or string */,
                EditForm: /* function or string */,
                DisplayForm: /* function or string */,
                NewForm: /* function or string */
                },
            'Field2 Internal Name': {
                View: /* function or string */,
                EditForm: /* function or string */,
                DisplayForm: /* function or string */,
                NewForm: /* function or string */
                },
            // .... and so on
        }
    },
    OnPostRender: /* function or array of functions */
    };

</script>