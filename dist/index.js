var $2E0hp$parcelplugin = require("@parcel/plugin");
var $2E0hp$nunjucks = require("nunjucks");

function $parcel$defineInteropFlag(a) {
  Object.defineProperty(a, '__esModule', {value: true, configurable: true});
}
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

$parcel$defineInteropFlag(module.exports);

$parcel$export(module.exports, "default", () => $9fc92474a186eb2d$export$2e2bcd8739ae039);


var $9fc92474a186eb2d$export$2e2bcd8739ae039 = new $2E0hp$parcelplugin.Transformer({
    async loadConfig ({ config: config  }) {
        // load config file
        const { contents: contents  } = await config.getConfig([
            "config.json"
        ]);
        // find archie files to insert
        let archie = null;
        const confaml = contents.fetch.filter((d)=>!d.hasOwnProperty("sheetId")
        );
        if (confaml.length === 1) archie = (await config.getConfig([
            confaml[0].output
        ]))?.contents;
        else if (confaml.length > 1) archie = await Promise.all(confaml.map(async (aml)=>(await config.getConfig([
                aml.output
            ]))?.contents
        ));
        return {
            config: contents,
            archie: archie
        };
    },
    async transform ({ asset: asset , config: config  }) {
        $2E0hp$nunjucks.configure({
            autoescape: false
        });
        let code = await asset.getCode();
        let result = $2E0hp$nunjucks.renderString(code, config);
        asset.setCode(result);
        return [
            asset
        ];
    }
});


//# sourceMappingURL=index.js.map
