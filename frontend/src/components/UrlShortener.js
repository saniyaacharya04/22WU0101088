import React, { useState } from "react";
import axios from "axios";
import { Container, TextField, Button, Typography, Box, Link, Alert } from "@mui/material";

function UrlShortener() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setShortUrl("");

    try {
      const res = await axios.post("http://localhost:5000/api/url/shorten", {
        longUrl
      });
      setShortUrl(res.data.shortUrl);
    } catch (err) {
      setError("Failed to shorten URL. Please try again.");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5, textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>
        URL Shortener
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", gap: 2, justifyContent: "center" }}
      >
        <TextField
          label="Enter Long URL"
          variant="outlined"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          fullWidth
          required
        />
        <Button type="submit" variant="contained">
          Shorten
        </Button>
      </Box>

      {shortUrl && (
        <Alert severity="success" sx={{ mt: 3 }}>
          Short URL:{" "}
          <Link href={shortUrl} target="_blank" rel="noopener noreferrer">
            {shortUrl}
          </Link>
        </Alert>
      )}

      {error && (
        <Alert severity="error" sx={{ mt: 3 }}>
          {error}
        </Alert>
      )}
    </Container>
  );
}

export default UrlShortener;
