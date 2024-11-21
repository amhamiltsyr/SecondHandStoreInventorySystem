# Simple directory watcher and image resizer+compressor
# This script watches a directory for new image files and resizes them if they exceed a certain dimension.
# needed to maintain the speed of the

import os
import time
from PIL import Image
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

class ImageResizeHandler(FileSystemEventHandler):
    def __init__(self, max_dimension=512, quality=75):
        self.max_dimension = max_dimension
        self.quality = quality

    def on_created(self, event):
        if not event.is_directory:
            self.process_image(event.src_path)

    def process_image(self, filepath):
        try:
            with Image.open(filepath) as img:
                # Check if image needs resizing, resize and compress
                if img.width > self.max_dimension or img.height > self.max_dimension:

                    img.thumbnail((self.max_dimension, self.max_dimension), Image.LANCZOS)

                    # Save with original format and reduced quality
                    img.save(filepath, quality=self.quality, optimize=True)
                    print(f"Optimized: {filepath}")
        except Exception as e:
            print(f"Error processing {filepath}: {e}")

def watch_directory(path, max_dimension=512, quality=75):
    event_handler = ImageResizeHandler(max_dimension, quality)
    observer = Observer()
    observer.schedule(event_handler, path, recursive=False)
    observer.start()

    try:
        print(f"Watching directory: {path}")
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()
    observer.join()


if __name__ == "__main__":
    current_directory = os.path.dirname(os.path.abspath(__file__))
    image_directory = os.path.join(current_directory, "../media/product_images")
    watch_directory(image_directory)