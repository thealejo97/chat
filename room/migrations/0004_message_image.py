# Generated by Django 2.0 on 2021-09-19 04:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('room', '0003_message_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='message',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='msjs', verbose_name='Adjunto'),
        ),
    ]