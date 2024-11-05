from django.db import models

class InventoryItem(models.Model):
	name = models.CharField(max_length=255)
	description = models.TextField(default="No Description")
	imageID = models.TextField(default='null')
	price = models.FloatField()
	itemNumber = models.IntegerField(default=0)
	archieved = models.BooleanField(default=False)

class InventoryImage(models.Model):
	image = models.ImageField(upload_to='images/')
