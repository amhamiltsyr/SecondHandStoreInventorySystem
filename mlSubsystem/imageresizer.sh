#!/bin/bash

find /home/tgsp/Documents/attptdddddd/SecondHandStoreInventorySystem/media/product_images -type f -exec mogrify -resize 512x512\> -quality 85 {} +
