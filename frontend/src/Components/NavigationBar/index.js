import React from 'react';
import './style.css';
import { Navbar, NavbarBrand, NavLink, Nav } from 'reactstrap';

const NavigationBar = () => {

    return <React.Fragment>
        <Navbar color="dark" dark expand="md" className="mainHeader" >
            <NavbarBrand href="/">Coupon Validator</NavbarBrand>
            <Nav className="mainLinks" >
                <NavLink href="/coupon/">Coupons</NavLink>
                <NavLink href="/coupon/add">Create Coupon</NavLink>
                <NavLink href="/">Apply Coupon</NavLink>
            </Nav>
        </Navbar>
    </React.Fragment>

};

export default NavigationBar;