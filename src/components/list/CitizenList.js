import React, { useState } from "react";
import { getString } from "resources";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from '@material-ui/core/Avatar';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Paper from "@material-ui/core/Paper";

function desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
    return order === "desc" ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const headRows = [
    {
        id: "thumbnail",
        label: ""
    },
    {
        id: "name",
        label: getString("name")
    },
    {
        id: "age",
        label: getString("age")
    },
    {
        id: "weight",
        label: getString("weight")
    },
    {
        id: "height",
        label: getString("height")
    },
    {
        id: "hair_color",
        label: getString("hair_color")
    },
    {
        id: "professions",
        label: getString("professions")
    },
    {
        id: "friends",
        label: getString("friends")
    },
];

const OrderedTableHead = (props) => {
    const { order, orderBy, onRequestSort } = props;
    const createSortHandler = property => event => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {headRows.map(row => (
                    <TableCell
                        key={row.id}
                        sortDirection={orderBy === row.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === row.id}
                            direction={order}
                            onClick={createSortHandler(row.id)}
                        >
                            {row.label}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
};


const useStyles = makeStyles(theme => ( {
    root: {
        width: "100%"
    },
    paper: {
        width: "100%",
        marginBottom: theme.spacing(2),
    },
    listStyle: {
        listStyle: "none",
        padding: 0
    },
    avatar: {
        width: 50,
        height: 50,
    },
    tableWrapper: {
        overflowX: "auto",
    }
} ));

const CitizenTable = (props) => {
    const classes = useStyles();
    const [order, setOrder] = useState("asc");
    const [orderBy, setOrderBy] = useState("name");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    function handleRequestSort(event, property) {
        const isDesc = orderBy === property && order === "desc";
        setOrder(isDesc ? "asc" : "desc");
        setOrderBy(property);
    }

    function handleChangePage(event, newPage) {
        setPage(newPage);
    }

    function handleChangeRowsPerPage(event) {
        setRowsPerPage(+event.target.value);
        setPage(0);
    }

    const handleClick = (event, name) => {
        props.setOnRowClick(name)
    };


    const emptyRows = rowsPerPage - Math.min(rowsPerPage, props.items.length - page * rowsPerPage);

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <div className={classes.tableWrapper}>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        size="medium"
                    >
                        <OrderedTableHead
                            row={props.items}
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                        />
                        <TableBody>
                            {stableSort(props.items, getSorting(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    return (
                                        <TableRow
                                            hover
                                            tabIndex={-1}
                                            key={row.name}
                                            onClick={event => handleClick(event, row)}
                                        >
                                            <TableCell>
                                                <Avatar alt="profile picture"
                                                        src={row.thumbnail}
                                                        className={classes.avatar}
                                                />
                                            </TableCell>
                                            <TableCell component="th"
                                                       id={index}
                                                       scope="row"

                                            >
                                                {row.name}
                                            </TableCell>
                                            <TableCell>{row.age}</TableCell>
                                            <TableCell>{Math.round(row.weight * 100) / 100}</TableCell>
                                            <TableCell>{Math.round(row.height * 100) / 100}</TableCell>
                                            <TableCell>{row.hair_color}</TableCell>
                                            <TableCell>{row.professions.map((item, index) => {
                                                return (
                                                    <li key={index}
                                                        className={classes.listStyle}
                                                    >
                                                        - {item}
                                                    </li>
                                                )

                                            })}</TableCell>
                                            <TableCell>{row.friends.map((item, index) => {
                                                return (
                                                    <li key={index}
                                                        className={classes.listStyle}
                                                    >
                                                        - {item}
                                                    </li>
                                                )

                                            })}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 49 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={props.items.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    backIconButtonProps={{
                        "aria-label": "Previous Page",
                    }}
                    nextIconButtonProps={{
                        "aria-label": "Next Page",
                    }}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    );
};

export default CitizenTable;
