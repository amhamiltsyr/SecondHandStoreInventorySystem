from django import forms
from .models import InventoryImage, InventoryItem

class ImageUploadForm(forms.ModelForm):
   class Meta:
       model = InventoryImage
       fields = ['image']

class ProductUploadForm(forms.ModelForm):
    class Meta:
        model = InventoryItem
        fields = ['name','description','price','image']