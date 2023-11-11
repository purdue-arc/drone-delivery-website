import {createSignal} from "solid-js";
import {supabase} from "~/lib/supabaseClient";
import {Avatar, Box, Button, TextField, Typography} from "@suid/material";
import {type SignInWithPasswordCredentials} from "@supabase/supabase-js";

export default function Auth() {
  const [loading, setLoading] = createSignal(false);

  const handleLogin = async(e: SubmitEvent) => {
    e.preventDefault();
    // TODO: use material UI's validation UI
    if (!(e.target as HTMLFormElement).reportValidity())
      return;
    const formData = new FormData(e.target as HTMLFormElement);

    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.get("email") ?? "",
        password: formData.get("password") ?? "",
      } as SignInWithPasswordCredentials);
      console.log(data);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }} />
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {loading() ? <span>Loading</span> : <span>Login</span>}
          </Button>
        </Box>
      </Box>
  );
}
