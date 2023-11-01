import { createSignal } from 'solid-js'
import { supabase } from './../supabaseClient'
import { Copyright } from '@suid/icons-material'
import { ThemeProvider, CssBaseline, Box, Avatar, Typography, TextField, FormControlLabel, Checkbox, Button, Grid } from '@suid/material'
import { Container } from 'postcss'
import { Link } from 'solid-start'

export default function Auth() {
  const [loading, setLoading] = createSignal(false)
  const [email, setEmail] = createSignal('')
  const [password, setPassword] = createSignal('')

  const handleLogin = async (e: SubmitEvent) => {
    e.preventDefault()

    try {
      setLoading(true)
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email(),
        password: password(),
      })
      console.log(data)
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        </Avatar>
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
            value={email()}
            onChange={(e) => setEmail(e.currentTarget.value)}
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
            value={password()}
            onChange={(e) => setPassword(e.currentTarget.value)}
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
  )
}