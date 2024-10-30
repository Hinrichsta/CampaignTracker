from django.contrib import admin
from .models import PartyMember,Receivable,Payable,Vehicles,Hirelings,MagicItems,ConsumableItems

class PartyAdmin(admin.ModelAdmin):
    #Fields listed in the admin interface
    list_display = ('name','player','role','race','notes','active')

    #Searchable Fields
    search_fields = ('name','player')

    #Filter Fields
    list_filter = ('name','player')

    #Details Page
    list_display_links = ()

    #Field Order
    partyfields = ('name','player','role','race','notes','active')


class ReceiveAdmin(admin.ModelAdmin):
    #Fields listed in the admin interface
    list_display = ('irl_date','ig_date','description','pp','gp','sp','cp','payer')

    #Searchable Fields
    search_fields = ('description','payer')

    #Filter Fields
    list_filter = ('irl_date','ig_date','payer')

    #Details Page
    list_display_links = ('payer',)

    #Field Order
    receivefields = ('irl_date','ig_date','description','pp','gp','sp','cp','payer')
    
class PayAdmin(admin.ModelAdmin):
    #Fields listed in the admin interface
    list_display = ('irl_date','ig_date','description','pp','gp','sp','cp','payee','payer')

    #Searchable Fields
    search_fields = ('description','payer')

    #Filter Fields
    list_filter = ('irl_date','ig_date','payer')

    #Details Page
    list_display_links = ('payer',)

    #Field Order
    payfields = ('irl_date','ig_date','description','pp','gp','sp','cp','payer')

class VehicleAdmin(admin.ModelAdmin):
    #Fields listed in the admin interface
    list_display = ('name','type','size','equipment')

    #Searchable Fields
    search_fields = ('name','type')

    #Filter Fields
    list_filter = ('name','type')

    #Details Page
    list_display_links = ()

    #Field Order
    vehiclefields = ('name','type','size','equipment')

class HireAdmin(admin.ModelAdmin):
    #Fields listed in the admin interface
    list_display = ('name','race','stats','vehicle','equipment')

    #Searchable Fields
    search_fields = ('name',)

    #Filter Fields
    list_filter = ('vehicle',)

    #Details Page
    list_display_links = ('vehicle',)

    #Field Order
    hirefields = ('name','race','stats','vehicle','equipment')

class ItemAdmin(admin.ModelAdmin):
    #Fields listed in the admin interface
    list_display = ('irl_date','ig_date','name','notes','rarity','status','creator','link','powner','vowner','howner')

    #Searchable Fields
    search_fields = ('name','rarity')

    #Filter Fields
    list_filter = ('rarity',)

    #Details Page
    list_display_links = ('powner','vowner','howner')

    #Field Order
    itemfields = ('name','notes','rarity','status','creator','link','irl_date','ig_date','powner','vowner','howner')

class ConsumeAdmin(admin.ModelAdmin):
    #Fields listed in the admin interface
    list_display = ('name','notes','type','amount','link')

    #Searchable Fields
    search_fields = ('name',)

    #Filter Fields
    list_filter = ('type','amount')

    #Details Page
    list_display_links = ()

    #Field Order
    consumefields = ('name','type','amount','link','notes')

admin.site.register(PartyMember, PartyAdmin)
admin.site.register(Receivable, ReceiveAdmin)
admin.site.register(Payable, PayAdmin)
admin.site.register(Vehicles, VehicleAdmin)
admin.site.register(Hirelings, HireAdmin)
admin.site.register(MagicItems, ItemAdmin)
admin.site.register(ConsumableItems, ConsumeAdmin)