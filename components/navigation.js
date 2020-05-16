import Link from "next/link";

const Navigation = () => {
    return (
        <div>
            <Link href="/">
                <a>Home</a>
            </Link>
            &nbsp; | &nbsp;
            <Link href="/cart">
                <a>Cart Page</a>
            </Link>
            &nbsp; | &nbsp;
            <Link href="/about-us">
                <a>About Us</a>
            </Link>
            &nbsp; | &nbsp;
            <Link href="/signin">
                <a>Login</a>
            </Link>
            &nbsp; | &nbsp;
            <Link href="/myaccount">
                <a>My Account</a>
            </Link>
        </div>
    );
};


export default Navigation;