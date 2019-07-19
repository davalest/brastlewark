import React from 'react';
import Paper from '@material-ui/core/Paper';
import SearchBar from "./SearchBar";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    searchBar: {
        position: "fixed",
        top: 20,
        left: 0,
        right: 0,
        zIndex: 999,
        width:"86%"
    },
    title: {
        textAlign: "center",
        color: "#1769aa"
    }
});


const Header = (props) => {
    const classes = useStyles();
    return (
        <div className={`${classes.searchBar} container-fluid`}>
            <div className="row">
                <div className="col-12">
                    <Paper elevation={3}
                           className={classes.paperContainer}
                    >
                        <SearchBar
                            hintText={props.hintText}
                            dataSource={props.dataSource}
                            maxSearchResults={4}
                            onNewRequest={props.onNewRequest}
                        />
                    </Paper>
                </div>
            </div>
        </div>
    )
};

export default Header;