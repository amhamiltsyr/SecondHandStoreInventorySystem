from PIL import Image
from transformers import AutoProcessor, Blip2ForConditionalGeneration
import torch

# Load the processor and model from the local directory
processor = AutoProcessor.from_pretrained("./mlSubsystem/local_blip2-opt-2.7b")
model = Blip2ForConditionalGeneration.from_pretrained("./local_blip2-opt-2.7b", torch_dtype=torch.float16)

image = Image.open('./mlSubsystem/testImages/macbook.jpg').convert('RGB')

device = "cuda" if torch.cuda.is_available() else "cpu"
model.to(device)

prompt = "The price of the object in this photo is"

inputs = processor(image, text=prompt, return_tensors="pt").to(device, torch.float16)
generated_ids = model.generate(**inputs, max_new_tokens=20)
generated_text = processor.batch_decode(generated_ids, skip_special_tokens=True)[0].strip()
print(generated_text)