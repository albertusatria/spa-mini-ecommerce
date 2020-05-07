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
            products(filter: {url_key: { eq: "${url_key}" }}){
                items {
                    id
                    name
                    sku
                    url_key
                    description {
                        html
                    }
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
    `;    

    const { loading, data } = useQuery(CATEGORY_DATA, {
        fetchPolicy: "network-only",
    });

    if (loading) {
        return <span>... loading ...</span>;
    }

    const productdata = data.products.items[0];
    const pageTitle = productdata.name;
    console.log(productdata);

    const pageConfig = {
        title: pageTitle
    };

    return (
        <div className="content-wrapper">
            <Layout pageConfig={pageConfig} />
            <div className="content-wrapper-products">
                <div className="product-info-main">
                    <div className="page-title-wrapper product">
                        <h1 className="page-title">{productdata.name}</h1>
                        <div className="product attribute sku">
                            <span>SKU:</span>
                            <span>{productdata.sku}</span>
                        </div>
                    </div>
                    <div className="product-info-price">
                        <Price priceRange={productdata.price_range} /> 
                        <div className="product-info">                            
                            <div className="product attribute description">
                                {ReactHtmlParser(productdata.description.html)}
                            </div>
                        </div>
                        <div className="add-to">
                            <div className="add-to-cart">
                                <input type="text" className="input qty" value="1" />
                                <button type="button" className="action primary">
                                    <span><span>Add to Cart</span></span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="product media">
                    <img
                        src={productdata.image.url}
                        alt={productdata.image.label}
                        style={{
                            width: '100%',
                            maxWidth: '100%',
                            maxHeight: '100%',
                        }}
                    />
                </div>                
            </div>
        </div>
    );
};

export default (withApollo)(Category);
