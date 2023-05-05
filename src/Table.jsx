import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Typography } from '@mui/material';

export default function BasicTable({data}) {
  return (
    <Box m={3} p={3}>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow sx={{backgroundColor: (theme) => theme.palette.primary.light}}>
            <TableCell>Name</TableCell>
            <TableCell align="center">Age</TableCell>
            <TableCell align="center">Sex</TableCell>
            <TableCell align="center">Mobile</TableCell>
            <TableCell align="center">Address</TableCell>
            <TableCell align="center">Govt ID</TableCell>
            <TableCell align="center">Guardian Details</TableCell>
            <TableCell align="center">Nationality</TableCell>
          </TableRow>
        </TableHead>
        {
          data === undefined ?      
          <TableBody sx={{backgroundColor: "#C5C6D0"}}>
            <TableRow>
              <TableCell colSpan={8}>
                <Typography textAlign="center">Loading...</Typography>
                </TableCell>
            
            </TableRow>
            </TableBody>
        :
        <TableBody sx={{backgroundColor: "#C5C6D0"}}>
        {data?.map((row) => (
          <TableRow
            key={row.Name}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {row.Name}
            </TableCell>
            <TableCell align="right">{row.DOB}</TableCell>
            <TableCell align="right">{row.Sex}</TableCell>
            <TableCell align="right">{row.Mobile}</TableCell>
            <TableCell align="right">{row.Address}</TableCell>
            <TableCell align="right">{row.GovtID}</TableCell>
            <TableCell align="right">{row.Guardian}</TableCell>
            <TableCell align="right">{row.Nationality}</TableCell>
          </TableRow>
        ))}
      </TableBody>
        }
       
      </Table>
    </TableContainer>
    </Box>
  );
}
