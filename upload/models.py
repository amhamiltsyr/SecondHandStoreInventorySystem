from django.db import models

class InventoryItem(models.Model):
	image = models.CharField(max_length=255)
	name = models.CharField(max_length=255)
	description = models.TextField(default="No Description")
	price = models.FloatField()
	itemNumber = models.IntegerField()
	archieved = models.BooleanField(default=False)
