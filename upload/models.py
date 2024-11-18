from django.db import models
import uuid
import os

def product_image_upload_path(instance, filename):
    # Generate a random name for the file
    extension = os.path.splitext(filename)[1]  # Keep the original file extension
    random_filename = f"{uuid.uuid4()}{extension}"
    return f"product_images/{random_filename}"

class InventoryItem(models.Model):
	name = models.CharField(max_length=255)
	image = models.ImageField(upload_to='product_images/')
	description = models.TextField(default="No Description")
	price = models.FloatField()
	itemNumber = models.IntegerField(default=0)
	archieved = models.BooleanField(default=False)

class InventoryImage(models.Model):
	image = models.ImageField(upload_to='images/')
