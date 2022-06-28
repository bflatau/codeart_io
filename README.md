
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

### NOTES:

* had to do this in linux `sudo usermod -a -G dialout <username>`
* Had to remove `board=` in the chainlink section

* If USB isn't working correctly on POP_OS (can uninstall brltty through app menu)
```
systemctl stop brltty-udev.service
sudo systemctl mask brltty-udev.service
systemctl stop brltty.service
systemctl disable brltty.service
```

# TODO:
* Make terminal text/formatting look cool
* Make sure text formatting works
* Handle or cull too long responses
* Add to airtable


# SETUP RASPI:

## INITIAL SETUP

* https://ubuntu.com/tutorials/secure-ubuntu-kiosk#1-overview
* `snap install ubuntu-frame`
* `snap install wpe-webkit-mir-kiosk`
* `snap set wpe-webkit-mir-kiosk url=https://mir-server.io`

## SET UP WIREGUARD (neither option works :(...)

### SNAP 

* https://snapcraft.io/install/wireguard-ammp/ubuntu
* `sudo snap install wireguard-ammp --devmode`
* ```
With an overlay, /etc/wireguard is mapped to $SNAP_COMMON (conventionally /var/snap/wireguard-ammp/common) - so this is where you should put configuration files such as wg0.conf. Once the config file is in place and you've connected the network-control and firewall-control interaces, run

`sudo wireguard-ammp.wg-quick up wg0` to bring up the interface.

You may get an error Unable to modify interface: Protocol not supported due to a bug in some versions of snapd - see https://forum.snapcraft.io/t/raspberry-pi-3-ubuntu-core-18-network-control-interface-issue/14773/7 for a workaround.

### Classic Mode

* https://askubuntu.com/questions/902905/install-applications-in-ubuntu-core

* then normal instructions: https://bflatau.github.io/benwiki/docs/server/wireguard/



### SCOTTDO
* Fix word wrapping
* Python Cull Jeopardy questions


### BENDO
* reset if text after 40 seconds
* lock terminal until split flaps are done
* test raspi again
* wireguard auto connect