import React, { useEffect, useState } from "react"
import Rating from '@mui/material/Rating';
// import { useSelector } from "react-redux"
import { Link } from "react-router-dom";
export default function HomeCard() {
  // const state = useSelector(state => state.products)

  const [Data, setData] = useState([])
  const getData = async () => {
    const response = await fetch('https://mern-e-com-k2te.onrender.com/api/v1/products')
    const data = await response.json()
    setData(data.prods)
    // console.log(data.prods)
  }
  useEffect(() => {
    getData()
  }, [])
  return (
    <div className="bg-slate-800">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="flex justify-center text-white mb-2" style={{ fontWeight: "bolder", fontSize: "40px", marginTop: "-100px" }}>More Products</h2>
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {Data.map((product) => (<div key={product._id}>
            <Link key={product._id} to={`/name/${product.name}`} className="group">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-slate-800 xl:aspect-h-9 xl:aspect-w-7">
                <img
                  src={product.images[0].url}
                  alt={product.images[0].url}
                  className="h-full w-full object-cover object-center group-hover:opacity-75"
                />

              </div >
            </Link>
            <h3 className="mt-4 text-sm text-white">{product.name}</h3>
            {/* <p className="mt-1 text-lg font-medium text-white">{product.rating}</p> */}
            < Rating name="half-rating-read" defaultValue={product.rating} precision={0.5} readOnly />
            <p className="mt-1 text-lg font-medium text-white">{product.price}</p>
            <button
              className="middle none center rounded-lg bg-purple-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-purple-500/40 focus:opacity-[0.85] focus:shadow-none"
              data-ripple-light="true"
            >Add to Cart</button>
          </div>
          ))}
        </div>
      </div>
    </div >
  )
}
