import React, { Component } from "react";
import ReportService from "../services/ReportService";
import swal from 'sweetalert'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';

class CreateReportComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      date: "",
      description: "",
      amount: "",
      status: "",
      receiver: "",
      jk: "",
      no_telp: "",
      address: "",
      showAlert: false,
    };
    this.changedate = this.changedate.bind(this);
    this.changedescription = this.changedescription.bind(this);
    this.changeamount = this.changeamount.bind(this);
    this.changestatus = this.changestatus.bind(this);
    this.changereceiver = this.changereceiver.bind(this);
    this.changejk = this.changejk.bind(this);
    this.changeno_telp = this.changeno_telp.bind(this);
    this.changeaddress = this.changeaddress.bind(this);
    this.saveOrUpdateReport = this.saveOrUpdateReport.bind(this);
  }

  componentDidMount() {
    if (this.state.id === "_add") {
      return;
    } else {
      ReportService.getReportById(this.state.id).then((res) => {
        let report = res.data;
        this.setState({
          date: report.date,
          description: report.description,
          amount: report.amount,
          status: report.status,
          receiver: report.receiver,
          jk: report.jk,
          no_telp: report.no_telp,
          address: report.address,
        });
      });
    }
  }
  

  saveOrUpdateReport = (e) => {
    e.preventDefault();
    if (
      !this.state.date.trim() ||
      !this.state.description.trim() ||
      !this.state.amount.trim() ||
      !this.state.status.trim() ||
      !this.state.receiver.trim() ||
      !this.state.jk.trim() ||
      !this.state.no_telp.trim() ||
      !this.state.address.trim()
    ) {
      
      swal({
        title: "Data Transaksi Tidak Tersimpan!",
        text: "Lengkapi formulir untuk menyimpan data transaksi",
        icon: "error",
        button: {
            text: "OK",
            value: true,
            visible: true,
            className: "swal-button--ok",
            closeModal: true,
        },
        dangerMode: false,
    });
      return;
    }

    let report = {
        date: this.state.date,
        description: this.state.description,
        amount: this.state.amount,
        status: this.state.status,
        receiver: this.state.receiver,
        jk: this.state.jk,
        no_telp: this.state.no_telp,
        address: this.state.address,
    };

    console.log("report => " + JSON.stringify(report));

    if (this.state.id === "_add") {
        ReportService.createReport(report).then((res) => {
            this.props.history.push("/reports");
            swal({
              title: "Berhasil!",
              text: "Data transaksi telah ditambahkan!",
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
    } else {
        ReportService.updateReport(report, this.state.id).then((res) => {
            this.props.history.push("/reports");
            swal({
              title: "Berhasil!",
              text: "Data transaksi telah diperbarui!",
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
  };

  changedate = (event) => {
    this.setState({ date: event.target.value });
  };

  changedescription = (event) => {
    this.setState({ description: event.target.value });
  };

  changeamount = (event) => {
    this.setState({ amount: event.target.value });
  };

  changestatus = (event) => {
    this.setState({ status: event.target.value });
  };

  changereceiver = (event) => {
    console.log(event.target.value);
    this.setState({ receiver: event.target.value });
  };

  changejk = (event) => {
    this.setState({ jk: event.target.value });
  };

  changeno_telp = (event) => {
    this.setState({ no_telp: event.target.value });
  };

  changeaddress = (event) => {
    this.setState({ address: event.target.value });
  };

  cancel() {
    this.props.history.push("/reports");
  }

  getTitle() {
    if (this.state.id === "_add") {
      return <h3 
        style={{ backgroundColor: '#19A9A0', padding: '10px', textAlign: 'center', margin: '0', borderRadius: '10px' }}
          >Add transaction
      </h3>;
    } else {
      return <h3 
        style={{ backgroundColor: '#19A9A0', padding: '10px', textAlign: 'center', margin: '0', borderRadius: '10px' }}
          >Update transaction
      </h3>;
    }
  }

  render() {
    return (
      <div className="home-container">
        <div className="container" style={{backgroundColor: 'rgba(255, 255, 255)'}}>
          <br></br>
          <div className="transaction">
            <div className="add-trans">
              {this.getTitle()}
            </div>
            <div className="card-body" style={{color: 'black'}}>
              <form>
                <div className="form-group">
                  <label style={{ fontWeight: 'bold' }}> Date: </label>
                  <input
                    type="date"
                    placeholder="Date"
                    name="date"
                    className="form-control"
                    value={this.state.date}
                    onChange={this.changedate}
                    style={{ color: 'black' }}
                  />
                </div>
                <div className="form-group">
                  <label style={{ fontWeight: 'bold' }}> Description: </label>
                  <input
                    placeholder="Contoh: Bayar Listrik"
                    name="description"
                    className="form-control"
                    value={this.state.description}
                    onChange={this.changedescription}
                    style={{ color: 'black' }}
                  />
                </div>
                <div className="form-group">
                  <label style={{ fontWeight: 'bold' }}> Amount: </label>
                  <input
                    placeholder="Contoh: 150000"
                    name="amount"
                    className="form-control"
                    value={this.state.amount}
                    onChange={this.changeamount}
                    style={{ color: 'black' }}
                  />
                </div>
                <div className="form-group">
                  <label style={{ fontWeight: 'bold' }}> Status: </label>
                  <select
                    name="status"
                    className="form-control"
                    value={this.state.status}
                    onChange={this.changestatus}
                    style={{ color: 'black' }}
                  >
                    <option value="" disabled>Select an option</option>
                    <option value="debit">Debit</option>
                    <option value="kredit">Kredit</option>
                    
                  </select>
                </div>
                <div className="form-group">
                  <label style={{ fontWeight: 'bold' }}> Receiver: </label>
                  <input
                    placeholder="Contoh: Susanti"
                    name="receiver"
                    className="form-control"
                    value={this.state.receiver}
                    onChange={this.changereceiver}
                    style={{ color: 'black' }}
                  />
                </div>
                <div className="form-group">
                  <label style={{ fontWeight: 'bold' }}> Jenis Kelamin: </label>
                  <select
                    name="jk"
                    className="form-control"
                    value={this.state.jk}
                    onChange={this.changejk}
                    style={{ color: 'black' }}
                  >
                    <option value="" disabled>Select an option</option>
                    <option value="L">Laki-Laki</option>
                    <option value="P">Perempuan</option>
                  </select>
                </div>
                <div className="form-group">
                  <label style={{ fontWeight: 'bold' }}> No Telepon: </label>
                  <input
                    placeholder="Contoh: 081111111"
                    name="no_telp"
                    className="form-control"
                    value={this.state.no_telp}
                    onChange={this.changeno_telp}
                    style={{ color: 'black' }}
                  />
                </div>
                <div className="form-group">
                  <label style={{ fontWeight: 'bold' }}> Address: </label>
                  <input
                    placeholder="Contoh: Jl. Pasirbuluh No. 77"
                    name="address"
                    className="form-control"
                    value={this.state.address}
                    onChange={this.changeaddress}
                    style={{ color: 'black' }}
                  />
                </div>
                <div style={{textAlign:'right'}}>
                <button
                  className="btn btn-success"
                  style={{ marginTop: '15px', textAlign: 'center', fontSize: '1em', marginBottom: '20px' }}
                  onClick={this.saveOrUpdateReport}
                  >
                  <FontAwesomeIcon icon={faSave} style={{ marginRight: '5px' }} />
                    Save
                </button>
                <button
                  className="btn btn-danger"
                  onClick={this.cancel.bind(this)}
                  style={{ marginLeft: "10px", marginTop:'15px', fontSize:'1em', marginBottom:'20px'}}
                  >
                    Cancel
                </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateReportComponent;
