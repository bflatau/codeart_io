#!/bin/bash

set -eux

sudo ln -f -s /home/ben/Desktop/codeart_io/systemd/codeart_backend.service /lib/systemd/system/codeart_backend.service
sudo ln -f -s /home/ben/Desktop/codeart_io/systemd/embeddings_api.service /lib/systemd/system/embeddings_api.service

sudo systemctl daemon-reload

sudo systemctl enable codeart_backend
sudo systemctl enable embeddings_api

sudo systemctl start codeart_backend
sudo systemctl start embeddings_api
