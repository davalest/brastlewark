import React, { useState, useEffect } from 'react';
import "./Home.css";
import { getString, changeLanguage, currentLanguage } from "resources";
import ProfileCard from "../components/profile/ProfileCard";
import Header from "../components/header/Header";
import CitizenList from "../components/list/CitizenList";
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import Language from '@material-ui/icons/Language';

const useStyles = makeStyles(theme => ( {
    language: {
        margin: theme.spacing(1),
        "&:focus": {
            outline: 0
        }
    }
} ));


const Home = () => {
    const [data, setData] = useState([]);
    const [isGnomeSelected, setIsGnomeSelected] = useState(false);
    const [selectedGnome, setSelectedGnome] = useState({});

    useEffect(() => {
        searchGnome()
    }, []);

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

    const onClickBack = () => {
        setIsGnomeSelected(false)
    };

    const onRowClick = (row) => {
        setSelectedGnome(row);
        setIsGnomeSelected(true);
    };

    const classes = useStyles();
    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <Header
                        hintText={getString("search")}
                        dataSource={data}
                        maxSearchResults={4}
                        onNewRequest={gnome => onGnomeSelected(gnome)}
                    />
                    <div className="col-12 d-flex justify-content-center mb-3 mt-2">
                        {( currentLanguage === "en" ) ?
                            <Fab
                                variant="extended"
                                size="small"
                                color="primary"
                                aria-label="Change language"
                                onClick={(e) => {
                                    e.preventDefault();
                                    changeLanguage("es")
                                }}
                                className={classes.language}
                            >
                                <Language /> <span className="language-btn">ES</span>
                            </Fab> :
                            <Fab
                                variant="extended"
                                size="small"
                                color="primary"
                                aria-label="Change language"
                                onClick={(e) => {
                                    e.preventDefault();
                                    changeLanguage("en")
                                }}
                                className={classes.language}
                            >
                                <Language /> <span className="language-btn">EN</span>
                            </Fab>}
                    </div>
                    {isGnomeSelected ?
                        <div className="col-12 d-flex justify-content-center align-items-center content-view">
                            <ProfileCard
                                profilePicture={selectedGnome.thumbnail}
                                name={selectedGnome.name}
                                age={selectedGnome.age}
                                weight={selectedGnome.weight}
                                height={selectedGnome.height}
                                hair_color={selectedGnome.hair_color}
                                professions={selectedGnome.professions}
                                friends={selectedGnome.friends}
                                setOnClickBack={onClickBack}
                            />
                        </div>
                        :
                        <div className="col-12">
                            <CitizenList
                                items={data}
                                setOnRowClick={row => onRowClick(row)}
                            />
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default Home;
