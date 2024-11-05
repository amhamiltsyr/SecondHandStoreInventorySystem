from django import forms
from .models import InventoryImage

class ImageUploadForm(forms.ModelForm):
   class Meta:
       model = InventoryImage
       fields = ['image']