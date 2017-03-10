# -*- coding: utf-8 -*-
# Generated by Django 1.10.6 on 2017-03-10 17:08
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='CharityFund',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='Donation',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('amount', models.IntegerField()),
                ('public', models.BooleanField()),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
                ('charity_fund', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='donations.CharityFund')),
            ],
        ),
    ]
