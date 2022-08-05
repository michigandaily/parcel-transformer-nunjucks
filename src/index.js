import { Transformer } from "@parcel/plugin";
import { renderString, configure } from "nunjucks";

export default new Transformer({
  async loadConfig({ config }) {
    // load config file
    const { contents } = await config.getConfig(["config.json"]);

    // find archie files to insert
    const confaml = contents?.fetch?.filter(
      (d) =>
        !d.hasOwnProperty("sheetId") && d.id.length > 0 && d.output.length > 0
    );

    let archie = null;
    if (confaml) {
      archie = await Promise.all(confaml.map(async aml => (await config.getConfig([aml.output]))?.contents));
      if (confaml.length === 1) {
        archie = archie.at(0);
      }
    }

    return {
      config: contents,
      env: process.env.NODE_ENV,
      archie,
    };
  },
  async transform({ asset, config }) {
    configure({ autoescape: false })
    let code = await asset.getCode();
    let result = renderString(code, config)
    asset.setCode(result)
    return [asset];
  },
});
