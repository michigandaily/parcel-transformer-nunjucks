import { Transformer } from "@parcel/plugin";
import { renderString, configure } from "nunjucks";

export default new Transformer({
  async loadConfig({ config }) {
    // load config file
    const { contents } = await config.getConfig(["config.json"]);
    // find archie files to insert
    let archie = null;
    if (contents.fetch.archie.output) {
      archie = (await config.getConfig([contents.fetch.archie.output])).contents;
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
