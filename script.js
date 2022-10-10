let name=document.getElementById("name")
let salary=document.getElementById("salary")
let discount=document.getElementById("discount")
let count=document.getElementById("count")
let total=document.getElementById("total")
let submit=document.getElementById("submit")

let decision=false;
let p;
let pro;
let mood="create";
if(localStorage.product==null){
  
 p=[];
}
else {
  p=JSON.parse(localStorage.product);
}

Read();

function Total(){
  
  if(salary.value!==""){
  let dis=discount.value/100 ;
   total.innerHTML=  (salary.value-salary.value*dis).toFixed(2);
   total.style.background="green"
   
  }
  else {
    total.innerHTML= "";
    total.style.background="#a20"
  }
}
function  Create(){
if(name.value!="" && salary.value!="" && +count.value<101){
  let obj={
    name: name.value,
  salary: salary.value,
    discount: discount.value,
   total: total.innerHTML
  }
   if(mood=="create"){
   let n=+count.value;
   if(n>0){
     for(let j=0;j<n;j++){

          p.push(obj);
     }
   }
   else {
  
 p.push(obj);
     
   }

   }
   else{
  p[pro]=obj;
  mood="create";
  submit.innerHTML="Create";
   }
   localStorage.product=JSON.stringify(p)
 }
}
function Clear(){
  name.value="";
  salary.value="";
  discount.value="";
  total.innerHTML="";
  count.value="";
}
function Read(){
 
  let tbody=document.getElementById("tbody")
    tbody.innerHTML="";
  for(let i=0;i<p.length;i++){
     let item=p[i];
     tbody.innerHTML+=`
     <tr >
     <td >${i}</td>
     <td >${item.name}</td>
     <td >${item.total}</td>
     <td ><button  onclick="Update(${i})">update</button></td>
   <td ><button onclick="Delete(${i})" >delete</button></td>
     </tr>
     `
  }
     let da=document.getElementById("deleteAll")
  if(p.length>0){

   da.innerHTML=`
   <button onclick="DeleteAll() " class="create dAll" >Delete All</button>
   `
  }
  else {
    da.innerHTML=""
  }
}
function Delete(i){
  Clear();
 p.splice(i,1)
localStorage.product=JSON.stringify(p);
  Read();
  
}
function Update(i){
 submit.innerHTML="Update";
 mood="update";
  let item=p[i];
  name.value=item.name;
  salary.value=item.salary;
  discount.value=item.discount;
  Total();
pro=i;
}
function DeleteAll(){
  let div=document.createElement("div")
 div.className="middle";
 div.id="confirm";
 div.innerHTML=`
<span class="material-icons">
disabled_by_default
</span>
<p >are you sure to delete all data</p>
<button id="false">cancel</button>
<button id="true" >ok</button>
 `
 document.body.append(div);

}
function Search(value){
  p=JSON.parse(localStorage.product)
  if(value!==""){
    p=p.filter(function(obj){
     return obj.name.includes(value);
    })
    
  }
  else {
    p=JSON.parse(localStorage.product)
   
  }
  Read();
}
document.addEventListener("click",function (e){
if(e.target.id=="true"){ 
  
let div=document.getElementById("confirm")
div.remove();
localStorage.clear();
  p=[];
  Read();
}
else if(e.target.id=="false"){ 
document.getElementById("confirm").remove();
}
 else{}
})
submit.onclick=function (){
  Create();
  Clear();
  Read();
  
}
