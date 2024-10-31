from django.shortcuts import render
from django.http import HttpResponse
from .models import InventoryItem
from django.http import JsonResponse
from django.core import serializers
from django.db.models import Q
from PIL import Image
import mlSubsystem.sender as sender
from .forms import ImageUploadForm

itemNumberOn = 1 # tracks what item number the database will assign the next listing created

# Engages with AI model, returns generated cost and product listing
def upload_image(request):
	if request.method == 'POST':
       		form = ImageUploadForm(request.POST, request.FILES)
        	if form.is_valid():
			# Save to database
			form.save()
			# Call on AI Model
            		image = form.cleaned_data['image']
            		cost = sender.send_message(image, "Cost:")
        		product_listing = sender.send_message(image, "Product Listing:")
        		# Return suggestions to front end
			return JsonResponse({
        			'cost': cost,
        			'product_listing': product_listing
       			})
	return JsonResponse({
                        'cost': 'error',
                        'product_listing': 'error'
        })


# Creates a new item, passed by url parameters
def create_listing(request, id, name, description, price):
	item = InventoryItem.objects.get(id = id)
        item.name = name
        item.description = description
        stringPriceToFloat = float(price) # floats cannot be passed via URL
        item.price = price
        item.archieved = False
        item.save()
        return HttpResponse('Create Listing')


# Gets the next 20 items in the inventory database
def get_next(request,itemsToSend, idToStart, searchTerm=""):
    all_items = InventoryItem.objects.filter(archieved=False)

    if searchTerm:
        all_items = all_items.filter(
            Q(name__icontains=searchTerm) | Q(description__icontains=searchTerm)
        )
    to_return = all_items[idToStart:idToStart + itemsToSend]
    to_json = serializers.serialize('json', to_return)
    total_count = all_items.count()
    return JsonResponse({
        'items': to_json,
        'total_count': total_count
    })


# Edits item, passed by url parameters
def edit_listing(request, itemNumber, name, description, price):
	item = InventoryItem.objects.get(id = itemNumber)
	item.name = name
	item.description = description
	stringPriceToFloat = float(price) # floats cannot be passed via URL
	item.price = price
	item.itemNumber = itemNumber
	item.archieved = False
	item.save()
	return HttpResponse('Edit Listing')


# Edits the provided item number to have archieved=True
def delete_listing(request, itemNumber):
	item = InventoryItem.objects.get(id = itemNumber)
	item.archieved = True
	item.save() 
	return HttpResponse('Listing archived')
