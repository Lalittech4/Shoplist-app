import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Update = () => {

    const [shopname, setshopname] = useState('');
    const [area, setarea] = useState('');
    const [category, setcategory] = useState('');
    const [openingday, setopeningday] = useState('');
    const [closingday, setclosingday] = useState('');
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getshopDetails();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const getshopDetails = async () => {
        let result = await fetch(`http://localhost:7000/addshoplist/${params.id}`);
        let data = await result.json();
        setshopname(data.shopname);
        setarea(data.area);
        setcategory(data.category);
        setopeningday(data.openingday);
        setclosingday(data.closingday);
    }

    const updateshopdetail = async () => {
        // console.log(name, price, category, company);
        let result = await fetch(`http://localhost:7000/addshoplist/${params.id}`, {
            method: 'PUT',
            body: JSON.stringify({ shopname, area, category, openingday, closingday }),
            headers: {
                "Content-Type": "application/json"
            },
        })
        let data = await result.json();
        console.log(data);
        navigate('/')

    };


    return (
        <div>

            <div className='updateform'>

                <h2> UPDATE SHOP DETAILS</h2>
                <div class="form-floating mb-3 w-50 ms-4">
                    <input type="text" class="form-control" id="floatingInput" onChange={(e) => { setshopname(e.target.value) }} value={shopname} />
                    <label htmlfor="floatingInput">Shop Name</label>
                </div>
                {/* {!shopname && error && <span className="spanalert">Enter shopname In The Field</span>} */}


                <select onChange={(e) => { setarea(e.target.value) }} value={area} class="form-select  ms-4  w-50 mt-3" aria-label="Default select example">
                    <option select>Area</option>
                    <option value="Thane">Thane</option>
                    <option value="pune">pune</option>
                    <option value="Nashik">Nashik</option>
                    <option value="solapur">solapur</option>
                    <option value="Nagpur">Nagpur</option>
                    <option value="Ahmednagar">Ahmednagar</option>
                    <option value="nalasupara">nalasupara</option>
                </select>
                {/* {!area && error && <span className="spanalert" >Enter area In The Field</span>} */}

                <select onChange={(e) => { setcategory(e.target.value) }} value={category} class="form-select  ms-4 w-50 mt-3" aria-label="Default select example">
                    <option select>Category</option>
                    <option value="Grocery">Grocery</option>
                    <option value="Butcher">Butcher</option>
                    <option value="Baker">Baker</option>
                    <option value="chemist">chemist</option>
                    <option value="Giftshop">Giftshop</option>
                    <option value="Stationary">Stationary shop</option>
                </select>
                {/* {!category && error && <span className="spanalert">Enter category In The Field</span>} */}

                <div class="form-floating  ms-4 w-50 mt-1">
                    <input type="text" class="form-control" id="floatingPassword" placeholder="Password" onChange={(e) => { setopeningday(e.target.value) }} value={openingday} />
                    <label htmlfor="floatingPassword">Opening day</label>
                </div>
                {/* {!openingday && error && <span className="spanalert">Enter openingday In The Field</span>} */}
                <div class="form-floating w-50 ms-4 mt-1">
                    <input type="text" class="form-control" placeholder="Password" onChange={(e) => { setclosingday(e.target.value) }} value={closingday} />
                    <label htmlfor="floatingPassword">Closing day</label>

                    {/* {!closingday && error && <span >Enter closingday In The Field</span>} */}
                    <button onClick={updateshopdetail} className='updatebtn'>Update</button>
                </div>
            </div>
        </div>
    )
}

export default Update;