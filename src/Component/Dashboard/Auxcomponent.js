import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const AUXRibbon = () => {
  const auxOptions = ["Offline","Available","Meeting", "Break", "Training", ];
  const [currentAux, setCurrentAux] = useState("");
  const [auxChanges, setAuxChanges] = useState([]);
  const [duration, setDuration] = useState("00:00:00");
  const timerRef = useRef(null);
const userId = localStorage.getItem('userId'); 
const baseurl = process.env.REACT_APP_API_BASE_URL;
  const today = new Date().toISOString().slice(0, 10);

  // Fetch today's AUX record
  const fetchAux = async () => {
    try {
      const res = await axios.get(`${baseurl}/getUserDailyAux/${userId}/${today}`);
      const data = res.data;
      if (data && data.auxChanges.length) {
        const lastAux = data.auxChanges[data.auxChanges.length - 1];
        setCurrentAux(lastAux.aux);
        setAuxChanges(data.auxChanges);
      }
    } catch (err) {
      console.log("No AUX record found for today", err.response?.data?.error);
    }
  };

  useEffect(() => {
    fetchAux();
  }, []);

  // Update duration timer
  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      const lastChange = auxChanges[auxChanges.length - 1];
      if (!lastChange || lastChange.aux === "Offline") {
        setDuration("00:00:00");
        return;
      }
      const start = new Date(lastChange.startTime);
      const now = new Date();
      const diff = now - start; // milliseconds
      const hours = String(Math.floor(diff / (1000 * 60 * 60))).padStart(2, "0");
      const mins = String(Math.floor((diff / (1000 * 60)) % 60)).padStart(2, "0");
      const secs = String(Math.floor((diff / 1000) % 60)).padStart(2, "0");
      setDuration(`${hours}:${mins}:${secs}`);
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [auxChanges]);

  // Apply new AUX
  const handleAuxChange = async (e) => {
    const selectedAux = e.target.value;
    if (selectedAux === currentAux) return; // Do nothing if same

    try {
      const payload = { userId, aux: selectedAux };
      await axios.post(`${baseurl}/createuseraux`, payload);
      fetchAux();
    } catch (err) {
      console.error("Error applying AUX:", err);
    }
  };

  return (
    <div className="bg-light p-3 d-flex align-items-center justify-content-between border mb-3">
      <div>
        <strong>Status: </strong>
        <select
          className="form-select d-inline w-auto"
          value={currentAux}
          onChange={handleAuxChange}
        >
          {auxOptions.map((aux) => (
            <option key={aux} value={aux}>
              {aux}
            </option>
          ))}
        </select>
      </div>
      <div>
        <strong>Duration: </strong>
        <span>{duration}</span>
      </div>
    </div>
  );
};

export default AUXRibbon;
