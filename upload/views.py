from django.shortcuts import render
from django.http import HttpResponse
from .models import InventoryItem
from django.http import JsonResponse
from django.core import serializers
from django.db.models import Q


itemNumberOn = 1 # tracks what item number the database will assign the next listing created


# This is next sprint
def upload_image(request):
	return HttpResponse('Name and price generated by AI')


# Creates a new item, passed by url parameters
def create_listing(request, image, name, description, price):
	global itemNumberOn
	stringPriceToFloat = float(price) # floats cannot be passed via URL
	InventoryItem.objects.create(image=image, name=name,description=description, price=stringPriceToFloat, itemNumber=itemNumberOn, archieved=False)		
	itemNumberOn = itemNumberOn + 1 # track the item number that will next be assigned
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


# Creates a new item, passed by url parameters
def edit_listing(request, itemNumber,image, name, description, price):
	item = InventoryItem.objects.get(id = itemNumber)
	item.image = image
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
