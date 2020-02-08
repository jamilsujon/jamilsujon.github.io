const tempCUi = document.getElementById('tempinC'),
    tempFUi = document.getElementById('tempinF'),
    timeUi = document.getElementById('time'),
    turbidUi = document.getElementById('turbidity'),
    phUi = document.getElementById('phVal'),
    waterAlertUi = document.getElementById('water-alert')
    //processing returned object value. Keys name are random, so picking last key and return the value.
    processVal = (obj) => obj[Object.keys(obj)[Object.keys(obj).length - 1]];

const setDangerUi = (val,upper,lower,elem) =>{
    if(val<lower || val >upper){
        elem.parentElement.className = 'properties bg-danger text-white'
        return false;
    }
    elem.parentElement.className = 'properties'
    return true;
}



const manipulateUi = ({ TempinC, TempinF, Time, Turbidity, pH }) => {
    const tempinC = processVal(TempinC),
        tempinF = processVal(TempinF),
        time = processVal(Time),
        turbidity = processVal(Turbidity),
        phVal = processVal(pH);
    
    tempCUi.textContent = tempinC;   
    tempFUi.textContent = tempinF;   
    timeUi.textContent = new Date(time).toLocaleTimeString();   
    turbidUi.textContent = turbidity;   
    phUi.textContent = phVal;  
    //upper,lower,elem
    const phRes = setDangerUi(phVal,8,6.5,phUi) 
    const turbRes = setDangerUi(turbidity,5,0,turbidUi,phRes) 
    waterAlertUi.innerHTML = (phRes && turbRes) ? '<span class="text-success">Water is safe to drink</span>': '<span class="text-danger">Water is not safe to drink</span>'
 
}



const ref = firebase.database().ref();

ref.on('value', snapshot => {
    const val = snapshot.val();
    manipulateUi(val);
    console.log(val)

});