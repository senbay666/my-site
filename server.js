const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = 3000;

// 🔐 Твой токен и chat_id
const TOKEN = '8490429605:AAHfJddsClimPKsy4qfDzVQUNE5brt8vvVE';
const CHAT_ID = '1689350885';

// 📦 Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// 📬 Обработка формы
app.post('/bot', async (req, res) => {
  const { name, message } = req.body;

  console.log('Запрос от формы:', req.body); // лог для отладки

  if (!name || !message) {
    return res.status(400).send('Имя и сообщение обязательны');
  }

  const text = `📩 Новое сообщение:\n👤 Имя: ${name}\n📝 Сообщение: ${message}`;

  try {
    const response = await axios.post(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
      chat_id: CHAT_ID,
      text: text
    });

    console.log('✅ Успешно отправлено:', response.data);
    res.sendStatus(200);
  } catch (err) {
    console.error('❌ Ошибка Telegram:', err.response?.data || err.message);
    res.sendStatus(500);
  }
});

// 🚀 Запуск сервера
app.listen(PORT, () => {
  console.log(`🔥 Сервер запущен: http://localhost:${PORT}`);
});
