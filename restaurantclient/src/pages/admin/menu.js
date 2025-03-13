import React, { useEffect, useState } from "react";

export default function MenuItems() {
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMenuItems = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/menu/allitems");
                if (!response.ok) {
                    throw new Error("Failed to fetch menu items");
                }
                const data = await response.json();
                setMenuItems(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMenuItems();
    }, []);

    if (loading) return <p>Loading menu...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="menu-container">
            <h2 className="menu-title">Our Menu</h2>
            <div className="menu-grid">
                {menuItems.map((item) => (
                    <div className="menu-card" key={item.id}>
                        <img src={item.image} alt={item.name} className="menu-image" />
                        <h3 className="menu-name">{item.name}</h3>
                        <p className="menu-price">₹{item.price}</p>
                        <p className="menu-description">{item.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
