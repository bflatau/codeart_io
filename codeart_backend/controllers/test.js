const testText = [
  {
    flagged: false,
    categories: {
      sexual: false,
      hate: false,
      harassment: false,
      'self-harm': false,
      'sexual/minors': false,
      'hate/threatening': false,
      'violence/graphic': false,
      'self-harm/intent': false,
      'self-harm/instructions': false,
      'harassment/threatening': false,
      violence: false
    },
    category_scores: {
      sexual: 0.0041269343346357346,
      hate: 0.0010784956393763423,
      harassment: 0.024067554622888565,
      'self-harm': 0.000004276935669622617,
      'sexual/minors': 0.0000236355081142392,
      'hate/threatening': 4.548662602132936e-8,
      'violence/graphic': 0.000016078376575023867,
      'self-harm/intent': 0.0000054639849622617476,
      'self-harm/instructions': 1.6618362508324935e-7,
      'harassment/threatening': 0.000008727381100470666,
      violence: 0.00001810787398426328
    }
  }
]


for (let [key, value] of Object.entries(testText[0].category_scores)) {
    
    if(value > 0){
        console.log('BAD!', key, value)
    }
    else{
        console.log('GOOD', key, value)
    }
    // console.log(key, value);
}


// console.log(testText[0].category_scores)