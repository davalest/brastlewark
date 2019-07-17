import React from "react";
import PropTypes from "prop-types";
import deburr from "lodash/deburr";
import Downshift from "downshift";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";


function renderInput(inputProps) {
    const { InputProps, classes, ref, ...other } = inputProps;

    return (
        <TextField
            InputProps={{
                inputRef: ref,
                classes: {
                    root: classes.inputRoot,
                    input: classes.inputInput
                },
                ...InputProps
            }}
            {...other}
        />
    );
}

function renderSuggestion(suggestionProps) {
    const {
        suggestion,
        index,
        itemProps,
        highlightedIndex,
        selectedItem
    } = suggestionProps;
    const isHighlighted = highlightedIndex === index;
    const isSelected =
        ( selectedItem !== null ? selectedItem.name : null || "" ).indexOf(
            suggestion.name
        ) > -1;

    return (
        <div key={index}>
            <MenuItem
                {...itemProps}
                key={suggestion.name}
                selected={isHighlighted}
                component="div"
                style={{
                    fontWeight: isSelected ? 500 : 400,
                    paddingTop: 21,
                    paddingBottom: 21
                }}
            >
                <Avatar
                    alt="avatar"
                    src={suggestion.avatar}
                    style={{ marginRight: 20 }}
                />
                <div>
                    <p style={{ marginBottom: 0 }}>{suggestion.name}</p>
                </div>
            </MenuItem>
            <Divider />
        </div>
    );
}

renderSuggestion.propTypes = {
    highlightedIndex: PropTypes.number,
    index: PropTypes.number,
    itemProps: PropTypes.object,
    selectedItem: PropTypes.object,
    suggestion: PropTypes.array
};

function getSuggestions(suggestions, value, { showEmpty = false } = {}) {
    const inputValue = deburr(value.trim()).toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;
    const valuesSuggestions = Object.values(suggestions).map(gnome => {
        const name = gnome.name;
        const avatar = gnome.thumbnail;
        return {
            name,
            avatar
        };
    });

    return inputLength === 0 && !showEmpty
        ? []
        : valuesSuggestions.filter(suggestion => {
            const keep =
                count < 5 &&
                suggestion.name.slice(0, inputLength).toLowerCase() ===
                inputValue;
            if (keep) {
                count += 1;
            }
            return keep;
        });
}

const useStyles = makeStyles(theme => ( {
    root: {
        flexGrow: 1
    },
    container: {
        flexGrow: 1,
        position: "relative"
    },
    paper: {
        position: "absolute",
        zIndex: 1,
        marginTop: theme.spacing(1),
        left: 0,
        right: 0
    },
    chip: {
        margin: theme.spacing(0.5, 0.25)
    },
    inputRoot: {
        flexWrap: "wrap"
    },
    inputInput: {
        width: "auto",
        flexGrow: 1
    },
    divider: {
        height: theme.spacing(2)
    }
} ));

function findGnome(name, props) {
    const gnomesInfo = Object.entries(props.dataSource);
    const gnomesNames = gnomesInfo.map(gnomeObj => {
        return  gnomeObj[1];
    });
    const index = gnomesNames.findIndex(info => info.name === name);
    props.onNewRequest(gnomesInfo[index][1]);
}

const IntegrationDownshift = props => {
    const classes = useStyles();
    const suggestions = props.dataSource;

    return (
        <div className={classes.root}>
            <Downshift
                onChange={selection => findGnome(selection.name, props)}
                itemToString={item => ( item ? item.name : "" )}
            >
                {({
                      getInputProps,
                      getItemProps,
                      getLabelProps,
                      getMenuProps,
                      highlightedIndex,
                      inputValue,
                      isOpen,
                      selectedItem
                  }) => {
                    const { onBlur, onFocus, ...inputProps } = getInputProps({
                        placeholder: props.hintText
                    });

                    return (
                        <div className={classes.container}>
                            {renderInput({
                                fullWidth: true,
                                classes,
                                InputLabelProps: getLabelProps({
                                    shrink: true
                                }),
                                InputProps: {
                                    onBlur,
                                    onFocus
                                },
                                inputProps
                            })}

                            <div {...getMenuProps()}>
                                {isOpen ? (
                                    <Paper className={classes.paper}
                                           square
                                    >
                                        {getSuggestions(
                                            suggestions,
                                            inputValue,
                                            { showEmpty: true }
                                        ).map((suggestion, index) =>
                                            renderSuggestion({
                                                suggestion,
                                                index,
                                                itemProps: getItemProps({
                                                    item: suggestion
                                                }),
                                                highlightedIndex,
                                                selectedItem
                                            })
                                        )}
                                    </Paper>
                                ) : null}
                            </div>
                        </div>
                    );
                }}
            </Downshift>
        </div>
    );
};
export default IntegrationDownshift;
