import * as React from 'react';
import {
  CssBaseline,
  AppBar,
  Container,
  Toolbar,
  Paper,
  Typography,
  Grid,
  Link
} from '@mui/material';

export default function Checkout() {
  const [activeStep, setActiveStep] = React.useState(0);

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`
        }}
      >
        <Toolbar></Toolbar>
      </AppBar>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>

          <Grid container justifyContent="flex-start">
          <Grid item>
            <Link href="/singUp" variant="body2">
              Нямаш акаунт? Направи си тук!
            </Link>
          </Grid>

          </Grid>
          <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/singIn" variant="body2">
                  Вече имате акаунт? Влезнете тук
                </Link>
              </Grid>
            </Grid>
        </Paper>
      </Container>
    </React.Fragment>
  );
}
