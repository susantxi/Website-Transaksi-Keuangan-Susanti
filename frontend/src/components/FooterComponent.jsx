import React, { Component } from 'react';

class FooterComponent extends Component {
    render() {
        return (
            <div className="footer">
                <footer>
                    <nav className="navbar navbar-dark" style={{ height: '60px', backgroundColor: '#087A60', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        
                        <div style={{ display: 'flex', alignItems: 'center', paddingLeft: '10px'}}>
                            <p style={{ margin: '0', color: 'white', fontSize:'15px'}}>Pemrograman Internet <strong>@2024</strong></p>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: '10px'}}>
                        <p style={{ margin: '0', color: 'white', fontSize:'15px'}}>Contact Us</p>
                            <a href="https://wa.me/+6282115495125" target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-whatsapp" style={{ fontSize: '1.5em', color: '#25D366', marginLeft: '20px' }}></i>
                            </a>

                            <a href="https://www.instagram.com/susantxi/" target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-instagram" style={{ fontSize: '1.5em', color: '#E4405F', marginLeft: '20px' }}></i>
                            </a>

                            <a href="mailto:susannnv10@gmail.com" style={{ color: 'white', marginLeft: '20px' }}>
                                <i className="far fa-envelope" style={{ fontSize: '1.5em' }}></i>
                            </a>
                        </div>
                    </nav>
                </footer>
            </div>
        );
    }
}

export default FooterComponent;
