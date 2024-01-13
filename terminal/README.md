Setup:
* Download porteus kiosk 5.5.0: https://porteus-kiosk.org/public/5.5/Porteus-Kiosk-5.5.0-x86_64.iso
* Determine USB drive device: `sudo fdisk -l`
* Copy to USB drive (replace /dev/sdXYZ): `sudo dd if=Porteus-Kiosk-5.5.0-x86_64.iso of=/dev/sdXYZ`
* Boot USB and load https://raw.githubusercontent.com/bflatau/codeart_io/master/terminal/porteus_config.txt as the config
