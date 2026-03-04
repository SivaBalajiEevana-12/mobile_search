import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "https://upload-server-882278565284.europe-west1.run.app";

function UsersPage() {
const [donors, setDonors] = useState([]);
const [loading, setLoading] = useState(false);
const [filter, setFilter] = useState("all");

const fetchDonors = async () => {
try {
setLoading(true);
const res = await axios.get(`${BASE_URL}/donors`);
setDonors(res.data);
} catch (err) {
console.error(err);
setDonors([]);
} finally {
setLoading(false);
}
};

useEffect(() => {
fetchDonors();
}, []);

const presentCount = donors.filter(d => d.attendance).length;
const absentCount = donors.filter(d => !d.attendance).length;

const filteredDonors = donors.filter((d) => {
if (filter === "present") return d.attendance;
if (filter === "absent") return !d.attendance;
return true;
});

return ( <div className="card"> <h3>📄 All Donors</h3>


  {/* Stats */}
  <div style={{ marginBottom: "15px" }}>
    <strong>Total:</strong> {donors.length} |{" "}
    <strong>Present:</strong> {presentCount} |{" "}
    <strong>Absent:</strong> {absentCount}
  </div>

  {/* Filter */}
  <div style={{ marginBottom: "15px" }}>
    <label style={{ marginRight: "10px" }}>Filter:</label>

    <select
      value={filter}
      onChange={(e) => setFilter(e.target.value)}
    >
      <option value="all">All</option>
      <option value="present">Present</option>
      <option value="absent">Absent</option>
    </select>
  </div>

  <table>
    <thead>
      <tr>
        <th>Receipt</th>
        <th>Date</th>
        <th>Amount</th>
        <th>Name</th>
        <th>Mobile</th>
        <th>Type</th>
        <th>Attendance</th>
      </tr>
    </thead>

    <tbody>
      {filteredDonors.length > 0 ? (
        filteredDonors.map((d, i) => (
          <tr key={i}>
            <td>{d.receiptNumber}</td>

            <td>
              {d.receiptDate
                ? new Date(d.receiptDate).toLocaleDateString()
                : ""}
            </td>

            <td>{d.amount}</td>

            <td>{d.donorName}</td>

            <td>{d.mobileNumber}</td>

            <td>{d.type}</td>

            <td
              style={{
                color: d.attendance ? "green" : "red",
                fontWeight: "bold"
              }}
            >
              {d.attendance ? "Present" : "Absent"}
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="7" style={{ textAlign: "center" }}>
            No records
          </td>
        </tr>
      )}
    </tbody>
  </table>

  {loading && <p>Loading...</p>}
</div>


);
}

export default UsersPage;
