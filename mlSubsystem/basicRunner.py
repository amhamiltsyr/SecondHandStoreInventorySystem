import os
import sys
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
import configreader

from PIL import Image


def main():
    image = Image.open("/home/tgsp/PycharmProjects/SecondHandStoreInventorySystem/mlSubsystem/testImages/kayak.jpeg")
    response = sender.send_message(image, "Cost:")
    print(f"Response: {response}")

if __name__ == "__main__":
    main()