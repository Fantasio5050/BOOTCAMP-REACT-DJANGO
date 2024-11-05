from django.urls import path
from ninja import Router, ModelSchema, Schema
from blackjack.models import Game, Player
from . import views

router = Router()

urlpatterns = [
    path("", views.index, name="index"),
]

class GameSchema(ModelSchema):
    class Meta:
        model = Game
        fields = [
            'text',
            'turn',
            'ended',
        ]
    players: list[Player]
    class Config:
        arbitrary_types_allowed = True

class PlayerSchema(ModelSchema):
    class Meta:
        model = Player
        fields = [
            'id',
            'name',
            'score',
        ]

class AddPlayerSchema(Schema):
    name: str

class AddGameSchema(Schema):
    text: str
    players: list[str]
    


@router.post('/create_game', response=GameSchema)
def create_game(request, add_game: AddGameSchema):
    game = Game.objects.create(text = add_game.text)
    return game
