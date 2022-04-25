
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

* Test the installation:

    `node app.js`

---


# BACKEND NOTES

* need to run `sudo app.js` to access serial port from linux

# BACKEND API NOTES

* manually entering text looks like this:

POST: `0.0.0.0:8090/splitflap/set_flaps`

JSON: {"text":"  WELCOME  HI  p    WELCOME  BYE p  "}

* **note:** It appears this has to be one big string, you can skip lines with /n, otherwise, make sure you count right!

---

