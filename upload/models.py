from django.db import models

class Item(models.Model):
	image = models.CharField(max_length=255)
	name = models.CharField(max_length=255)
	price = models.IntegerField()
	itemNumber = models.IntegerField()
	archieved = models.BooleanField(default=False)
