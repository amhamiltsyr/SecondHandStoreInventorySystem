import argparse
import socket
import pickle
import sys
from PIL import Image
from transformers import AutoProcessor, Blip2ForConditionalGeneration
import torch
import configreader

host = None  # localhost
port = None  # arbitrary non-privileged port
model_directory = None
processor = None
model = None
device = None

real_run = False

def process_image(image: Image, prompt):
    if not real_run:
        return "Dummy Generated Text"
    global processor, model, device
    image = image.convert('RGB')
    inputs = processor(image, text=prompt, return_tensors="pt").to(device, torch.float16)
    generated_ids = model.generate(**inputs)
    generated_text = processor.batch_decode(generated_ids, skip_special_tokens=True)[0].strip()
    return generated_text


def wait_for_messages():
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        try:
            s.bind((host, port))
            s.listen()
            print("Receiver is waiting for messages...")
            while True:
                conn, addr = s.accept()
                with conn:
                    data = b""
                    while True:
                        packet = conn.recv(4096)
                        if not packet:
                            break
                        data += packet
                    if data:
                        try:
                            message = pickle.loads(data)
                            # the message should be a tuple with image object and prompt
                            prompt = message[1]
                            image = message[0]
                            # get metadata from the image to print for debug
                            img_metadata = f"Image: {image.format}, {image.size}, {image.mode}"
                            print(f"Received:\n\tImage: {img_metadata}\n\tPrompt: {prompt}")
                            generated_text = process_image(image, prompt)
                            conn.sendall(pickle.dumps({"status": 0, "message": generated_text}))
                        except pickle.UnpicklingError:
                            print("Error: Unable to unpickle the received data")
                            conn.sendall(pickle.dumps({"status": 1, "message": "Unpickling Error"}))
                        except Exception as e:
                            print(f"Error: {str(e)}")
                            conn.sendall(pickle.dumps({"status": 2, "message": f"General Error: {str(e)}"}))
        except OSError as e:
            print(f"Error: {str(e)}")
            return 1
    return 0


def main():
    #region Read Configuration
    global host, port, model_directory, processor, model, device, real_run
    try:
        mlConfig = configreader.read_config('../ml.cfg')
        host = mlConfig.ip_address
        port = mlConfig.port_number
        model_directory = mlConfig.model_directory_path
    except FileNotFoundError:
        print("Error: Configuration file not found.")
        return 1

    # Argument parsing
    parser = argparse.ArgumentParser(description="ML Server")
    parser.add_argument('--fake', action='store_true', help="Run in fake mode (do not use GPU)")
    args = parser.parse_args()

    # Set real_run based on --fake argument
    real_run = not args.fake
    #endregion

    if real_run:
        print("Warning: Running in real mode. This will use the model to generate text.")
        processor = AutoProcessor.from_pretrained(model_directory)
        model = Blip2ForConditionalGeneration.from_pretrained(model_directory, torch_dtype=torch.float16)

        device = "cuda" if torch.cuda.is_available() else "cpu"
        print("Warning: CUDA is not available. Running on CPU.") if not torch.cuda.is_available() else None
        model.to(device)

    wait_for_messages()


if __name__ == "__main__":

    try:
        sys.exit(main())
    except KeyboardInterrupt:
        print("\nReceiver stopped.")
        sys.exit(0)
