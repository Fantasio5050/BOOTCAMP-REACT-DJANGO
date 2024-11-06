# Generated by Django 5.1.2 on 2024-11-06 14:29

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blackjack', '0002_rename_text_game_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='player',
            name='game',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='players', to='blackjack.game'),
        ),
    ]