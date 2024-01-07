import React, { Component } from "react";
import UserService from "../services/UserService";

class CreateUserComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // step 2
      id: this.props.match.params.id,
      nim: "",
      nama: "",
      tgl_tahir: "",
      alamat: "",
      jenis_kelamin: "",
      kelas: "",
    };
    this.changeNama = this.changeNama.bind(this);
    this.changeNim = this.changeNim.bind(this);
    this.changeTglLahir = this.changeTglLahir.bind(this);
    this.changeAlamat = this.changeAlamat.bind(this);
    this.changeJenisKelamin = this.changeJenisKelamin.bind(this);
    this.changeKelas = this.changeKelas.bind(this);
    this.saveOrUpdateUser = this.saveOrUpdateUser.bind(this);
  }

  // step 3
  componentDidMount() {
    // step 4
    if (this.state.id === "_add") {
      return;
    } else {
      UserService.getUserById(this.state.id).then((res) => {
        let user = res.data;
        this.setState({
            nim: user.nim,
            nama: user.nama,
            tgl_lahir: user.tgl_lahir,
            alamat: user.alamat,
            jenis_kelamin: user.jenis_kelamin,
            kelas: user.kelas,
        });
      });
    }
  }
  saveOrUpdateUser = (e) => {
    e.preventDefault();
    let user = {
        nim: this.state.nim,
        nama: this.state.nama,
        tgl_lahir: this.state.tgl_lahir,
        alamat: this.state.alamat,
        jenis_kelamin: this.state.jenis_kelamin,
        kelas: this.state.kelas,
    };
    console.log("user => " + JSON.stringify(user));

    // step 5
    if (this.state.id === "_add") {
      UserService.createUser(user).then((res) => {
        this.props.history.push("/users");
      });
    } else {
      UserService.updateUser(user, this.state.id).then((res) => {
        this.props.history.push("/users");
      });
    }
  };

  changeNama = (event) => {
    this.setState({ nama: event.target.value });
  };

  changeNim = (event) => {
    this.setState({ nim: event.target.value });
  };

  changeTglLahir = (event) => {
    this.setState({ tgl_lahir: event.target.value });
  };

  changeAlamat = (event) => {
    this.setState({ alamat: event.target.value });
  };

  changeJenisKelamin = (event) => {
    console.log(event.target.value);
    this.setState({ jenis_kelamin: event.target.value });
  };

  changeKelas = (event) => {
    this.setState({ kelas: event.target.value });
  };

  cancel() {
    this.props.history.push("/users");
  }

  getTitle() {
    if (this.state.id === "_add") {
      return <h3 className="text-center">Add Mahasiswa</h3>;
    } else {
      return <h3 className="text-center">Update User</h3>;
    }
  }
  render() {
    return (
      <div>
        <br></br>
        <div className="container">
          <div className="row">
            <div className="card col-md-6 offset-md-3 offset-md-3">
              {this.getTitle()}
              <div className="card-body">
                <form>
                  <div className="form-group">
                    <label> Nim: </label>
                    <input
                      placeholder="Nim"
                      name="nim"
                      className="form-control"
                      value={this.state.nim}
                      onChange={this.changeNim}
                    />
                  </div>
                  <div className="form-group">
                    <label> Nama: </label>
                    <input
                      placeholder="Nama"
                      name="nama"
                      className="form-control"
                      value={this.state.nama}
                      onChange={this.changeNama}
                    />
                  </div>
                  <div className="form-group">
                    <label> Tanggal Lahir: </label>
                    <input
                      type="date"
                      placeholder="Tanggal Lahir"
                      name="tgl_lahir"
                      className="form-control"
                    value={this.state.tgl_lahir}
                      onChange={this.changeTglLahir}
                    />
                  </div>
                  <div className="form-group">
                    <label> Alamat: </label>
                    <input
                      placeholder="Alamat"
                      name="alamat"
                      className="form-control"
                      value={this.state.alamat}
                      onChange={this.changeAlamat}
                    />
                  </div>
                  <div className="form-group">
                    <label> Jenis Kelamin: </label>
                    <select
                      name="jenis_kelamin"
                      className="form-control"
                      value={this.state.jenis_kelamin}
                      onChange={this.changeJenisKelamin}
                    >
                      <option value="l">Laki-Laki</option>
                      <option value="p">Perempuan</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label> Kelas: </label>
                    <input
                      placeholder="Kelas"
                      name="kelas"
                      className="form-control"
                      value={this.state.kelas}
                      onChange={this.changeKelas}
                    />
                  </div>

                  <button
                    className="btn btn-success"
                    onClick={this.saveOrUpdateUser}
                  >
                    Save
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={this.cancel.bind(this)}
                    style={{ marginLeft: "10px" }}
                  >
                    Cancel
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateUserComponent;
