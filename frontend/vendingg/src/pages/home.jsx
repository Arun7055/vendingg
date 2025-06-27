import ItemCard from "../components/ItemCard"
import React, {useState} from "react";
import "../css/Home.css";

function Home(){
   
    const [searchQuerry, setSearchQuerry] = useState("");

    const items =[
        {id:1, name:"SmartTV", price: 699.99, url:"/public/smart_tv.jpeg"},
        {id:2, name:"SmartWatch", price: 199.99, url:"/public/smart_watch.jpeg"},
        {id:3, name:"SmartPhone", price: 399.99, url:"/public/smart_phone.jpeg"},
    ]
    const handleSearch = (e) => {

    }

    return (
        <div className="home">
            <form onSubmit={handleSearch} className="search">
                <input 
                    type="text" 
                    placeholder="Search for items" 
                    className="search-input" 
                    value={searchQuerry}
                    onChange={(e) => setSearchQuerry(e.target.value)}
                />
                <button type="submit" className="search-button">Search</button>
            </form>
            <div className="items-grid">
                {items.map((item) => 
                    <ItemCard item={item} key={item.id}/>
                )}
            </div>
        </div>
    );    
}

export default Home