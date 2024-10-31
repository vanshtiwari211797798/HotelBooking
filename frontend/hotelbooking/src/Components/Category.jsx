import React, { useEffect, useState } from 'react'
import luxery from '../Images/1.jpg'
import { Link } from 'react-router-dom'


const Category = () => {

    const [category, setCategory] = useState([]);

    // Fetch categiry api

    const fetchCategory = async () => {
        try {
            const res = await fetch(`http://localhost:3000/client/get-all-category`, {
                method: "GET"
            })

            if (res.status === 200) {
                const finalRes = await res.json();
                setCategory(finalRes.category);
            }
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
                    category.length > 0 ? 
                    category.map((item) => {
                        return (
                            <div className="wrapper" key={item._id}>
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