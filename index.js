require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");
const express = require("express");
const app = express();
const PORT = 3001;

const TOKEN = process.env.DISCORD_TOKEN;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ],
});

let latestMessage = "Nenhuma mensagem";

// ID do canal "geral"
const GENERAL_CHANNEL_ID = "1412558974997495859";

client.once("ready", () => {
  console.log(`✅ Bot conectado como ${client.user.tag}`);
});

client.on("messageCreate", (message) => {
  // Ignora mensagens de bots
  if (message.author.bot) return;

  // Garante que é um canal de texto e só do canal desejado
  if (!message.channel.isTextBased() || message.channel.id !== GENERAL_CHANNEL_ID) return;

  // Concatena usuário + mensagem
  latestMessage = `${message.author.tag}: ${message.content}`;
  console.log("📩 Mensagem recebida:", latestMessage);
});

app.get("/latest-message", (req, res) => {
  res.json({ message: latestMessage });
});

client.login(TOKEN);
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
