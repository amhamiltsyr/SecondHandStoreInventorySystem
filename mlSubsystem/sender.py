from PIL import Image
import socket
import pickle
import argparse
import os
import sys
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
import configreader


debug = False

def getconfig():
    # region Read Configuration
    try:
        mlConfig = configreader.read_config('ml.cfg')
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
        s.settimeout(3)
        try:
            s.connect((host, port))
            image_prompt = (image, message)

            serialized_message = pickle.dumps(image_prompt)

            s.sendall(serialized_message)
            s.shutdown(socket.SHUT_WR)

            # Receive the status code
            data = s.recv(1024)
            response = pickle.loads(data)

            if debug:
                print(f"Receiver Status: {response['status']}")
                print(f"Receiver Message: {response['message']}")
            return response['message']
        except ConnectionRefusedError:
            print("Error: Receiver is not running.")
            return "3"
        except socket.timeout:
            print("Error: Connection timed out.")
            return "5"
        except Exception as e:
            print(f"Error: {str(e)}")
            return "4"


def main():
    global debug
    parser = argparse.ArgumentParser(description="Send a message to the receiver.")
    parser.add_argument('-m', '--message', required=False, default="", help="Prompt for the model")
    parser.add_argument('-i', '--image', required=True, help="Path to the image file")
    parser.add_argument('-d ', '--debug', action='store_true', help="Enable debug mode")
    args = parser.parse_args()

    debug = args.debug
    send_message(load_image(args.image), args.message)


if __name__ == "__main__":
    main()

