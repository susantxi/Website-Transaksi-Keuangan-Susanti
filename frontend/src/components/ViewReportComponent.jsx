import React, { Component } from "react";
import { Link } from "react-router-dom";
import ReportService from "../services/ReportService";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPrint } from '@fortawesome/free-solid-svg-icons';


class ViewReportComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      report: {},
    };
  }

  componentDidMount() {
    ReportService.getReportById(this.state.id).then((res) => {
      this.setState({ report: res.data });
    });
  }

  render() {
    return (
      <div className='home-container'>
        <div className="container" style={{backgroundColor: 'rgba(255, 255, 255)'}}>
          <div className="view">
            <div className="view-detail" style={{marginTop:'25px'}}>
              <h3 style={{ backgroundColor: '#19A9A0', padding: '10px', textAlign: 'center', margin: '0', borderRadius: '10px' }}>View Report Details</h3>
            </div>
              <div className="card-body" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                <table className="table text-center mx-auto">
                  <tbody>
                    <tr>
                      <th scope="row" className='text-left'>ID</th>
                      <td className='text-left'>{this.state.report.id}</td>
                    </tr>
                    <tr>
                      <th scope="row" className='text-left'>Date</th>
                      <td className='text-left'>{this.state.report.date}</td>
                    </tr>
                    <tr>
                      <th scope="row" className='text-left'>Description</th>
                      <td className='text-left'>{this.state.report.description}</td>
                    </tr>
                    <tr>
                      <th scope="row" className='text-left'>Amount</th>
                      <td className='text-left'>{this.state.report.amount}</td>
                    </tr>
                    <tr>
                      <th scope="row" className='text-left'>Status</th>
                      <td className='text-left'>{this.state.report.status}</td>
                    </tr>
                    <tr>
                      <th scope="row" className='text-left'>Receiver</th>
                      <td className='text-left'>{this.state.report.receiver}</td>
                    </tr>
                    <tr>
                      <th scope="row" className='text-left'>Jenis Kelamin</th>
                      <td className='text-left'>{this.state.report.jk}</td>
                    </tr>
                    <tr>
                      <th scope="row" className='text-left'>No Telepon</th>
                      <td className='text-left'>{this.state.report.no_telp}</td>
                    </tr>
                    <tr>
                      <th scope="row" className='text-left'>Address</th>
                      <td className='text-left'>{this.state.report.address}</td>
                    </tr>
                  </tbody>
                </table>
              <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <Link to="/reports" className="btn btn-secondary no-print">
                  &lt;&lt; Back
                </Link>
                <button
                  className="btn btn-primary no-print"
                  onClick={() => window.print()}
                  style={{
                    background: '#3CCEC4',
                    borderRadius: '10px',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
                    marginLeft: '10px',
                  }}
                  >
                  <FontAwesomeIcon icon={faPrint} style={{ marginRight: '5px' }} />
                  Print
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  }

export default ViewReportComponent;
