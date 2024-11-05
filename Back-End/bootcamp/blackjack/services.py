from blackjack.models import Game, Player

def create_game(game_name: str, players: list[str]) -> Game:
    game = Game(name=game_name)

    for name in players:
        Player.objects.create(name=name, game=game)

    game.save()
    

def get_players(game_id) -> list[Player]:
    game = Game.objects.get(pk=game_id)
    players = game.players.all()
    return players    

def change_score(score: int, player_id: int):
    player = Player.objects.get(pk=player_id)
    player.score = score
    player.save()
    return 