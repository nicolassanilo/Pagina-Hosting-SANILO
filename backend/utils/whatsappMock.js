const sendMessage = async ({ bot, to, text }) => {
  console.log(`Enviando mensaje desde bot ${bot.name} a ${to}: ${text}`);
  return {
    success: true,
    message: `Simulado: mensaje enviado a ${to}`,
    bot: bot.name,
    to,
    text,
  };
};

const processIncomingMessage = ({ bot, message, from }) => {
  const normalized = message.trim().toLowerCase();
  let reply = 'Gracias por tu mensaje. Un agente responderá pronto.';

  if (normalized.includes('hola')) {
    reply = `¡Hola! Soy ${bot.name}. ¿En qué puedo ayudarte hoy?`;
  } else if (normalized.includes('ayuda')) {
    reply = 'Puedes pedir: ayuda, estado, crédito. Estoy aquí para ayudarte.';
  } else if (normalized.includes('crédito') || normalized.includes('creditos')) {
    reply = 'Tu bot está listo para responder y puedes gestionar créditos en el dashboard.';
  }

  console.log(`Webhook recibido para bot ${bot.name}: ${message} de ${from}. Reply: ${reply}`);
  return reply;
};

module.exports = {
  sendMessage,
  processIncomingMessage,
};
