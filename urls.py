from django.urls import path

from . import views

urlpatterns = [
    path("", views.npcsearch, name="index"),

    path("<int:id>/", views.npc, name="npc"),

    path("item/", views.itemsearch, name="itemsearch"),

    path("item/<int:id>/", views.item, name="item"),

    path("rdtcalc/", views.rdtcalc, name="rdtcalc"),

]