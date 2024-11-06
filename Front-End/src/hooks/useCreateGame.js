export default function useCreateGame() {
  const createGame = async (game) => {
    try {
      const response = await fetch("http://localhost:8000/api/blackjack/create_game", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: game.name,
          players: game.players,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return { createGame };
}