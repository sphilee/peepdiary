# -*- coding: utf-8 -*-
# Generated by Django 1.10.6 on 2017-04-15 16:12
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0002_auto_20170415_1436'),
    ]

    operations = [
        migrations.AlterField(
            model_name='peepuser',
            name='gender',
            field=models.IntegerField(default=0),
        ),
    ]
