import { useState } from "react";
import { CssVarsProvider } from "@mui/joy/styles";
import {
  Sheet,
  Typography,
  FormControl,
  FormLabel,
  Input,
  Button,
  Link,
} from "@mui/joy";
import { supabase } from "../utils/initSupabase";
import { useRouter } from "next/router";

export default function SignUp() {
  const initialState = {
    email: "",
    password: "",
  };

  const [form, setForm] = useState(initialState);

  const { email, password } = form;

  const router = useRouter();

  const handleSignUp = async () => {
    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    if (error) alert(error.message);
    else {
      setForm(initialState);
      router.push("/sign-in");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const SetSignInPage = async () => {
    router.push("/sign-in");
  };

  return (
    <CssVarsProvider>
      <main>
        <Sheet
          sx={{
            width: 300,
            mx: "auto",
            my: 4,
            py: 3,
            px: 2,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            borderRadius: "sm",
            boxShadow: "md",
          }}
          variant="outlined"
        >
          <div>
            <Typography level="h4" component="h1">
              <b>Welcome!</b>
            </Typography>
            <Typography level="body2">Sign up to continue.</Typography>
          </div>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              name="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              name="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={handleChange}
            />
          </FormControl>

          <Button sx={{ mt: 1 }} onClick={handleSignUp}>
            Sign up
          </Button>
          <Typography
            endDecorator={<Link onClick={SetSignInPage}>Sign in</Link>}
            fontSize="sm"
            sx={{ alignSelf: "center" }}
          >
            Already have an account?
          </Typography>
        </Sheet>
      </main>
    </CssVarsProvider>
  );
}
