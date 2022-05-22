
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

* need to run `sudo app.js` to access serial port from linux

# BACKEND API NOTES

* manually entering text looks like this:

POST: `0.0.0.0:8090/splitflap/set_flaps`

JSON: {"text":"  WELCOME  HI  p    WELCOME  BYE p  "}

* **NOTE:** It appears this has to be one big string, you can skip lines with /n, otherwise, make sure you count right!

# ENV FILE ENTRIES
* OPENAI_API_KEY=XXXXX  (No quotes) 

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
