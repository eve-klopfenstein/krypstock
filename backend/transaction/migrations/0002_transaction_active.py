# Generated by Django 3.1 on 2021-04-07 07:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('transaction', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='transaction',
            name='active',
            field=models.BooleanField(default=True),
        ),
    ]
