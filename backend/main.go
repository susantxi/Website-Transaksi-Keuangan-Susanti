package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

	_ "github.com/go-sql-driver/mysql"
	"github.com/gorilla/mux"
)

func main() {
	Routers()
}

func Routers() {
	InitDB()
	defer db.Close()
	log.Println("Starting the HTTP server on port 9080")
	router := mux.NewRouter()
	router.HandleFunc("/api/reports", GetReports).Methods("GET")
	router.HandleFunc("/api/reports", CreateReport).Methods("POST")
	router.HandleFunc("/api/report/{id}", GetReport).Methods("GET")
	router.HandleFunc("/api/report/{id}", UpdateReport).Methods("PUT")
	router.HandleFunc("/api/report/{id}", DeleteReport).Methods("DELETE")
	http.ListenAndServe(":9080", &CORSRouterDecorator{router})
}

// Get all reports
func GetReports(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var reports []Report

	result, err := db.Query("SELECT id, date, description, amount, status, receiver, jk, no_telp, address FROM transaksi_keuangansusanti")
	if err != nil {
		panic(err.Error())
	}
	defer result.Close()
	for result.Next() {
		var report Report
		err := result.Scan(&report.ID, &report.Date,
			&report.Description, &report.Amount, &report.Status, &report.Receiver, &report.Jk, &report.No_telp, &report.Address)
		if err != nil {
			panic(err.Error())
		}
		reports = append(reports, report)
	}
	json.NewEncoder(w).Encode(reports)
}

// Create user
func CreateReport(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	stmt, err := db.Prepare("INSERT INTO transaksi_keuangansusanti(date," +
		"description,amount,status,receiver,jk, no_telp,address) VALUES(?,?,?,?,?,?,?,?)")
	if err != nil {
		panic(err.Error())
	}
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		panic(err.Error())
	}
	var report Report
	err = json.Unmarshal(body, &report)
	if err != nil {
		panic(err.Error())
	}
	_, err = stmt.Exec(report.Date, report.Description, report.Amount, report.Status, report.Receiver, report.Jk, report.No_telp, report.Address)
	if err != nil {
		panic(err.Error())
	}
	fmt.Fprintf(w, "Transaksi berhasil diinput")
}

// Get user by ID
func GetReport(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	result, err := db.Query("SELECT id, date,"+
		"description,amount,status,receiver,jk, no_telp,address FROM transaksi_keuangansusanti WHERE id = ?", params["id"])
	if err != nil {
		panic(err.Error())
	}
	defer result.Close()
	var report Report
	for result.Next() {
		err := result.Scan(&report.ID, &report.Date,
			&report.Description, &report.Amount, &report.Status, &report.Receiver, &report.Jk, &report.No_telp, &report.Address)
		if err != nil {
			panic(err.Error())
		}
	}
	json.NewEncoder(w).Encode(report)
}

// Update user
func UpdateReport(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	stmt, err := db.Prepare("UPDATE transaksi_keuangansusanti SET date= ?, description=?, amount=?, status=?, receiver=?, jk=?, no_telp=?, address=? WHERE id = ?")

	if err != nil {
		panic(err.Error())
	}
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		panic(err.Error())
	}
	var report Report
	err = json.Unmarshal(body, &report)
	if err != nil {
		panic(err.Error())
	}
	_, err = stmt.Exec(report.Date, report.Description, report.Amount, report.Status, report.Receiver, report.Jk, report.No_telp, report.Address, params["id"])
	if err != nil {
		panic(err.Error())
	}
	fmt.Fprintf(w, "Report with ID = %s was updated",
		params["id"])
}

// Delete user
func DeleteReport(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	stmt, err := db.Prepare("DELETE FROM transaksi_keuangansusanti WHERE id = ?")
	if err != nil {
		panic(err.Error())
	}
	_, err = stmt.Exec(params["id"])
	if err != nil {
		panic(err.Error())
	}
	fmt.Fprintf(w, "Report with ID = %s was deleted",
		params["id"])
}

type Report struct {
	ID          int    `json:"id"`
	Date        string `json:"date"`
	Description string `json:"description"`
	Amount      string `json:"amount"`
	Status      string `json:"status"`
	Receiver    string `json:"receiver"`
	Jk          string `json:"jk"`
	No_telp     string `json:"no_telp"`
	Address     string `json:"address"`
}

var db *sql.DB
var err error

func InitDB() {
	db, err = sql.Open("mysql",
		"root:@tcp(127.0.0.1:3306)/db_2204534_susanti_uas_pilkomB")
	fmt.Println("connected to db")
	if err != nil {
		panic(err.Error())
	}
}

// CORSRouterDecorator applies CORS headers to a mux.Router
type CORSRouterDecorator struct {
	R *mux.Router
}

func (c *CORSRouterDecorator) ServeHTTP(rw http.ResponseWriter,
	req *http.Request) {
	if origin := req.Header.Get("Origin"); origin != "" {
		rw.Header().Set("Access-Control-Allow-Origin", origin)
		rw.Header().Set("Access-Control-Allow-Methods",
			"POST, GET, OPTIONS, PUT, DELETE")
		rw.Header().Set("Access-Control-Allow-Headers",
			"Accept, Accept-Language,"+
				" Content-Type, YourOwnHeader")
	}
	// Stop here if it's a Preflighted OPTIONS request
	if req.Method == "OPTIONS" {
		return
	}

	c.R.ServeHTTP(rw, req)
}
