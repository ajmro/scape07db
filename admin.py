from django.contrib import admin

from .models import Npc, Item, Drop

class DropsInline(admin.TabularInline):
    model = Drop
    fields = ('item', 'npc', 'rate', 'quantity', 'noted')
    extra = 0

    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        if db_field.name == "item":
            kwargs["queryset"] = Item.objects.all().order_by('name')
        return super().formfield_for_foreignkey(db_field, request, **kwargs)

class DropsAdmin(admin.ModelAdmin):
    inlines = [DropsInline]

admin.site.register(Npc, DropsAdmin)
admin.site.register(Item, DropsAdmin)