import { Accordion, AccordionDetails, AccordionSummary, Button, Stack, TextField, Typography } from "@mui/material";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";

interface AgentKeyProps {
  apiKey: string;
  setApiKey: (value: string) => void;
  deleteKey: () => void;
}

const AgentKey = ({ apiKey, setApiKey, deleteKey }: AgentKeyProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setApiKey(event.target.value);
  };

  return (
    <Accordion elevation={3}>
      <AccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon />}
        sx={{ flexDirection: "row-reverse", ".Mui-expanded & .MuiAccordionSummary-expandIconWrapper": { transform: "rotate(90deg)" } }}
      >
        <Typography variant="h6" sx={{ ml: 2 }}>
          Gemini API Key
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Stack spacing={{ xs: 1, sm: 2 }}>
          <TextField autoComplete="off" fullWidth type="password" label="Enter your key" value={apiKey} onChange={handleChange} />
          <Button
            onClick={() => {
              deleteKey();
            }}
            variant="contained"
            color="error"
          >
            Delete Key
          </Button>
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};

export default AgentKey;
