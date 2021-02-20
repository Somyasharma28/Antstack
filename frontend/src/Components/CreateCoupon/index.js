import React, { useState } from 'react';
import './style.css';
import {
    Card, Form, FormGroup, Input, Dropdown, Button, Label, DropdownItem,
    DropdownMenu, DropdownToggle
} from 'reactstrap';


const CreateCoupon = () => {

    const [data, setData] = useState({
        code: "", startDate: "", endDate: "", minAmtCode: "", discType: "f",
        flatDiscount: "", percentDiscount: "", maxPercentageAmount: ""
    });
    const [error, setError] = useState("");
    const [flatDiscount, setFlatDiscount] = useState(true);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggle = () => setDropdownOpen(prevState => !prevState);

    const submitHandler = (event) => {
        event.preventDefault();
        if (new Date(data.startDate) <= new Date(data.endDate) && new Date(data.startDate)>=new Date()) {
            fetch('http://localhost:8080/coupon/add', {
                method: "Post",
                body: JSON.stringify(data),
                headers: {
                    "content-type": "application/json"
                }
            })
                .then((r) => {
                    if (r.ok) {
                        return false;
                    } else {
                        return r.json();
                    }

                })
                .then(resp => {
                    if (resp) {
                        setError(resp.err);
                    } else {
                        setError("Successfully Submitted Data");
                        setData({
                            code: "", startDate: "", endDate: "", minAmtCode: "", discType: "f",
                            flatDiscount: "", percentDiscount: "", maxPercentageAmount: ""
                        });
                    }

                })
                .catch((err) => setError("Some Error Occurred"));
        } else {
            setError("End Date should be greater than start date / Start date should be greater than and equal to today's date");
        }

    }

    return <React.Fragment>
        <div className="createCoupon">
            <h5 className="error">{error ? error : null}</h5>
            <Card className="createCouponCard">
                <Form onSubmit={submitHandler}>
                    <FormGroup>
                        <Label>Coupon Code :</Label>
                        <Input type="text" required value={data.code} onChange={(e) => setData({ ...data, code: e.target.value.toUpperCase() })}></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Start Date :</Label>
                        <Input type="date" required  onChange={(e) => setData({ ...data, startDate: e.target.value })}></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>End Date :</Label>
                        <Input type="date" required  onChange={(e) => setData({ ...data, endDate: e.target.value })}></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Minimum Amount :</Label>
                        <Input type="number" required value={data.minAmtCode} onChange={(e) => setData({ ...data, minAmtCode: e.target.value })}></Input>
                    </FormGroup>
                    <FormGroup>
                        <Dropdown isOpen={dropdownOpen} toggle={toggle} >
                            <DropdownToggle caret>
                                Discount Type
                            </DropdownToggle>
                            <DropdownMenu container="body">
                                <DropdownItem onClick={() => { setFlatDiscount(true); setData({ ...data, discType: 'f' }) }}>Flat Discount</DropdownItem>
                                <DropdownItem onClick={() => { setFlatDiscount(false); setData({ ...data, discType: 'p' }) }}>Percentage Discount</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </FormGroup>
                    <FormGroup>
                        {
                            flatDiscount ?
                                <><Label>Flat Discount :</Label>
                                    <Input type="number" required value={data.flatDiscount} onChange={(e) => setData({ ...data, flatDiscount: e.target.value })}></Input></>
                                :
                                <><Label>Percentage of Discount :</Label>
                                    <Input type="number" required value={data.percentDiscount} onChange={(e) => setData({ ...data, percentDiscount: e.target.value })}></Input>
                                </>
                        }
                    </FormGroup>
                    <FormGroup>
                        {
                            flatDiscount ? null
                                :
                                <>
                                    <Label>Maximun Percentage Discount :</Label>
                                    <Input type="number" required value={data.maxPercentageAmount} onChange={(e) => setData({ ...data, maxPercentageAmount: e.target.value })}></Input>
                                </>
                        }

                    </FormGroup>
                    <Button type="submit" color="success">Create Coupon</Button>
                </Form>
            </Card>
        </div>
    </React.Fragment>
};

export default CreateCoupon;