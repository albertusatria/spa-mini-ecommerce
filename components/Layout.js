import Head from 'next/head';
import Navigation from './navigation';

export default function Layout({pageConfig}) {    
    const { title } = pageConfig;

    return (
        <>
            <Head>
                <title>Page: {title}</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Navigation/>            
        </>
    )
}
