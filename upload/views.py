from django.shortcuts import render
from django.http import HttpResponse
from .models import InventoryItem
from django.http import JsonResponse
from django.core import serializers
from django.db.models import Q
from PIL import Image
import mlSubsystem.sender as sender
from django.middleware.csrf import get_token
from .forms import ImageUploadForm, ProductUploadForm
from django.views.decorators.csrf import csrf_exempt

itemNumberOn = 1 # tracks what item number the database will assign the next listing created

# Engages with AI model, returns generated cost and product listing
@csrf_exempt
def upload_image(request):
	if request.method == 'POST':
		form = ImageUploadForm(request.POST, request.FILES)
		if form.is_valid():
		# Save to database
			form.save()
			
		# Call on AI Model
		if 'image' in request.FILES:
			image = form.cleaned_data['image']

			pil_image = Image.open(image)
			if pil_image.size[0] > 512 or pil_image.size[1] > 512:
				pil_image = pil_image.resize((512, 512))
			cost = sender.send_message(pil_image, "Cost in Dollars:")
			product_listing = sender.send_message(pil_image, "Title:")
			
		# Return suggestions to front end
			return JsonResponse({
					'cost': cost,
					'product_listing': product_listing,
					
	   			})
	return JsonResponse({
						'cost': 'error',
						'product_listing': 'error',
						
		})


@csrf_exempt
def create_listing(request):
    if request.method == 'POST':
        try:
	    # Collect info from form 
            form = ProductUploadForm(request.POST, request.FILES)
            name = request.POST.get('name')
            description = request.POST.get('description', 'No Description')  # Default description if not provided
            price = request.POST.get('price')
            image = request.FILES.get('image')

            # Validate required fields
            if not all([name, price, image]):
                return JsonResponse({'error': 'Missing required fields: name, price, or image'}, status=400)
            
            # Convert price to float
            try:
                price = float(price)
            except ValueError:
                return JsonResponse({'error': 'Invalid price format'}, status=400)

            # Create the InventoryItem instance
            item = InventoryItem.objects.create(
                name=name,
                description=description,
                price=price,
                image=image,
                archieved=False
            )
            return JsonResponse({'message': 'Listing created successfully', 'id': item.id}, status=201)
	# Error catching
        except Exception as e:
            return JsonResponse({'error': 'An unexpected error occurred'}, status=500)

    return JsonResponse({'error': 'Invalid HTTP method. Only POST is allowed.'}, status=405)



# Gets the next n items in the inventory database
def get_next(request,itemsToSend, idToStart, searchTerm=""):
	all_items = InventoryItem.objects.filter(archieved=False)

	# filter on search term 
	if searchTerm:
		all_items = all_items.filter(
			Q(name__icontains=searchTerm) | Q(description__icontains=searchTerm)
		)
	# partition return items and convert to JSON
	to_return = all_items[idToStart:idToStart + itemsToSend]
	to_json = serializers.serialize('json', to_return)
	total_count = all_items.count()
	return JsonResponse({
		'items': to_json,
		'total_count': total_count
	})


# Edits item, passed by url parameters
def edit_listing(request, itemNumber, name, description, price):
    item = InventoryItem.objects.get(id=itemNumber)
    item.name = name
    item.description = description
    stringPriceToFloat = float(price)  # floats cannot be passed via URL
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

def get_csrf_token(request):
    return JsonResponse({'csrfToken': get_token(request)})