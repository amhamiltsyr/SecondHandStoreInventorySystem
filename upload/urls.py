from django.urls import path
from . import views

urlpatterns = [ 
	path('uploadImage/', views.upload_image), 
	path('createListing/<str:image>/<str:name>/<str:description>/<str:price>', views.create_listing),
	path('getNextTwenty/<int:idToStart>', views.get_next_twenty),
	path('editListing/<int:itemNumber>/<str:image>/<str:name>/<str:description>/<str:price>', views.edit_listing),
	path('deleteListing/<int:itemNumber>', views.delete_listing)
]
