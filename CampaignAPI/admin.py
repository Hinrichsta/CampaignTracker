from django.contrib import admin
from .models import CampaignCore,PartyMember,Receivable,Payable,Vehicles,Hirelings,MagicItems,ConsumItems,CalendarCore,CalMonth,CalEvent

class CampaginCoreAdmin(admin.ModelAdmin):
    #Fields listed in the admin interface
    list_display = ('campaign_name',)

    #Searchable Fields
    search_fields = ('campaign_name',)

    #Filter Fields
    list_filter = ('campaign_name',)

    #Details Page
    list_display_links = ('campaign_name',)

    #Field Order
    partyfields = ('campaign_name',)

class PartyAdmin(admin.ModelAdmin):
    #Fields listed in the admin interface
    list_display = ('character_name','player','class_name','species','notes','active','join_date','leave_date','campaign')

    #Searchable Fields
    search_fields = ('character_name','player','campaign')

    #Filter Fields
    list_filter = ('character_name','player','campaign','active')

    #Details Page
    list_display_links = ('character_name',)

    #Field Order
    partyfields = ('character_name','player','class_name','species','notes','active','join_date','leave_date','campaign')


class ReceiveAdmin(admin.ModelAdmin):
    #Fields listed in the admin interface
    list_display = ('irl_date','ig_date','description','pp','gp','sp','cp','party_trans','payer','campaign')

    #Searchable Fields
    search_fields = ('description','payer','campaign')

    #Filter Fields
    list_filter = ('irl_date','ig_date','payer','campaign')

    #Details Page
    list_display_links = ('payer',)

    #Field Order
    receivefields = ('irl_date','ig_date','description','pp','gp','sp','cp','party_trans','payer','campaign')
    
class PayAdmin(admin.ModelAdmin):
    #Fields listed in the admin interface
    list_display = ('irl_date','ig_date','description','pp','gp','sp','cp','party_trans','payee','payer','campaign')

    #Searchable Fields
    search_fields = ('description','payer','campaign')

    #Filter Fields
    list_filter = ('irl_date','ig_date','payer','campaign')

    #Details Page
    list_display_links = ('payer',)

    #Field Order
    payfields = ('irl_date','ig_date','description','pp','gp','sp','cp','party_trans','payee','payer','campaign')

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

class CalendarCoreAdmin(admin.ModelAdmin):
    #Fields listed in the admin interface
    list_display = ('name','current_day','current_month','current_year','current_era','campaign')

    #Searchable Fields
    search_fields = ('name',)

    #Filter Fields
    list_filter = ('campaign',)

    #Details Page
    list_display_links = ('name',)

    #Field Order
    consumefields = ('name','current_day','current_month','current_year','current_era','campaign')

class CalMonthAdmin(admin.ModelAdmin):
    #Fields listed in the admin interface
    list_display = ('name','calendar','order_num','day_count')

    #Searchable Fields
    search_fields = ('name',)

    #Filter Fields
    list_filter = ('calendar',)

    #Details Page
    list_display_links = ('name',)

    #Field Order
    consumefields = ('name','calendar','order_num','day_count')

class CalEventAdmin(admin.ModelAdmin):
    #Fields listed in the admin interface
    list_display = ('name','calendar','month','day','year','description')

    #Searchable Fields
    search_fields = ('name',)

    #Filter Fields
    list_filter = ('calendar',)

    #Details Page
    list_display_links = ('name',)

    #Field Order
    consumefields = ('name','calendar','month','day','year','description')

admin.site.register(CampaignCore, CampaginCoreAdmin)
admin.site.register(PartyMember, PartyAdmin)
admin.site.register(Receivable, ReceiveAdmin)
admin.site.register(Payable, PayAdmin)
admin.site.register(Vehicles, VehicleAdmin)
admin.site.register(Hirelings, HireAdmin)
admin.site.register(MagicItems, ItemAdmin)
admin.site.register(ConsumItems, ConsumeAdmin)
admin.site.register(CalendarCore, CalendarCoreAdmin)
admin.site.register(CalMonth, CalMonthAdmin)
admin.site.register(CalEvent, CalEventAdmin)