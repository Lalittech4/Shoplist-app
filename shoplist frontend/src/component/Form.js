import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import Button  from 'bootstrap';

const Form = () => {

    const [shopname, setshopname] = useState('');
    const [area, setarea] = useState('');
    const [category, setcategory] = useState('');
    const [openingday, setopeningday] = useState('');
    const [closingday, setclosingday] = useState('');
    const [error, seterror] = useState('');
    const [product, setproduct] = useState('');
    // const navigate = useNavigate();



    const getshoplist = async () => {

        let result = await fetch('http://localhost:7000/addshoplist');
        let data = await result.json();
        setproduct(data);
        console.log(product);
    }

    useEffect(() => {
        getshoplist();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const deleteshoplist = async (id) => {
        let result = await fetch(`http://localhost:7000/addshoplist/${id}`, {
            method: "DELETE"
        })
        let data = await result.json();
        if (data) {
            getshoplist();
        }
    };



    const addshop = async () => {
        if (!shopname || !area || !category || !openingday || !closingday) {

            seterror(true)
            return false;
        }
        else {


            const result = await fetch('http://localhost:7000/addshoplist', {
                method: 'post',
                body: JSON.stringify({ shopname, area, category, openingday, closingday }),
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            let data = await result.json();
            console.log(data);
            getshoplist();
            setshopname('');
            setarea('');
            setcategory('');
            setopeningday('');
            setclosingday('');
            getshoplist();
            window.location.reload();

            // getshoplist();
            // navigate('/'); 
        }
    }
    const searchHandle = async (event) => {
        // console.log(e.target.value)
        let key = event.target.value;
        if (key) {

            let result = await fetch(`http://localhost:7000/search/${key}`);
            let data = await result.json();
            if (data) {
                setproduct(data);
            } else {
                console.log("result not matched");
            }
        } else {
            getshoplist();
        }
    }

    return (
        <div>


            <input type="text" className='searchinput' placeholder="Type Here To Search By shopename,Area,category" onChange={searchHandle} />


            <div className='form'>

                <h2>SHOP DETAILS</h2>
                <div class="form-floating mb-3 w-50 ms-4">
                    <input type="text" class="form-control" id="floatingInput" onChange={(e) => { setshopname(e.target.value) }} value={shopname} />
                    <label htmlfor="floatingInput">Shop Name</label>
                </div>
                {!shopname && error && <span className="spanalert">Shopname Required</span>}


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
                {!area && error && <span className="spanalert" >Area Required</span>}

                <select onChange={(e) => { setcategory(e.target.value) }} value={category} class="form-select  ms-4 w-50 mt-3" aria-label="Default select example">
                    <option select>Category</option>
                    <option value="Grocery">Grocery</option>
                    <option value="Butcher">Butcher</option>
                    <option value="Baker">Baker</option>
                    <option value="chemist">chemist</option>
                    <option value="Giftshop">Giftshop</option>
                    <option value="Stationary">Stationary shop</option>
                </select>
                {!category && error && <span className="spanalert">Category Required</span>}

                <div class="form-floating  ms-4 w-50 mt-1">
                    <input type="text" class="form-control" id="floatingPassword" placeholder="Password" onChange={(e) => { setopeningday(e.target.value) }} value={openingday} />
                    <label htmlfor="floatingPassword">Opening day</label>
                </div>
                {!openingday && error && <span className="spanalert">Openingday Required  </span>}
                <div class="form-floating w-50 ms-4 mt-1">
                    <input type="text" class="form-control" placeholder="Password" onChange={(e) => { setclosingday(e.target.value) }} value={closingday} />
                    <label htmlfor="floatingPassword">Closing day</label>

                    {!closingday && error && <span className="spanalert" >Closingday Required</span>}
                    <button onClick={addshop} className='btn'>save</button>
                </div>
            </div>
            <div>
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">S.no</th>
                            <th scope="col">Shop Name</th>
                            <th scope="col">Area</th>
                            <th scope="col">Category</th>
                            <th scope="col">Opening DAY</th>
                            <th scope="col">Closing day</th>
                            <th scope="col">Operation </th>
                            <th scope="col">Operation </th>
                        </tr>
                    </thead>


                    {
                        product.length > 0 ? product && product.map((item, index) =>


                            <tbody key={item._id}>
                                <tr>
                                    <th scope="row">{index + 1}</th>
                                    <td>{item.shopname}</td>
                                    <td> {item.area}</td>
                                    <td>{item.category}</td>
                                    <td>{item.openingday}</td>
                                    <td>{item.closingday}</td>
                                    <td><button onClick={() => deleteshoplist(item._id)} className='deletebtn'>Delete</button></td>
                                    <td><Link to={`/update/${item._id}`}>Update</Link></td>

                                </tr>
                            </tbody>
                        ) : <h2>NO SHOPS TO DISPLAY</h2>
                    }
                </table>
            </div>
        </div >

    )

}


export default Form;