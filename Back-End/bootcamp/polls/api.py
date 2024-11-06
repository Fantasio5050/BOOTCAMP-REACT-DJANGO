from ninja import Router, Schema
from polls.models import Question, Choice
from django.utils import timezone

router = Router()

class ChoiceSchema(Schema):
    id: int
    choice_text: str
    votes: int

class QuestionSchema(Schema):
    id: int
    question_text: str
    pub_date: str
    choices: list[ChoiceSchema]

class AddQuestionSchema(Schema):
    question_text: str
    choices: list[str]

@router.post('/create_question', response=QuestionSchema)
def add(request, add_question: AddQuestionSchema):
    question = Question.objects.create(
        question_text=add_question.question_text, pub_date=timezone.now()
    )

    choices = []
    for choice_text in add_question.choices:
        choice = Choice.objects.create(
            choice_text=choice_text,
            question=question
        )
        choices.append({"id": choice.id, "choice_text": choice.choice_text, "votes": choice.votes})

    return {
        "id": question.id,
        "question_text": question.question_text,
        "pub_date": question.pub_date.isoformat(),
        "choices": choices
    }

@router.get("/question/{question_id}", response=QuestionSchema)
def get(request, question_id: int):
    question = Question.objects.get(pk=question_id)
    choices = [{"id": choice.id, "choice_text": choice.choice_text, "votes": choice.votes} for choice in question.choices.all()]
    return {
        "id": question.id,
        "question_text": question.question_text,
        "pub_date": question.pub_date.isoformat(),
        "choices": choices
    }