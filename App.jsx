import React, { useState } from "react";

export default function App() {
    const [trips, setTrips] = useState([]);
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");

    const cities = ["BLR", "HYD", "MAA", "DEL", "BOM", "PNQ", "GOA", "CCU", "JAI", "LKO"];

    const handleAddTrip = () => {
        if (start && end && start !== end) {
            setTrips([...trips, { start, end }]);
            setStart("");
            setEnd("");
        }
    };

    const getColor = (index) => {
        const colors = ["#5B5F97", "#1DA1F2", "#F4A261", "#6C757D"];
        return colors[index % colors.length];
    };

    const getY = (trip, index) => {
        if (index === 0) return 150;
        const prev = trips[index - 1];
        if (trip.start === prev.end) return 150; // Continued trip
        if (trip.start === prev.start && trip.end === prev.end) return 200; // Repeated trip
        return 100; // Non-continued trip
    };

    const generatePath = (fromX, fromY, toX, toY) => {
        if (fromY === toY) {
            return `M${fromX},${fromY} L${toX},${toY}`;
        } else {
            const curveOffset = 60;
            return `M${fromX},${fromY} C${fromX + curveOffset},${fromY} ${toX - curveOffset},${toY} ${toX},${toY}`;
        }
    };

    return (
        <div style={{ padding: "40px" }}>
            <h2 class="app-name">TransportSimple Trip Visualizer</h2>

            <div style={{ marginBottom: "20px" }}>
                <select value={start} onChange={(e) => setStart(e.target.value)}>
                    <option value="" className="start-trip">Start</option>
                    {cities.map((c) => (
                        <option key={c} value={c}>{c}</option>
                    ))}
                </select>
                <select value={end} onChange={(e) => setEnd(e.target.value)}>
                    <option value="" className="endt-trip">End</option>
                    {cities.map((c) => (
                        <option key={c} value={c}>{c}</option>
                    ))}
                </select>
                <button onClick={handleAddTrip}>Add Trip</button>
            </div>
            
            <svg width="1400" height="300" style={{ background: "#fff", border: "1px solid #eee" }}>
                {trips.map((trip, index) => {
                    const prevTrip = trips[index - 1];

                    // Calculate X positions: constant step
                    const stepX = 160;
                    const startX = index === 0 ? 50 : 50 + index * stepX;
                    const endX = startX + stepX;

                    // Get Y position based on logic
                    const startY = index === 0 ? getY(trip, index) : getY(prevTrip, index - 1);
                    const endY = getY(trip, index);

                    const path = generatePath(startX, startY, endX, endY);

                    return (
                        <g key={index}>
                            <path
                                d={path}
                                stroke={getColor(index)}
                                strokeWidth="2"
                                fill="transparent"
                                markerEnd={
                                    index !== 0 && trip.start !== prevTrip.end
                                        ? "url(#arrow)"
                                        : ""
                                }
                            />
                            {/* Dots */}
                            <circle cx={startX} cy={startY} r="5" fill={getColor(index)} />
                            <circle cx={endX} cy={endY} r="5" fill="#fff" stroke={getColor(index)} strokeWidth="2" />
                            {/* Label */}
                            <text x={(startX + endX) / 2 - 30} y={Math.max(startY, endY) + 20} fill={getColor(index)}>
                                {trip.start} - {trip.end}
                            </text>
                        </g>
                    );
                })}

                {/* Arrowhead definition */}
                <defs>
                    <marker id="arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
                        <path d="M0,0 L0,6 L9,3 z" fill="gray" />
                    </marker>
                </defs>
            </svg>
        </div>
    );
}
