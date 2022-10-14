# `parcel-transformer-nunjucks`

[Transformer](https://parceljs.org/plugin-system/transformer/) for `parcel` that
allows for nunjucks templating.

This loads data from JSON files specified in `config.json`, as well as
`config.json` itself.

```json5
// .parcelrc
{
  "extends": "@parcel/config-default",
  "transformers": {
      "*.html": ["@michigandaily/parcel-transformer-nunjucks", "..."]
  }
}
```

**Note:** updates to the source JSON files won't cause Parcel to rebuild; you
need to manually trigger a rebuild by e.g. `touch`ing or saving the HTML file.

Run `npx parcel build` when developing to test the transformer.
