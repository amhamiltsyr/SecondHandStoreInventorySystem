# Second-Hand Store Inventory System

## An Inventory web page for second-hand retail stores

### Setting up the Django Environment (get more help @ https://www.youtube.com/watch?v=UmljXZIypDc):

$ python3 install django
```bash
python3 install django
```


### Running the website:

```bash
python3 manage.py runserver
```

## Setting up the ML Model:

#### The config file: 
Default contents:

```editorconfig
[DEFAULT]
port_number = 65432
model_directory_path = ./mlSubsystem/local_blip2-opt-2.7b
ip_address = 127.0.0.1
model_name = Salesforce/blip2-opt-2.7b
```

The ml.cfg is located in the project root, and symlinked in the mlSubsystem directory

#### 1. Downloading the model:
From the project root, run the following command:

```bash
python ./mlSubsystem/modelDownloader.py
```

#### 2. Starting the ML backend: 
The LLM backend can be run in the "real" mode, where it actually uses the BLIP2 model to respond, or in "fake" mode, where it responds to everything with "Dummy Generated Text"
By default it runs in "real" mode. To run in "fake" mode, pass the argument "--fake" to `ml_server.py`

```bash
python ./mlSubsystem/ml_server.py
```

#### 3. Testing the ML backend:
Direct responses can be tested using `sender.py` with arguments for the image and the prompt, for example 

```
python ./mlSubsystem/sender.py --image ./mlSubsystem/testImages/test.jpg --message "Brief Product listing:"
```

#### Calling the sender from the Django backend:
Import the `mlSubsystem.sender` module and call the `send_request` function with the image object and the prompt as arguments. The function will return the response from the ML backend.

###### Example:

```python
from PIL import Image
import mlSubsystem.sender as sender

print(f"Response: {sender.send_message(Image.open("test.png"), "Cost:")}")
```

## Starting the frontend
Change directory to the reactFrontend/frontend directory

run ```npm install```

run ```npm run dev```
