
let arr = [];
let shuffle_btn = document.getElementById("shuffle");
let reset = false;
let sort_btn = document.getElementById("sort");
// let reset_btn = document.getElementById("reset");
let choice = document.getElementById("choice");
let states = [];
init();
function init() {

    for (let i = 0; i < 600; i++) {
        arr.push(Math.floor(Math.random() * 100)+1);
        states.push(-1);
    }

    render();

   
}
shuffle_btn.addEventListener("click", function () {

    shuffle();
    render();
});

// reset_btn.addEventListener("click", function () {
//     reset = true;
//     document.getElementById("bar-container").innerHTML = '';
//     init();
// });
sort_btn.addEventListener("click", function () {
    if(choice.value=="bubble"){
        states = [];
        bubbleSort();
    }
    else if(choice.value=="insertion"){
        states = [];
        insertionSort();
    }
    else if(choice.value=="selection"){
        states = [];
        selectionSort();
    }
    else if(choice.value=="merge"){
        states = [];
        mergeSort(arr, 0, arr.length-1);
    }
    else if(choice.value=="quick"){
        states = [];
        quickSort(arr, 0, arr.length-1);
    }
    else if(choice.value=="heap"){
        states = [];
        heapSort();
        render();
    }
    else if(choice.value=="counting"){
        states = [];
        countingSort();
    }
    else if(choice.value=="radix"){

    }
});
function shuffle() {
    for (let i = 0; i < arr.length; i++) {
        let j = Math.floor(Math.random() * arr.length);
        swap(arr, i, j);
    }
}

function render(){
    let barContainer = document.getElementById("bar-container");
    barContainer.replaceChildren();

    for (let i = 0; i < arr.length; i++) {
        let bar = document.createElement("div");
        bar.classList.add("bar");
        if(states[i]==0){
            bar.style.backgroundColor = "red";
        }
        else if(states[i]==1){
            bar.style.backgroundColor = "green";
        }
        bar.style.height = arr[i] + "%";        
        barContainer.appendChild(bar);
    }
}

async function bubbleSort(){
    for (let i = 0; i < arr.length-1; i++) {
        for (let j = 0; j < arr.length-i-1; j++) {
            console.log(arr);
            if(reset===true){
                reset = false;
                return;
            }
            if(arr[j]>arr[j+1]){
                states[j] = 0;
                swap(arr,j,j+1);
                states[j] = -1;
            }
            render();
            await sleep();
        }
        
    }
}

function swap(val,i, j){
    
    let temp = val[j];
    val[j] = val[i];
    val[i] = temp;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, 100-document.getElementById("speed").value));
}


async function insertionSort(){
    for (let i = 0; i < arr.length; i++) {
        let key = arr[i];
        
        let j = i-1;

        while(j>=0&&arr[j]>key){
            
            arr[j+1] = arr[j];
            j--;
            states[j] = 0;
            render();
        await sleep();
        states[j] = -1;
        }
        arr[j+1]=key;

        
    }
}

async function quickSort(val, start,end){
    console.log("asfdasfs");
    if(start>=end) return;
    states[start] = 0;
    let index = await partition(val, start, end);
    await Promise.all([
        await quickSort(val, start, index-1),
        await quickSort(val,index+1,end)
    ]);
    

}

async function partition(val, start, end){
    for(let i = start; i<end; i++){
        states[i] = 1;
    }
    let pivotIndex = start;
    let pivotValue = arr[end];
    states[pivotIndex] = 0;
    for (let i = start; i < end; i++) {
        if(arr[i]<pivotValue){
            swap(val, i, pivotIndex);
            states[pivotIndex] = -1;
            pivotIndex++;
            states[pivotIndex] = 0;
            
        }
        
    }
    render();
    await sleep();
    swap(val, pivotIndex, end);
    for(let i = start; i<end; i++){
        
            states[i] = -1;
        
    }
    return pivotIndex;
}

async function selectionSort(){
    
    for (let i = 0; i < arr.length; i++) {
        for (let j = i+1; j < arr.length; j++) {
            if(arr[j]<arr[i]){
                states[j]=0;
                
                swap(arr,i,j);
                render();
                await sleep();
                states[j]=-1;
                
            }
        }
        
    }
}

async function heapify(array, n, i ){
    let largest = i;
    let left = 2 * i +1;
    let right = 2 * i +2;

    if(left<n&&array[left]>array[largest]){
        largest = left;
    }
    if(right<n&&array[right]>array[largest]){
        largest = right;
    }

    if(largest != i){
        
        swap(array, largest, i);
        
        await heapify(array, n, largest);
    }



}

async function heapSort(){
    let n = arr.length;
    for (let i = n / 2 - 1; i >= 0; i--) {
        heapify(arr, n, i);
      }
    for (let i= n-1;i>=0; i--) {
        states[i] = 0;

        swap(arr, 0, i)
        
        await heapify(arr, i, 0);
        render();
        await sleep();
        states[i] = -1;
    }
}


async function mergeSort(arr,l, r){
     
    if(l>=r){
        return;//returns recursively
    }
    

    var m =l+ parseInt((r-l)/2);
    states[l] = 0;
    states[r] = 0;
    states[m] = 0;
    await mergeSort(arr,l,m);
   
    await mergeSort(arr,m+1,r);
   
    await merge(arr,l,m,r);

    render();
    await sleep();
    states[l] = -1;
    states[r] = -1;
    states[m] = -1;
}

async function merge(array, l, m, r){
    
    var n1 = m - l + 1;
    var n2 = r - m;
  
    var L = new Array(n1); 
    var R = new Array(n2);
  
    for (var i = 0; i < n1; i++)
        L[i] = array[l + i];
    for (var j = 0; j < n2; j++)
        R[j] = array[m + 1 + j];
  
    var i = 0;

    var j = 0;

    var k = l;
  
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            array[k] = L[i];
            i++;
        }
        else {
            array[k] = R[j];
            j++;
        }
        k++;
    }
  
    while (i < n1) {
        array[k] = L[i];
        i++;
        k++;
    }

    while (j < n2) {
        array[k] = R[j];
        j++;
        k++;
    }
     
}