from django.urls import path
from .views import *
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

User_List = User_Views.as_view({
    'get': 'list',
    'post': 'create'
})

User_Info = User_Views.as_view({
    'get': 'retrieve',
    'put': 'update',
    'delete': 'destroy'
})

CampaignCore_List = CampaignCore_Views.as_view({
    'get': 'list',
    'post': 'create'
})

CampaignCore_Info = CampaignCore_Views.as_view({
    'get': 'retrieve',
    'put': 'update',
    'delete': 'destroy'
})

CampaignUsers_List = CampaignUsers_Views.as_view({
    'get': 'list',
    'post': 'create'
})

CampaignUsers_Info = CampaignUsers_Views.as_view({
    'get': 'retrieve',
    'put': 'update',
    'delete': 'destroy'
})

Party_List = Party_Views.as_view({
    'get': 'list',
    'post': 'create'
})

Party_Member_Info = Party_Views.as_view({
    'get': 'retrieve',
    'put': 'update',
    'delete': 'destroy'
})

Receivable_List = Receivable_Views.as_view({
    'get': 'list',
    'post': 'create'
})

Receiv_Trans = Receivable_Views.as_view({
    'get': 'retrieve',
    'put': 'update',
    'delete': 'destroy'
})

Payable_List = Payable_Views.as_view({
    'get': 'list',
    'post': 'create'
})

Pay_Trans = Payable_Views.as_view({
    'get': 'retrieve',
    'put': 'update',
    'delete': 'destroy'
})

Vehicles_List = Vehicles_Views.as_view({
    'get': 'list',
    'post': 'create'
})

Vehicle_Info = Vehicles_Views.as_view({
    'get': 'retrieve',
    'put': 'update',
    'delete': 'destroy'
})

Hirelings_List = Hirelings_Views.as_view({
    'get': 'list',
    'post': 'create'
})

Hireling_Info = Hirelings_Views.as_view({
    'get': 'retrieve',
    'put': 'update',
    'delete': 'destroy'
})

MagicItems_List = MagicItems_Views.as_view({
    'get': 'list',
    'post': 'create'
})

MagicItem_Info = MagicItems_Views.as_view({
    'get': 'retrieve',
    'put': 'update',
    'delete': 'destroy'
})

ConsumItems_List = ConsumItems_Views.as_view({
    'get': 'list',
    'post': 'create'
})

ConsumItem_Info = ConsumItems_Views.as_view({
    'get': 'retrieve',
    'put': 'update',
    'delete': 'destroy'
})

CalendarCore_List = ConsumItems_Views.as_view({
    'get': 'list',
    'post': 'create'
})

CalendarCore_Info = ConsumItems_Views.as_view({
    'get': 'retrieve',
    'put': 'update',
    'delete': 'destroy'
})

CalMonth_List = ConsumItems_Views.as_view({
    'get': 'list',
    'post': 'create'
})

CalMonth_Info = ConsumItems_Views.as_view({
    'get': 'retrieve',
    'put': 'update',
    'delete': 'destroy'
})

CalEvent_List = ConsumItems_Views.as_view({
    'get': 'list',
    'post': 'create'
})

CalEvent_Info = ConsumItems_Views.as_view({
    'get': 'retrieve',
    'put': 'update',
    'delete': 'destroy'
})

urlpatterns = [
    path('auth/', TokenObtainPairView.as_view(), name='token_get'),
    path('auth/renew', TokenRefreshView.as_view(), name='token_renew'),
    path('users/', User_List, name="Users"),
    path('users/<int:pk>', User_Info, name="UserInfo"),
    path('campaigncore/', CampaignCore_List, name="Campaigns"),
    path('campaigncore/<int:pk>', CampaignCore_Info, name="CampaignInfo"),
    path('campaignUsers/', CampaignUsers_List, name="CampaignUsers"),
    path('campaignUsers/<int:pk>', CampaignUsers_Info, name="CampaignUsersInfo"),
    path('party/',Party_List, name='PartyMembers'),
    path('party/<int:pk>',Party_Member_Info, name='Member_Info'),
    path('receivables/',Receivable_List, name='Receivables'),
    path('receivables/<int:pk>',Receiv_Trans, name='Receivable_Transactions'),
    path('payables/',Payable_List, name='Payables'),
    path('payables/<int:pk>',Pay_Trans, name='Payable_Transactions'),
    path('vehicles/',Vehicles_List, name='Vehicles'),
    path('vehicles/<int:pk>',Vehicle_Info, name='Vehicle_Info'),
    path('hirelings/',Hirelings_List, name='Hirelings'),
    path('hirelings/<int:pk>',Hireling_Info, name='Hireling_Info'),
    path('magic-items/',MagicItems_List, name='MagicItems'),
    path('magic-items/<int:pk>',MagicItem_Info, name='MagicItem_Info'),
    path('consummable-items/',ConsumItems_List, name='ConsumeItems'),
    path('conssumable-items/<int:pk>',ConsumItem_Info, name='ConsumeItem_info'),
    path('calendarcore/',CalendarCore_List, name='CalendarCore'),
    path('calendarcore/<int:pk>',CalendarCore_Info, name='CalendarCore_info'),
    path('calmonth/',CalMonth_List, name='CalMonth'),
    path('calmonth/<int:pk>',CalMonth_Info, name='CalMonth_info'),
    path('calevent/',CalEvent_List, name='CalEvent'),
    path('calevent/<int:pk>',CalEvent_Info, name='CalEvent_info'),
]