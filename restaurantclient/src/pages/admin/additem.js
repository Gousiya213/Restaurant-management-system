import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function AddItem() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const requestData = {
            name,
            price: parseInt(price), // Ensure price is an integer
            image,  // Just the URL, no need for FormData
            description,
        };
    
        try {
            const response = await fetch("http://localhost:3000/api/menu/additem", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json", // Send as JSON
                },
                body: JSON.stringify(requestData),
            });
    
            const data = await response.json();
    
            if (response.ok) {
                alert("Item added successfully!");
                console.log("Item added:", data);
    
                // Reset form after successful submission
                setName("");
                setPrice("");
                setImage("");
                setDescription("");
                navigate("/admin/menu");
            } else {
                alert(data.message || "Failed to add item.");
            }
        } catch (error) {
            console.error("Error adding item:", error);
            alert("Network error occurred.");
        }
    };
    

    return (
        <div className="add-item-container">
            <h2 className="add-item-title">Add New Dish</h2>
            <form className="add-item-form" onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="form-group">
                    <label>Dish Name:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Price:</label>
                    <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Image url:</label>
                    <input type="text" value={image} onChange={(e) => setImage(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Description:</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
                </div>
                <button className="submit-button" type="submit">Add Dish</button>
                <button className="menu-btn" onClick={() => navigate("/admin/menu")}>Back to menu</button>
            </form>
        </div>
    );
}
