from django.shortcuts import render

from django.http import HttpResponse

from .models import Item, Npc, Drop


def itemsearch(request):
    itemlist = Item.objects.order_by("name")
    url = "item/"
    title = "Item Search"
    context = {"searchlist": itemlist, "url": url, "title": title}
    return render(request, "scape07db/list.html", context)

def npcsearch(request):
    npclist = Npc.objects.order_by("name")
    url = ""
    title = "NPC Search"
    context = {"searchlist": npclist, "url": url, "title": title}
    return render(request, "scape07db/list.html", context)

def item(request, id):
    try:
        item = Item.objects.get(id=id)
    except Item.DoesNotExist:
        return render(request, "404.html")
    drop = Drop.objects.filter(item=id)
    context = {"drop": drop, "item": item}
    return render(request, "scape07db/item.html", context)

def npc(request, id):
    try:
        npc = Npc.objects.get(id=id)
    except Npc.DoesNotExist:
        return render(request, "404.html")
    drop = Drop.objects.filter(npc=id)
    context = {"drop": drop, "npc": npc}
    return render(request, "scape07db/npc.html", context)

def rdtcalc(request):
    return render(request, "scape07db/rdtcalc.html")