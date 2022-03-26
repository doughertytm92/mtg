const baseUrl = 'https://api.scryfall.com/cards/'; //search?order=name&q=nissa'

export async function mtgNameSearch (cardText) {
  const url = baseUrl + 'search?order=name&q=' + cardText;
  try {
    const resp = await fetch(url);
    const data = await resp.json();
    return data;
  } catch(error) {
    console.log(`Error: ${error}`);
    return;
  }
};