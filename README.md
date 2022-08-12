
# BACKEND SETUP INSTRUCTIONS

* Install Node `v12.22.5`

* Make sure Typescript is installed (globally):

    `npm install -g typescript` 

    test with the following command: 

    `tsc --version`


* Make sure that the project folder structure is as follows:

        - backend_folder
        - frontend_folder
        - ext/splitflap (empty folders to start)
        - .gitignore
        - .gitmodules

* Make sure `.gitmodules` has the following information in the file:

    ```
    [submodule "ext/splitflap"]
	    path = ext/splitflap
	    url = https://github.com/scottbez1/splitflap.git
	    branch = dev/chainlinkBaseUpdates

    ```

* Pull the submodule into the project from the top level of the `backend_folder`:  
`git submodule update --init --recursive`


* Fun the following command in the `ext/splitflap/software/js/splitflapjs ` folder:

    `npm i --save-dev @types/node`

* In the same `ext/splitflap/software/js/splitflapjs ` folder run the following command to build the 'lib' folder/files:

    `npm run build`

* Go to the top level directory of the backend folder and install the node_modules via CI:

    `npm ci`

    **^^NOTE^^** if `ci` doesn't work, you may have to do `npm install` if that throws errors when running `node app.js`, then something is funky with the package-lock.json file. It should be fixed in the master branch, but if all else fails, copy and paste the contents of the V1.0 package-lock.json to the current branch.

* Test the installation:

    `node app.js`

* Configuring systemd (start on boot, auto-restart)

    run `./systemd/install.sh`

    Check logs using `journalctl -fu codeart_backend` and `journalctl -fu embeddings_api`

---


# BACKEND NOTES

* might need to run `sudo app.js` to access serial port from linux
* `sudo "$(which node)" app.js`


* ```  ln -s /usr/local/bin/node /usr/bin/node
  ln -s /usr/local/lib/node /usr/lib/node
  ln -s /usr/local/bin/npm /usr/bin/npm
  ln -s /usr/local/bin/node-waf /usr/bin/node-waf
  ```

# BACKEND API NOTES

* manually entering text looks like this:

POST: `0.0.0.0:8090/splitflap/set_flaps`

JSON: {"text":"  WELCOME  HI  p    WELCOME  BYE p  "}

* **NOTE:** It appears this has to be one big string, you can skip lines with /n, otherwise, make sure you count right!

# ENV FILE ENTRIES
* OPENAI_API_KEY="XXXXX"
* AIRTABLE_API_KEY="XXXXX"

---
# Splitflap simulator setup

- Lilygo T-Display ESP32 [https://www.amazon.com/LILYGO-T-Display-Arduino-Development-CH9102F/dp/B099MPFJ9M](https://www.amazon.com/LILYGO-T-Display-Arduino-Development-CH9102F/dp/B099MPFJ9M)
- Modify [splitflap firmware](https://github.com/scottbez1/splitflap):
    - In config.h: set CHAINLINK_ENFORCE_LOOPBACKS to 0 (in arduino/splitflap/Splitflap)
    - In splitflap_module.h: set FAKE_HOME_SENSOR to true (in arduino/splitflap/Splitflap/src)
- Upload to the T-Display using the “chainlink” environment in PlatformIO

* Driver for Macs `https://github.com/Xinyuan-LilyGO/CH9102_Mac_Driver`

# CHM SERVER NOTES:

* had to do this in linux `sudo usermod -a -G dialout <username>`
* Had to remove `board=` in the chainlink section

* If USB isn't working correctly on POP_OS (can uninstall brltty through app menu)
```
systemctl stop brltty-udev.service
sudo systemctl mask brltty-udev.service
systemctl stop brltty.service
systemctl disable brltty.service
```

#### Enable Reboot with lid closed:
* https://www.reddit.com/r/linux4noobs/comments/clscyl/reboot_laptop_with_lid_closed/
* https://linuxhint.com/laptop-close-behavior-ubuntu/

Edit `/etc/systemd/logind.conf` to set:
```
HandleLidSwitch=ignore
HandleLidSwitchExternalPower=ignore
HandleLidSwitchDocked=ignore
```
* restart and set the changes `sudo systemctl restart systemd-logind.service`



















# SETUP RASPI (OLD!!!!):

## INITIAL SETUP

* https://ubuntu.com/tutorials/secure-ubuntu-kiosk#1-overview
* `snap install ubuntu-frame`
* `snap install wpe-webkit-mir-kiosk`
* `snap set wpe-webkit-mir-kiosk url=https://mir-server.io`

## ADD USER

* Create user: `sudo adduser --extrausers USERNAME`
* create a file in `/etc/sudoers.d/` for the new user
* should look similar to this:
```
# Created by snap create-user

# User rules for USER
USER ALL=(ALL) NOPASSWD:ALL

```



## SET UP WIREGUARD 

* Reference: https://snapcraft.io/install/wireguard-ammp/ubuntu
* `sudo snap install wireguard-ammp --devmode` (note devmode)
* add wg0.conf file to `/var/snap/wireguard-ammp/common` (see /wireguard/config)
* start wireguard with `sudo wireguard-ammp.wg-quick up wg0`
* *BENNOTE* may need to do classic mode and update /etc/sysctl.conf IPV4 section??



## GENERAL WIREGUARD INFO
* Boot on Startup: https://www.ivpn.net/knowledgebase/linux/linux-autostart-wireguard-in-systemd/
* Boot on startup (CHM Server) run in /etc/wireguard: `sudo systemctl enable wg-quick@wg0`


* Boot on startup (raspi): install script snap: `sudo snap install script-launcher`
* Edit `script.sh` in /var/snap/script-launcher/common

### NOT WORKING!! ###

```
#!/bin/bash
cd /var/snap/wireguard-ammp/common
sudo wireguard-ammp.wg-quick up wg0

```

https://askubuntu.com/questions/1023666/editing-rc-local-for-ubuntu-core

https://askubuntu.com/questions/814/how-to-run-scripts-on-start-up

```
#!/bin/bash

cat <<EOF> /etc/systemd/system/myscript.service
[Unit]
Description=Customise Networking
Requires=network-online.target
After=snap.wifi-ap.management-service.service

[Service]
User=root
Group=root
Type=oneshot
ExecStart=/home/myuser/scripts/myscript.sh

[Install]
WantedBy=multi-user.target

EOF

chmod 644 /etc/systemd/system/myscript.service

systemctl enable myscript.service
```

