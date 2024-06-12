
////WEBSOCKET STUFF///
const socket = io();

const flapDemos = ['welcome', 'rain', 'spiral', 'randomFill']

function setDemo(number){
    let demoBlocks = document.getElementsByClassName("block");
    let demoBlocksArray = [...demoBlocks];

    demoBlocksArray.forEach(element => {
        if(number === Number(element.dataset.id)){
            element.className = "block block-active";
            socket.emit('demo', number);

            if(number > 2){
                fetch(`${window.location.origin}/splitflap/start_animation`, {
                    method: "POST",
                    headers: {'Content-Type': 'application/json'}, 
                    body: JSON.stringify({animation: flapDemos[number - 3]})
                  }).then(res => {
                    console.log("Request complete! response:", res);
                  });
               
            }


        }else{
            element.className = "block";
        }
    
    });
}


// const startAnimation = async (animation) => {
//     try {
//       const result = await fetch(new URL('/splitflap/start_animation', backendHost), {
//         method: 'POST',
//         headers: {
//           'Accept': 'application/json',
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({animation})
//       })
//       console.log(`Start animation result: ${await result.text()}`)
//     } catch (err) {
//       alert(err)
//     }
//   }
  
//   const stopAnimation = async () => {
//     try {
//       const result = await fetch(new URL('/splitflap/stop_animation', backendHost), {
//         method: 'POST',
//       })
//       console.log(`Stop animation result: ${await result.text()}`)
//     } catch (err) {
//       alert(err)
//     }
//   }