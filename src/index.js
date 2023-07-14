import { basename, extname } from "node:path";

import { Transformer } from "@parcel/plugin";
import nunjucks from "nunjucks";

export default new Transformer({
  async loadConfig({ config }) {
    // load config file
    const { contents } = await config.getConfig(["config.json"]);
    // find archie files to insert
    let archie = null;
    const confaml = contents?.fetch?.filter(d => extname(d.output) === ".json");
    if (confaml?.length === 1) {
      archie = (await config.getConfig([confaml[0].output]))?.contents;
    } else if (confaml?.length > 1) {
      archie = await Promise.all(
        confaml.map(
          async (aml) => (await config.getConfig([aml.output]))?.contents
        )
      );
    }

    return {
      config: contents,
      env: process.env.NODE_ENV,
      archie,
    };
  },
  async transform({ asset, config }) {
    nunjucks.configure({ autoescape: false });
    let code = await asset.getCode();
    let result = nunjucks.renderString(code, {
      ...config,
      filename: basename(asset.filePath),
    });
    asset.setCode(result);
    return [asset];
  },
});
