const input = document.querySelector('#birthdate');
const btn = document.querySelector('#btn');
const output = document.querySelector("#output");
btn.addEventListener("click",clickHandler);//calls 'clickHandler' function after button is clicked

function reverseStr(str){
 var reverseString =  str.split('').reverse().join('');
 return reverseString;
}
console.log("reversed string:",reverseStr('Kedar'));
function isPalindrome(str){
    var reverse = reverseStr(str);
    return str === reverse;

}

function convertDateToString(date){
    var dateStr = {day: '', month:'', year:''};
    if(date.day<10){
        dateStr.day = '0' + date.day;
    }
    else{
        dateStr.day = date.day.toString();
    }

    if(date.month<10){
        dateStr.month = '0' + date.month;
    }
    else{
        dateStr.month = date.month.toString();
    }
    dateStr.year = date.year.toString();
    return dateStr;
}

function getAllDateFormats(date){
    var strDate = convertDateToString(date);
  
    var ddmmyyyy = strDate.day + strDate.month + strDate.year;
    var mmddyyyy = strDate.month + strDate.day + strDate.year;
    var yyyymmdd = strDate.year + strDate.month + strDate.day;
    var ddmmyy = strDate.day + strDate.month + strDate.year.slice(-2);
    var mmddyy = strDate.month + strDate.day + strDate.year.slice(-2);
    var yymmdd = strDate.year.slice(-2) + strDate.month + strDate.day;

    return [ddmmyyyy,mmddyyyy,yyyymmdd,ddmmyy,mmddyy,yymmdd];
}

// var date = {
//     day: 28,
//     month: 02,
//     year: 2021
// };

function checkPalindromeForAllDateFormats(date){
    var listOfPalindromes = getAllDateFormats(date);
    var flag = false;

    for(i=0;i<listOfPalindromes.length;i++){
     
        if(isPalindrome(listOfPalindromes[i])){
           
          flag = true;
          break;
      }
    }
    return flag;
    }
    function isLeapYear(year){ //checks leap year 
        if(year%400===0){
            return true;
        }
        if(year%100===0){
            return false;
        }
        if (year%4===0){
            return true;
        }
        return false;
    }

    function getNextDate(date){
        var day = date.day+1;//adds next day
        var month= date.month;
        var year= date.year;
       var daysinMonths = [31,28,31,30,31,30,31,31,30,31,30,31];//0-11, array of max.no.of days in each month

       if(month===2){//february-month
          if(isLeapYear(year)){ //leap-year-feb
              if(day>29){
                  day=1;//1st day of month
                  month++;// next month
                 }
              
              }else{
                if(day>28){ //normal-year-feb
                    day=1;//1st day of month
                    month++;// next month
              }
          }
       }
       else{ 
           if(day>daysinMonths[month-1]){//checks if day exceeds max days in month (using 'daysinMonths' array)
               day=1;//1st day of month
               month++// next month
           }
       }
       if(month>12){//december-month
           month=1;//january
           year++;//new-year
       }
       return{//output
           day: day,
           month: month,
           year: year
       }
     
     }


    function nextPalindromeDate(date){
    var nextDate = getNextDate(date);
    var counter = 0;
      while(1){
          counter++;
          var isPalindrome = checkPalindromeForAllDateFormats(nextDate);
          if(isPalindrome){// isPalindrome will be true or false.
             break;
          }
          nextDate = getNextDate(nextDate);//it will update the next date
      }
      counter++; //will count number of days
      return [counter,nextDate]; //will return no of days and next palindrome date


    }

    //console.log(nextDate(date));

//console.log(nextPalindromeDate(date));

function clickHandler(e){
    e.preventDefault();
    var bdateStr = input.value;
    console.log(bdateStr);
    
    
    if (bdateStr!=""){
        var listOfDate = bdateStr.split('-'); //it will split the string into 3, 1.YYYY,2.MM,3.DD
        date={
            day: Number(listOfDate[2]),
            month: Number(listOfDate[1]),
            year: Number(listOfDate[0])
        };
        console.log(date);
        var isPalindrome = checkPalindromeForAllDateFormats(date);
        console.log("Is Birthday Palindrome?: ",isPalindrome);
        if (isPalindrome){
            output.innerText="Hurray!! your Birthday is Palindrome 🥳";
        }
        else{
            var [count,nextDate] = nextPalindromeDate(date); //will give the no-of-days and next palindrome date
            output.innerText = `You missed by ${count} days 😯 and next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}`;
        }
    }
    else{
        output.innerText = "Please select the date"
    }
}
    