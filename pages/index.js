import React from "react";
import Layout from "../components/layout";
import { withApollo } from "../lib/apollo";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import Link from "next/link";

const CATEGORIES_QUERY = gql`
    {
        categoryList {
            children {
                id
                name
                url_path
                children {
                    id
                    name
                    url_path
                    children {
                        id
                        name
                        url_path
                    }
                }
            }
        }
    }
`;

const Index = () => {
    const pageConfig = {
        title: "Home",
    };

    const { loading, data } = useQuery(CATEGORIES_QUERY);

    if (loading) {
        return (
            <div className="is-loading">
                <div>...Loading...</div>
            </div>
        );
    }
    // save to a variable after the data loaded (not loading)
    const categories = data.categoryList[0].children;

    return [
        <div className="content-wrapper">
            <Layout pageConfig={pageConfig} />
            <div>
                <h1>Homepage</h1>               
                <ul>
                    {categories.map((catLvl1) => (
                        <li key={catLvl1.id}>
                            <Link
                                href="catalog/category/[id]"
                                as={`catalog/category/${catLvl1.id}`}
                            >
                                <a>{catLvl1.name}</a>
                            </Link>
                            {
                                catLvl1.children.length ?
                                <ul>
                                    {catLvl1.children.map((catLvl2) => (
                                        <li key={catLvl2.id}>
                                            <Link
                                                href="catalog/category/[...slug]"
                                                as={`catalog/category/${catLvl2.url_path}`}
                                            >
                                                <a>{catLvl2.name}</a>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                                : null
                            }
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    ];
};

export default (withApollo)(Index);
