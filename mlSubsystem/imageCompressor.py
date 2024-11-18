import time
import subprocess
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

# Define the directory to watch and the script to run
WATCHED_DIR = "/home/tgsp/Documents/attptdddddd/SecondHandStoreInventorySystem/media/product_images"
SCRIPT_TO_RUN = "imageresizer.sh"

class Watcher(FileSystemEventHandler):
    def on_any_event(self, event):
        """Trigger when any file system event occurs."""
        print(f"Change detected: {event.src_path}")
        try:
            subprocess.run(SCRIPT_TO_RUN, shell=True, check=True)
        except subprocess.CalledProcessError as e:
            print(f"Error running script: {e}")

if __name__ == "__main__":
    observer = Observer()
    event_handler = Watcher()

    observer.schedule(event_handler, WATCHED_DIR, recursive=True)
    print(f"Watching directory: {WATCHED_DIR}")

    observer.start()
    try:
        while True:
            time.sleep(10)
    except KeyboardInterrupt:
        print("Stopping watcher...")
        observer.stop()
    observer.join()
