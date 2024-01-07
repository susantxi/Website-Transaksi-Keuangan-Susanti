import axios from 'axios';

const REPORT_API_BASE_URL = "http://localhost:9080/api";

class ReportService {
    getReports() {
        return axios.get(`${REPORT_API_BASE_URL}/reports`);
    }

    createReport(report) {
        return axios.post(`${REPORT_API_BASE_URL}/reports`, report);
    }

    getReportById(reportId) {
        return axios.get(`${REPORT_API_BASE_URL}/report/${reportId}`);
    }

    updateReport(report, reportId) {
        return axios.put(`${REPORT_API_BASE_URL}/report/${reportId}`, report);
    }

    deleteReport(reportId) {
        return axios.delete(`${REPORT_API_BASE_URL}/report/${reportId}`);
    }
}

export default new ReportService();
