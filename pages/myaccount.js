import Layout from "../components/layout";
import { withApollo } from "../lib/apollo";
import { useSelector } from 'react-redux';
import { withRedux } from '../lib/redux';
import Link from "next/link";

const Myaccount = () => {
    const pageConfig = {
        title: "My Account",
    };
    const login = useSelector(state => state.login);
    const Content = () => {
        //console.log();
        if (login && login.length) {
            return(
                <div>
                    <h1>Profile Account</h1>
                    <div>
                        Labore culpa labore reprehenderit id magna aliquip nisi anim. Eiusmod qui mollit dolor exercitation cillum. Non minim eu eu commodo sint pariatur sint anim labore aute minim. Officia commodo ex dolore non laborum proident fugiat. Dolore aliqua non ipsum aute qui pariatur qui ea in laborum ut sit laboris. Velit pariatur veniam commodo culpa incididunt est.
                        Nostrud consectetur sit consectetur quis. Amet proident ad officia irure cillum laborum cupidatat non minim amet elit est. Id sit qui fugiat nostrud voluptate proident sint cupidatat non aliquip. Aute ea Lorem quis sunt consequat magna anim sint qui et fugiat. Ea occaecat laboris velit magna qui enim veniam ut sunt nisi ea nostrud.
                    </div>
                </div>
            )
        } else {
            return (
                <p className="need-to-login">Please <Link href="/signin"><a>Login</a></Link> to see this page</p>
            )
        }
    }
    return (
        [
            <div className="content-wrapper">
                <Layout pageConfig={pageConfig} />
                <Content/>
            </div>
        ]
    )
}

export default (withRedux)(Myaccount);