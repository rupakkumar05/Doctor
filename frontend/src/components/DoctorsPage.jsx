
import { useEffect, useState } from 'react';
import './DoctorPage.css';

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState([]);
  const [filters, setFilters] = useState({ specialization: '', location: '' });
  const [appliedFilters, setAppliedFilters] = useState({ specialization: '', location: '' });
  const [page, setPage] = useState(1);

  // Function to fetch doctors based on filters
  const fetchDoctors = async () => {
    const query = `specialization=${appliedFilters.specialization}&location=${appliedFilters.location}&page=${page}`;
    const res = await fetch(`http://localhost:5000/list-doctor-with-filter?${query}`);
    const data = await res.json();
    setDoctors(data);
  };

  // Apply filters and fetch data when filters change
  useEffect(() => {
    fetchDoctors();
  }, [appliedFilters, page]);

  // Debounce the filter changes to prevent excessive calls
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setAppliedFilters(filters);
      setPage(1); // Reset to page 1 when filters are updated
    }, 500); // Wait 500ms after typing before applying filter

    return () => clearTimeout(timeoutId); // Cleanup timeout on every update
  }, [filters]);

  return (
    <div className="doctor-page">
      <h1>Doctor Listing</h1>

      <div className="filter-bar">
        <div>
          <label>Specialization: </label>
          <input
            type="text"
            placeholder="Type specialization (e.g. Cardiologist)"
            value={filters.specialization}
            onChange={e => setFilters({ ...filters, specialization: e.target.value })}
          />
        </div>

        <div>
          <label>Location: </label>
          <input
            type="text"
            placeholder="Enter location"
            value={filters.location}
            onChange={e => setFilters({ ...filters, location: e.target.value })}
          />
        </div>
      </div>

      <div className="doctor-list">
        {doctors.map(doc => (
          <div key={doc._id} className="doctor-card">
            <img
              className="doctor-image"
              src={doc.imageUrl || 'https://cdn.vectorstock.com/i/1000v/36/75/businessman-portrait-flat-design-vector-7433675.avif'}
              alt={doc.name}
            />
            <div className="doctor-info">
              <h2>{doc.name}</h2>
              <p className="specialization"><strong>{doc.specialization}</strong> - {doc.experience} yrs</p>
              <p className="location">{doc.location}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</button>
        <span>Page {page}</span>
        <button onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
}
