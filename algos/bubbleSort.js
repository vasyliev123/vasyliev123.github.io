import { render } from "../visualize";
export function bubbleSort(arr){
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length-i-1; j++) {
            if(arr[i]>arr[j]){
                swap(arr,i,j);
            }
            
        }
        
    }
}

function swap(arr, i, j){
    render(arr);
    let temp = arr[i];
    arr[j] = arr[i];
    arr[i] = temp;
}