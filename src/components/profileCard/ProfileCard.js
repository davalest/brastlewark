import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import { getString } from "resources";

const useStyles = makeStyles(theme => ( {
    root: {
        padding: theme.spacing(5, 10),
        flex: 1,
        marginTop: 100
    },
    avatar: {
        margin: "auto",
        width: 60,
        height: 60,
    },
    label: {
        fontWeight: "bold",
        color:"#1769aa"
    }
} ));

const ProfileCard = (props) => {
    const classes = useStyles();
    return (
        <div className="row">
            <div className="col-12 d-flex justify-content-center align-items-center">
                <Paper className={classes.root}>
                    <Avatar alt="profile picture"
                            src={props.profilePicture}
                            className={classes.avatar}
                    />
                    <p className="mt-4">
                        <span className={classes.label}>{`${getString("name")}:`}</span> {props.name}
                    </p>
                    <p>
                        <span className={classes.label}>{`${getString("age")}:`}</span> {props.age}
                    </p>
                    <p>
                        <span className={classes.label}>{`${getString("weight")}:`}</span> {props.weight}
                    </p>
                    <p>
                        <span className={classes.label}>{`${getString("height")}:`}</span> {props.height}
                    </p>
                    <p>
                        <span className={classes.label}>{`${getString("hair_color")}:`}</span> {props.hair_color}
                    </p>
                    <p>
                        <span className={classes.label}>{`${getString("professions")}: `}</span>
                    </p>
                    <ul>{props.professions.map((items, index) => {
                        return (
                            <li key={index}>
                                {items}
                            </li>
                        )
                    })}
                    </ul>
                    <p>
                        <span className={classes.label}>{`${getString("friends")}: `}</span>
                    </p>
                    <ul>{props.friends.map((items, index) => {
                        return (
                            <li key={index}>
                                {items}
                            </li>
                        )
                    })}
                    </ul>
                </Paper>
            </div>
        </div>
    );
};

export default ProfileCard;