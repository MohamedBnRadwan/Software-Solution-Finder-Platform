import { useState } from "react";
import { useForm } from "react-hook-form";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import BusinessIcon from "@mui/icons-material/Business";
import SendIcon from "@mui/icons-material/Send";

export default function Contact() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [success, setSuccess] = useState(false);

  const onSubmit = (data) => {
    console.log("Contact Message Submitted:", data);
    setSuccess(true);
    reset();
    setTimeout(() => setSuccess(false), 5000);
  };

  return (
    <Box sx={{ py: 8, flexGrow: 1 }}>
      <Container maxWidth="lg">
        {/* Title */}
        <Box sx={{ mb: 6, textAlign: "center" }}>
          <Typography variant="h3" gutterBottom sx={{ fontFamily: '"Outfit", sans-serif', fontWeight: 800 }}>
            Contact <span className="gradient-text">Support</span>
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Have questions about your configurator recommendations? Reach out to our technical team.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* Left side: Contact Cards */}
          <Grid item xs={12} md={5}>
            <Stack spacing={3} sx={{ height: "100%", justifyContent: "center" }}>
              <Card className="glass-card">
                <CardContent sx={{ p: 3, display: "flex", alignItems: "center", gap: 2.5 }}>
                  <Box sx={{ p: 1.5, borderRadius: "10px", bgcolor: "rgba(99, 102, 241, 0.1)", color: "primary.main" }}>
                    <EmailIcon />
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">Email Us</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 700 }}>support@solutionfinder.com</Typography>
                  </Box>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardContent sx={{ p: 3, display: "flex", alignItems: "center", gap: 2.5 }}>
                  <Box sx={{ p: 1.5, borderRadius: "10px", bgcolor: "rgba(16, 185, 129, 0.1)", color: "secondary.main" }}>
                    <PhoneIcon />
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">Call Support</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 700 }}>+966 50 123 4567</Typography>
                  </Box>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardContent sx={{ p: 3, display: "flex", alignItems: "center", gap: 2.5 }}>
                  <Box sx={{ p: 1.5, borderRadius: "10px", bgcolor: "rgba(99, 102, 241, 0.1)", color: "primary.main" }}>
                    <BusinessIcon />
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">Headquarters</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 700 }}>King Fahd Road, Riyadh, Saudi Arabia</Typography>
                  </Box>
                </CardContent>
              </Card>
            </Stack>
          </Grid>

          {/* Right side: Message form */}
          <Grid item xs={12} md={7}>
            <Card className="glass-card">
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" gutterBottom sx={{ fontFamily: '"Outfit", sans-serif', fontWeight: 700 }}>
                  Send a Message
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                  Fill out the form below and our engineers will get back to you within 24 hours.
                </Typography>

                {success && (
                  <Box sx={{ p: 2, mb: 3, bgcolor: "rgba(16, 185, 129, 0.1)", border: "1px solid", borderColor: "secondary.main", borderRadius: 2 }}>
                    <Typography variant="body2" color="secondary.light" sx={{ fontWeight: 700 }}>
                      Success! Your message has been sent. We'll be in touch soon.
                    </Typography>
                  </Box>
                )}

                <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Full Name"
                        variant="outlined"
                        fullWidth
                        size="small"
                        {...register("name", { required: "Name is required" })}
                        error={!!errors.name}
                        helperText={errors.name?.message}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Email Address"
                        variant="outlined"
                        fullWidth
                        size="small"
                        type="email"
                        {...register("email", { 
                          required: "Email is required", 
                          pattern: { value: /^\S+@\S+$/i, message: "Invalid email" } 
                        })}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                      />
                    </Grid>
                  </Grid>

                  <TextField
                    label="Subject"
                    variant="outlined"
                    fullWidth
                    size="small"
                    {...register("subject", { required: "Subject is required" })}
                    error={!!errors.subject}
                    helperText={errors.subject?.message}
                  />

                  <TextField
                    label="Your Message"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={4}
                    size="small"
                    {...register("message", { required: "Message content is required" })}
                    error={!!errors.message}
                    helperText={errors.message?.message}
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    startIcon={<SendIcon />}
                    className="glow-btn"
                    sx={{ alignSelf: "flex-end", px: 4, py: 1.2 }}
                  >
                    Send Message
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
