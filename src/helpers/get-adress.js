export async function getAdress(ip = "8.8.8.8") {
  const response = await fetch(`
    https://geo.ipify.org/api/v2/country,city?apiKey=at_wLYiIYXjUBCb5Gqb0IfuZhhj9LM3e&=${ip}`);

  return await response.json();
}
