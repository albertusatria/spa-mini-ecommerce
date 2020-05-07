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
    const { slug } = router.query;
    // filters "url_key" is different with url_path
    // so make sure to only get the last index of the requested URI/slug
    // const url_key = slug.join('/');
    var url_key = slug[slug.length - 1];

    const CATEGORY_DATA = gql`
        {
            categoryList(filters: { url_key: { eq: "${url_key}" } }) {
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
                        small_image {
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

    const { loading, data } = useQuery(CATEGORY_DATA, {
        fetchPolicy: "network-only",
    });

    if (loading) {
        return <span>... loading ...</span>;
    }

    const categorydata = data.categoryList[0];
    const pageTitle = categorydata.name;

    const pageConfig = {
        title: pageTitle
    };

    return (
        <div className="content-wrapper">
            <Layout pageConfig={pageConfig} />
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
                            <li className="product-item">
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
