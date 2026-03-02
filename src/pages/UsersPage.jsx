import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "https://upload-server-crv8.onrender.com";

function UsersPage() {
const [donors, setDonors] = useState([]);
const [loading, setLoading] = useState(false);

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

return ( <div className="card"> <h3>📄 All Donors</h3>

  <table>
    <thead>
      <tr> 
        <th>Receipt</th>
        <th>Date</th>
        <th>Amount</th>
        <th>Name</th>
        <th>Mobile</th>
        <th>Type</th>
      </tr>
    </thead>
    <tbody>
      {donors.length > 0 ? (
        donors.map((d, i) => (
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
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="6" style={{ textAlign: "center" }}>
            No data
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
