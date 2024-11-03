from django.contrib import admin
from .models import Campaign,PartyMember,Receivable,Payable,Vehicles,Hirelings,MagicItems,ConsumItems

class CampaginAdmin(admin.ModelAdmin):
    #Fields listed in the admin interface
    list_display = ('campaignName',)

    #Searchable Fields
    search_fields = ('campaignName',)

    #Filter Fields
    list_filter = ('campaignName',)

    #Details Page
    list_display_links = ('campaignName',)

    #Field Order
    partyfields = ('campaignName',)

class PartyAdmin(admin.ModelAdmin):
    #Fields listed in the admin interface
    list_display = ('characterName','player','class_name','species','notes','active','joinDate','leaveDate','campaign')

    #Searchable Fields
    search_fields = ('characterName','player','campaign')

    #Filter Fields
    list_filter = ('characterName','player','campaign','active')

    #Details Page
    list_display_links = ('characterName',)

    #Field Order
    partyfields = ('characterName','player','class_name','species','notes','active','joinDate','leaveDate','campaign')


class ReceiveAdmin(admin.ModelAdmin):
    #Fields listed in the admin interface
    list_display = ('irl_date','ig_date','description','pp','gp','sp','cp','payer','campaign')

    #Searchable Fields
    search_fields = ('description','payer','campaign')

    #Filter Fields
    list_filter = ('irl_date','ig_date','payer','campaign')

    #Details Page
    list_display_links = ('payer',)

    #Field Order
    receivefields = ('irl_date','ig_date','description','pp','gp','sp','cp','payer')
    
class PayAdmin(admin.ModelAdmin):
    #Fields listed in the admin interface
    list_display = ('irl_date','ig_date','description','pp','gp','sp','cp','payee','payer','campaign')

    #Searchable Fields
    search_fields = ('description','payer','campaign')

    #Filter Fields
    list_filter = ('irl_date','ig_date','payer','campaign')

    #Details Page
    list_display_links = ('payer',)

    #Field Order
    payfields = ('irl_date','ig_date','description','pp','gp','sp','cp','payer','campaign')

class VehicleAdmin(admin.ModelAdmin):
    #Fields listed in the admin interface
    list_display = ('name','type','size','equipment','campaign')

    #Searchable Fields
    search_fields = ('name','type','campaign')

    #Filter Fields
    list_filter = ('name','type','campaign')

    #Details Page
    list_display_links = ('name',)

    #Field Order
    vehiclefields = ('name','type','size','equipment','campaign')

class HireAdmin(admin.ModelAdmin):
    #Fields listed in the admin interface
    list_display = ('name','race','stats','vehicle','equipment','campaign')

    #Searchable Fields
    search_fields = ('name','campaign')

    #Filter Fields
    list_filter = ('vehicle','campaign')

    #Details Page
    list_display_links = ('name',)

    #Field Order
    hirefields = ('name','race','stats','vehicle','equipment','campaign')

class ItemAdmin(admin.ModelAdmin):
    #Fields listed in the admin interface
    list_display = ('irl_date','ig_date','name','notes','rarity','status','creator','link','powner','vowner','howner','campaign')

    #Searchable Fields
    search_fields = ('name','rarity','campaign')

    #Filter Fields
    list_filter = ('rarity','campaign')

    #Details Page
    list_display_links = ('name',)

    #Field Order
    itemfields = ('name','notes','rarity','status','creator','link','irl_date','ig_date','powner','vowner','howner','campaign')

class ConsumeAdmin(admin.ModelAdmin):
    #Fields listed in the admin interface
    list_display = ('name','notes','type','amount','link','campaign')

    #Searchable Fields
    search_fields = ('name','campaign')

    #Filter Fields
    list_filter = ('type','amount','campaign')

    #Details Page
    list_display_links = ('name',)

    #Field Order
    consumefields = ('name','type','amount','link','notes','campaign')

admin.site.register(Campaign, CampaginAdmin)
admin.site.register(PartyMember, PartyAdmin)
admin.site.register(Receivable, ReceiveAdmin)
admin.site.register(Payable, PayAdmin)
admin.site.register(Vehicles, VehicleAdmin)
admin.site.register(Hirelings, HireAdmin)
admin.site.register(MagicItems, ItemAdmin)
admin.site.register(ConsumItems, ConsumeAdmin)