var $4BP8v$nodepath = require("node:path");
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



var $f7f4a66df2960fae$export$2e2bcd8739ae039 = new (0, $4BP8v$parcelplugin.Transformer)({
    async loadConfig ({ config: config  }) {
        // load config file
        const { contents: contents  } = await config.getConfig([
            "config.json"
        ]);
        // find archie files to insert
        let archie = null;
        const confaml = contents?.fetch?.filter((d)=>(0, $4BP8v$nodepath.extname)(d.output) === ".json");
        if (confaml?.length === 1) archie = (await config.getConfig([
            confaml[0].output
        ]))?.contents;
        else if (confaml?.length > 1) archie = await Promise.all(confaml.map(async (aml)=>(await config.getConfig([
                aml.output
            ]))?.contents));
        return {
            config: contents,
            env: process.env.NODE_ENV,
            archie: archie
        };
    },
    async transform ({ asset: asset , config: config  }) {
        (0, $4BP8v$nunjucks.configure)({
            autoescape: false
        });
        let code = await asset.getCode();
        let result = (0, $4BP8v$nunjucks.renderString)(code, {
            ...config,
            filename: (0, $4BP8v$nodepath.basename)(asset.filePath)
        });
        asset.setCode(result);
        return [
            asset
        ];
    }
});


//# sourceMappingURL=index.js.map
