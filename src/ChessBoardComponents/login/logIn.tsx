import { LockOutlined } from "@mui/icons-material";
import {
  Container,
  CssBaseline,
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  Grid
} from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence
} from "firebase/auth";
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const auth = getAuth();
      await setPersistence(auth, browserLocalPersistence);
      await signInWithEmailAndPassword(auth, email, password);
      setError("");
      navigate("/chess");
    } catch (error) {
      if (error instanceof Error) {
        switch (error.message) {
          case "Firebase: Error (auth/invalid-email).":
            setError(
              "Email-ът ви е невалиден. Проверете за грешки в изписването."
            );
            break;
          case "Firebase: Error (auth/invalid-password).":
            setError("Паролата ви не е правилна.");
            break;
          case "Firebase: Error (auth/invalid-credential).":
            setError("Невалиден email или парола.");
            break;
          case "Firebase: Error (auth/user-not-found).":
            setError("Потребителят не е намерен.");
            break;
          case "Firebase: Error (auth/missing-password).":
            setError("Моля напишете вашата парола.");
            break;
          case "Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests).":
            setError(
              "Достъпът до този акаунт е временно деактивиран поради много неуспешни опити за влизане. Можете незабавно да го възстановите, като нулирате паролата си, или можете да опитате отново по-късно."
            );
            break;
          default:
            setError("Грешка се случи: " + error.message);
        }
      } else {
        setError("Грешка се случи.");
      }
    }
  };

  return (
    <>
      <Container maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            mt: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.light" }}>
            <LockOutlined />
          </Avatar>
          <Typography variant="h5">Влез в Акаунта</Typography>
          <Box sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Имейл Адрес"
              name="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              name="парола"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />

            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleLogin}
            >
              Влез
            </Button>
            {error && (
              <Typography color="red" fontSize="sm" mb="8px">
                {error}
              </Typography>
            )}
            <Grid container justifyContent={"flex-end"}>
              <Grid item>
                <Link to="/signup">Нямаш Акаунт?</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Login;
