# Generated by Django 3.1 on 2021-04-06 21:25

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='SignUp',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code', models.CharField(help_text='random code used for registration and for password reset', max_length=15)),
                ('used', models.BooleanField(default=False)),
                ('action', models.CharField(choices=[('R', 'registration'), ('PR', 'password reset')], default='R', max_length=2)),
                ('user', models.OneToOneField(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='signup_profile', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
