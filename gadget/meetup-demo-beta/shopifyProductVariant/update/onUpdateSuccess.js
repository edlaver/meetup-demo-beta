/**
 * Effect code for update on Shopify Product Variant
 * @param { import("gadget-server").UpdateShopifyProductVariantActionContext } context - Everything for running this effect, like the api client, current record, params, etc. More on effect context: https://docs.gadget.dev/guides/extending-with-code#effect-context
 */
module.exports = async ({ api, record, params, logger, connections }) => {
  // access the shopifyProductVariant record's data with the record object
  // console.log(record.id)

  // make an API call to Shopify with the connections.shopify object
  // console.log(await connections.shopify.current.shop.get())

  // update model fields on the current record or other models with the api object
  // await api.internal.shopifyProductVariant.update(record.id, { shopifyProductVariant: { ... } });

  // make API calls to other systems with libraries from npm
  // make sure to first add axios as a dependency in your package.json
  // const axios = require("axios");
  // await axios.post("https://some-other-api.com/v1/api", { body: record.toJSON() });

  // Show record changes on webhook handling:
  const variantID = record.id;

  const recordChanges = record.changes();
  logger.info({ variantID, record, recordChanges }, "Product Variant updated");

  // E.g.:
  // "price": {
  //   "current": "799.95",
  //   "previous": "789.95"
  // },

  if (record.changed("price")) {
    const { current, previous } = recordChanges.price;

    logger.info(
      { variantID, current, previous },
      "Price changed for variant..."
    );
  }
};
