from PIL import Image
import socket
import pickle
import argparse
import sys
import configreader

def getconfig():
    # region Read Configuration
    try:
        mlConfig = configreader.read_config('../ml.cfg')
        host = mlConfig.ip_address
        port = mlConfig.port_number
        return host, port
    except FileNotFoundError:
        print("Error: Configuration file not found.")
        exit(-1)
    # endregion


def load_image(image_path):
    try:
        image = Image.open(image_path)
        img_metadata = f"Image: {image.format}, {image.size}, {image.mode}"
        print(f"Loaded:\n\t{img_metadata}")
        return image
    except Exception as e:
        print(f"Error: {str(e)}")
        return None


def send_message(image, message):
    host, port = getconfig()

    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        try:
            s.connect((host, port))
            image_prompt = (image, message)

            serialized_message = pickle.dumps(image_prompt)
            # dump to tempPickle to debug
            with open("tempPickle", "wb") as f:
                f.write(serialized_message)

            s.sendall(serialized_message)
            s.shutdown(socket.SHUT_WR)

            # Receive the status code
            data = s.recv(1024)
            response = pickle.loads(data)

            print(f"Receiver Status: {response['status']}")
            print(f"Receiver Message: {response['message']}")
            return response['status']
        except ConnectionRefusedError:
            print("Error: Receiver is not running.")
            return 3
        except Exception as e:
            print(f"Error: {str(e)}")
            return 4


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Send a message to the receiver.")
    parser.add_argument('-m', '--message', required=False, default="", help="Prompt for the model")
    parser.add_argument('-i', '--image', required=True, help="Path to the image file")
    args = parser.parse_args()

    exit_code = send_message(load_image(args.image), args.message)
    sys.exit(exit_code)
