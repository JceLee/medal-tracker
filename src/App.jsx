import React, { useState } from "react";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("");
  const [gold, setGold] = useState(0);
  const [silver, setSilver] = useState(0);
  const [bronze, setBronze] = useState(0);

  const handleAddCountry = (event) => {
    event.preventDefault();
    if (country.trim()) {
      const existingCountry = countries.find(
        (c) => c.country.toLowerCase() === country.toLowerCase(),
      );
      if (existingCountry) {
        alert("이미 등록된 국가입니다.");
      } else {
        const newCountry = {
          id: Date.now(),
          country,
          gold: parseInt(gold, 10),
          silver: parseInt(silver, 10),
          bronze: parseInt(bronze, 10),
        };
        setCountries([...countries, newCountry]);
        setCountry("");
        setGold(0);
        setSilver(0);
        setBronze(0);
      }
    } else {
      alert("국가명을 입력해주세요.");
    }
  };

  const handleUpdateCountry = (event) => {
    event.preventDefault();
    if (country.trim()) {
      const existingCountry = countries.find(
        (c) => c.country.toLowerCase() === country.toLowerCase(),
      );
      if (existingCountry) {
        setCountries(
          countries.map((c) =>
            c.country.toLowerCase() === country.toLowerCase()
              ? {
                  ...c,
                  gold: parseInt(gold, 10),
                  silver: parseInt(silver, 10),
                  bronze: parseInt(bronze, 10),
                }
              : c,
          ),
        );
        setCountry("");
        setGold(0);
        setSilver(0);
        setBronze(0);
      } else {
        alert("등록되지 않은 국가입니다.");
      }
    } else {
      alert("국가명을 입력해주세요.");
    }
  };

  const handleDeleteCountry = (id) => {
    setCountries(countries.filter((c) => c.id !== id));
  };

  const sortedCountries = [...countries].sort((a, b) => b.gold - a.gold);

  return (
    <div className="container">
      <h1>2024 파리 올림픽</h1>
      <form onSubmit={handleAddCountry} className="input-group">
        <div className="input-field">
          <label>국가명</label>
          <input
            type="text"
            placeholder="국가 입력"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>
        <div className="input-field">
          <label>금메달</label>
          <input
            type="number"
            placeholder="0"
            value={gold}
            onChange={(e) => setGold(e.target.value)}
          />
        </div>
        <div className="input-field">
          <label>은메달</label>
          <input
            type="number"
            placeholder="0"
            value={silver}
            onChange={(e) => setSilver(e.target.value)}
          />
        </div>
        <div className="input-field">
          <label>동메달</label>
          <input
            type="number"
            placeholder="0"
            value={bronze}
            onChange={(e) => setBronze(e.target.value)}
          />
        </div>
        <button type="submit">국가 추가</button>
        <button
          type="button"
          onClick={handleUpdateCountry}
          style={{ marginLeft: "10px" }}
        >
          업데이트
        </button>
      </form>
      <div>
        {countries.length === 0 ? (
          <p>아직 추가된 국가가 없습니다. 메달을 추적하세요!</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>국가명</th>
                <th>금메달</th>
                <th>은메달</th>
                <th>동메달</th>
                <th>액션</th>
              </tr>
            </thead>
            <tbody>
              {sortedCountries.map((c) => (
                <tr key={c.id}>
                  <td>{c.country}</td>
                  <td>{c.gold}</td>
                  <td>{c.silver}</td>
                  <td>{c.bronze}</td>
                  <td>
                    <button onClick={() => handleDeleteCountry(c.id)}>
                      삭제
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default App;
