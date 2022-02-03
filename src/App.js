import {
  AppBar,
  Paper,
  Card,
  Table,
  TableBody,
  TableContainer,
  TableFooter,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  tableCellClasses,
  Toolbar,
  Typography,
  IconButton,
} from "@mui/material";
import TrueIcon from '@mui/icons-material/ThumbUpAlt';
import FalseIcon from '@mui/icons-material/ThumbDown';
import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import useStateRef from "react-usestateref";

const useStyles = makeStyles({
  appBarField: {
    flex: 1,
    fontSize: 28,
  },
  subContainer2: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    paddingLeft: "1%",
    paddingRight: "1%",
    margin: "1%",
  },
  headFontSize: {
    color: "white",
    fontWeight: "500",
    fontSize: 14,

    // [theme.breakpoints.up("xl")]: {
    //   fontSize: 16,
    // },
  },
  tableContentSize: {
    marginLeft: "1%",
    fontSize: 14,
    width: "20vw",
  },


});

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#00adb5",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function App() {
  const classes = useStyles()
  const [myList, setMyList, myListRef] = useStateRef([]);

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const emptyRows =  rowsPerPage - Math.min(rowsPerPage, myListRef.current.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/todos").then((res) => {
      let result = res.data;

      setMyList(result);
      console.log(myListRef.current);
    });
  }, []);

  return(
    <div>
      <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.appBarField} >
          System Task
        </Typography>

      
      </Toolbar>
    </AppBar>

    <div
        className={classes.subContainer2}>
      <div style={{ width: "100%", flex: 1, paddingTop: "0%" }}>
        <Card elevation={5}>
          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <StyledTableRow>
                  <StyledTableCell align="left">
                    <Typography
                         className={classes.headFontSize}
                    >
                     ID
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <Typography
                        className={classes.headFontSize}
                    >
                     UserID
                    </Typography>
                  </StyledTableCell>

                  <StyledTableCell align="left">
                    <Typography
                        className={classes.headFontSize}
                    >
                     Title
                    </Typography>
                  </StyledTableCell>

                  <StyledTableCell align="left">
                    <Typography
                        className={classes.headFontSize}
                     
                    >
                     Completed
                    </Typography>
                  </StyledTableCell>
                </StyledTableRow>
              </TableHead>

              <TableBody>
                {(rowsPerPage > 0
                  ? myListRef.current.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : myListRef.current
                ).map((row) => (
                  <StyledTableRow
                  key={row.id}
                  >
                    <StyledTableCell>
                      <Typography
                        className={classes.tableContentSize}
                      >
                         {row.id} 
                      </Typography>
                    </StyledTableCell>

                    <StyledTableCell>
                      <Typography
                        className={classes.tableContentSize}
                      >
                         {row.userId} 
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell>
                      <Typography
                        className={classes.tableContentSize}
                      >
                         {row.title} 
                      </Typography>
                    </StyledTableCell>

                    <StyledTableCell>

                    <IconButton   >
                      {
                        row.completed
                        ? 
                      <TrueIcon style={{color:'green'}}/> :
                      <FalseIcon style={{color:'red'}} />
                      } 
                    </IconButton>

                  
                    </StyledTableCell>

                  </StyledTableRow>
                ))}
                {emptyRows > 0 && (
                  <StyledTableRow style={{ height: 53 * emptyRows }}>
                    <StyledTableCell colSpan={6} />
                  </StyledTableRow>
                )}
              </TableBody>
            </Table>

            <TableFooter
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[
                    5,
                    10,
                    25,
                    { label: "All", value: -1 },
                  ]}
                  colSpan={3}
                  count={myListRef.current.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: { "aria-label": "rows per page" },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </TableRow>
            </TableFooter>
          </TableContainer>
        </Card>
      </div>
    </div>
    </div>
  );
}

export default App;
