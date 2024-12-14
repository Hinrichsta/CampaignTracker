from django.urls import path
from .views import *
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
    
)

User_List = User_Views.as_view({
    'get': 'list',
})

User_Create = User_Views.as_view({
    'post': 'create',
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
    path('auth/login', TokenObtainPair_Views.as_view(), name='token_get'),
    path('auth/renew', TokenRefreshView.as_view(), name='token_renew'),
    path('auth/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('users/', User_List, name="UsersList"),
    path('users/join', User_Create, name="UserCreate"),
    path('users/<int:pk>', User_Info, name="UserInfo"),
    path('campaigncore/', CampaignCore_List, name="Campaigns"),
    path('campaigncore/<int:pk>', CampaignCore_Info, name="CampaignInfo"),
    path('campaigncore/<int:cid>/campaignusers/', CampaignUsers_List, name="CampaignUsers"),
    path('campaigncore/<int:cid>/campaignusers/<int:pk>', CampaignUsers_Info, name="CampaignUsersInfo"),
    path('campaigncore/<int:cid>/party/',Party_List, name='PartyMembers'),
    path('campaigncore/<int:cid>/party/<int:pk>',Party_Member_Info, name='Member_Info'),
    path('campaigncore/<int:cid>/receivables/',Receivable_List, name='Receivables'),
    path('campaigncore/<int:cid>/receivables/<int:pk>',Receiv_Trans, name='Receivable_Transactions'),
    path('campaigncore/<int:cid>/payables/',Payable_List, name='Payables'),
    path('campaigncore/<int:cid>/payables/<int:pk>',Pay_Trans, name='Payable_Transactions'),
    path('campaigncore/<int:cid>/vehicles/',Vehicles_List, name='Vehicles'),
    path('campaigncore/<int:cid>/vehicles/<int:pk>',Vehicle_Info, name='Vehicle_Info'),
    path('campaigncore/<int:cid>/hirelings/',Hirelings_List, name='Hirelings'),
    path('campaigncore/<int:cid>/hirelings/<int:pk>',Hireling_Info, name='Hireling_Info'),
    path('campaigncore/<int:cid>/magic-items/',MagicItems_List, name='MagicItems'),
    path('campaigncore/<int:cid>/magic-items/<int:pk>',MagicItem_Info, name='MagicItem_Info'),
    path('campaigncore/<int:cid>/consummable-items/',ConsumItems_List, name='ConsumeItems'),
    path('campaigncore/<int:cid>/conssumable-items/<int:pk>',ConsumItem_Info, name='ConsumeItem_info'),
    path('campaigncore/<int:cid>/calendarcore/',CalendarCore_List, name='CalendarCore'),
    path('campaigncore/<int:cid>/calendarcore/<int:pk>',CalendarCore_Info, name='CalendarCore_info'),
    path('campaigncore/<int:cid>/calmonth/',CalMonth_List, name='CalMonth'),
    path('campaigncore/<int:cid>/calmonth/<int:pk>',CalMonth_Info, name='CalMonth_info'),
    path('campaigncore/<int:cid>/calevent/',CalEvent_List, name='CalEvent'),
    path('campaigncore/<int:cid>/calevent/<int:pk>',CalEvent_Info, name='CalEvent_info'),
]