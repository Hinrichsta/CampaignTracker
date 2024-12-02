from django.db import models
from django.contrib.auth.models import User

class CampaignCore(models.Model):
    campaign_name = models.CharField(max_length=255)
    description = models.TextField(blank=True,null=True)

    class Meta:
        verbose_name_plural = "Campaign Cores"

    def __str__(self):
        return self.campaign_name
    
class CampaignUsers(models.Model):
    role_types = {
        "S": "Super Admin",
        "O": "Owner",
        "A": "Admin",
        "P": "Player",
        "V": "Viewer"
    }
        
    campaign = models.ForeignKey(CampaignCore, on_delete=models.CASCADE,blank=True, null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    role = models.CharField(max_length=1, choices=role_types)

    class Meta:
        verbose_name_plural = "Campaign Users"

class PartyMember(models.Model):
    character_name = models.CharField(max_length=255)
    player = models.ForeignKey(User, on_delete=models.CASCADE,blank=True, null=True)
    class_name = models.CharField(max_length=255)
    species = models.CharField(max_length=255)
    notes = models.TextField(blank=True)
    active = models.BooleanField()
    join_date = models.DateField()
    leave_date = models.DateField(blank=True, null=True)
    campaign = models.ForeignKey(CampaignCore, on_delete=models.CASCADE)

    class Meta:
        verbose_name_plural = "Party Members"

    def __str__(self):
        return self.character_name

class Receivable(models.Model):
    irl_date = models.DateField()
    ig_date = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    pp = models.IntegerField(blank=True)
    gp = models.IntegerField(blank=True)
    sp = models.IntegerField(blank=True)
    cp = models.IntegerField(blank=True)
    party_trans = models.BooleanField()
    payer = models.ForeignKey(PartyMember, on_delete=models.CASCADE, null=True, blank=True)
    campaign = models.ForeignKey(CampaignCore, on_delete=models.CASCADE)

    class Meta:
        verbose_name_plural = "Receivables"

    def __str__(self):
        return self.description

class Payable(models.Model):
    irl_date = models.DateField()
    ig_date = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    pp = models.IntegerField(blank=True)
    gp = models.IntegerField(blank=True)
    sp = models.IntegerField(blank=True)
    cp = models.IntegerField(blank=True)
    party_trans = models.BooleanField()
    payee = models.CharField(max_length=255,blank=True)
    payer = models.ForeignKey(PartyMember, on_delete=models.CASCADE, null=True, blank=True)
    campaign = models.ForeignKey(CampaignCore, on_delete=models.CASCADE)

    class Meta:
        verbose_name_plural = "Payables"

    def __str__(self):
        return self.description

class Vehicles(models.Model):
    name = models.CharField(max_length=255)
    type = models.CharField(max_length=255)
    size = models.TextField()
    equipment = models.TextField(blank=True)
    campaign = models.ForeignKey(CampaignCore, on_delete=models.CASCADE)

    class Meta:
        verbose_name_plural = "Vehicles"

    def __str__(self):
        return self.name

class Hirelings(models.Model):
    name = models.CharField(max_length=255)
    race = models.CharField(max_length=255)
    stats = models.URLField()
    vehicle = models.ForeignKey(Vehicles, on_delete=models.CASCADE, null=True, blank=True)
    equipment = models.TextField(blank=True)
    campaign = models.ForeignKey(CampaignCore, on_delete=models.CASCADE)

    class Meta:
        verbose_name_plural = "Hirelings"

    def __str__(self):
        return self.name

class MagicItems(models.Model):
    rarity_types = {
        "C": "Common",
        "U": "Uncommon",
        "R": "Rare",
        "V": "Very Rare",
        "L": "Legendary",
        "A": "Artifact"
    }
    status_types = {
        "A": "Active",
        "B": "Stored",
        "D": "Destroyed",
        "S": "Sold",
        "L": "Lost",
        "T": "Stolen",
        "U": "Used"
    }
    creator_types = {
        "O": "Official",
        "H": "Homebrew"
    }
    irl_date = models.DateField()
    ig_date = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    notes = models.TextField(blank=True)
    rarity = models.CharField(max_length=1, choices=rarity_types)
    status = models.CharField(max_length=1, choices=status_types)
    creator = models.CharField(max_length=1, choices=creator_types)
    link = models.URLField(blank=True)
    powner = models.ForeignKey(PartyMember, on_delete=models.CASCADE, null=True, blank=True)
    vowner = models.ForeignKey(Vehicles, on_delete=models.CASCADE, null=True, blank=True)
    howner = models.ForeignKey(Hirelings, on_delete=models.CASCADE, null=True, blank=True)
    campaign = models.ForeignKey(CampaignCore, on_delete=models.CASCADE)

    class Meta:
        verbose_name_plural = "Magic Items"

    def __str__(self):
        return self.name
    
class ConsumItems(models.Model):
    consume_types = {
        "P": "Potion",
        "S": "Scroll",      
        "A": "Ammo,"
    }

    name = models.CharField(max_length=255)
    notes = models.TextField(blank=True)
    type = models.CharField(max_length=1, choices=consume_types)
    amount = models.IntegerField()
    link = models.URLField(blank=True)
    campaign = models.ForeignKey(CampaignCore, on_delete=models.CASCADE)

    class Meta:
        verbose_name_plural = "Consumable Items"
    
    def __str__(self):
        return self.name
    
class CalendarCore(models.Model):
    name = models.CharField(max_length=255)
    current_day = models.SmallIntegerField()
    current_month = models.SmallIntegerField()
    current_year = models.SmallIntegerField()
    current_era = models.CharField(max_length=10)
    campaign = models.ForeignKey(CampaignCore, on_delete=models.CASCADE)

    class Meta:
        verbose_name_plural = "Calendar Cores"

    def __str__(self):
        return self.name
    
class CalMonth(models.Model):
    name = models.CharField(max_length=255)
    order_num = models.SmallIntegerField()
    day_count = models.SmallIntegerField()
    calendar = models.ForeignKey(CalendarCore, on_delete=models.CASCADE)
    campaign = models.ForeignKey(CampaignCore, on_delete=models.CASCADE)

    class Meta:
        verbose_name_plural = "Calendar Months"

    def __str__(self):
        return self.name

class CalEvent(models.Model):
    name = models.CharField(max_length=255)
    calendar = models.ForeignKey(CalendarCore, on_delete=models.CASCADE)
    campaign = models.ForeignKey(CampaignCore, on_delete=models.CASCADE)
    month = models.ForeignKey(CalMonth, on_delete=models.CASCADE, null=True, blank=True)
    day = models.SmallIntegerField()
    year = models.SmallIntegerField()
    description = models.TextField(blank=True)

    class Meta:
        verbose_name_plural = "Calendar Events"

    def __str__(self):
        return self.name