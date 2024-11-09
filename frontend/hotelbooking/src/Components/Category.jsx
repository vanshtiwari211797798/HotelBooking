import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ThreeDots } from 'react-loader-spinner';


const Category = () => {

    const [loader, setLoader]  = useState(false);

    const [category, setCategory] = useState([]);

    // Fetch categiry api

    const fetchCategory = async () => {
        setLoader(true)
        try {
            const res = await fetch(`http://localhost:3000/client/get-all-category`, {
                method: "GET"
            })

            if (res.status === 200) {
                const finalRes = await res.json();
                setCategory(finalRes.category);
            }
            setLoader(false)
        } catch (error) {
            console.error('error from fetch category', error);
        }
    }

    useEffect(() => {
        fetchCategory();
    }, [])

    return (
        <>
            <div className="inner3-1n2">
                {
                    loader ? <ThreeDots /> :
                    category.length > 0 ? 
                    category.map((item) => {
                        return (
                            <div className="wrapper" key={item._id} data-aos="zoom-in">
                                <h1>{item.room_category_name}</h1>
                                <div className="image">
                                    <img src={`http://localhost:3000/${item.room_category_image}`} alt="delux room price" title='delux room' />
                                </div>
                                <div className="details">
                                    <Link to={`/types_rooms/${item.room_category_name}`}>View Details</Link>
                                </div>
                                <h1>{item.room_category_price}</h1>
                            </div>
                        )
                    })
                    :
                    "NO ANY CATEGORY AVAILABLE"
                }
            </div>
        </>
    )
}

export default Category