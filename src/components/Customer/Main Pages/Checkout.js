import React, { useState } from 'react';
import axios from 'axios';
import { useHistory, useLocation } from 'react-router';
import { ThemeProvider } from 'react-bootstrap';

const Checkout = () => {
    const [fullname, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [zipcode, setZipcode] = useState("");
    const [state, setState] = useState("");
    const history = useHistory();
    const location = useLocation();
    const total = location.state.total;
    const [product, setProduct] = useState(location.state.product);

    const onSubmitForm = (e) => {
        const delivery = {
            fullname: fullname,
            user: localStorage.getItem('Email'),
            address: address,
            city: city,
            zipcode: zipcode,
            state: state,
            status: 'temp',
            total: total
        };
        axios.post('https://oder.onrender.com/orders/addDevlivery', delivery)
            .then(res => {
                history.push({
                    pathname: "/payment",
                    state: {
                        delivery: delivery,
                        delivery_code: res.data._id,
                        product: product
                    }
                });
            })
            .catch(err => {
                console.log(err);
            });
    };

    return (
        <React.Fragment>
            <h3>Form Liên Hệ</h3>
            <label>Tên đầy đủ</label><br />
            <input type="text" placeholder="Tên đầy đủ" onChange={(e) => {
                setFullName(e.target.value);
            }} /><br />

            <label>Địa chỉ</label><br />
            <input type="text" placeholder="Địa chỉ" onChange={(e) => {
                setAddress(e.target.value);
            }} /><br />

            <label>Thành phố</label><br />
            <input type="text" placeholder="Thành phố" onChange={(e) => {
                setCity(e.target.value);
            }} /><br />

            <label>Mã bưu điện</label><br />
            <input type="text" placeholder="Mã bưu điện" onChange={(e) => {
                setZipcode(e.target.value);
            }} /><br />

            <label>Tỉnh/Thành</label><br />
            <input type="text" placeholder="Tỉnh/Thành" onChange={(e) => {
                setState(e.target.value);
            }} /><br /><br />

            <input type="submit" value="Gửi" onClick={onSubmitForm} />
        </React.Fragment>
    );
};

export default Checkout;
