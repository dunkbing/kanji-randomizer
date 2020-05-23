const grades = [1, 2, 3, 4, 5, 6, 8]
const loading = document.querySelector("#loading")
const kanjiInfo = document.querySelector("#kanjiInfo")
const kanjiEle = document.querySelector("#kanji")
const gradeEle = document.querySelector("#grade")
const jlptEle = document.querySelector("#jlpt")
const kunEle = document.querySelector("#kun-readings")
const nameReadingEle = document.querySelector("#name-readings")
const onEle = document.querySelector("#on-readings")
const meaningsEle = document.querySelector("#meanings")

async function fetchKanji(grade){
    displayLoading(true)
    const kanjiByGrade = await fetch(`https://kanjiapi.dev/v1/kanji/grade-${grade}`)
    const kanjiArr = await kanjiByGrade.json()
    const res = await fetch(`https://kanjiapi.dev/v1/kanji/${kanjiArr[randomRange(0, kanjiArr.length-1)]}`)
    return await res.json()
}

window.onload = function(){
    this.displayLoading(false)
    const kan = {
        grade: 6, 
        jlpt: 1,
        kanji: "誕", 
        kun_readings: [], 
        name_readings: [], 
        on_readings: ["タン"], 
        meanings: ["nativity", "be born", "declension", "lie", "be arbitrary"]
    }
    this.loadKanji(kan)
}
document.querySelector(".kanji").onclick = async function(){
    try {
        const kanji = await fetchKanji(grades[randomRange(0, grades.length-1)])
        loadKanji(kanji)
        displayLoading(false)
    } catch (error) {
        alert("error, pls try again")
    }
    
}

function randomRange(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function displayLoading(bool){
    loading.style.display = bool ? "block" : "none"
    kanjiInfo.style.display = bool ? "none" : "block"
}

function loadKanji({grade, jlpt, kanji, kun_readings, name_readings, on_readings, meanings}){
    kanjiEle.innerText = kanji
    gradeEle.innerText = `grade:${grade}`
    jlptEle.innerText = `jlpt:${jlpt}`
    kunEle.innerText = `${kun_readings.join(" | ")}`
    nameReadingEle.innerText = `${name_readings.join(" | ")}`
    onEle.innerText = `${on_readings.join(" | ")}`
    meaningsEle.innerText = `${meanings.join(" | ")}`
}