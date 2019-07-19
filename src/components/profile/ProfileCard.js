import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import { getString } from "resources";
import ArrowIcon from '@material-ui/icons/ArrowBack';
import Fab from '@material-ui/core/Fab';

const useStyles = makeStyles(theme => ( {
        root: {
            padding: theme.spacing(5, 10),
            flex: 1
        },
        avatar: {
            margin: "auto",
            width: 60,
            height: 60,
        },
        label: {
            fontWeight: "bold",
            color: "#1769aa"
        },
        icons: {
            position: "fixed",
            bottom: 10,
            right: 10,
            zIndex: 999,
            "&:focus": {
                outline: 0
            }
        }
    }
));

const ProfileCard = (props) => {
    const classes = useStyles();
    return (
        <div className="row">
            <Fab size="medium"
                 color="primary"
                 aria-label="Back"
                 className={classes.icons}
                 onClick={props.setOnClickBack}
            >
                <ArrowIcon />
            </Fab>
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
                        <span className={classes.label}>{`${getString("weight")}:`}</span> {Math.round(props.weight * 100) / 100}
                    </p>
                    <p>
                        <span className={classes.label}>{`${getString("height")}:`}</span> {Math.round(props.height * 100) / 100}
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