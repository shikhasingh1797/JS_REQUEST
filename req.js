const fetch = require('node-fetch');
async function my_data() {
    var data = await fetch("http://api.navgurukul.org/courses")
    data = await data.json()
    const data1 = JSON.stringify(data, null, 4)
    var fs = require("fs")
    fs.writeFile('./firstFile.json', data1, 'utf8', (err) => {
        if (err) {
            console.log("Error writing file");
        }
        else {
            console.log("🌸🌸🌸🌸***************************🌸🌸🌸🌸");
        }

        for (var i = 1; i < data.length; i++) {
            console.log(i, data[i].name, data[i].id)
        }
        var n = require("readline-sync")
        var user = n.question("Enter course number:")
        var j = 0
        for (var j = 1; j < data.length; j++) {
            if (user == j) {
                console.log("Course name:", data[j]["name"], ",", "Id:", data[j]["id"])
                id = data[j]["id"]
                console.log(id)
            }
        }



    })
    let second_data = await fetch("http://saral.navgurukul.org/api/courses/74/exercises");
    let data2 = await second_data.json()
    data2 = JSON.stringify(data2, null, 4)
    fs.writeFile('./SecondFile.json', data2, 'utf8', (err) => {
        if (err) {
            console.log("Error writing file")
        }
        else {
            console.log("🌸🌸🌸🌸***************************🌸🌸🌸🌸");
        }
    })

    let third_data = await fetch("http://saral.navgurukul.org/api/courses/" + id + "/exercises");
    let data3 = await third_data.json()
    data3 = JSON.stringify(data3, null, 4)
    fs.writeFile('./ThirdFile.json', data3, 'utf8', async (err) => {
        if (err) {
            console.log("Error writing file")
        }
        else {
            console.log("🌸🌸🌸🌸***************************🌸🌸🌸🌸");
        }
        var k = fs.readFileSync("ThirdFile.json", "utf-8")
        var exerciseData = JSON.parse(k);

        var lis = []
        var st=[]
        var st1=[]

        for (var l = 0; l < exerciseData["data"].length; l++) {
            console.log(l + 1, exerciseData["data"][l]["name"])
            st.push(exerciseData["data"][l]["name"])

            if (exerciseData["data"][l]["childExercises"] == 0) {
                console.log(" ", exerciseData["data"][l]["slug"])
                lis.push(exerciseData["data"][l]["slug"])
                
                st1.push(exerciseData["data"][l]["slug"])
            }
            else {
                var m = 0
                while (m < (exerciseData["data"][l]["childExercises"]).length) {
                    print("  ", m + 1, exerciseData["data"][l]["childExercises"][m]["name"])
                    m++
                };
            }

        }
        var n = require("readline-sync")
        var content = n.question("Enter content number:");
        console.log(st[content-1])
        console.log(st1[content-1])
        var slug = n.question("Do you want slug press yes or no:");
        if(slug=="yes"){
            var url2 = "http://saral.navgurukul.org/api/courses/75/exercise/getBySlug?slug=request_using-json"
            var replace_data = url2.replace("request_using-json", (lis[content - 1]))
            replace_data1 = replace_data.replace("75", id)
            console.log(replace_data1);
            var fourth_data = await fetch(replace_data1)
            let data4 = await fourth_data.json()
            console.log(data4);
        }
        else{
            console.log("Thank you")
        }


    })
}

my_data()