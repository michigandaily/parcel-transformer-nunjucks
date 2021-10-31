var $17LRP$parcelplugin = require("@parcel/plugin");
var $17LRP$nunjucks = require("nunjucks");

function $parcel$defineInteropFlag(a) {
  Object.defineProperty(a, '__esModule', {value: true, configurable: true});
}
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

$parcel$defineInteropFlag(module.exports);

$parcel$export(module.exports, "default", () => $e5b6b42b2efa4b33$export$2e2bcd8739ae039);


var $e5b6b42b2efa4b33$export$2e2bcd8739ae039 = new $17LRP$parcelplugin.Transformer({
    async loadConfig ({ config: config  }) {
        // load config file
        const { contents: contents  } = await config.getConfig([
            "config.json"
        ]);
        // find archie files to insert
        let archie = null;
        if (contents.fetch.archie.output) archie = (await config.getConfig([
            contents.fetch.archie.output
        ])).contents;
        return {
            config: contents,
            archie: archie
        };
    },
    async transform ({ asset: asset , config: config  }) {
        $17LRP$nunjucks.configure({
            autoescape: false
        });
        let code = await asset.getCode();
        let result = $17LRP$nunjucks.renderString(code, config);
        asset.setCode(result);
        return [
            asset
        ];
    }
});


//# sourceMappingURL=index.js.map
