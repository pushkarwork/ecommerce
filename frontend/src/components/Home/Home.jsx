import React from 'react'

// import { CgMouse } from "react-icons/all";/
import "../Home/Home.css"
import { Fragment } from "react";
import Product from './Product';

const product = {
    name: "Blue Tshirt",
    images: [{ url: "https://99designs-blog.imgix.net/blog/wp-content/uploads/2017/11/Tshirt-design.jpg?auto=format&q=60&fit=max&w=500" }],
    price: "3000",
    _id: "this is image id"
};


const Home = () => {
    return (
        <Fragment>

            <div className="banner">
                <p>Welcome to Ecommerce</p>
                <h1>FIND AMAZING PRODUCTS BELOW</h1>

                {/* <a href="#container">
                    <button>
                        Scroll <CgMouse />
                    </button>
                </a> */}
            </div>

            <h2 className="homeHeading">Featured Products</h2>

            <div className="container" id="container">
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
            </div>
        </Fragment>


    )
}

export default Home
