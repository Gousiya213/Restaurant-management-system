import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Spoffers() {
    const [Items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/spoffers/allitems");
                if (!response.ok) {
                    throw new Error("Failed to fetch items");
                }
                const data = await response.json();
                setItems(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchItems();
    }, []);

    if (loading) return <p>Loading Items...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="menu-container">
            <h2 className="menu-title">Special Offers</h2>
            <div className="menu-grid">
                {Items.map((item, index) => (
                    <div className="menu-card" key={item.id || index}>
                        <img src={item.image} alt={item.name} className="menu-image" />
                        <h3 className="menu-name">{item.name}</h3>
                        <p className="menu-price">₹{item.price}</p>
                        <p className="menu-description">{item.description}</p>
                    </div>
                ))}
            </div>

            <div className="admin-buttons">
                <button className="admin-btn" onClick={() => navigate("/admin/specialoffers/additem")}>Add Item</button>
                <button className="admin-btn delete" onClick={() => navigate("/admin/specialoffers/deleteitem")}>Delete Item</button>
            </div>
        </div>
    );
}
