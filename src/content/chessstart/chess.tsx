import { Helmet } from 'react-helmet-async';
import { Button, Box, Container, Grid } from '@mui/material';
import Referee from 'src/content/chess/ChessBoardComponents/Referee/Referee';
// import {
//   Button,
//   Container,
//   IconButton,
//   Grid,
//   Card,
//   CardHeader,
//   CardContent,
//   Divider
// } from '@mui/material';

function Gameplay() {
  return (
    <>
      <Helmet>
        <title>Място за игра</title>
      </Helmet>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center" 
       
          sx={{
            pb: 3
          }}
        >
          <Grid>
            <Referee />
          </Grid>
          <Grid item xs={12}>
            <Button sx={{ margin: 25  }} variant="contained" color="success" size="large">
              ИГРАЙ     
            </Button>
          </Grid>
        </Box>
    </>
  );
}

export default Gameplay;
