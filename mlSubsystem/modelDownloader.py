from transformers import AutoProcessor, Blip2ForConditionalGeneration
from mlSubsystem import configreader


def main():
    #region Read Configuration
    try:
        mlConfig = configreader.read_config('ml.cfg')
        model_name = mlConfig.model_name
        model_dir = mlConfig.model_directory_path
    except FileNotFoundError:
        print("Error: Configuration file not found.")
        return 1
    #endregio

    # Download and save the processor and model locally
    processor = AutoProcessor.from_pretrained(model_name)
    processor.save_pretrained(model_dir)

    model = Blip2ForConditionalGeneration.from_pretrained(model_name)
    model.save_pretrained(model_dir)


if __name__ == "__main__":
    main()