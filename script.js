$('#button').click(()=>{
    let text = $('#ipArea').val()
    let words = getWords(text)
    let wc = wordCount(words)
    let wcArray = sortWords(wc)
    //console.log(wcArray)
    printTable(wcArray)
    generateChart(wcArray)
})

function getWords(ipText){
    let chars = ipText.split("");
    let newChars = []
    chars.forEach((c) => {
        switch(c) {
            case(".") :
            case(",") :
            case("'") :
            case(":") :
            case(";") :
            case("!") : case("*") :
            case("?") : case("&") :
            case("-") : case("%") :
            case("_") : case("$") :
            case("@") : return 
            case('\n') : newChars.push(" ");break;
            case('  ') : newChars.push(" ");break;
            case('   ') : newChars.push(" ");break;
            default:
                return newChars.push(c.toLowerCase())
        }
    });
    let newText = newChars.join("")
    let words = newText.split(" ")
    return words
}

function wordCount(words){
    let wc = {}
    words.forEach((w)=>{
        if(wc[w]){
            wc[w]++
        }
        else{
            wc[w] = 1
        }
    })

    return wc
}

function sortWords(wordCounts){
   
    let wcArray = []
    Object.keys(wordCounts).forEach(w => {
        if(w==" " || w=="") return
        wcArray.push({
            word : w,
            count : wordCounts[w]
        })
    });

    return wcArray.sort((a,b)=>b.count - a.count).slice(0,20)
}

function printTable(wcArray){
    let table = $('#table')
    table.empty()

    wcArray.forEach((wc) => {
        table.append(
            $('<tr>')
                .append($('<td>').text(wc.word))
                .append($('<td>').text(wc.count))
        )  
    });
}

function generateChart(wcArr) {
    let ctx = document.getElementById('cnvWcChart').getContext('2d')
    let zipsLaw = []
    for (let i = 0; i < 25; i++) {
      zipsLaw[i] = (1 / (i + 1)) * wcArr[0].count
    }
    let chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: wcArr.map((wc) => wc.word),
        datasets: [
          {
            label: 'Word Frequency',
            borderColor: 'red',
            borderWidth: 2,
            data: wcArr.map((wc) => wc.count),
          },
          {
            label: 'Zipfs Law',
            borderColor: 'blue',
            borderWidth: 2,
            data: zipsLaw,
          },
        ],
      },
    })
  }