## GETTING STARTED ##

- Install git `sudo apt install git`
- Install Node `sudo apt install nodejs`
- Install NPM ` sudo apt install npm`
- Install Wireguard ` sudo apt install wireguard`


## BOOT WIREGUARD ON STARTUP ##

1. Add Wireguard to systemd:
- `sudo systemctl enable wg-quick@wg0.service`
- `sudo systemctl daemon-reload`

2. Start service
`sudo systemctl start wg-quick@wg0`

3. Reboot and check status: 
`systemctl status wg-quick@wg0`

## SETUP NODE PROJECT ##

1. cd /pi_plug
2. `npm init -y`
3. `npm install express`
4. `npm install rpio`


## REFERENCE ##

- Model B Rev2 pin layout: https://pi4j.com/1.2/pins/model-b-rev2.html

- Using ground + pin 16 (8th from left)

## TODO
-start node server on startup