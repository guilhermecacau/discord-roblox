// index.js
require("dotenv").config(); // Carrega variáveis do .env
const { Client, GatewayIntentBits } = require("discord.js");
const express = require("express");
const app = express();
const PORT = 3001;

const TOKEN = process.env.DISCORD_TOKEN; // Agora o token vem do .env

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ],
});

let latestMessage = "Nenhuma mensagem";

client.once("ready", () => {
  console.log(`✅ Bot conectado como ${client.user.tag}`);
});

client.on("messageCreate", (message) => {
  if (!message.author.bot) {
    console.log(`📩 Mensagem recebida de ${message.author.tag}: ${message.content}`);
    latestMessage = message.content;
  }
});

app.get("/latest-message", (req, res) => {
  res.json({ message: latestMessage });
});

client.login(TOKEN);
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));


