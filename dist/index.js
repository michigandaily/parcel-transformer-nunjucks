var $j4vYq$parcelplugin = require("@parcel/plugin");
var $j4vYq$nunjucks = require("nunjucks");

function $parcel$defineInteropFlag(a) {
  Object.defineProperty(a, '__esModule', {value: true, configurable: true});
}
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

$parcel$defineInteropFlag(module.exports);

$parcel$export(module.exports, "default", () => $3a3c823fbf0d9b07$export$2e2bcd8739ae039);


var $3a3c823fbf0d9b07$export$2e2bcd8739ae039 = new $j4vYq$parcelplugin.Transformer({
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
            env: "production",
            archie: archie
        };
    },
    async transform ({ asset: asset , config: config  }) {
        $j4vYq$nunjucks.configure({
            autoescape: false
        });
        let code = await asset.getCode();
        let result = $j4vYq$nunjucks.renderString(code, config);
        asset.setCode(result);
        return [
            asset
        ];
    }
});


//# sourceMappingURL=index.js.map
