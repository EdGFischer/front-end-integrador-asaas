export async function loginApi(email: string, password: string) {
  const response = await fetch('http://localhost:3333/sessions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Erro ao autenticar');
  }

  const data = await response.json();
  return data;
}