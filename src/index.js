import { Transformer } from "@parcel/plugin";
import { renderString, configure } from "nunjucks";

export default new Transformer({
  async loadConfig({ config }) {
    // load config file
    const { contents } = await config.getConfig(["config.json"]);
    // find archie files to insert
    let archie = null;
    const confaml = contents.fetch.filter(d => !d.hasOwnProperty("sheetId"));
    if (confaml.length === 1) {
      archie = (await config.getConfig([confaml[0].output]))?.contents;
    }
    else if (confaml.length > 1) {
      archie = await Promise.all(confaml.map(async aml => (await config.getConfig([aml.output]))?.contents));
    }

    return {
      config: contents,
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
