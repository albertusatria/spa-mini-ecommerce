import { useRouter } from "next/router";
import Layout from "../../../components/layout";
import { withApollo } from "../../../lib/apollo";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import Link from "next/link";
import ReactHtmlParser from "react-html-parser";
import Price from "../../../components/price"

const Category = () => {
    const router = useRouter();
    const { id } = router.query;
    const categoryPageID = "Category: " + id;
    const CATEGORY = gql`
        query getCategoryById($id: String!) {
            categoryList(filters: { ids: { eq: $id } }) {
                name
                url_key
                image_path
                description
                products {
                    items {
                        id
                        name
                        url_key
                        description {
                            html
                        }
                        small_image {
                            url
                        }
                        price_range {
                            minimum_price {
                                regular_price {
                                    currency
                                    value
                                }
                                final_price {
                                    currency
                                    value
                                }
                            }
                        }
                    }
                }
            }
        }
    `;
    const CATEGORY_DATA = gql`
        {
            categoryList(filters: { ids: { eq: "${id}" } }) {
                name
                description
                url_path
                image_path
                products(currentPage: 1, pageSize: 10) {
                    items {
                        id
                        name
                        sku
                        url_key
                        image {
                            label
                            url
                        }
                        price_range {
                            minimum_price {
                              regular_price {
                                currency
                                value
                              }
                              final_price {
                                currency
                                value
                              }
                            }
                        }
                      }
                }
            }
        }
    `;

    const pageConfig = {
        title: categoryPageID,
    };

    const { loading, data } = useQuery(CATEGORY, {
        fetchPolicy: "network-only",
        variables: {id: id}
    });

    if (loading) {
        return <span>... loading ...</span>;
    }

    const categorydata = data.categoryList[0];
    
    return (
        <div>
            <Layout pageConfig={pageConfig}>id: {id}</Layout>
            <h1 className="page-title">{categorydata.name}</h1>
            {categorydata.description ? (
                <div className="category-description">
                    {ReactHtmlParser(categorydata.description)}
                </div>
            ) : null}
            {categorydata.image_path ? (
                <div className="category-banner">
                    <img src={categorydata.image_path} alt={categorydata.name} 
                    style={{
                        width: '100%',
                        maxWidth: '100%',
                        maxHeight: '100%',
                    }}/>
                </div>
            ) : null}
            <div className="products-grid">
                {categorydata.products.items.length ? (
                    <ol className="products list">
                        {categorydata.products.items.map((productdata) => (
                            <li className="product-item" key={productdata.id}>
                                <Link
                                    href="/catalog/product/[...slug]"
                                    as={`/catalog/product/${productdata.url_key}`}
                                ><a>{productdata.url_key}</a>
                                </Link>                                
                                <div className="product-item-info">
                                    <div className="product_image">
                                        <img
                                            src={productdata.small_image.url}
                                            alt={productdata.small_image.label}
                                        />
                                    </div>
                                    <div className="product details product-item-details">
                                        <h2 className="product name product-item-name">
                                            {productdata.name}
                                        </h2>                                        
                                        <Price priceRange={productdata.price_range} />
                                    </div>
                                </div>                                
                            </li>
                        ))}
                    </ol>
                ) : <p>Product is coming soon.</p>}
            </div>
        </div>
    );
};

export default (withApollo)(Category);
