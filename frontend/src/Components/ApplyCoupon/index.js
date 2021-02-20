import React, { useState } from 'react';
import './style.css';
import { Card, Form, FormGroup, Input,  Button, Label } from 'reactstrap';


const ApplyCoupon = () => {

    const [data, setData] = useState({ code: "", totalValue: "" });
    const [error, setError] = useState("");

    function applyCoupon(event) {
        event.preventDefault();
        fetch('http://localhost:8080/coupon/discount', {
            method: "Post",
            body: JSON.stringify(data),
            headers: {
                "content-type": "application/json"
            }
        })
            .then((r) => r.json())
            .then(resp => {
                if (resp.err) {
                    setError(resp.err);
                } else {
                    setError(`Total Cart Value after Discount ${resp.discValue}`);
                    setData({ code: "", totalValue: "" });
                }

            })
            .catch((err) => setError("Some Error Occurred"));
    }

    return <React.Fragment>
        <div className="applyCoupon">
            <h5 className="error">{error ? error : null}</h5>
            <Card className="applyCouponCard">
                <Form onSubmit={applyCoupon}>
                    <FormGroup>
                        <Label>Coupon Code :</Label>
                        <Input type="text" required value={data.code} onChange={(e) => setData({ ...data, code: e.target.value.toUpperCase() })}></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Total Cart Amount :</Label>
                        <Input type="number" required value={data.totalValue} onChange={(e) => setData({ ...data, totalValue: e.target.value })}></Input>
                    </FormGroup>
                    <Button color="success">Apply Coupon</Button>
                </Form>
            </Card>
        </div>
    </React.Fragment>
};

export default ApplyCoupon;