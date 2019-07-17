import React, { useState, useEffect } from 'react';
import './App.css';
import TextComplete from "../components/autocomplete/TextComplete"
import {getString} from "resources";
import ProfileCard from "../components/profileCard/ProfileCard";

const App = () => {

    const [data, setData] = useState([]);
    const [isGnomeSelected, setIsGnomeSelected] = useState(false);
    const [selectedGnome, setSelectedGnome] = useState({});

    useEffect(() => {
        searchGnome()
    }, []);

    /*const renderGnome = data => {
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
*/
    const onGnomeSelected = gnome => {
        setIsGnomeSelected(true);
        setSelectedGnome(gnome);
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
            <TextComplete
                hintText={getString("search")}
                dataSource={data}
                maxSearchResults={4}
                onNewRequest={gnome => onGnomeSelected(gnome)}
            />
            {isGnomeSelected ?
                <ProfileCard
                    profilePicture={selectedGnome.thumbnail}
                    name={selectedGnome.name}
                    age={selectedGnome.age}
                    weight={selectedGnome.weight}
                    height={selectedGnome.height}
                    hair_color={selectedGnome.hair_color}
                    professions={selectedGnome.professions}
                    friends={selectedGnome.friends}
                /> : "Nothing selected"}
            {/*{data.length > 0 ? renderGnome(data) : "Sin datos"}*/}
        </div>
    );
};

export default App;