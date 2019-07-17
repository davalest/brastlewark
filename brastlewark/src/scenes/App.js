import React, { useState, useEffect } from 'react';
import './App.css';


const App = () => {

    const [data, setData] = useState([]);


    useEffect(() => {
        searchGnome()
    }, []);

    const renderGnome = data => {
        return data.map((item, index) => {
            return (
                <div key={index}>
                    <p>{item.name}</p>
                    <p>{item.age}</p>
                    <p>{item.weight}</p>
                    <p>{item.height}</p>
                    <p>{item.hair_color}</p>
                    <ul>{item.professions.map((items, index) => {
                        return (
                            <li key={index}>
                                {items}
                            </li>
                        )
                    })}</ul>
                    <ul>{item.friends.map((items, index) => {
                        return (
                            <li key={index}>
                                {items}
                            </li>
                        )
                    })}</ul>

                    <hr />
                </div>
            )
        });
    };

    const searchGnome = () => {
        fetch(`https://raw.githubusercontent.com/rrafols/mobile_test/master/data.json`)
            .then(response => response.json())
            .then(json => {
                setData(json.Brastlewark);
            })
            .catch(error => alert(error.message));
    };

    return (
        <div>
            <h2>City browser</h2>
            <div>{data.length > 0 ? renderGnome(data) : "no data"}</div>
        </div>
    );
};

export default App;
