import React, { Component } from 'react'
import ReportService from '../services/ReportService'
import swal from 'sweetalert'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import '@fortawesome/fontawesome-free/css/all.min.css'
import './ListReportComponent.css'

class ListReportComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            reports: [],
            searchTerm: '',
        }
        this.addReport = this.addReport.bind(this);
        this.editReport = this.editReport.bind(this);
        this.deleteReport = this.deleteReport.bind(this);
    }

    deleteReport(id) {
        swal({
            title: `Apakah Anda yakin ingin menghapus data transaksi ID ${id}?`,
            text: "Data yang dihapus tidak dapat dipulihkan!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                ReportService.deleteReport(id).then(res => {
                    this.setState({
                        reports: this.state.reports.filter(report => report.id !== id)
                    });
    
                    swal({
                        title: `Transaksi ID ${id} telah terhapus!`,
                        text: `Data tidak dapat dipulihkan`,
                        icon: "success",
                        button: {
                            text: "OK",
                            value: true,
                            visible: true,
                            className: "swal-button--ok",
                            closeModal: true,
                        },
                        dangerMode: false,
                    });
                });
            }
        });
    }
    
    
    viewReport(id){
        this.props.history.push(`/view-report/${id}`);
    }
    
    editReport(id){
        this.props.history.push(`/add-report/${id}`);
    }

    componentDidMount(){
        ReportService.getReports().then((res) => {
            if(res.data==null)
            {
                this.props.history.push('/add-report/_add');
            }
            this.setState({ reports: res.data});
        });
    }

    addReport(){
        this.props.history.push('/add-report/_add');
    }

    handleSearchChange(event) {
        this.setState({ searchTerm: event.target.value });
    }

    getFilteredReports() {
        const { reports, searchTerm } = this.state;
    
        return reports.filter(
            (report) =>
                report.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                report.receiver.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }

    getTotalAmount() {
        const { reports } = this.state;
        return reports.reduce((total, report) => total + parseFloat(report.amount), 0);
    }
    
    render() {
        
        return (
            <div className='home-container'>
                <div class="container container-fluid" style={{minHeight:"80vh", backgroundColor:'white'}}>
                <br></br>
                <div style={{ textAlign: 'center'}}>
                    <h3 class="animate-charcter" >TRANSAKSI KEUANGAN</h3>
                    <br />
                </div>
                <div className="container-addsearch">
                <div className="button-container">
                    <button className="custom-button" onClick={this.addReport} style={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.5)'}}>
                    <FontAwesomeIcon icon={faPlus} style={{ marginRight: '5px' }} />
                        Add Report
                    </button>
                </div>
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search by name..."
                        value={this.state.searchTerm}
                        title="search by receiver or description"
                        onChange={(e) => this.handleSearchChange(e)}
                    />
                </div>
                    <br />
                </div>
                    <div  class="lg:w-2/3 w-full mx-auto overflow-auto table table-striped" style={{ minWidth: '100%', paddingBottom:'20px'}}>
                        <div class="table-container">
                            <table style={{ minWidth: '100%' }}>
                                <thead style={{ minWidth: '100%' }}>
                                    <tr>
                                        <th class="px-3 py-3 title-font tracking-wider font-medium text-black text-sm ">ID</th>
                                        <th class="px-3 py-3 title-font tracking-wider font-medium text-black text-sm  date">Date</th>
                                        <th class="px-0 py-3 title-font tracking-wider font-medium text-black text-sm  desc">Description</th>
                                        <th class="px-2 py-3 title-font tracking-wider font-medium text-black text-sm  amount">Amount</th>
                                        <th class="px-4 py-3 title-font tracking-wider font-medium text-black text-sm  status">Status</th>
                                        <th class="px-3 py-3 title-font tracking-wider font-medium text-black text-sm  receiver">Receiver</th>
                                        <th class="px-0 py-3 title-font tracking-wider font-medium text-black text-sm ">No Telepon</th>
                                        <th class="px-3 py-3 title-font tracking-wider font-medium text-black text-sm  address">Address</th>
                                        <th class="px-0 py-3 title-font tracking-wider font-medium text-black text-sm ">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.getFilteredReports().map((report) => (
                                        <tr key={report.id} >
                                            <td class="px-3 py-3">{report.id}</td>
                                            <td class="text-left px-3 py-3 font-bold">{report.date}</td>
                                            <td class="text-left px-0 py-3">{report.description}</td>
                                            <td class="text-left px-2 py-3">{report.amount}</td>
                                            <td class="text-left px-4 py-3">{report.status}</td>
                                            <td class="text-left px-3 py-3">
                                                <span
                                                    className={`${
                                                        report.jk === 'P' ? 'purple-text': 'blue-text'}`}>{report.receiver}
                                                </span>
                                            </td>
                                            <td class="text-left px-0 py-3">{report.no_telp}</td>
                                            <td class="text-left px-3 py-3">{report.address}</td>
                                            <td class="text-left px-0 py-3">
                                            <button
                                                onClick={() => this.editReport(report.id)}
                                                className="btn btn-info"
                                                title="Update"
                                            >
                                                <i className="fas fa-pencil-alt"></i>
                                            </button>
                                            <button
                                                style={{ marginLeft: "5px", marginRight: "5px" }}
                                                onClick={() => this.deleteReport(report.id)}
                                                className="btn btn-danger"
                                                title="Delete"
                                            >
                                                <i className="fas fa-trash"></i>
                                            </button>
                                            <button
                                                style={{ marginLeft: "0px", marginRight: "5px" }}
                                                onClick={() => this.viewReport(report.id)}
                                                className="btn btn-info"
                                                title="Detail"
                                            >
                                                <i className="fas fa-eye"></i>
                                            </button>

                                        </td>

                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot>
                                    <tr style={{ background: '#3CCEC4', borderRadius: '10px', boxShadow: '0 -2px 4px rgba(0, 0, 0, 0.5)' }}>
                                    <td class="text-left px-0 py-3 font-bold " style={{backgroundColor:'pink'}} colSpan="2"></td>
                                        <td class="text-left px-3 py-3 font-bold" colSpan="1" style={{backgroundColor:'pink', fontStyle:'italic'}}>Total Amount: </td>
                                        <td class="text-left px-2 py-3 font-bold" colSpan="1" style={{backgroundColor:'pink'}}>{this.getTotalAmount()}</td>
                                        <td class="text-left px-2 py-3 font-bold" colSpan="2" style={{backgroundColor:'pink'}}></td>
                                        <td class="text-left px-0 py-3 font-bold" colSpan="1" style={{backgroundColor:'pink', fontStyle:'italic'}}>Transaction:      </td>
                                        <td class="text-left px-5 py-3 font-bold" colSpan="2" style={{backgroundColor:'pink'}}>{this.state.reports.length}</td>

                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                 </div>
            </div> 
        )
    }
}

export default ListReportComponent
