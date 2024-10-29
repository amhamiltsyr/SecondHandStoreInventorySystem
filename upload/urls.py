from django.urls import path
from . import views

urlpatterns = [ 
	path('uploadImage/', views.upload_image), 
	path('createListing/<int:id>/<str:name>/<str:description>/<str:price>', views.create_listing),
	path('getNext/<int:itemsToSend>/<int:idToStart>/<str:searchTerm>', views.get_next),
   	path('getNext/<int:itemsToSend>/<int:idToStart>/', views.get_next),
	path('editListing/<int:itemNumber>/<str:name>/<str:description>/<str:price>', views.edit_listing),
	path('deleteListing/<int:itemNumber>', views.delete_listing)
]
