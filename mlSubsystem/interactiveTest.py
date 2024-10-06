from PIL import Image
from transformers import AutoProcessor, Blip2ForConditionalGeneration
import torch

# Load the processor and model from the local directory
processor = AutoProcessor.from_pretrained("./mlSubsystem/local_blip2-opt-2.7b")
model = Blip2ForConditionalGeneration.from_pretrained("./mlSubsystem/local_blip2-opt-2.7b", torch_dtype=torch.float16)

device = "cuda" if torch.cuda.is_available() else "cpu"
model.to(device)

def process_image(image_path, prompt):
    image = Image.open(image_path).convert('RGB')
    inputs = processor(image, text=prompt, return_tensors="pt").to(device, torch.float16)
    generated_ids = model.generate(**inputs, max_new_tokens=20)
    generated_text = processor.batch_decode(generated_ids, skip_special_tokens=True)[0].strip()
    return generated_text

print("Interactive session started. Type 'exit' to quit.")
while True:
    user_input = input("Enter image path and prompt separated by a comma: ")
    if user_input.lower() == 'exit':
        break
    try:
        image_path, prompt = user_input.split(',', 1)
        response = process_image(image_path.strip(), prompt.strip())
        print(f"Response: {response}")
    except Exception as e:
        print(f"Error: {e}")