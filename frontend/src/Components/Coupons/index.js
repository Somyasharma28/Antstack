import React, { useState } from 'react';
import './style.css';
import { Card } from 'reactstrap';


const Coupons = () => {

    const [coupons, setCoupons] = useState(showCoupons);
    const [error, setError] = useState("");

    function showCoupons() {
        fetch('http://localhost:8080/coupon/')
            .then(r => {
                if (r.ok) {
                    return r.json();
                } else {
                    return false;
                }
            })
            .then(resp => {
                if (resp) {
                    setCoupons([...resp.couponCodes]);
                } 
            })
            .catch(err => {
                setError("Some Error Occured");
            });

    }

    return <React.Fragment>
        <div className="showCoupons">
            <h5 className="error">{error ? error : `All Coupons`}</h5>
            <Card className="showCouponCard">
                <ol>
                    {
                        coupons ?
                            coupons.map((item, idx) => {
                                return <li key={`_${idx}_`}>{item}</li>;
                            }) : null
                    }
                </ol>
            </Card>
        </div>
    </React.Fragment>
};

export default Coupons;