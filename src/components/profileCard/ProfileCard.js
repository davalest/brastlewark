import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import { getString } from "../../resources";

const useStyles = makeStyles(theme => ( {
    root: {
        padding: theme.spacing(3, 2),
        width: 800
    },
    avatar: {
        margin: 10,
        width: 60,
        height: 60,
    }
} ));

const ProfileCard = (props) => {
    const classes = useStyles();
    return (
        <div>
            <Paper className={classes.root}>
                <Avatar alt="profile picture"
                        src={props.profilePicture}
                        className={classes.avatar}
                />
                <p>{`${getString("name")}: ${props.name}`}</p>
                <p>{`${getString("age")}: ${props.age}`}</p>
                <p>{`${getString("weight")}: ${props.weight}`}</p>
                <p>{`${getString("height")}: ${props.height}`}</p>
                <p>{`${getString("hair_color")}: ${props.hair_color}`}</p>
                <p>{`${getString("professions")}:`}</p>
                <ul>{props.professions.map((items, index) => {
                    return (
                        <li key={index}>
                            {items}
                        </li>
                    )
                })}
                </ul>
                <p>{`${getString("friends")}:`}</p>
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
    );
};

export default ProfileCard;