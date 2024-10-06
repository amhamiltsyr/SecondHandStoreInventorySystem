from transformers import AutoProcessor, Blip2ForConditionalGeneration

# Download and save the processor and model locally
processor = AutoProcessor.from_pretrained("Salesforce/blip2-opt-2.7b")
processor.save_pretrained("./local_blip2-opt-2.7b")

model = Blip2ForConditionalGeneration.from_pretrained("Salesforce/blip2-opt-2.7b")
model.save_pretrained("./local_blip2-opt-2.7b")