import { useState } from "react";
import axios from "axios";
import "./SearchPage.css";

const BASE_URL = "https://upload-server-crv8.onrender.com";

function SearchPage() {
const [mobile, setMobile] = useState("");
const [donors, setDonors] = useState([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState("");

const handleSearch = async () => {
if (!mobile.trim()) {
setError("Please enter mobile number");
return;
}

if (!/^\d{10}$/.test(mobile)) {
  setError("Enter valid 10-digit mobile number");
  return;
}

try {
  setLoading(true);
  setError("");
  setDonors([]);

  const res = await axios.get(
    `${BASE_URL}/donors-by-mobile/${mobile}`
  );

  setDonors(res.data);
} catch (err) {
  setDonors([]);
  setError("No records found");
} finally {
  setLoading(false);
}


};

return ( <div className="search-container"> <div className="search-card"> <h2>🔍 Donor Search</h2> <p className="subtitle">Find donor details by mobile number</p>


    <div className="search-box">
      <input
        type="text"
        placeholder="Enter mobile number"
        value={mobile}
        maxLength={10}
        onChange={(e) => {
          setMobile(e.target.value.replace(/\D/g, ""));
          setError("");
        }}
      />
      <button onClick={handleSearch} disabled={loading}>
        {loading ? "Searching..." : "Search"}
      </button>
    </div>

    {error && <p className="error">{error}</p>}
  </div>

  {/* Results */}
  {donors.length > 0 && (
    <div className="results-card">
      <h3>📄 Results</h3>

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
          {donors.map((d, i) => (
            <tr key={i}>
              <td>{d.receiptNumber}</td>
              <td>
                {d.receiptDate
                  ? new Date(d.receiptDate).toLocaleDateString()
                  : ""}
              </td>
              <td>₹ {d.amount}</td>
              <td>{d.donorName}</td>
              <td>{d.mobileNumber}</td>
              <td>
                <span className="badge">{d.type}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}
</div>


);
}

export default SearchPage;
