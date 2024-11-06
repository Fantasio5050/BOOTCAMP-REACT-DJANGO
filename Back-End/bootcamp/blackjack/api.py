from ninja import Router, Schema
from blackjack.models import Game, Player
from random import randint

router = Router()

class PlayerSchema(Schema):
    id: int
    name: str
    score: int

class GameSchema(Schema):
    name: str
    turn: int
    ended: bool
    players: list[PlayerSchema]

class AddPlayerSchema(Schema):
    name: str

class AddGameSchema(Schema):
    name: str
    players: list[str]

@router.post('/create_game', response=GameSchema)
def create_game(request, add_game: AddGameSchema):
    game = Game.objects.create(name=add_game.name)
    players = [Player.objects.create(name=name, game=game) for name in add_game.players]
    return {
        "name": game.name,
        "turn": game.turn,
        "ended": game.ended,
        "players": [{"id": player.id, "name": player.name, "score": player.score} for player in players]
    }

@router.post('/rollDice/{current_player_score}/{dices_number}/', response=int)
def roll_dice(request, current_player_score: int, dices_number: int):
    for i in range(dices_number):
        current_player_score += randint(1, 6)
    if (current_player_score > 21):
        return 0
    elif (current_player_score == 21):
        return 21
    else:
        return current_player_score

@router.post('/endTurn/{current_player_score}/{current_player_id}/', response=int)
def end_turn(request, current_player_score: int, current_player_id: int):
    player = Player.objects.get(id=current_player_id)
    player.score = current_player_score
    player.save()
    return player.score
