import Link from "next/link";

const Navigation = () => {
    return (
        <div>
            <Link href="/">
                <a>Home</a>
            </Link>
            &nbsp; | &nbsp;
            <Link href="/about-us/">
                <a>About Us</a>
            </Link>
        </div>
    );
};


export default Navigation;