
if (window.PGWS === undefined) { window.PGWS = {}; }

/* ------------------------------------------------------------------------- */
//Функция, создающая строку адреса
window.PGWS.changeAddress = function(cd){
  var tt='';
  if(document.getElementById(cd+'44').checked){
        tt= document.getElementById(cd+'55').options[document.getElementById(cd+'55').selectedIndex].text;
    }else{
        tt= document.getElementById(cd+'77').value;
    }
  document.getElementById(cd+'222').value = document.getElementById(cd+'11').value+','+
                                            document.getElementById(cd+'22').options[document.getElementById(cd+'22').selectedIndex].text+','+
                                            document.getElementById(cd+'33').options[document.getElementById(cd+'33').selectedIndex].text+','+tt+','+
                                            document.getElementById(cd+'88').value;
};

/* ------------------------------------------------------------------------- */
//Функция, заполняющая поля адреса значениями в зависимости от типа
window.PGWS.SetAddress = function(cd, _this,team_id){
var _select1 = document.getElementById(cd+'22');
var _select2 = document.getElementById(cd+'33');
var params = {
      id:team_id, 
      address_type_id:_this.value
    };
    api("system.take_address",'',function(f,r){
var adrs=r;
if(adrs.length>0){
document.getElementById(cd+'11').value=adrs[0].zip;
document.getElementById(cd+'88').value=adrs[0].value;
document.getElementById(cd+'22').value='C'+adrs[0].region_id;
window.PGWS.SetRegions(cd,_select1,'A'+adrs[0].area_id,'P'+adrs[0].city_id);
}
},params);
};

/* ------------------------------------------------------------------------- */
//Функция, создающая список регионов
window.PGWS.SetRegions = function(cd,_this,_id,_id2){
var _select = document.getElementById(cd+'33');
var params = {
      place_code:_this.value
    };
    api("info.location.places.common",'',function(f,r){
_select.innerHTML = ""; 
var regions=r;
var selind=0;
for(var i = 0; i < regions.length; i++){
var option = document.createElement("option");
var optionText = document.createTextNode(regions[i].name);
option.appendChild(optionText);
option.setAttribute("selected",'');
option.setAttribute("value",regions[i].id);
_select.appendChild(option);
if(regions[i].id==_id) { selind=i; }
}
_select.options[selind].selected=true;
_select.style.display="inline";
window.PGWS.SetCities(cd,_select,_id2);
window.PGWS.changeAddress(cd);
},params);
};

/* ------------------------------------------------------------------------- */
//Функция, создающая список городов
window.PGWS.SetCities = function(cd,_this,_id){
var _select = document.getElementById(cd+'55');
var params = {
      place_code:_this.value
    };
    api("info.location.places.common",'',function(f,r){
_select.innerHTML = ""; 
var cities=r;
var selind=0;
for(var i = 0; i < cities.length; i++){
var option = document.createElement("option");
var optionText = document.createTextNode(cities[i].name);
option.appendChild(optionText);
option.setAttribute("selected",'');
option.setAttribute("value",cities[i].id);
_select.appendChild(option);
if(cities[i].id==_id) { selind=i; }
}
_select.options[selind].selected=true;
_select.style.display="inline";
window.PGWS.changeAddress(cd);
},params);
}
