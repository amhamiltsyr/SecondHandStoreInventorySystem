import configparser

class MLConfig:
    def __init__(self, port_number, model_directory_path, ip_address, model_name):
        self.port_number = port_number
        self.model_directory_path = model_directory_path
        self.ip_address = ip_address
        self.model_name = model_name



def read_config(file_path):
    config = configparser.ConfigParser()
    config.read(file_path)

    port_number = config.getint('DEFAULT', 'port_number')
    model_directory_path = config.get('DEFAULT', 'model_directory_path')
    ip_address = config.get('DEFAULT', 'ip_address')
    model_name = config.get('DEFAULT', 'model_name')

    return MLConfig(port_number, model_directory_path, ip_address, model_name)

# Example usage
# mlConfig = read_config('ml.cfg')
# print(f"Port Number: {mlConfig.port_number}")
# print(f"Model Directory Path: {mlConfig.model_directory_path}")
# print(f"IP Address: {mlConfig.ip_address}")
# print(f"Model Name: {mlConfig.model_name}")