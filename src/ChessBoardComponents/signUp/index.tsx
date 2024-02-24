import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography
} from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence
} from "firebase/auth";
const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async () => {
    try {
      const auth = getAuth();
      await setPersistence(auth, browserLocalPersistence);
      await createUserWithEmailAndPassword(auth, email, password).then(() => {
        signInWithEmailAndPassword(auth, email, password).then(() => {
          let key = Object.keys(localStorage).filter((obj) =>
            obj.startsWith("firebase:authUser")
          );
          const userData = localStorage.getItem(key[0]) ?? "";
          let jsonUserData = JSON.parse(userData);
          let token = jsonUserData.stsTokenManager.accessToken;
          if (token) {
            navigate("/chess");
            setError("");
          } else {
            setError("Unable to retrieve user token");
          }
        });
      });
      // Optionally, you can handle redirection or show a success message here
    } catch (error) {
      if (error instanceof Error) {
        switch (error.message) {
          case "Firebase: Error (auth/invalid-email).":
            setError(
              "Email-ът ви е невалиден. Проверете за грешки в изписването."
            );
            break;
          case "Firebase: Error (auth/email-already-exists).":
            setError(
              "Този еmail е регистриран. Да не би да искахте да влезете в профила ви?"
            );
            break;
          case "Firebase: Error (auth/invalid-password).":
            setError("Паролата ви не е правилна.");
            break;
          case "Firebase: Error (auth/missing-password).":
            setError("Моля напишете вашата парола.");
            break;
          case "Firebase: Error (auth/email-already-in-use).":
            setError(
              "Този еmail е регистриран. Да не би да искахте да влезете в профила ви?"
            );
            break;
          case "Firebase: Password should be at least 6 characters (auth/weak-password).":
            setError("Паролата ви трябва да бъде поне 6 символа.");
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
          <Typography variant="h5">Регистрация</Typography>
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Име"
                  autoFocus
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Имейл Адрес"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Парола"
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
            </Grid>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleRegister}
            >
              Регистрация
            </Button>
            {error && (
              <Typography color="red" fontSize="sm" mb="8px">
                {error}
              </Typography>
            )}
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login">Вече имаш акаунт?</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default SignUp;
