# CodeArt: I/O API

rebuild component:
`docker-compose up -d --force-recreate --build nodejs`


create new nodejs image for multiple node instances (mind the dot at the end):
`docker build -t IMAGENAME .`

example docker-compose snippet that ties into the app/docker network (note the image just created is referenced and the container name is references in NGINX
` nodejs:
    build:
      context: .
      dockerfile: Dockerfile
    image: IMAGENAME
    container_name: codeartnodev`


## FIND USB PORT OF ARDUINOS ##

#!/bin/bash
for sysdevpath in $(find /sys/bus/usb/devices/usb*/ -name dev); do
    (
        syspath="${sysdevpath%/dev}"
        devname="$(udevadm info -q name -p $syspath)"
        [[ "$devname" == "bus/"* ]] && exit
        eval "$(udevadm info -q property --export -p $syspath)"
        [[ -z "$ID_SERIAL" ]] && exit
        echo "/dev/$devname - $ID_SERIAL"
    )
done


take off raspi-io for non raspi development 


 "splitflapjs": "file:../ext/splitflap/software/js/splitflapjs"