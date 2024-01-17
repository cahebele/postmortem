function validarPostmortem() {
  const resumoFalha = window.resultadoBusca.resumoFalha;
  const OPENAI_API_KEY = "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";

  document.getElementById('btn-validar-postmortem').value = "Pesquisando...";
  document.getElementById('resposta_jira').innerHTML = resumoFalha;;
  document.getElementById('resposta_jira').innerHTML = "<span></span>";

  fetch("https://api.openai.com/v1/completions", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + OPENAI_API_KEY,
    },
    body: JSON.stringify({
      model: "text-davinci-003",
      prompt:'Gere soluções para o problema:' + resumoFalha,
      max_tokens: 2048,
      temperature: 0.5
    }),
  })
    .then((resposta) => resposta.json())
    .then((dados) => {
      document.getElementById('resposta_chat').innerHTML = dados.choices[0].text;
    })
    .catch(() => {
      document.getElementById('resposta_chat').innerHTML = "Sem resposta";
    });
  document.getElementById('btn-validar-postmortem').value = "Enviar";
}


