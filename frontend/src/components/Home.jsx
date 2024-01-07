import React from 'react';
import {Link} from 'react-router-dom';
import './Home.css'; 

const Home = () => {
  return (
    <div className="home-container" style={{minHeight:'80vh'}}>
        <div className='content'>
            <h2 className='animate-charcter'>go Cuanku</h2>
            <h3>
                <span>The ultimate financial app to </span>
                <span className='font-bold'style={{color:'black', fontStyle:'italic'}}>record </span>
                <span>and </span>
                <br />
                <span className='font-bold' style={{color:'black', fontStyle:'italic'}}>manage </span>
                <span>your financial transactions!</span>
            </h3>
            <div className='feature-container'>
                <h3 className="feature-title">With features to</h3>
                    <ul className="feature-list">
                        <li>Create</li>
                        <li>Read</li>
                        <li>Update</li>
                        <li>Delete</li>
                    </ul>
            </div>
            <p>
                <span className='font-bold'>GoCuanku</span> gives you full control over your financial reports.
            </p>
            <Link to="/reports" className="btn btn-primary btn-primary-klik" style={{fontStyle:'italic'}}>
                click here to view more
            </Link>
        </div>
    </div>
  );
};

export default Home;
