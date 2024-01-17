const express = require('express');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const https = require('https');
const app = express();
const port = 3000;

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.get('/api/issue/:id', async (req, res) => {
  const numId = req.params.id;
  const email = 'camilaebele123@hotmail.com';  // Substitua pelo seu email
  const password = 'ATATT3xFfGF0yYzxv_mXueC67TdJdshePYFub_TJjl_KtieOlvlE6vToqIR4ipbUfsgYmnNe0EaUXDqgW6eCM0FF0sXyO1v7KZUEkSht0Z5w6Ho3qSCL3H_QM0MPHgmrRu9icjCIXCnEHKEySpow4vRacQ5tkbRZoMcA16fMRn7wepzTs1nejyI=6A5347C4';           // Substitua pela sua senha
  const tokenApi = Buffer.from(`${email}:${password}`).toString('base64');

  try {
    const response = await fetch(`https://camilaebele123.atlassian.net/rest/api/2/issue/${numId}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + tokenApi,
      },
      agent: new https.Agent({ rejectUnauthorized: false }),
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Erro na requisição:', error);
    res.status(500).json({ error: 'Erro na requisição' });
  }
});

app.listen(port, () => {
  console.log(`Servidor está rodando em http://localhost:${port}`);
});
