from django.db import models

class PartyMember(models.Model):
    name = models.CharField(max_length=255)
    player = models.CharField(max_length=255)
    role = models.CharField(max_length=255)
    race = models.CharField(max_length=255)
    notes = models.TextField()
    active = models.BooleanField()

    def __str__(self):
        return self.name

class Receivable(models.Model):
    irl_date = models.DateField()
    ig_date = models.CharField(max_length=255)
    description = models.TextField()
    pp = models.IntegerField()
    gp = models.IntegerField()
    sp = models.IntegerField()
    cp = models.IntegerField()
    payer = models.ForeignKey(Party, on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return self.name

class Payable(models.Model):
    irl_date = models.DateField()
    ig_date = models.CharField(max_length=255)
    description = models.TextField()
    pp = models.IntegerField()
    gp = models.IntegerField()
    sp = models.IntegerField()
    cp = models.IntegerField()
    payee = models.CharField(max_length=255)
    payer = models.ForeignKey(Party, on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return self.name

class Vehicles(models.Model):
    name = models.CharField(max_length=255)
    type = models.CharField(max_length=255)
    size = models.TextField()
    equipment = models.TextField()

    def __str__(self):
        return self.name

class Hirelings(models.Model):
    name = models.CharField(max_length=255)
    race = models.CharField(max_length=255)
    stats = models.URLField()
    vehicle = models.ForeignKey(Vehicles, on_delete=models.CASCADE, null=True, blank=True)
    equipment = models.TextField()

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
    notes = models.TextField()
    rarity = models.CharField(max_length=1, choices=rarity_types)
    status = models.CharField(max_length=1, choices=status_types)
    creator = models.CharField(max_length=1, choices=creator_types)
    link = models.URLField()
    powner = models.ForeignKey(Party, on_delete=models.CASCADE, null=True, blank=True)
    vowner = models.ForeignKey(Vehicles, on_delete=models.CASCADE, null=True, blank=True)
    howner = models.ForeignKey(Hirelings, on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return self.name
    
class ConsumableItems(models.Model):
    consume_types = {
        "P": "Potion",
        "S": "Scroll",      
        "A": "Ammo,"
    }

    name = models.CharField(max_length=255)
    notes = models.TextField()
    type = models.CharField(max_length=1, choices=consume_types)
    amount = models.IntegerField()
    link = models.URLField()