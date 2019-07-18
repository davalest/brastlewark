import React from 'react';
import Paper from '@material-ui/core/Paper';
import TextComplete from "../searchBar/SearchBar";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    searchBar: {
        position: "fixed",
        top: 20,
        left: 0,
        zIndex: 999
    },
    paperContainer: {
        paddingTop: 20,
        paddingBottom: 20
    },
    title:{
        textAlign:"center",
        color:"#1769aa"
    }
});


const SearchBar = (props) => {
    const classes = useStyles();
    return (
        <div className={`${classes.searchBar} container-fluid`}>
            <div className="row">
                <div className="col-12">
                    <Paper elevation={3}
                           className={classes.paperContainer}
                    >
                        <h1 className={classes.title}>Pro</h1>
                        <TextComplete
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

export default SearchBar;