import React, { useEffect, useState } from 'react'
import './ProductCard.css'
import { useParams } from 'react-router-dom'
import Navigation from '../Navigation'
import Rating from '@mui/material/Rating';
const ProductCard = () => {
    const name = useParams()
    const [Data, setData] = useState([])
    const [image, setImage] = useState("")
    const [rating, setRating] = useState("4.9")
    const getData = async () => {
        const response = await fetch(`http://localhost:4000/api/v1/products?keyword=${name.phone_name}`)
        const data = await response.json()
        setData(data.prods[0])
        setImage(data.prods[0].images[0].url)
        setRating(data.prods[0].rating)
    }
    useEffect(() => {
        getData()
    }, [])
    return (
        <>
            <Navigation />
            <section className="text-white body-font overflow-hidden bg-slate-900">
                <div className="container px-5 py-24 mx-auto">
                    <div className="lg:w-4/5  mx-auto flex flex-wrap">
                        <img alt={Data.name} style={{ height: "500px", width: "400px" }} className="rounded border border-gray-200" src={image} />
                        <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                            {/* <h2 className="text-sm title-font text-gray-500 tracking-widest">BRAND NAME</h2> */}
                            <h1 className="text-white text-3xl title-font font-medium mb-1">{Data.name}</h1>
                            <div className="flex mb-4">
                                <span className="flex items-center">
                                    < Rating name="half-rating-read" defaultValue={rating} precision={0.5} readOnly />

                                    <span className="text-gray-600 ml-3">{Data.numOfReviews} Reviews</span>
                                </span>
                                <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200">
                                    <a href="/" className="text-gray-500">
                                        <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                            <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                                        </svg>
                                    </a>
                                    <a href="/" className="ml-2 text-gray-500">
                                        <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                            <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                                        </svg>
                                    </a>
                                    <a href="/" className="ml-2 text-gray-500">
                                        <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                            <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                                        </svg>
                                    </a>
                                </span>
                            </div>
                            <p className="leading-relaxed">{Data.description}</p>
                            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
                            </div>
                            <div className="flex">
                                <span className="title-font font-medium text-2xl text-white">₹ {Data.price}</span>
                                <button className="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded">Buy Now</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

export default ProductCard
