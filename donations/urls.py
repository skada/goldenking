from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^thanks/$', views.thanks, name='thanks'),
    url(r'^(?P<template_name>[a-z_-]+)/$', views.public, name='public'),
]
