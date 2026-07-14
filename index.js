const inputElement = document.getElementById("input");
const infoTextEl =document.getElementById("info-text")
const meaningContainerEL = document.getElementById("meaning-container")
const titleEl = document.getElementById("title")
const meaningEl = document.getElementById("meaning")
const audioEl=document.getElementById("audio")


async function fetchAPI(word){  
//try catch help in detecting the errors 
try {
    infoTextEl.style.display = "block";
    meaningContainerEL.style.display = "none"; //hidden while api being fetched 

//before fetching data from api, after pressing enter id="info-text" p changes 

infoTextEl.innerHTML = `Searching the meaning of ${word} `
//here using dictionary api we get the url which has the words n their meanings
const url=`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`   // gives the word being searched 
const result = await fetch(url).then((res)=>res.json());// url is fetched by api & then the response is converted to json file (it is a js object);
//fetch doesnt instantly give data from api, the waiting process is called a promise. so the console prints the promise object first. promise(fulfilled) means your response is successfully recieved - req completed successfully, api sent data back
//console.log(result)
//AWAIT - we want this line of code to be executed fully before going to the next line 
console.log(result);

//after gettin the result here
//if the word is not correct, api returns an error object bcoz only the error response has title
if(result.title){
meaningContainerEL.style.display = "block";
infoTextEl.style.display = "none"; 
titleEl.innerText = word;
meaningEl.innerText = "N/A"
audioEl.style.display = "none"
} 
else{
infoTextEl.style.display = "none"; //after the word has been fetched n we get result this text is not shown anymore
meaningContainerEL.style.display = "block";
//contains meaning of word displayed after result is fetched
audioEl.style.display = "inline-flex"
titleEl.innerText = result[0].word; //result containing the word is in array 0
meaningEl.innerText = result[0].meanings[0].definitions[0].definition; 
audioEl.src = result[0].phonetics[0].audio;  //src is the source url/path of audio file 
}}
catch (error) { //shows error if any 
console.log(error);
infoTextEl.innerText = "An error occured, try again later"
}
}


inputElement.addEventListener("keyup", (e) => { //e stands for event. js will automatically pass the event object to the function when the event occurs
//console.log(e.target.value);
 //target is the element that triggered the event, in this case, the <input> element. value is the current value of the input element ie value is the text that is written in the placeholder. 
if(e.target.value && e.key === "Enter"){ //if there is some value in the input and the key that is pressed is enter, then only we will call the function. This is to prevent calling the function when there is no value in the input or when any other key is pressed.
    fetchAPI(e.target.value);

}})  //whatever key is pressed, it will trigger the function