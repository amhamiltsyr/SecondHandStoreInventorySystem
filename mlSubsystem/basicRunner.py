from PIL import Image
import sender

def main():
    image = Image.open("/home/tgsp/PycharmProjects/SecondHandStoreInventorySystem/mlSubsystem/testImages/kayak.jpeg")
    response = sender.send_message(image, "Cost:")
    print(f"Response: {response}")

if __name__ == "__main__":
    main()