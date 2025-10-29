export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  const { to, subject, htmlContent } = req.body;
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ message: 'Brevo API key not configured on the server (BREVO_API_KEY).' });
  }
  if (!to || !subject || !htmlContent) {
    return res.status(400).json({ message: 'Missing parameters.' });
  }

  try {
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'api-key': apiKey
      },
      body: JSON.stringify({
        sender: { name: 'Automatize Email', email: 'no-reply@automatizeemail.com' },
        to: [{ email: to }],
        subject,
        htmlContent
      })
    });

    const data = await response.json();
    if (!response.ok) {
      return res.status(response.status).json({ message: data.message || data });
    }

    return res.status(200).json({ messageId: data.messageId || null, raw: data });
  } catch (err) {
    console.error('Brevo send error', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
