const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');

const app = express();

// Twilio API credentials
const accountSid = 'AC3d9b9929b75233a1badc79a5338e5ace';
const authToken = '00b003c164e8e5ff50decfccd6637f8d';
const client = twilio(accountSid, authToken);
const senderId = '+12562782587';

app.use(bodyParser.json());

// API endpoint to send SMS
app.post('/send-sms', async (req, res) => {
  try {
    // const { phoneNumber} = req.body;
    
    const response = await client.messages.create({
      body: "Wildfire alert in your locality!!!! Inform locals ",
      from: senderId,
      to:"+916280863838"
    });

    console.log('SMS sent:', response.sid);
    res.status(200).json({ success: true, message: 'SMS sent successfully' });
  } catch (error) {
    console.error('Error sending SMS:', error);
    res.status(500).json({ success: false, message: 'Failed to send SMS' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
