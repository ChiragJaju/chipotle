import { useContext, useState } from "react";
import {
  Paper,
  createStyles,
  TextInput,
  PasswordInput,
  Button,
  Title,
  Text,
  Divider,
} from "@mantine/core";
import Google from "../resources/google.png";
import { auth, provider } from "../services/firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import AuthContext from "../context/AuthContext";
import axios from "axios";

const login = async (n, e) => {
  await axios
    .post("http://localhost:5000/login", {
      user: n,
      email: e,
    })
    .then((res) => {
      // console.log("results");
      // console.log(res);
    })
    .catch((err) => console.error(err));
};

const useStyles = createStyles((theme) => ({
  wrapper: {
    minHeight: 900,
    backgroundSize: "cover",
    alignItems: "center",
    backgroundImage:
      "url(https://images.unsplash.com/photo-1484242857719-4b9144542727?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1280&q=80)",
  },

  form: {
    borderRight: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[3]
    }`,
    minHeight: 900,
    maxWidth: 450,
    paddingTop: 80,

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      maxWidth: "100%",
    },
  },

  title: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  logo: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    width: 120,
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
  },
  google: {
    width: "100%",
    textAlign: "center",
  },
}));

export default function AuthenticationImage() {
  const { classes } = useStyles();
  const { setUser } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(true);

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleLogin = () => {
    if (username === "admin" && password === "admin") {
      setUser({ name: "admin" });
    }
    setLoggedIn(false);
  };
  const login = async (name, email) => {
    const response = await axios.post("http://localhost:5000/login", {
      user: name,
      email: email,
    });
    setUser({
      name: "student",
      email: email,
      uid: response.data[0].uid,
    });
    // console.log(response);
    //TO-DO
  };

  const onClick = async () => {
    // setLoggedIn(true);
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user.
        const signedInUser = result.user;

        login(signedInUser.displayName, signedInUser.email);
        // console.log(signedInUser);
      })
      .catch((error) => {
        console.log(error);

        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };

  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30}>
        <Title
          order={2}
          className={classes.title}
          align="center"
          mt="md"
          mb={50}
        >
          Welcome to Chipotle!
        </Title>

        <TextInput
          label="Username"
          placeholder="Admin"
          size="md"
          onChange={handleUsername}
          value={username}
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          mt="md"
          size="md"
          onChange={handlePassword}
          value={password}
        />

        <Button fullWidth mt="xl" size="md" color="dark" onClick={handleLogin}>
          Login
        </Button>
        <Divider label="Students Login with" labelPosition="center" my="lg" />
        <div className={classes.google}>
          <Button
            color="dark"
            sx={{ height: "50px" }}
            onClick={onClick}
            align="center"
          >
            <img src={Google} style={{ height: "25px" }} alt="google"></img>
            <Text
              sx={{
                fontSize: "20px",
                //   fontWeight: "bold",
                fontFamily: "Roboto",
                letterSpacing: "1px",
                lineHeight: "30px",
                textAlign: "center",
              }}
            ></Text>
          </Button>
        </div>
        {loggedIn === false && (
          <Text
            color="red"
            sx={{
              fontSize: "20px",
              //   fontWeight: "bold",
              fontFamily: "Roboto",
              letterSpacing: "1px",
              lineHeight: "30px",
              textAlign: "center",
              marginTop: "10px",
            }}
          >
            Invalid Username/Password.
          </Text>
        )}
      </Paper>
    </div>
  );
}
