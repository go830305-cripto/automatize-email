export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ answer: 'Method not allowed' });
  const { message } = req.body || {};
  if (!message) return res.status(400).json({ answer: 'Por favor envie uma mensagem.' });

  const msg = message.toLowerCase();
  if (msg.includes('como') && msg.includes('enviar')) {
    return res.status(200).json({ answer: 'Para enviar, faça upload da lista ou informe um e-mail de destino, escreva o assunto e o corpo, e clique em "Enviar com Brevo".' });
  }
  if (msg.includes('agendar')) {
    return res.status(200).json({ answer: 'Use o campo de data/hora para escolher quando o e-mail deve ser enviado e então clique em "Agendar".' });
  }
  if (msg.includes('preço') || msg.includes('plano')) {
    return res.status(200).json({ answer: 'Informações sobre planos ainda não estão disponíveis aqui. Por favor verifique a página de Preços ou entre em contato.' });
  }
  return res.status(200).json({ answer: 'Ainda não tenho essa informação, mas você pode verificar na seção de ajuda.' });
}
