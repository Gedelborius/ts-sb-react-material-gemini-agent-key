import React, { useEffect, useMemo, useState } from "react";
import { Box, TextField, Button, CircularProgress, Typography, Paper, Alert } from "@mui/material";
import { GoogleGenerativeAI } from "@google/generative-ai";
import ReactMarkdown from "react-markdown";
import AgentKey from "../AgentKey/AgentKey";

const GeminiChat = () => {
  const [apiKey, setApiKey] = useState(() => {
    try {
      const savedData = localStorage.getItem("API_KEY");
      if (savedData) {
        const parsedData: string = JSON.parse(savedData);
        if (parsedData.length > 0) {
          return parsedData;
        }
      }
    } catch (error) {
      console.error("Error load from localStorage key API_KEY:", error);
    }
    return "";
  });

  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const genAI = useMemo(() => {
    return new GoogleGenerativeAI(apiKey);
  }, [apiKey]);

  useEffect(() => {
    try {
      const valueToStore = JSON.stringify(apiKey);
      localStorage.setItem("API_KEY", valueToStore);
    } catch (error) {
      console.error("Error saving to localStorage key API_KEY:", error);
    }
  }, [apiKey]);

  const deleteKey = () => {
    localStorage.removeItem("API_KEY");
    setApiKey("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    setError("");

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(input);
      const text = await result.response.text();

      setResponse(text);
    } catch (err) {
      setError("Error: " + (err instanceof Error ? err.message : "Failed to fetch"));
      console.error("API Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 800,
        margin: "auto",
        p: 3,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        // gap: 3,
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Gemini Chat Interface
      </Typography>

      <Paper elevation={3} sx={{ p: 3, mt: 1 }}>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            multiline
            minRows={3}
            maxRows={6}
            label="Enter your question"
            variant="outlined"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            sx={{ mb: 2 }}
            disabled={loading}
          />

          <Button type="submit" variant="contained" color="primary" disabled={loading} startIcon={loading ? <CircularProgress size={20} /> : null}>
            {loading ? "Processing..." : "Ask Gemini"}
          </Button>
        </form>
      </Paper>

      <Box sx={{ mt: 2 }}>
        <AgentKey apiKey={apiKey} setApiKey={setApiKey} deleteKey={deleteKey} />
      </Box>

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      {response && (
        <Paper elevation={3} sx={{ p: 3, mt: 2 }}>
          <Typography variant="h6" gutterBottom>
            Answer:
          </Typography>
          <ReactMarkdown
            components={{
              p: ({ node, ...props }) => <Typography paragraph {...props} />,
              code: ({ node, ...props }) => (
                <code
                  style={{
                    backgroundColor: "#f5f5f5",
                    padding: "2px 4px",
                    borderRadius: 4,
                  }}
                  {...props}
                />
              ),
            }}
          >
            {response}
          </ReactMarkdown>
        </Paper>
      )}
    </Box>
  );
};

export default GeminiChat;
