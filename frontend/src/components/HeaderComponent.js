import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

class HeaderComponent extends Component {
    render() {
        const { pathname } = this.props.location;

        return (
            <div className="header">
                <header>
                    <nav className="navbar navbar-dark" style={{ height: '80px', backgroundColor: '#087A60'}}>
                        <Link to="/" className="navbar-brand">
                            <span className="font-bold" style={{ fontStyle: 'italic', fontSize: '1em', marginRight: '5px', marginLeft:'10px'}}>go</span>
                            <span style={{ fontWeight: 'bold', fontSize: '2em', color: '#34E100', position: 'relative'}}>
                                CUAN
                            </span>
                            <span style={{ fontStyle: 'italic',color: '#34E100' }}>ku</span>
                        </Link>
                        <div className="ml-auto">
                        <div className="nav nav-tabs" id="nav-tab" role="tablist">
                            <Link className={`nav-item nav-link ${pathname === '/' ? 'active' : ''}`} to="/" style={{ color: pathname === '/' ? 'black' : 'white' }}>Home</Link>
                            <Link className={`nav-item nav-link ${pathname === '/reports' ? 'active' : ''}`} to="/reports" style={{ color: pathname === '/reports' ? 'black' : 'white' }}>Reports</Link>
                        </div>
                        </div>
                    </nav>
                    <div className="tab-content" id="nav-tabContent">
                        <div className="tab-pane fade" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">...</div>
                        <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">...</div>
                    </div>
                </header>
            </div>
        );
    }
}

export default withRouter(HeaderComponent);
