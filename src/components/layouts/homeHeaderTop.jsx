import React from 'react'
import { Navbar, Container, Nav, NavDropdown, Form, Button } from 'react-bootstrap';
import styled from 'styled-components';
import swiftbellogo from '../../assets/swiftbellogoprofile.png'

const HomeHeaderTop = () => {
    return (
        <Navbar bg="none" expand="lg" className='header-top' fixed="top">
            <Container fluid>
                <Navbar.Brand href="#">
                    <img src={swiftbellogo}className='swiftbel-brand-logo' alt=''/>
                    <span className='swiftbel-brand-name ms-2'>SwiftBel</span>
                </Navbar.Brand>
                <div>
                    <span>
                        <svg width="34" height="16" viewBox="0 0 34 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="34" height="2" rx="1" fill="#190F0F" />
                            <rect y="7" width="34" height="2" rx="1" fill="#190F0F" />
                            <rect y="14" width="34" height="2" rx="1" fill="#190F0F" />
                        </svg>
                    </span>
                </div>
            </Container>
        </Navbar>
    )
}

export default HomeHeaderTop;