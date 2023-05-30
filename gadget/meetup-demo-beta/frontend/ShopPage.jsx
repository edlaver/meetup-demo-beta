import { useFindMany, useQuery } from "@gadgetinc/react";
import {
  Banner,
  FooterHelp,
  Layout,
  LegacyCard,
  Link,
  Page,
  IndexTable,
  Spinner,
  Text,
  LegacyStack,
  Badge,
  Button,
} from "@shopify/polaris";
import { api } from "./api";

const ShopPage = () => {
  const [{ data, error, fetching }, refresh] = useFindMany(api.shopifyProduct, {
    select: {
      id: true,
      title: true,
      createdAt: true,
      updatedAt: true,
      variants: {
        edges: {
          node: {
            id: true,
            price: true,
            lowestPrice: true,
            lowestPriceUpdatedAt: true,
          },
        },
      },
    },
  });

  const productData = data?.map((product) => {
    const firstVariant = product.variants.edges[0].node;
    return {
      id: product.id,
      title: product.title,
      price: firstVariant.price,
      lowestPrice: firstVariant.lowestPrice,
      lowestPriceUpdatedAt:
        firstVariant.lowestPriceUpdatedAt &&
        new Date(firstVariant.lowestPriceUpdatedAt).toLocaleString(),
      updatedAt: new Date(product.updatedAt).toLocaleString(),
    };
  });

  const resourceName = {
    singular: "product",
    plural: "products",
  };

  const rowMarkup = productData?.map(
    (
      { id, title, price, updatedAt, lowestPrice, lowestPriceUpdatedAt },
      index
    ) => (
      <IndexTable.Row id={id} key={id} position={index}>
        <IndexTable.Cell>
          <Text variant="bodyMd" fontWeight="bold" as="span">
            {title}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>£{price}</IndexTable.Cell>
        <IndexTable.Cell>{lowestPrice}</IndexTable.Cell>
        <IndexTable.Cell>{lowestPriceUpdatedAt}</IndexTable.Cell>
        <IndexTable.Cell>{updatedAt}</IndexTable.Cell>
      </IndexTable.Row>
    )
  );

  if (error) {
    return (
      <Page title="Error">
        <Text variant="bodyMd" as="p">
          Error: {error.toString()}
        </Text>
      </Page>
    );
  }

  if (fetching) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          width: "100%",
        }}
      >
        <Spinner accessibilityLabel="Spinner example" size="large" />
      </div>
    );
  }

  return (
    <Page title="App">
      <Layout>
        <Layout.Section>
          {/* <code>{JSON.stringify(productData[0], null, 2)}</code> */}
          <LegacyCard>
            <IndexTable
              resourceName={resourceName}
              itemCount={productData.length}
              headings={[
                { title: "Title" },
                { title: "Price" },
                { title: "Lowest Price" },
                { title: "LP Updated At" },
                { title: "Updated At" },
              ]}
            >
              {rowMarkup}
            </IndexTable>
          </LegacyCard>
          <br />
          <LegacyStack>
            <LegacyStack.Item fill></LegacyStack.Item>
            <LegacyStack.Item>
              <Button
                onClick={() => {
                  refresh();
                }}
              >
                Reload
              </Button>
            </LegacyStack.Item>
          </LegacyStack>
        </Layout.Section>
        <Layout.Section>
          <FooterHelp>
            <p>
              Powered by{" "}
              <Link url="https://gadget.dev" external>
                gadget.dev
              </Link>
            </p>
          </FooterHelp>
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default ShopPage;
