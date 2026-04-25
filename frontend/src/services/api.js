const API_URL = "http://localhost:3000";

export const getAbrigos = async () => {
  const response = await fetch(`${API_URL}/abrigos`)
  const data = await response.json()
  return data
}

export const checkin = async (dados) => {
  const response = await fetch(`${API_URL}/familias/checkin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados)
  })
  const data = await response.json()
  return data
}

export const login = async (dados) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });
  const data = await response.json();
  return data;
};

export const cadastrarAbrigo = async (dados, token) => {
  const response = await fetch(`${API_URL}/abrigos`, {
    method: "POST",
    headers: { "Content-Type": "application/json", authorization: token },
    body: JSON.stringify(dados),
  });
  const data = await response.json();
  return data;
};
