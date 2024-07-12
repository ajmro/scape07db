from django.db import models

class Npc(models.Model):
    name = models.CharField(max_length=50, unique=True)
    combat_level = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.name

class Item(models.Model):
    name = models.CharField(max_length=50, unique=True)
    npcs = models.ManyToManyField(Npc, through='Drop')
    high_alch = models.CharField(default='value', max_length=50)

    def __str__(self):
        return self.name

class Drop(models.Model):
    npc = models.ForeignKey(Npc, on_delete=models.CASCADE)
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    quantity = models.CharField(default='1', max_length=50)
    rate = models.CharField(max_length=50)
    noted = models.BooleanField(default=False)

    def __str__(self):
        return ''