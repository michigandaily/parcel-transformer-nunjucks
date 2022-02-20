var $4BP8v$parcelplugin = require("@parcel/plugin");
var $4BP8v$nunjucks = require("nunjucks");

function $parcel$defineInteropFlag(a) {
  Object.defineProperty(a, '__esModule', {value: true, configurable: true});
}
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

$parcel$defineInteropFlag(module.exports);

$parcel$export(module.exports, "default", () => $f7f4a66df2960fae$export$2e2bcd8739ae039);


var $f7f4a66df2960fae$export$2e2bcd8739ae039 = new $4BP8v$parcelplugin.Transformer({
    async loadConfig ({ config: config  }) {
        var ref1;
        // load config file
        const { contents: contents  } = await config.getConfig([
            "config.json"
        ]);
        // find archie files to insert
        let archie = null;
        const confaml = contents.fetch.filter((d)=>!d.hasOwnProperty("sheetId")
        );
        if (confaml.length === 1) archie = (ref1 = await config.getConfig([
            confaml[0].output
        ])) === null || ref1 === void 0 ? void 0 : ref1.contents;
        else if (confaml.length > 1) archie = await Promise.all(confaml.map(async (aml)=>{
            var ref;
            return (ref = await config.getConfig([
                aml.output
            ])) === null || ref === void 0 ? void 0 : ref.contents;
        }));
        return {
            config: contents,
            env: process.env.NODE_ENV,
            archie: archie
        };
    },
    async transform ({ asset: asset , config: config  }) {
        $4BP8v$nunjucks.configure({
            autoescape: false
        });
        let code = await asset.getCode();
        let result = $4BP8v$nunjucks.renderString(code, config);
        asset.setCode(result);
        return [
            asset
        ];
    }
});


//# sourceMappingURL=index.js.map
