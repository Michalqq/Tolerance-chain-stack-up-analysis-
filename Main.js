
function DeleteSVG(){ // Usuwanie SVG 
	 for (i=0; svg.firstChild!=null; i++){
		if (svg.firstChild!=null){
			svg.removeChild(svg.firstChild);
		}
	}
}
function test(){
    HideShowDIV("BtnChart1.1")
    var testTab=[];
    var Xtab=[];
    var index_zmiany;
}
function PageZoom(id){
 if (id=="ZoomIn") {
           document.body.style.transform="scale("+(document.body.style.transform.substring(6,document.body.style.transform.length-1)*1.05)+")"; 
       } else {
           document.body.style.transform="scale("+(document.body.style.transform.substring(6,document.body.style.transform.length-1)*0.95)+")"; 
       }
}
function HideShowChartHist(){
   if (document.getElementById("chartHistogram").style.visibility=="hidden"){
       var scroll = document.body.style.transform.replace( /[^\d\.]*/g, '');
       var index=1;
       var tempScale=(document.documentElement.scrollTop-150*scroll)/10;
       if (tempScale<20*scroll) tempScale=0;
       var interval = setInterval(function(){
           document.documentElement.scrollTop = (document.documentElement.scrollTop - tempScale);
           index += 1;
           if (index>10) clearInterval(interval)
           ;}, 20);
       document.getElementById("chartHistogram").style.visibility="visible";
       document.getElementById("ChartHistogramBtn").className="btn pri";
       document.getElementById("ChartHistogramBtn").value="checked";
   } else {
       document.getElementById("chartHistogram").style.visibility="hidden";
       document.getElementById("ChartHistogramBtn").className="btn sec";
       document.getElementById("ChartHistogramBtn").value="";
   }
 
}
function Draw(X,Y,Width,Height,colorRGB,Text,Direction) {	//Rysowanie prostokątów do łańcucha wymiarowego + strzałki
var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
rect.setAttribute("fill",colorRGB);
rect.setAttribute("x", X);
rect.setAttribute("y", Y);
rect.setAttribute("width", Width);
rect.setAttribute("height", Height);
rect.setAttribute("rx", 4);
rect.setAttribute("ry", 4);
svg.appendChild(rect);
	Drawarrow(X,Y,Width,Height,0,Direction,);//Strzałka
	Drawarrow(X,Y,Width,Height,1,Direction);//Strzałka
	Drawarrow(X,Y,Width,Height,2,Direction);//Strzałka
	if (colorRGB=="black"){
    //Drawarrow(X,Y,Width,Height,0,Direction,"white");//Strzałka w prawo
	//Drawarrow(X,Y,Width,Height,1,Direction,"white");//Strzałka w prawo
	//Drawarrow(X,Y,Width,Height,2,Direction,"white");//Strzałka w prawo
	Drawarrow(X,Y,Width,Height,0,(Direction*-1),"white");//Strzałka w lewo
	Drawarrow(X,Y,Width,Height,1,(Direction*-1),"white");//Strzałka w lewo 
	Drawarrow(X,Y,Width,Height,2,(Direction*-1),"white");//Strzałka w lewo
	}
var txt = document.createElementNS("http://www.w3.org/2000/svg", 'text');
txt.setAttributeNS(null, 'x', (X+Width/4));
txt.setAttributeNS(null, 'y', (Y+Height/1.1));
    txt.setAttribute("fill","black");
    if (colorRGB=="black"){
        txt.setAttribute("fill","white");
    }
if (Width<Height*3){
	txt.setAttributeNS(null,'font-size',Height*0.3);
} else {
	txt.setAttributeNS(null,'font-size',Height*0.7);
}
txt.innerHTML = Text.toString().substr(0,6).replace(".",",");
svg.appendChild(txt);
container.appendChild(svg);
}
function Drawarrow (X,Y,Width,Height,i,Direction,color="black") { //Rysowanie strzałki
var newLine = document.createElementNS('http://www.w3.org/2000/svg','line');
newLine.setAttribute('id','line2');
newLine.setAttribute('x1',X+(Width/2)+(Width*Direction/2)-5*Direction);
newLine.setAttribute('y1',Y+Height/2);
if (i==1 ){
	newLine.setAttribute('x2',X+(Width/2)+(Width*Direction/2)-25*Direction);
	newLine.setAttribute('y2',Y+Height/4);
} else if (i==2) {
	newLine.setAttribute('x2',X+(Width/2)+(Width*Direction/2)-25*Direction);
	newLine.setAttribute('y2',Y+3*Height/4);
} else {
	newLine.setAttribute('x2',X+(Width/2)+(Width*Direction/2)-35*Direction);
	newLine.setAttribute('y2',Y+Height/2);
	
}
newLine.setAttribute("stroke", color);
newLine.setAttribute("stroke-width", "5");
newLine.setAttribute("stroke-linecap", "round");
svg.appendChild(newLine);
container.appendChild(svg);
}
function Drawline (X1,Y1,X2,Y2,Color,size) {
var aLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    aLine.setAttribute('x1', X1);
    aLine.setAttribute('y1', Y1);
    aLine.setAttribute('x2', X2);
    aLine.setAttribute('y2', Y2);
    aLine.setAttribute('stroke', Color);
    aLine.setAttribute('stroke-width', size);
	if (Color=="black"){
	aLine.setAttribute('stroke-dasharray', "5,5");
	}
    svg.appendChild(aLine);
	container.appendChild(svg);
}
function Slider(id) {
var slider = document.getElementById(id);
var output = document.getElementById("RangeValue"+id.substring(5,6));
output.innerHTML = "Asymetria: "+slider.value+"%";
slider.oninput = function() {  //Przesuwanie wykresu asymetrycznego
      output.innerHTML = "Asymetria: "+this.value+"%";
    }
}
function readSingleFile(e) {
    var file = e.target.files[0];
  if (!file) {
    return;
  }
  var reader = new FileReader();
  reader.onload = function(e) {
    var contents = e.target.result;
	if (contents.substring(0,2)=="Z/"){
		InsertData(contents);
	} else {
		alert("Złe dane, wybierz poprawny plik");
	}
  };
  reader.readAsText(file);
  
}
function InsertData(data){
var table=data.split("|")
var ValueTable=[];
for (j=0; j<7; j++){
	ValueTable=table[j].split("/");
	//czyszczenie wszystkiego
	document.getElementById("devUp"+ValueTable[0]).value="";
	document.getElementById("devDown"+ValueTable[0]).value="";
	document.getElementById("dim"+ValueTable[0]).value="";
    document.getElementById("ZamdevUp"+ValueTable[0]).value="";
	document.getElementById("ZamdevDown"+ValueTable[0]).value="";
	if(j!=0){
		document.getElementById('btn-'+ValueTable[0]).value="";
		document.getElementById('btn-'+ValueTable[0]).className="button button1";
		document.getElementById('btn+'+ValueTable[0]).value="";
		document.getElementById('btn+'+ValueTable[0]).className="button button0";
	}
	//_______ Dodawanie danych z pliku
	document.getElementById("devUp"+ValueTable[0]).value=ValueTable[2].replace(".",",");
	document.getElementById("devDown"+ValueTable[0]).value=ValueTable[3].replace(".",",");
	document.getElementById("dim"+ValueTable[0]).value=ValueTable[1].replace(".",",");
    document.getElementById("ZamdevUp"+ValueTable[0]).value=ValueTable[6].replace(".",",");
	document.getElementById("ZamdevDown"+ValueTable[0]).value=ValueTable[7].replace(".",",");
	if(j!=0){
        if (ValueTable[8]!=""){
            AcceptBtnChart(ValueTable[8]);
            if (ValueTable[9]!=""){
                document.getElementById("Range"+j).value=ValueTable[9];
                document.getElementById("RangeValue"+j).innerHTML="Asymetria: "+ValueTable[9]+"%";
            }
        }
		document.getElementById('btn-'+ValueTable[0]).value=ValueTable[4];
		if (ValueTable[4]=="checked"){
			document.getElementById('btn-'+ValueTable[0]).className="button button2";
            document.getElementById('btn+'+ValueTable[0]).className="button button3";
		}
		document.getElementById('btn+'+ValueTable[0]).value=ValueTable[5];
		if (ValueTable[5]=="checked"){
			document.getElementById('btn+'+ValueTable[0]).className="button button2";
            document.getElementById('btn-'+ValueTable[0]).className="button button3";
		}
	} 
} 
    ValueTable=table[9].split("/");
    OrgDim = parseFloat(ValueTable[0]);
    OrgDevUp = parseFloat(ValueTable[1]);
    OrgDevDown = parseFloat(ValueTable[2]);
    ValueTable=table[7].split("/");
    if (ValueTable[0]!="" && ValueTable[1]!=""){
        var text="Rozkład wymiaru zależnego (zamienność 100%)";
		rozFinished=ValueTable[0].split(",");
        for (i=0; i<rozFinished.length; i++){
            rozFinished[i]=parseFloat(rozFinished[i]);
        }
        zmienneXFinished=ValueTable[1].split(",");
        for (i=0; i<zmienneXFinished.length; i++){
            zmienneXFinished[i]=parseFloat(zmienneXFinished[i]);
        }
        document.getElementById("Parag_Max").innerHTML =ValueTable[2]+"/"+ValueTable[3];
        document.getElementById("Parag_Min").innerHTML =ValueTable[4]+"/"+ValueTable[5];
        document.getElementById("Parag_Max_wykryte").innerHTML =ValueTable[6]+"/"+ValueTable[7];
        document.getElementById("Parag_Min_wykryte").innerHTML =ValueTable[8]+"/"+ValueTable[9];
        document.getElementById("Parag_Sigma").innerHTML =ValueTable[10]+"/"+ValueTable[11];
        document.getElementById("Parag_Sredni").innerHTML =ValueTable[12]+"/"+ValueTable[13];
        AcceptRozkladDiv(index=0)
        if (ValueTable[14]=="checked"){
            document.getElementById("Zam_czesciowa").style.visibility = "visible";
            document.getElementById("ChartHistogramBtn").style.visibility = "visible";
            AcceptBtnZamiennosc("Zam_czesciowa");
            document.getElementById("Zam_toler").innerHTML=table[8];
        }
        AddChart(rozFinished,zmienneXFinished,text,3,"ChartFinal");
        if (ValueTable[14]=="checked"){
            getMaxRange(0);
        }
        
    }
}
function SaveToFile(){ //zapis danych do pliku
    var SaveName="";
    if (FileName=="") {
        FileName="Zadanie_"
    }
    if (SaveIndex<10){
        SaveName=FileName+"_0"+SaveIndex;
    } else {
        SaveName=FileName+"_"+SaveIndex;
    }
	var name = prompt("Wpisz nazwe zadania:\n zachowaj na końcu nazwy '"+SaveName.substr(SaveName.length-3,SaveName.length)+"'", SaveName);
    if (name == null || name == "") {   
    } else {
        FileName=name.substr(0,name.length-3);
        if (parseFloat(name.substr(name.length-2,name.length))>parseFloat(SaveIndex)) {
            SaveIndex=name.substr(name.length-2,name.length);
            SaveIndex=parseFloat(SaveIndex);
        }
		var DimIndex=["Z", "A", "B", "C", "D", "E", "F"];
		var Txt="";
        var BtnChart="";
        var BtnChartIndex="";
		var DevUp="";
		var DevDown="";
		var Dim="";
        var ZamDevUp="";
		var ZamDevDown="";
		var PLUSvalue="";
		var MINUSvalue="";
        var Range;
		for(i=0; i<7; i++) {
			BtnChartIndex="";
            Range=0;
            DevUp=document.getElementById("devUp"+DimIndex[i]).value.replace(",",".");
			DevDown=document.getElementById("devDown"+DimIndex[i]).value.replace(",",".");
			Dim=document.getElementById("dim"+DimIndex[i]).value.replace(",",".");
            ZamDevUp=document.getElementById("ZamdevUp"+DimIndex[i]).value.replace(",",".");
			ZamDevDown=document.getElementById("ZamdevDown"+DimIndex[i]).value.replace(",",".");
			if (i>0){
				PLUSvalue=document.getElementById('btn+'+DimIndex[i]).value;
				MINUSvalue=document.getElementById('btn-'+DimIndex[i]).value;
                for(k=1; k<7; k++) {
                    BtnChart=document.getElementById("BtnChart"+i+"."+k);
                    if (BtnChart.value=="checked") {
                        BtnChartIndex="BtnChart"+i+"."+k;
                        Range=document.getElementById("Range"+i).value
                    }
                }
					}
			Txt=Txt+DimIndex[i] +"/"+Dim+"/"+DevUp+"/"+DevDown+"/"+MINUSvalue+"/"+PLUSvalue+"/"+ZamDevUp+"/"+ZamDevDown+"/"+BtnChartIndex+"/"+Range+"|";
        }
        Txt=Txt+rozFinished+"/"+zmienneXFinished+"/"+document.getElementById("Parag_Max").innerHTML+"/"+document.getElementById("Parag_Min").innerHTML;
        Txt=Txt+"/"+document.getElementById("Parag_Max_wykryte").innerHTML+"/"+document.getElementById("Parag_Min_wykryte").innerHTML;
        Txt=Txt+"/"+document.getElementById("Parag_Sigma").innerHTML+"/"+document.getElementById("Parag_Sredni").innerHTML+"/"+document.getElementById("Zam_czesciowa").value;
        Txt=Txt+"|"+document.getElementById("Zam_toler").innerHTML;
        Txt=Txt+"|"+OrgDim +"/" + OrgDevUp + "/" + OrgDevDown;
        var blob = new Blob([Txt], {type: "text/plain;charset=utf-8"});
        saveAs(blob, name + ".txt");
        SaveIndex=SaveIndex+1;
        
    }
}
function ActivateMenu(id){ // Aktywowanie menu na górze w pasku
	var ul = document.getElementById("Menu0");
	var items = ul.getElementsByTagName("LI1");
	for (var i = 0; i < items.length; ++i) {
	document.getElementById(items[i].id).className = "";
	}
	document.getElementById(id).className = "active";
	document.getElementById("container").style.visibility = "hidden";
    document.getElementById("container2").style.visibility = "hidden";
    if (document.getElementById("Zam_czesciowa").value=="checked"){
        document.getElementById("RozWymiarow").innerHTML=" &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp Przyrost tolerancji:";
    } else {
        document.getElementById("RozWymiarow").innerHTML=" Wybierz rozkład wymiarów dla wszystkich elementów:";
    }
	switch(id) {
    case "MenuGłówna":
        break;
    case "MenuŁańcuch":
	document.getElementById("container").style.visibility = "visible";       
    document.getElementById("container2").style.visibility = "hidden";
    document.getElementById("RozWymiarow").innerHTML=" Łańcuch wymiarowy:"
        break;
	case "MenuAbout":
    document.getElementById("container2").style.visibility = "visible";
	document.getElementById("container").style.visibility = "hidden";
        break;
    default:
	}
}
function HideShowDIV(id){ //Pokazywanie i ukrywanie mini wykresów przy wybieraniu rozkładu
	id= "Chart"+id.substring(8,11);
	
    var x = document.getElementById(id);
	if (x.style.display == 'none' || x.style.display=="") {
		x.style.zIndex="2";
		Licz(id.substring(5,8));
		Licz(id.substring(5,8));
        x.style.display = 'block';
    } else {
		x.style.zIndex="0";
       x.style.display = 'none';
    }
}
function BlockChart(id){
	var index=id.substring(9,10);
	var div = document.getElementById(id);
	for (i=1; i<5; i++) { //sprawdzanie który rozkład jest zaznaczony
		if (document.getElementById("BtnChart"+index+"."+i).value=="checked") {
			id= "Chart"+id.substring(9,10)+"."+i;
		}
	}
	var x = document.getElementById(id);
	if (div.value=="zoomed"){
		div.style="left:"+div.style.left+"; border:2px solid";
		div.value="zoomedBlocked";		
	} else {
		div.style="left:"+div.style.left;
		div.value="zoomed";
	}
}
function HideShowMaxChart(id) {
    MaxScaleHistogram=1;
	var temp=0;
	var index=id.substring(9,10);
	var div = document.getElementById(id);
	//document.getElementById("Chartt"+index+".1").getContext('2d').clear();
	for (i=1; i<7; i++) { //sprawdzanie który rozkład jest zaznaczony
		if (document.getElementById("BtnChart"+index+"."+i).value=="checked") {
			id= "Chart"+id.substring(9,10)+"."+i;
			temp=Licz(id.substring(5,8));
			Licz(id.substring(5,8));
			i=10;			
		}
	}
	var x = document.getElementById(id);
	x.style.display = 'block';
	if (temp==1){
		if (div.value=="zoomed"){
            document.getElementById(id.substr(0,5)+"t"+id.substring(5,8)).style.visibility="hidden";
			x.className=OldChartClass;
			x.style="";
			x.style.zIndex="0";
			x.style.display = 'none';
			div.value="chart";
		} else if (div.value=="chart"){
            document.getElementById(id.substr(0,5)+"t"+id.substring(5,8)).style.visibility="visible";
			OldChartClass=x.className;
			x.className="chartZoom";
			x.style.backgroundColor="white";
			x.style.left="20px";
			x.style.zIndex="2";
			x.style.display = 'block';
			if (div.value=="chart"){
				div.value="zoomed";
			}
		}
	}
	
}
function zoomIn(x){
    if (x.className=="chartHist" && x.value=="Chart"){
        x.style.zIndex=5;
        temp=parseFloat(x.style.left);
        temp1=parseFloat(x.style.top);
        x.style.left=(temp+65-temp*0.3)+"px";
        x.className=x.className+" chartHistZoom";
    } 
}
function zoomOut(x){
     if (x.className=="chartHist chartHistZoom" && x.value=="Chart"){
         x.className="chartHist";
         x.style.zIndex=1;
         x.style.left=(temp)+"px";
    }
}
function AcceptBtnZamiennosc(id){ // Zamiennosc czesciowa przycisk
	var DimIndex=["Z", "A", "B", "C", "D", "E", "F"];
	var Box = document.getElementById('dim'+DimIndex[0]);
	if (document.getElementById(id).value=="checked"){ //zmiana koloru - przycisk włączony
		document.getElementById(id).className="btn sec";
		document.getElementById("ZamiennoscDiv").style.visibility = "hidden";
		document.getElementById(id).className="btn sec";
        document.getElementById("RozWymiarow").innerHTML=" Wybierz rozkład wymiarów wszystkich elementów:"
		for(i=0; i<7; i++) {
			Box = document.getElementById('dim'+DimIndex[i]);
			Box.disabled=false;
			Box.style="left:"+Box.style.left+"; background-color: #aaf7aa";
            Box = document.getElementById('devUp'+DimIndex[i]);
			Box.disabled=false;
            Box.style="left:"+Box.style.left+"; background-color: #aaf7aa";
            Box = document.getElementById('devDown'+DimIndex[i]);
			Box.disabled=false;
			Box.style="left:"+Box.style.left+"; background-color: #aaf7aa";
			document.getElementById("dim"+DimIndex[i]).style.color='black';
			document.getElementById("devUp"+DimIndex[i]).style.color='black';
			document.getElementById("devDown"+DimIndex[i]).style.color='black';
            document.getElementById("ZamdevUp"+DimIndex[i]).style.display="none";
            document.getElementById("ZamdevDown"+DimIndex[i]).style.display="none";
            document.getElementById("ZamdevUp"+DimIndex[i]).value="";
            document.getElementById("ZamdevDown"+DimIndex[i]).value="";
            if (i!=0) {
                document.getElementById("tolBigger"+DimIndex[i]).style.display="none";
            }
			CheckVisible("ZamdevUp"+DimIndex[i]);
			CheckVisible("ZamdevDown"+DimIndex[i]);
		}
		document.getElementById(id).value="1";
	} else {
		for(i=0; i<7; i++) {
			Box = document.getElementById('dim'+DimIndex[i]);
			Box.disabled=true;
            Box.style="left:"+Box.style.left+"; background-color: #00a80e";
            Box = document.getElementById('devUp'+DimIndex[i]);
			Box.disabled=true;
            Box.style="left:"+Box.style.left+"; background-color: #00a80e";
            Box = document.getElementById('devDown'+DimIndex[i]);
			Box.disabled=true;
			Box.style="left:"+Box.style.left+"; background-color: #00a80e";
            document.getElementById("RozWymiarow").innerHTML=" &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp Przyrost tolerancji:"
            if (document.getElementById("dim"+DimIndex[i]).value!=""){
                document.getElementById("dim"+DimIndex[i]).style.color='red';
                document.getElementById("devUp"+DimIndex[i]).style.color='red';
                document.getElementById("devDown"+DimIndex[i]).style.color='red';
                document.getElementById("ZamdevUp"+DimIndex[i]).style.display="block";
                document.getElementById("ZamdevDown"+DimIndex[i]).style.display="block";
                if (i!=0) {
                    document.getElementById("tolBigger"+DimIndex[i]).style.display="block";
                }
            }
			CheckVisible("ZamdevUp"+DimIndex[i]);
			CheckVisible("ZamdevDown"+DimIndex[i]);
            
		}
		document.getElementById("ZamiennoscDiv").style.visibility = "visible";
		document.getElementById(id).className="btn pri";
		document.getElementById(id).value="checked";
	}
}
function AcceptRozkladDiv(index=0){
    if (document.getElementById("RozkladDiv").style.visibility == "hidden" && index==0) {
        document.getElementById("RozkladDiv").style.visibility = "visible";
        document.getElementById("CompareDiv").style.visibility = "visible";
        document.getElementById("CompareText").style.visibility = "visible";
    } else if (index==1){
       document.getElementById("RozkladDiv").style.visibility = "hidden"; 
         document.getElementById("CompareDiv").style.visibility = "hidden";
         document.getElementById("CompareText").style.visibility = "hidden";
    }
}
function AcceptBtnChart(id){
	var uncheck=0;
	if (id.substring(10,11)==6) {
		document.getElementById("Asymetric"+id.substring(8,9)).style.opacity=1;
        document.getElementById("Range"+id.substring(8,9)).disabled=false;
		Slider("Range"+id.substring(8,9));
	} else {
		document.getElementById("Asymetric"+id.substring(8,9)).style.opacity=0.3;
        document.getElementById("Range"+id.substring(8,9)).disabled=true;
	}
	for(i=1; i<7; i++) {
		var idd = id.substring(0,id.length-1)+i;
		var temp1=id.substring(8,9);
		if (document.getElementById(idd).value=="checked" || id==idd){
			if (id==idd && document.getElementById(id).value=="checked"){
				uncheck=1;
				document.getElementById("Asymetric"+id.substring(8,9)).style.opacity=0.3;
                document.getElementById("Range"+id.substring(8,9)).disabled=true;
			}
            if(idd.substr(idd.length-1,1)==4 || idd.substr(idd.length-1,1)==5) {
                document.getElementById(idd).className=document.getElementById(idd).className.substring(0,5) + " btn sec sec1";
            } else {
			     document.getElementById(idd).className=document.getElementById(idd).className.substring(0,5) + " btn sec";
            }
			document.getElementById(idd).value="1";
			var div = document.getElementById('MiniChart'+temp1);
			while (div.hasChildNodes()) {
			div.removeChild(div.firstChild);
			div.value="";
			}
		}
	}
	if (uncheck!=1){
        if(id.substr(id.length-1,1)==4 || id.substr(id.length-1,1)==5) {
                document.getElementById(id).className=document.getElementById(id).className.substring(0,5) + " btn pri1";
            } else {
			     document.getElementById(id).className=document.getElementById(id).className.substring(0,5) + " btn pri";
            }
		document.getElementById(id).value="checked";
		var DimId=id.substring(8,9);
		var ChartId=id.substring(10,11)-1;
		AddImage(DimId,ChartId);
	}
}
function AddImage(id, chartID){
	var img = new Image();
	var div = document.getElementById('MiniChart'+id);
	var LabelIndex=["r.normalny","r.równomierny", "r.trójkątny","r.Rayleigha", "r.Rayleigha +","r.normalny Asym" ];
	img.onload = function() {
		while (div.hasChildNodes()) {
		div.removeChild(div.firstChild);
		}
		div.appendChild(img);
		div.value="chart";
	};
img.src = 'image/' +LabelIndex[chartID] + '.jpg';
}
function changeDOT(id){    
    document.getElementById(id).value=document.getElementById(id).value.replace(".",",");  
    MaxScale=0;
    MaxScaleHistogram=0;
}
function validate(evt,id) {
var theEvent = evt || window.event;
var key = theEvent.keyCode || theEvent.which;
    if (key!="8" && key!="37" && key!="39" ){
            key = String.fromCharCode( key );
          if (id.substring(0,3)=="dim" | document.getElementById(id).value.length>0){
            var regex = /[0-9]|\.|\,/;
          } else {
              var regex = /[0-9]|\.|\,|\+|\-/;
          }
          if (document.getElementById(id).value.includes(",")) {
              var regex = /[0-9]/;
          }
          if( !regex.test(key) ) {
            theEvent.returnValue = false;
            if(theEvent.preventDefault) theEvent.preventDefault();
          } 
     }
}
function CheckVisible(id){ // Podświetlanie komórek zamienność - oryginalny wymiar

	if (document.getElementById(id).value!=""){
		//document.getElementById(id).style.backgroundColor="#aaf7aa";
		//document.getElementById(id).style.zIndex="0";
	} else {
		//document.getElementById(id).style.backgroundColor="transparent";
		//document.getElementById(id).style.zIndex="2";
	}
	if (document.getElementById("Zam_czesciowa").value=="checked") {
		//document.getElementById(id).style.zIndex="0";
		//alert(id);
		//Licz(id);
	}
}
function HideOryginal(id){ // Ukrywanie komórek oryginalny wymiar
	document.getElementById(id.substring(3,id.length)).style.zIndex="-1";
	document.getElementById(id).style.backgroundColor="#aaf7aa";
}
function FontChange(index, Index_cyfra=0) {
	var textlengthUp=document.getElementById('devUp'+index).value.length;
	var textlengthDown=document.getElementById('devDown'+index).value.length;
	var textlength=document.getElementById('dim'+index).value.length;
	if (textlengthDown>3) {
		document.getElementById('devDown'+index).style.fontSize="9px";
	}
	if (textlengthUp>3) {
		document.getElementById('devUp'+index).style.fontSize="9px";
	}
	if (textlength>4){
		document.getElementById('dim'+index).style.fontSize="20px";
		if (textlength>5) {
			document.getElementById('dim'+index).style.fontSize="15px";
		}
		if (textlength>7) {
			document.getElementById('dim'+index).style.fontSize="9px";
		}
	}
	if (textlength<2){document.getElementById('dim'+index).style.fontSize="25px";}
	if (textlengthDown<4){document.getElementById('devDown'+index).style.fontSize="15px";}
	if (textlengthUp<4){document.getElementById('devUp'+index).style.fontSize="15px";}
	if (Index_cyfra==MaxScale_index){
	MaxScale=0.0;
    MaxScaleHistogram=0.0;
	}
	}
function PlusMinusClick(index) {
    var BtnPlus = document.getElementById('btn+'+index[1]);
	var	BtnMinus= document.getElementById('btn-'+index[1]);
    if (document.getElementById("Zam_czesciowa").value=="checked") {
        if (BtnMinus.value=="checked") MyAlert("Nie można zmieniać znaku podczas analizy zamienności częściowej!",BtnMinus, 5000, 1500);
        else MyAlert("Nie można zmieniać znaku podczas analizy zamienności częściowej!",BtnPlus, 5000, 1500);
        return;
        }
	
	if (index[0]=="+" && BtnPlus.value=="" ) {
		BtnPlus.className="button button2";
        BtnMinus.className="button button3";
		BtnPlus.value="checked";
		if (BtnMinus.value=="checked") {
			BtnMinus.className="button button1";
			BtnMinus.value="";
		}
        return;
	} else if (index[0]=="+" && BtnPlus.value!="" ) {
		BtnPlus.className="button button0";
        BtnMinus.className="button button1";
		BtnPlus.value="";
        return;
	}
	if (index[0]=="-" && BtnMinus.value=="") {
		BtnMinus.className="button button2";
        BtnPlus.className="button button3";
		BtnMinus.value="checked";
		if (BtnPlus.value=="checked") {
			BtnPlus.className="button button0";
			BtnPlus.value="";
		}
        return;
	} else if (index[0]=="-" && BtnMinus.value!="" ) {
		BtnMinus.className="button button1";
        BtnPlus.className="button button0";
		BtnMinus.value="";
        return;
	}
}
function CheckAllBtn(sign){
	var Data="AABCDEF";
	var checked=0;
	switch (sign) {
    case 0:
		if (document.getElementById('btn+E').value=="checked" && document.getElementById('btn+C').value=="checked" ){
			checked=1;
		}
		for(i=0; i<7; i++)
			{	if (checked==1){
				  document.getElementById('btn+'+Data[i]).className="button button1";
				  document.getElementById('btn+'+Data[i]).value="";
				} else {
			  document.getElementById('btn+'+Data[i]).className="button button2";
			  document.getElementById('btn+'+Data[i]).value="checked";
			  document.getElementById('btn-'+Data[i]).className="button button1";
			  document.getElementById('btn-'+Data[i]).value="";
				}
			}
        break;
    case 1: 
		if (document.getElementById('btn-E').value=="checked" && document.getElementById('btn-C').value=="checked" ){
				checked=1;
		}
		for(i=0; i<7; i++)
			{	if (checked==1){
				  document.getElementById('btn-'+Data[i]).className="button button1";
				  document.getElementById('btn-'+Data[i]).value="";
				} else {
			  document.getElementById('btn-'+Data[i]).className="button button2";
			  document.getElementById('btn-'+Data[i]).value="checked";
			  document.getElementById('btn+'+Data[i]).className="button button1";
			  document.getElementById('btn+'+Data[i]).value="";
				}
			}
        break;
}
}
function Licz(id,Multiple=0,index_ucinania_dołu=0){ //Rozkład rzeczywisty w zależności od ilości losowań
//odchyłki wpisywać ze znakiem, albo dopisywać znak
	var DimIndex=["a", "A", "B", "C", "D", "E", "F"];
	var Sign=1;
	var MinDim=0.0;
	var MaxDim=0.0;
	var Dim=document.getElementById("dim"+DimIndex[id.substring(0,1)]).value;
	var DevUp=document.getElementById("devUp"+DimIndex[id.substring(0,1)]).value.replace(",",".");
	var DevDown=document.getElementById("devDown"+DimIndex[id.substring(0,1)]).value.replace(",",".");
	var DataIndex=[rozMinMax,rozNorm, rozRown, rozTroj, rozRaylPLUS, rozRayl, rozNormAsym];
	var srednia=0.0;
	var odchylenieXn=0.0;
	var skok=0.0;
	var sigmaNorm=0.0;
	var sigmaRownom=0.0;
	var zakres=0.0;
    var Temp1=0.0;
	var podzialka=47;
	var BTNlistpos=id.substring(2,3);
    var dimTemp=0;
    var ChartScale=100;
    if (1==1){ // Sprawdzanie zakresów do skali w wykresach podglądowych
        dimTemp=document.getElementById("dimA").value;
        var tempDevUp;
        var tempDevDown;
        for (i=1; dimTemp!=""; i++)
            {
                Temp1=i;
                tempDevUp=document.getElementById("devUp"+DimIndex[Temp1]).value.replace(",",".")
                tempDevDown=document.getElementById("devDown"+DimIndex[Temp1]).value.replace(",",".")
                if (ChartScale > (tempDevUp - tempDevDown))
                    {
                        ChartScale=parseFloat(document.getElementById("devUp"+DimIndex[Temp1]).value.replace(",","."))-parseFloat(document.getElementById("devDown"+DimIndex[Temp1]).value.replace(",","."));
                    }
                dimTemp=document.getElementById("dim"+DimIndex[Temp1+1]).value;
            }
    }
    delete tempDevDown;
    delete tempDevUp;
    delete dimTemp;
    Temp1=0.0;
	if (document.getElementById("Zam_czesciowa").value=="checked"){ //Zmienność
		if (document.getElementById("ZamdevUp"+DimIndex[id.substring(0,1)]).value.replace(",",".")!=""){
			DevUp=document.getElementById("ZamdevUp"+DimIndex[id.substring(0,1)]).value.replace(",",".");
		}
		if (document.getElementById("ZamdevDown"+DimIndex[id.substring(0,1)]).value.replace(",",".")!=""){
			DevDown=document.getElementById("ZamdevDown"+DimIndex[id.substring(0,1)]).value.replace(",",".");
		}
	} else {
		document.getElementById("dim"+DimIndex[id.substring(0,1)]).style.color='black';
		document.getElementById("devUp"+DimIndex[id.substring(0,1)]).style.color='black';
		document.getElementById("devDown"+DimIndex[id.substring(0,1)]).style.color='black';
	}
	if (Dim==""){
		return;
	} else {
        if (DevUp==""){
            document.getElementById("devUp"+DimIndex[id.substring(0,1)]).style.backgroundColor="red";
                setTimeout(function() {
             document.getElementById("devUp"+DimIndex[id.substring(0,1)]).style.backgroundColor="#aaf7aa";
            }, 1500); 
             return;}
        if (DevDown==""){
            document.getElementById("devDown"+DimIndex[id.substring(0,1)]).style.backgroundColor="red";
                setTimeout(function() {
            document.getElementById("devDown"+DimIndex[id.substring(0,1)]).style.backgroundColor="#aaf7aa"; 
            }, 1500); 
            return;}
    }
	if (DevDown==0 && DevUp==0){
		return;
	}
	if (parseFloat(DevUp)<parseFloat(DevDown)){
		//alert("Odchyłka górna nie może być mniejsza od odchyłki dolnej\nAkcja przerwana");
		return;
	}
	var Finished_OutOfRange=0.0;
	XNidoKW=[];
	zmienneXTab=[];
	rozNormAsym=[];
	rozRown=[];
	rozRayl=[];
	rozRaylPLUS=[];
	rozNorm=[];
	rozTroj=[];
    rozMinMax=[];
	var temp=0.0;
	var temp1=0.0;
	MaxDim=parseFloat(Dim)+parseFloat(DevUp);
	MinDim=parseFloat(Dim)+parseFloat(DevDown);
	zakres=parseFloat(DevUp)-parseFloat(DevDown);
	if (zakres==0){
		zakres=0.008;
	}
	srednia=MinDim+(zakres/2);
	skok=zakres/podzialka;
	if (Multiple!=0){
		//skok=MaxRange/podzialka;
		//MinDim=parseFloat(srednia-(MaxRange/2));
	}
	for(i=0; i<(podzialka+1); i++) { //Obliczanie kwadratu roznicy (x - ni) , zmiennych x. r.normalny
			if (i>0) {
				MinDim=MinDim+skok;
			}
		zmienneXTab.push(parseFloat(MinDim.toFixed(7)));
		temp=Math.pow((MinDim.toFixed(7)-srednia),2)
		if (id.substring(2,3)==6) { //Rozkład normalny asymetryczny	
			temp=Math.pow(((MinDim-skok*(document.getElementById("Range"+id.substring(0,1)).value-50)/2).toFixed(5)-srednia),2)
		}
		odchylenieXn=odchylenieXn+temp;
		if (MinDim>MaxDim+skok) {
			XNidoKW.push(parseFloat(temp).toFixed(7));
		} else {
			XNidoKW.push(parseFloat(temp.toFixed(7)));
		}
	}
	   MaxDim=MinDim;
	if (Multiple==0) {
		MaxDim=parseFloat(Dim)+parseFloat(DevUp);
		MinDim=parseFloat(Dim)+parseFloat(DevDown);
	} else {
		MinDim=parseFloat(Dim)-(MaxRange/2);
	}
	
	if (Multiple!=0){
		zakres=zakres+(MaxRange-zakres)*0.35;
	} else {
		sigmaRownom=1/zakres;
	}
    //sigmaNorm=zakres/(2*Math.sqrt(3*Math.PI));
    //alert(sigmaNorm + "  sigma2= "+(zakres/(2*Math.sqrt(3)))+ "  sigma3= " + zakres/6)
    sigmaNorm=zakres/6;
    sigmaRownom=1/zakres;
	MaxDim=zmienneXTab[zmienneXTab.length-1];
	MinDim=zmienneXTab[0];
    var MinMaxTable=[MaxDim,MinDim];
    var tempMax=0.0;
    var indexTab="";
    var CheckNext=0;
    //var SUMROZKLADNORMALNY=0.0
    //var SUMROZKLADNORMALNY1=0.0
    //var SUMROZKLADNORMALNY2=0.0
    //var SUMROZKLADNORMALNY3=0.0
		for(i=0; i<1.0*(podzialka+1); i++) { //obliczanie wartosci dla wszystkich rozkladow
			CheckNext=0;	
            temp=Math.pow(Math.E,(-1*XNidoKW[i])/(2*Math.pow(sigmaNorm,2)));
				if (BTNlistpos==1){ //rozklad normalny
					rozNorm.push(temp/(sigmaNorm*Math.sqrt(2*Math.PI)));
                    //SUMROZKLADNORMALNY=SUMROZKLADNORMALNY+rozNorm[i];
				} else if (BTNlistpos==6){ // rozklad normalny asymetryczny
					rozNormAsym.push(temp/(sigmaNorm*Math.sqrt(2*Math.PI)));
				}
				//temp=Math.pow(Math.E,(-1*Math.pow((zmienneXTab[i]-MinDim),2)/(Math.pow(sigmaNorm,2)*2)));	//rozklad Rayleigha
				temp=Math.pow(Math.E,(-1*Math.pow((zmienneXTab[i]-MinDim),2)/(Math.pow(sigmaNorm*1.2,2)*2)));	//rozklad Rayleigha
				rozRayl.push(((zmienneXTab[i]-MinDim)*temp*0.7)/Math.pow(sigmaNorm,2)+0.0001);
				//rozRayl.push(((zmienneXTab[i]-MinDim)*temp)/Math.pow(sigmaNorm,2)+0.0001);
             //SUMROZKLADNORMALNY1=SUMROZKLADNORMALNY1+rozRayl[i];
				rozRaylPLUS.unshift(((zmienneXTab[i]-MinDim)*temp*0.7)/Math.pow(sigmaNorm,2)+0.0001);
	            if (id.substr(0,1)==1){
                    var ButtonID="BtnChart";
                        for(j=1; j<7; j++){
                            ButtonID="BtnChart" + (parseFloat(id.substr(0,1))+1) + "." + j;
                            if (document.getElementById(ButtonID).value=="checked") {
                            CheckNext=1;
                            }
                         }
                }
                if (BTNlistpos==2 || BTNlistpos==3 || BTNlistpos==0){ //rozklad rownomierny, trojkatny, minmax	
						rozRown.push(sigmaRownom*0.98);
                    //SUMROZKLADNORMALNY2=SUMROZKLADNORMALNY2+rozRown[i];
                        rozMinMax.push(MinMaxTable[Math.round(Math.random())]);
                    if (Multiple==0){
						}
                    if (i<=(podzialka/2)){ //I połowa trójkąta
							if (Multiple!=0){
                                if ((MaxRange/2-(zakres-(MaxRange-2*zakres)*0.1)/2.2-i*(zakres/podzialka))<=0){
                                    
                                } else {
                                indexTab=i;
								Temp1=Temp1+1;
                                temp1=Temp1;
                            }}
							//temp=(3*sigmaRownom/zakres)*(zmienneXTab[i]-MinDim);
							temp=(4/(zakres*zakres))*(zmienneXTab[i]-MinDim);
                            rozTroj.push(temp);
                           // SUMROZKLADNORMALNY3=SUMROZKLADNORMALNY3+rozTroj[i];
                            tempMax=Math.max.apply(Math,rozRown);
                            if (isFinite(tempMax)==false){
                                tempMax=(2*sigmaRownom/zakres*(zmienneXTab[1]-MinDim))*0.4;
                            }
						} else {	//II połowa trójkąta
							if (Multiple!=0){
                                temp=Math.max.apply(Math,rozRown)
                                if (Temp1>0){
                                    for (j=0;j<Temp1;j++){
                                    }
                                    Temp1=0;
                                }
								if ((MaxRange/2-(zakres-(MaxRange-2*zakres)*0.1)/2.2-(podzialka-i)*(zakres/podzialka))<=0){
                                }
                            }
                            //temp=(3*sigmaRownom/zakres)*(zmienneXTab[zmienneXTab.length-1]-zmienneXTab[i]);
                            temp=(4/(zakres*zakres))*(zmienneXTab[zmienneXTab.length-1]-zmienneXTab[i]);
							rozTroj.push(temp);
                            //SUMROZKLADNORMALNY3=SUMROZKLADNORMALNY3+rozTroj[i];
							//rozTroj.push(2.2*temp);
						}
					} 
					zmienneXTab[i]=parseFloat(zmienneXTab[i].toFixed(4));
		}
    console.log(rozNormAsym);
    console.log(rozNorm);
	DataIndex=[rozMinMax,rozNorm, rozRown, rozTroj, rozRaylPLUS, rozRayl, rozNormAsym];
	if (Multiple !=0){	
	for (j=0; j<7; j++) {
        temp=0;
		//for (i=0; i<1.0*podzialka+1; i++) {
			if (Multiple !=0){//Symulowanie rozkładu rzeczywistego
			if (isNaN (DataIndex[j][0])){}else{ // sprawdz czy to liczba   
                switch(j-1){
                    case -1:
                        rozMinMax.sort(function(a, b){return a-b});
                        //alert(rozMinMax);
                        for (i=0; i<rozMinMax.length; i++){
                            if(rozMinMax[i]<MinMaxTable[0]){
                               temp=temp+1; 
                            } 
                        rozMinMax[i]=0;    
                        }
                        rozMinMax[0]=(temp*(index_zmiany/podzialka).toFixed(0));
                        rozMinMax[podzialka]=((podzialka+1-temp)*(index_zmiany/podzialka).toFixed(0));
                        break;
				case 0:
					//rozNorm[i]=(ActualDistr(DataIndex[j],i,(Math.max.apply(Math, rozNorm)),index_zmiany,index_ucinania_dołu));
                    rozNorm=MonteCarlo(DataIndex[j],zmienneXTab,index_zmiany);
                        break;
				case 1:
					//rozRown[i]=(ActualDistr(DataIndex[j],i,(Math.max.apply(Math, rozRown))*0.0001,(index_zmiany),index_ucinania_dołu));
					rozRown=MonteCarlo(DataIndex[j],zmienneXTab,index_zmiany);
                        break;
				case 2:
					//rozTroj[i]=(ActualDistr(DataIndex[j],i,(Math.max.apply(Math, rozTroj)),index_zmiany,index_ucinania_dołu));
					rozTroj=MonteCarlo(DataIndex[j],zmienneXTab,index_zmiany);
                        break;
				case 3:
					//rozRaylPLUS[i]=(ActualDistr(DataIndex[j],i,(Math.max.apply(Math, rozRaylPLUS)),index_zmiany,index_ucinania_dołu));
					rozRaylPLUS=MonteCarlo(DataIndex[j],zmienneXTab,index_zmiany);
                        break;
				case 4:	
                        //rozRayl[i]=(ActualDistr(DataIndex[j],i,(Math.max.apply(Math, rozRayl)),index_zmiany,index_ucinania_dołu));
					rozRayl=MonteCarlo(DataIndex[j],zmienneXTab,index_zmiany);
                        break;
				case 5:
					//rozNormAsym[i]=(ActualDistr(DataIndex[j],i,(Math.max.apply(Math, rozNormAsym)),index_zmiany,index_ucinania_dołu));
                    rozNormAsym=MonteCarlo(DataIndex[j],zmienneXTab,index_zmiany);
                        break;
				}	
			}
        }	
	}}
    DataIndex=[rozMinMax, rozNorm, rozRown, rozTroj, rozRaylPLUS, rozRayl, rozNormAsym];
	document.getElementById("Chart"+id).style.display = 'none';
	document.getElementById("Chart"+id).style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
	zakres=parseFloat(DevUp)-parseFloat(DevDown);
	if (Multiple!=0){	//sumowanie rozkładów
		if (document.getElementById('btn-'+DimIndex[id.substring(0,1)]).value=="checked") { //sprawdzanie znaku działania
				Sign=-1;
				//DataIndex[BTNlistpos-1].reverse(); //odwracanie tabeli
				document.getElementById('btn-'+DimIndex[id.substring(0,1)]).className="button button2"; // zaznaczanie znaku MINUS
			} else {
				document.getElementById('btn+'+DimIndex[id.substring(0,1)]).className="button button2"; // zaznaczanie znaku PLUS
                document.getElementById('btn-'+DimIndex[id.substring(0,1)]).className="button button3";
			}
        if (indexTab==0 && BTNlistpos==3){
            zakres=MaxRange;
            var ButtonID="";
            var zakresTemp=0;
            for (i=1; i<7; i++){
                for(j=1; j<7; j++){
                    ButtonID="BtnChart" + i + "." + j;
                    if (document.getElementById(ButtonID).value=="checked" && j==2) {
	                   DevUp=document.getElementById("devUp"+DimIndex[i]).value.replace(",",".");
                        DevDown=document.getElementById("devDown"+DimIndex[i]).value.replace(",",".");
                        zakresTemp=parseFloat(DevUp)-parseFloat(DevDown);              
                    }
                if (zakresTemp<zakres && zakresTemp>0){
                    zakres=zakresTemp;
                }
                }
            }
            if (MaxRange>zakres){
                zakresTemp=MaxRange/(zakres);
                for (i=0; i<podzialka; i++){
                    if (isNaN (DataIndex[BTNlistpos][i-1])){
                           temp=DataIndex[BTNlistpos][i]*0.02;
                       } else {
                           temp=DataIndex[BTNlistpos][i-1];
                       }
                    if (i>((podzialka+1)/2-1.5*zakresTemp*zakresTemp) && i<=((podzialka+1)/2)){
                            //DataIndex[BTNlistpos-1][i]=temp;
                        } else if (i<((podzialka+1)/2+1.5*zakresTemp*zakresTemp) && i>((podzialka+1)/2)){
                            //DataIndex[BTNlistpos-1][i]=temp;
                        }
                }
            }
        
        }
         TemprozFinished=[]; 
        //alert(zmienneXTab.length+" index zmiany"+index_zmiany);
        if (rozFinished.length==0){// Tworzenie tabeli ze zmiennymi o wymiarach A
            
            for (i=0; i<index_zmiany; i++) {
                    for(j=0; j<DataIndex[BTNlistpos][i]; j++){
                            //alert(zmienneXTab[i]);
                            rozFinishedTEMP.push(parseFloat(zmienneXTab[i]));
                        }
                    }
            rozFinished=rozFinishedTEMP;
		} else {	// Tworzenie tabeli ze zmiennymi o wymiarach sumy A+....itd.
                //alert(DataIndex[BTNlistpos]);
			    for (i=0; i<index_zmiany; i++) {
                        for(j=0; j<(DataIndex[BTNlistpos][i]); j++) {
                        TemprozFinished.push(parseFloat(zmienneXTab[i]));
                        }
                    }
            //alert(TemprozFinished.length + "  " + TemprozFinished);
                //console.log(rozFinishedTEMP);
                for (i=0; i<index_zmiany; i++){
                    if (BTNlistpos==0){
                        if (i<index_zmiany/3){
                           temp=(Math.random()*((TemprozFinished.length-1)/2)).toFixed(0); 
                        }else if (i>index_zmiany/3 && i<2*(index_zmiany/3)){
                           temp=(Math.random()*((TemprozFinished.length-1)/3)+((TemprozFinished.length-1)/3)).toFixed(0);   
                        } else{
                            temp=(Math.random()*((TemprozFinished.length-1)/3)+((2*(TemprozFinished.length-1))/3)).toFixed(0);   
                        }
                    } else{
                        temp=(Math.random()*(TemprozFinished.length-1)).toFixed(0);
                        if (temp<0) temp=0;
                    }
                    
                        if (isNaN (temp)){
                                    alert("błąd0011 + "+i);
                                }
                        if(TemprozFinished[temp]<0){
                            alert("błąd0012 + "+temp);
                        }
                        rozFinishedTEMP[i]=((parseFloat(rozFinishedTEMP[i]))+parseFloat(Sign*TemprozFinished[temp]));
                        
                        if (isNaN (rozFinishedTEMP[i])){
                            alert("błąd0013 + " +temp + " " + i);
                        }
                        TemprozFinished.splice(temp,1);
                    
                    }
            }
		
		temp=Math.max.apply(Math, rozFinished);	//Odejmowanie czesci wykresu w złożeniu
		temp1=Math.min.apply(Math, rozFinished);
	}
	var LabelIndex=["MinMax ","r. normalny ","r. równomierny ", "r. trójkątny ","r. Rayleigha - (skośność lewostronna) ","r. Rayleigha + (skośność prawostronna) ","r. norm. niesymetryczny"];
	var ColorIndex=['rgba(0, 125, 105, 0.9)','rgba(0, 155, 205, 0.9)','rgba(250, 160, 5, 0.9)','rgba(0, 175, 0, 0.9)','rgba(0, 0, 255, 0.9)','rgba(90, 135, 25, 0.9)','rgba(150, 20, 20, 0.9)'];
    /*if (MaxScale < (((Math.max.apply(Math, rozRayl)*1.1-(Math.max.apply(Math, rozRayl)*1.1))*0.35)+Math.max.apply(Math, rozRayl)*1.2) && Multiple==0) { // Największa wartość y dla wszystkich wykresów będzie taka sama
		MaxScale=(((Math.max.apply(Math, rozRayl)*1.1-(Math.max.apply(Math, rozRayl)*1.1))*0.35)+Math.max.apply(Math, rozRayl)*1.2);
		MaxScale_index=id.substring(0,1)
	} 
    if (MaxScaleHistogram==0 && Multiple!=0){
         MaxScaleHistogram=Math.max.apply(Math, rozRayl)*1.8;
    }
    
    if (Multiple!=0 && MaxScaleHistogram!=1){
        MaxScale=MaxScaleHistogram;
    } else if (MaxScale<(((Math.max.apply(Math, rozRayl)*1.1-(Math.max.apply(Math, rozRayl)*1.1))*0.35)+Math.max.apply(Math, rozRayl)*1.2)) {
        MaxScale=(((Math.max.apply(Math, rozRayl)*1.1-(Math.max.apply(Math, rozRayl)*1.1))*0.35)+Math.max.apply(Math, rozRayl)*1.2);
    }*/
	zakres=parseFloat(DevUp)-parseFloat(DevDown);
    MaxScale=5/(ChartScale+(zakres/ChartScale)*0.05);
    var ColorIndex1=[];
	for (i=0; i<=80; i++){ //Lista kolorów słupków wykresu złożenia
	ColorIndex1[i]=ColorIndex[BTNlistpos];
	}
    if (DataIndex[BTNlistpos] != null){
		
		var config={options: {
            tooltips: {enabled: false},
            hover: {mode: null},
			//responsive: true,
			maintainAspectRatio: false,
			chartArea: {
			},
			scales: {
				yAxes: [{
					ticks: {
                        display: false,
						beginAtZero:true,
						//max:(Math.max.apply(Math, rozRayl)*1.05+0.2),
                        
                    }
				}],	
                xAxes: [{
					categoryPercentage: 1.1,
					barPercentage: 1,
                    ticks: {
                        fontSize: 12,
                   }
				}]
			},
			legend: {
				labels: {
					fontSize:12,
					fontColor: 'black',
                    
				}
			}
		},type: 'bar'}
		config.data = {
			labels: zmienneXTab,
			datasets: [{
				label: LabelIndex[BTNlistpos],
				data: DataIndex[BTNlistpos],
				backgroundColor:ColorIndex1,
				borderColor:ColorIndex[BTNlistpos],
				borderWidth: 0,
				pointRadius: 0
			}]
		};
	
	// 
	if (document.getElementById("ZamdevDown"+DimIndex[id.substring(0,1)]).value!="" || document.getElementById("ZamdevUp"+DimIndex[id.substring(0,1)]).value!=""){ 
 DimTemp=parseFloat(document.getElementById("devDown"+DimIndex[id.substring(0,1)]).value.replace(",","."))+parseFloat(document.getElementById("dim"+DimIndex[id.substring(0,1)]).value.replace(",",".")); temp=parseFloat(document.getElementById("devUp"+DimIndex[id.substring(0,1)]).value.replace(",","."))+parseFloat(document.getElementById("dim"+DimIndex[id.substring(0,1)]).value.replace(",","."));
        for (i=0; i<(zmienneXTab.length); i++) {
			if(zmienneXTab[i]<DimTemp) { // 1 połowa wykresu
				config.data.datasets[0].backgroundColor[i] = 'rgba(255, 0, 0, 0.9)';	
			} else if(zmienneXTab[i]>temp) { // 2 połowa wykresu
				config.data.datasets[0].backgroundColor[i] = 'rgba(255, 0, 0, 0.9)';	
			}
		}
	}
    if(Chart1!=null){
        Chart1.destroy();
    }
    if (Multiple==0){
        config.options.scales.yAxes[0].ticks.max=MaxScale;	
        var canvas = document.getElementById("Chartt"+id);
        var ctx = canvas.getContext('2d');
        Chart1 = new Chart(ctx,config);
        Chart1.update();
        } else {
        if (Chart11!=null && id.substr(0,1)==1){
            Chart11.destroy();
            document.getElementById("ChartHist"+id.substr(0,1)).value="";
        }
        if (Chart12!=null && id.substr(0,1)==2){
            Chart12.destroy();
            document.getElementById("ChartHist"+id.substr(0,1)).value="";
        }
        if (Chart13!=null && id.substr(0,1)==3){
            Chart13.destroy();
            document.getElementById("ChartHist"+id.substr(0,1)).value="";
        }
        if (Chart14!=null && id.substr(0,1)==4){
            Chart14.destroy();
            document.getElementById("ChartHist"+id.substr(0,1)).value="";
        }
        if (Chart15!=null && id.substr(0,1)==5){
            Chart15.destroy();
            document.getElementById("ChartHist"+id.substr(0,1)).value="";
        }
        if (Chart16!=null && id.substr(0,1)==6){
            Chart16.destroy();
            document.getElementById("ChartHist"+id.substr(0,1)).value="";
        }
        var canvas = document.getElementById("CharttHist"+(id.substr(0,1)));
        document.getElementById("ChartHist"+id.substr(0,1)+"Wym").innerHTML="Wymiar "+DimIndex[id.substr(0,1)];
        var ctx = canvas.getContext('2d'); 
            config.options.legend.labels.fontSize=8;
            config.options.scales.xAxes[0].ticks.fontSize=9;
            config.options.scales.yAxes[0].ticks.display=true;
            config.options.scales.yAxes[0].ticks.fontSize=9;
        switch(parseFloat(id.substr(0,1))){
				case 1:
					Chart11= new Chart(ctx,config);
                    document.getElementById("ChartHist"+id.substr(0,1)).value="Chart";
                    Chart11.update();
                        break;
				case 2:
					Chart12= new Chart(ctx,config);
                    document.getElementById("ChartHist"+id.substr(0,1)).value="Chart";
                    Chart12.update();
                        break;
                case 3:
					Chart13= new Chart(ctx,config);
                    document.getElementById("ChartHist"+id.substr(0,1)).value="Chart";
                    Chart13.update();
                        break;
                case 4:
					Chart14= new Chart(ctx,config);
                    document.getElementById("ChartHist"+id.substr(0,1)).value="Chart";
                    Chart14.update();
                        break;
                case 5:
					Chart15= new Chart(ctx,config);
                    document.getElementById("ChartHist"+id.substr(0,1)).value="Chart";
                    Chart15.update();
                        break;
                case 6:
					Chart16= new Chart(ctx,config);
                    document.getElementById("ChartHist"+id.substr(0,1)).value="Chart";
                    Chart16.update();
                        break;
        }
        }
    }
	return 1;
}
function ActualDistr(Data,i,Max,index_zmiany,index_ucinania_dołu){ //tmp
var temp=0.0;
temp=Data[i];
temp=temp+((temp*(Math.random()*index_zmiany*0.8)-(index_zmiany/2)));
if (temp<(Max/20)) {
temp=temp+Math.random()*0.25-(temp/5);
	if (temp<Max*index_zmiany/5){
	temp=temp*(Math.random()-0.2)*1.7;
	}
	if(temp<0) {
	temp=-1*temp*0.8}
}
return parseFloat(temp);

}
function CalculateSigma (dataY, dataX){
    var Tab=[];
    var index=0;
    var Suma=0.0;
    for (i=0; i<dataX.length;i++){
        var A=0;
        A=dataY[i];
        if (A>0){
            for (x=0;x<A;x++){
                Tab[index]=parseFloat(dataX[i]);
                Suma=Suma+parseFloat(dataX[i]);
                index=index+1;
            }
        }
    }
    var srednia=0.0;
    var test=0.0;
    srednia=Suma/Tab.length;
    for (i=0;i<Tab.length;i++){
        test=test+Math.pow((Tab[i]-srednia),2);
    }
    var odchylenie=0.0;
    odchylenie=Math.sqrt((1/Tab.length)*test);
    document.getElementById("Parag_Sredni").innerHTML ="Wymiar średni: <b>"+(parseFloat(srednia.toFixed(2)))+"</b>";
    document.getElementById("Parag_Sigma").innerHTML ="Odchyl. stand. &sigma;= <b>"+(parseFloat(odchylenie.toFixed(4)))+"</b>";
}
function AddChart(dataY,dataX,label,colorIndex,id) { //Dodawanie wykresu
    var ctxFinal = document.getElementById(id).getContext('2d');
	document.getElementById(id).style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
    document.getElementById(id).style.visibility = "visible";
	var ColorIndex=['rgba(0, 155, 205, 0.9)','rgba(255, 0, 0, 0.9)','rgba(0,205, 0, 0.9)',
                    'rgba(0, 0, 255, 0.9)','rgba(90, 135, 25, 0.9)','rgba(150, 20, 20, 0.9)',
                    'rgba(0, 0, 0, 0.9)'];
	var ColorIndex1=[];
	for (i=0; i<=80; i++){ //Lista kolorów słupków wykresu złożenia
	ColorIndex1[i]=ColorIndex[colorIndex];
	}  
	  var configFinal = {options: {
            tooltips: {enabled: true},
            hover: {mode: null},
			maintainAspectRatio: false,
			scales: {
				yAxes: [{
					ticks: {
						beginAtZero:true,
						max:Math.round(Math.max.apply(Math, dataY)*1.1+0.5),
					}
				}]	
			},
			legend: {
				labels: {
					fontSize:12,
					fontColor: 'black'
				}
			}
		},type:'bar'}
		var ctxFinal = document.getElementById(id).getContext('2d');
		configFinal.data = {
		labels: dataX,
		datasets: 
			[{
				label: label,
				data: dataY, 
				backgroundColor:ColorIndex1,
				//borderColor:ColorIndex[colorIndex],
				borderWidth: 0.1,
				pointRadius: 5
			},/*{ // Green MinDim, MaxDim
                label:"",
				data: dataY,
                backgroundColor:ColorIndex[6],
				borderWidth: 1,
				pointRadius: 1
            }*/
            ]	
	};
		if (myChart!=null){
			myChart.destroy()
		}
	myChart = new Chart(ctxFinal,configFinal);
	if (document.getElementById("Zam_czesciowa").value=="checked"){ // Red and yellow bars on total interchangeability chart
        for (i=0; i<dataX.length; i++) {
            let minOrgDim = (parseFloat(OrgDim)+parseFloat(OrgDevDown)).toFixed(3);
            let maxOrgDim = (parseFloat(OrgDim)+parseFloat(OrgDevUp)).toFixed(3);
			if (isNaN(dataY[i]) || dataY[i]===undefined) {
                    dataY[i]=0;
                }
            if(dataX[i]<OrgDim) { // first half of chart
                if (dataX[i]<minOrgDim) {
				    Finished_OutOfRange=parseFloat(Finished_OutOfRange)+parseFloat(dataY[i]);
					myChart.data.datasets[0].backgroundColor[i] = ColorIndex[1];	
				}
                if (dataX[i+1]>=minOrgDim && dataX[i]<minOrgDim) { //green left bar on chart
                    dataX[i+1]=parseFloat(minOrgDim);
                    dataY[i+1]=parseFloat((Math.max.apply(Math, dataY)*1.05).toFixed(0));
				    myChart.data.datasets[0].backgroundColor[i+1] = ColorIndex[2];
                    document.getElementById('minOrgDimDownDIV').innerHTML=minOrgDim;
                    document.getElementById('minOrgDimDownDIV').setAttribute('data-value', i);
                    document.getElementById('minOrgDimDownDIV').style.left=80 + i*8.15 + "px";
                    document.getElementById('minOrgDimDownDIV').style.visibility = "visible";
                }
            } else if (dataX[i]>OrgDim) { // second half of chart
				if (dataX[i]>maxOrgDim) {
                    Finished_OutOfRange=parseFloat(Finished_OutOfRange)+parseFloat(dataY[i]);
                    myChart.data.datasets[0].backgroundColor[i] = ColorIndex[1];	
				}
                if (dataX[i+1]>maxOrgDim && dataX[i]<=maxOrgDim) { // green right bar on chart
                    dataX[i]=parseFloat(maxOrgDim);
                    dataY[i]=parseFloat(Math.max.apply(Math, dataY));
				    myChart.data.datasets[0].backgroundColor[i] = ColorIndex[2];
                    document.getElementById('minOrgDimUpDIV').innerHTML=maxOrgDim;
                    document.getElementById('minOrgDimUpDIV').setAttribute('data-value', (i+1));
                    document.getElementById('minOrgDimUpDIV').style.left=90 + (i)*8.25 + "px";	
                    document.getElementById('minOrgDimUpDIV').style.visibility = "visible";
                }
			}
		}
	} else {
        document.getElementById('minOrgDimDownDIV').style.visibility = "hidden";
        document.getElementById('minOrgDimUpDIV').style.visibility = "hidden";
    }
	myChart.update(); 
    document.getElementById("ChartFinished").style.height=((document.documentElement.clientHeight/4)+90)+"px"
}
function AlertButton(index){ // Podświetlanie na czerwono listy przycisków rozkładu na 0.5s
var ButtonID="BtnChart";
for (i=1;i<7;i++){
	ButtonID="BtnChart" + index + "." + i;
    if (i==4 || i==5) document.getElementById(ButtonID).className=document.getElementById(ButtonID).className.substring(0,5) + " btn red sec1";
    else document.getElementById(ButtonID).className=document.getElementById(ButtonID).className.substring(0,5) + " btn red";
	setTimeout(function() {
		for (i=1;i<7;i++){
		ButtonID="BtnChart" + index + "." + i;
            if (i==4 || i==5) document.getElementById(ButtonID).className=document.getElementById(ButtonID).className.substring(0,5) + " btn sec sec1";
            else document.getElementById(ButtonID).className=document.getElementById(ButtonID).className.substring(0,5) + " btn sec";
		
}}, 500);	
}
}
function checkDev(id){
    var index="";
    var boxDown=0.0;
    var boxUp=0.0;
    var devDown="devDown";
    var devUp="devUp";
    if (id.length>8) { //zamienność
        index=id.substring(6,8);
        devUp="Zam"+devUp;
        devDown="Zam"+devDown;
    }  else {//odchyłki zwykłe
        index=id.substring(3,5);
    }
        if (index=="Up") {
            boxDown=document.getElementById(devDown+id.substr(id.length-1,id.length));
            boxUp=document.getElementById(id);
            if (boxDown.value!="" && parseFloat(boxUp.value.replace(",","."))<=parseFloat(boxDown.value.replace(",","."))) {
                MyAlert("Odchyłka górna nie może być mniejsza lub równa odchyłce dolnej !",boxUp , 5000, 1500, 1);
            }
        } else if (index=="Do") {
            boxUp=document.getElementById(devUp+id.substr(id.length-1,id.length));
            boxDown=document.getElementById(id);
            if (boxUp.value!="" && parseFloat(boxDown.value.replace(",","."))>=parseFloat(boxUp.value.replace(",","."))) {
                MyAlert("Odchyłka górna nie może być mniejsza lub równa odchyłce dolnej !", boxDown, 5000, 1500, 1);
            }
        }
    if (id.length>8) { //zamienność
        tolBiggerCalc(id.substr(id.length-1,1));
    }
}
function MyAlert(text, box, timeText, timeBox, clear) {
    let tempColorStyle=box.style.backgroundColor;
    let tempZindexStyle=box.style.zIndex;
    if (box!=null) {
        box.style.backgroundColor="red";
        box.style.zIndex=3;
    }
    document.getElementById("DevAlert").innerHTML=text;
    document.getElementById("DevAlert").style.backgroundColor="white";
    document.getElementById("GreyedScreen").style.zIndex=2;
    if (box!=null) {
        setTimeout(function() {
            box.style.backgroundColor=tempColorStyle;
            box.style.zIndex=tempZindexStyle;
            if (clear==1){
                box.value=""; 
            }
            document.getElementById("GreyedScreen").style.zIndex=-2;
        }, timeBox);
    } else document.getElementById("GreyedScreen").style.zIndex=-2;
    setTimeout(function() {
        document.getElementById("DevAlert").innerHTML=""
        document.getElementById("DevAlert").style.backgroundColor="";
    }, timeText);
}
function GetScheduledBtn() { //Sprawdzamy jaki rozkład wymiarów został wybrany, sprawdzamy tylko takie dla której wymiar został wpisany, 
						//indexy zapisujemy w tablicy ScheduleBtn
	var ButtonID="BtnChart";
	var counter=0;
	var ScheduleBtn =[];
	var DimIndex=["a", "A", "B", "C", "D", "E", "F"];
	for(i=1; i<7; i++) {
		var Dim=document.getElementById("dim"+DimIndex[i]).value;
		counter=0;
		if (Dim!=""){
			for(j=1; j<7; j++){
				ButtonID="BtnChart" + i + "." + j;
				if (document.getElementById(ButtonID).value=="checked") {
				ScheduleBtn.push(i+"."+j);
				counter=1
				}
				if (j==6 && counter==0){
					AlertButton(i);
					return 0
				}
			}
		}
	}
return(ScheduleBtn);
}
function MonteCarlo (dataY,dataX,index){
    var dataYTEMP=[];
    for (i=0;i<dataX.length;i++){
        dataYTEMP[i]=0;
    }
    var Xmin=Math.min.apply(Math,dataX);
    var Xmax=Math.max.apply(Math,dataX);
    var Ymin=0;
    var Ymax=Math.max.apply(Math,dataY);
    var temp=0;
    var i=0;
    while (i<index){
        temp=(Math.random()*dataX.length).toFixed(0);
        if ((Ymin+Math.random()*(Ymax-Ymin)).toFixed(0)<=dataY[temp]){
            dataYTEMP[temp]=dataYTEMP[temp]+1;
            i++;
        }
    }
    /*temp=0;
    for (i=0;i<dataYTEMP.length;i++){
        temp=temp+dataYTEMP[i];
    }*/
    return dataYTEMP;
}
function tolBiggerCalc(dimIndex) {
    //let dimIndex=["a", "A", "B", "C", "D", "E", "F"];
	let devUp;
	let devDown;
    let zamDevUp;
    let zamDevDown;
    let tolBigger=0;
    let element;
    let zakresOld;
    let zakresNew;
    devUp = document.getElementById("devUp"+dimIndex).value.replace(",",".");
    devDown = document.getElementById("devDown"+dimIndex).value.replace(",",".");
    if (devUp!="" && devDown!=""){
        element = document.getElementById("ZamdevUp"+dimIndex);
        if (element != null) zamDevUp = element.value.replace(",",".");
        else zamDevUp=devUp;
        if (zamDevUp=="") zamDevUp=devUp;
        element = document.getElementById("ZamdevDown"+dimIndex);
        if (element != null) zamDevDown = element.value.replace(",",".");
        else zamDevDown=devDown;
        if (zamDevDown=="") zamDevDown=devDown;
        zakresOld=(parseFloat(devUp)-parseFloat(devDown));
        zakresNew=(parseFloat(zamDevUp)-parseFloat(zamDevDown));
        tolBigger = (zakresNew-zakresOld)/zakresOld;
        tolBigger = (tolBigger* 100).toFixed(1);
        document.getElementById("tolBigger" + dimIndex).innerHTML = tolBigger + "%";
    }
    
}
function getMaxRange(Param){ // (param 1,) obliczanie złożenia
	index_ucinania_dołu=0;
	rozFinished=[];
	rozNorm=[];
	rozRown=[];
	rozTroj=[];
	rozRayl=[];
	rozNormAsym=[];
    rozMinMax=[];
	Finished_Sum=0.0;
    MaxScaleHistogram=0.0;
    let podzialka=47;
	var ScheduleBtn=GetScheduledBtn();
	var zakres=0.0;
	var DimIndex=["a", "A", "B", "C", "D", "E", "F"];
	var DimNew=0.0;
	var DevUpNew=0.0;
	var DevDownNew=0.0;
	var Sign=1;
	var DimTemp=0.0;
	if (ScheduleBtn==0) { return};
	var scale=0.0;
	var color="";
	var temp=0.0;
	var temp1=0.0;
	var temp2=0.0;
	var Xstart=0;
    MaxRange=0.0;
	DeleteSVG();
	for (i=1; i<7; i++) { // Który wymiar pusty (gdzie wpisać dodatkowy)
		if (document.getElementById("dim"+DimIndex[i]).value.replace(",",".")==""){
			var tempIndex=i;
			i=8;
		}
	}
    if(document.getElementById("Zam_czesciowa").value=="checked" && Param==2){
        
        document.getElementById("DevAlert").innerHTML="Akcja niemożliwa przy wybranej zamienności częściowej"
        setTimeout(function() {
        }, 1500);
        setTimeout(function() {document.getElementById("DevAlert").innerHTML="" }, 5000);
        return;
       }
	for(i=1; i<7; i++) {
		Sign=1
		var DevUp=document.getElementById("devUp"+DimIndex[i]).value.replace(",",".");
		var DevDown=document.getElementById("devDown"+DimIndex[i]).value.replace(",",".");
		var Dim=document.getElementById("dim"+DimIndex[i]).value.replace(",",".");
		if (document.getElementById("Zam_czesciowa").value=="checked"){
			if (document.getElementById("ZamdevUp"+DimIndex[i]).value.replace(",",".")!="") {
				DevUp=document.getElementById("ZamdevUp"+DimIndex[i]).value.replace(",",".");
			}
			if (document.getElementById("ZamdevDown"+DimIndex[i]).value.replace(",",".")!="") {
				DevDown=document.getElementById("ZamdevDown"+DimIndex[i]).value.replace(",",".");
			}
		}
        if (Dim!="") {
            if (DevUp==""){
                 document.getElementById("devUp"+DimIndex[i]).style.backgroundColor="red";
                    setTimeout(function() {
                document.getElementById("devUp"+DimIndex[i]).style.backgroundColor="#aaf7aa";
                }, 1500); 
                return;}
            if (DevDown==""){
                 document.getElementById("devDown"+DimIndex[i]).style.backgroundColor="red";
                    setTimeout(function() {
                document.getElementById("devDown"+DimIndex[i]).style.backgroundColor="#aaf7aa"; 
                }, 1500); 
                return;}
        }
		if (parseFloat(DevUp)<parseFloat(DevDown)){
			//alert("Odchyłka górna nie może być mniejsza od odchyłki dolnej\nAkcja przerwana");
			return;
		}
		if (Dim!=""){
			if (document.getElementById("btn-"+DimIndex[i]).value=="checked") {
				Sign=-1;
			} // Obliczanie sumy wymiarów A-F z odchyłkami	
			DimNew=parseFloat(DimNew)+parseFloat(Dim)*Sign;
			if (Sign==1) {
			DevUpNew=parseFloat(DevUpNew)+parseFloat(DevUp)*Sign;
			DevDownNew=parseFloat(DevDownNew)+parseFloat(DevDown)*Sign;
			} else {
			DevUpNew=parseFloat(DevUpNew)+parseFloat(DevDown)*Sign;
			DevDownNew=parseFloat(DevDownNew)+parseFloat(DevUp)*Sign;
			}
			if (DevUpNew>0) {
				DevUpNew="+" + DevUpNew;
			}
		zakres=parseFloat(DevUp)-parseFloat(DevDown);
		if (MaxRange<zakres){
			MaxRange=zakres;
		}
        if (Param==4){
            return;
        }
	}
}
	if (Param==2){ // Obliczanie wymiaru niezależnego
        
		var BoxUp=document.getElementById("devUpZ");
        var BoxDown=document.getElementById("devDownZ");
        var Box=document.getElementById("dimZ");
        if (document.getElementById("dimZ").value.replace(",",".")==""
			|| document.getElementById("devDownZ").value.replace(",",".")==""
			|| document.getElementById("devUpZ").value.replace(",",".")==""){
                MyAlert("Wpisz wymiar zależny Z wraz z odchyłkami",Box,5000,1500,);
                MyAlert("Wpisz wymiar zależny Z wraz z odchyłkami",BoxDown,5000,1500,);
                MyAlert("Wpisz wymiar zależny Z wraz z odchyłkami",BoxUp,5000,1500,);
                /*Box.style.backgroundColor="red";
                BoxDown.style.backgroundColor="red";
                BoxUp.style.backgroundColor="red";
                document.getElementById("DevAlert").innerHTML="Wpisz wymiar zależny Z wraz z odchyłkami"
                    setTimeout(function() {
                Box.style.backgroundColor="#aaf7aa";
                BoxDown.style.backgroundColor="#aaf7aa";
                BoxUp.style.backgroundColor="#aaf7aa";
                }, 1500);
                    setTimeout(function() {document.getElementById("DevAlert").innerHTML="" }, 5000);*/
                return;
            }
		
		DevUp=document.getElementById("devUpZ").value.replace(",",".");
		DevDown=document.getElementById("devDownZ").value.replace(",",".");
		Dim=document.getElementById("dimZ").value.replace(",",".");
		DimNew=parseFloat(Dim)-parseFloat(DimNew);
		if (DimNew<0) {
			document.getElementById("btn-"+DimIndex[tempIndex]).value="checked"
			document.getElementById('btn-'+DimIndex[tempIndex]).className="button button2";
            document.getElementById('btn+'+DimIndex[tempIndex]).className="button button3";
			DimTemp=parseFloat(DevUpNew)-parseFloat(DevUp);
			DevUpNew=(parseFloat(DevDownNew)-parseFloat(DevDown)).toFixed(3);
			DevDownNew=DimTemp.toFixed(3);
			DimNew=Math.abs(DimNew);
		} else {
			document.getElementById("btn+"+DimIndex[tempIndex]).value="checked"
			document.getElementById('btn+'+DimIndex[tempIndex]).className="button button2";
            document.getElementById('btn-'+DimIndex[tempIndex]).className="button button3";
			DimTemp=parseFloat(DevDown)-parseFloat(DevDownNew);
			DevUpNew=(parseFloat(DevUp)-parseFloat(DevUpNew)).toFixed(3);
			DevDownNew=DimTemp.toFixed(3);
        }
		if (DevUpNew>0){
		DevUpNew="+"+DevUpNew; }
		if (DevDownNew>0){
		DevDownNew="+"+DevDownNew;}
        if (parseFloat(DevDownNew)>parseFloat(DevUpNew)){
        {
            MyAlert("Zmień dane. Zadanie nie do rozwiązania.",Box,5000,1500);
            MyAlert("Zmień dane. Zadanie nie do rozwiązania.",BoxDown,5000,1500);
            MyAlert("Zmień dane. Zadanie nie do rozwiązania.",BoxUp,5000,1500);
            /*Box.style.backgroundColor="red";
            BoxDown.style.backgroundColor="red";
            BoxUp.style.backgroundColor="red";
            document.getElementById("DevAlert").innerHTML="Zmień dane. Zadanie nie do rozwiązania."
                setTimeout(function() {
            Box.style.backgroundColor="#aaf7aa";
            BoxDown.style.backgroundColor="#aaf7aa";
            BoxUp.style.backgroundColor="#aaf7aa";
            }, 1500);
                setTimeout(function() {document.getElementById("DevAlert").innerHTML="" }, 5000);*/
            return;
            }
        }
	}
    
    if (Param!=2){
        for(k=0; k<ScheduleBtn.length; k++) {
        var Dim=document.getElementById("dim"+DimIndex[ScheduleBtn[k].substring(0,1)]).value;
            if (Dim!=""){
                if (k==0 && Param!=0) {
                index_zmiany=prompt("Ile losowań od 100 do 50 000", 1000);
                index_losowan=index_zmiany;
                    if (index_zmiany==null) {
                        return;
                    }
                    //for (j=0; j<1; j++) {	
                        if (index_zmiany>50000 || index_zmiany<100){
                            index_zmiany=prompt("Wpisz poprawną wartość\nIle losowań od 100 do 50 000", 1000);
                        } else { j=2; }
                    //}
                    if (index_zmiany>50000 || index_zmiany<100){
                        return; }
                    //index_zmiany=1000/(Math.sqrt(11*index_zmiany*index_zmiany/5)+200);
                    
                    //index_zmiany=(100000/(200*index_zmiany));
                } else if (Param==0) {
                    index_zmiany=1;
                }
                index_ucinania_dołu=k;
                Licz(ScheduleBtn[k],2,index_ucinania_dołu);
            }
        }
    }
	DimTemp=0;
	DimTemp=Math.max.apply(Math, rozFinished) 
	if (Param==1){
        rozFinished=[];
        var text="Rozkład wymiaru zależnego (zamienność 100%)";
		if (document.getElementById("Zam_czesciowa").value=="checked"){  
            text="Rozkład wymiaru zależnego (zamienność częściowa)";
        }
        DimTemp=0;
		zakres=parseFloat(DevUpNew)-parseFloat(DevDownNew);
		if (OrgDevUp!=""){
			DimTemp=((zakres-(parseFloat(OrgDevUp)-parseFloat(OrgDevDown)))*100/(parseFloat(OrgDevUp)-parseFloat(OrgDevDown))).toFixed(2);
		}
		document.getElementById("Zam_toler").innerHTML ="Tolerancja =<b>" + zakres.toFixed(3)+"</b>"+ " &nbsp &nbsp    Tolerancja większa o:<b>" + DimTemp+"%"+ "</b> &nbsp &nbsp      Poza przedziałem tolerancji:";
		rozFinishedTEMP.sort(function(a, b){return a-b});
        zakres=zakres/podzialka;
            var k=0;
            temp=temp*0;
            for (i=0; i<rozFinishedTEMP.length; i++){
                zmienneXFinished[k]=parseFloat(((DimNew+DevDownNew)+(zakres*k)).toFixed(3));
                if (parseFloat(rozFinishedTEMP[i]).toFixed(3)<=parseFloat(zmienneXFinished[k])){
                    temp=temp+1;
                } else {
                   rozFinished[k]=parseFloat(temp.toFixed(0));
                    k=k+1;
                    i=i-1;
                    temp=0;
                }
              }
        zmienneXFinished=[];
         for(k=0; k<(podzialka+1); k++) {
          zmienneXFinished[k]=parseFloat(((DimNew+DevDownNew)+(zakres*k)).toFixed(3));
             if (rozFinished[k]!=null){
                 if (rozFinished[k]==0 && temp1==0){ // sprawdzanie od lewej strony jaki zakres tolerancji jest wykorzystany
                     temp2=k+1;
                 } else if (rozFinished[k]!=0 && temp1==0) {
                     temp1=1;
                 }
		      Finished_Sum=parseFloat(Finished_Sum)+parseFloat(rozFinished[k]);
             }
	   } 
        if (Finished_Sum<index_zmiany){
            rozFinished[rozFinished.length]=parseFloat(index_zmiany-Finished_Sum);
            Finished_Sum=index_zmiany;
        }
        temp1=0;
        temp=0;
        for(k=podzialka; k>=0; k--) {  // sprawdzanie od prawej strony jaki zakres tolerancji jest wykorzystany
            if ((rozFinished[k]==0 || rozFinished[k]==null) && temp1==0){    
                temp=Math.abs((podzialka+1)-k);
                 } else if (temp1==0) {
                     temp1=1;
                     k=-1;
                 }    
	   } 
        document.getElementById("Compare_All").innerHTML ="100% obserwacji:&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp <b>"+(100-(temp+temp2)*2.083333333).toFixed(2)+"%</b>";
        while (rozFinished.length!=(podzialka+1)) { // liczba rozkładów = podzialce
            rozFinished.push(0);
        }
        rozFinishedTEMP=rozFinished.slice();
        AddChart(rozFinishedTEMP,zmienneXFinished,text,3,"ChartFinal");
        var indexx=0;
        rozFinishedTEMP=[];  
        var scroll = document.body.style.transform.replace( /[^\d\.]*/g, '');
        var index=1;
        var tempScale=(document.documentElement.scrollTop-450*scroll)/10;
        var interval = setInterval(function(){
           document.documentElement.scrollTop = (document.documentElement.scrollTop - tempScale);
           index += 1;
           if (index>10) clearInterval(interval)
           ;}, 20);
        CalculateSigma(rozFinished,zmienneXFinished);
        document.getElementById("Zam_czesciowa").style.visibility = "visible";
        document.getElementById("ChartHistogramBtn").style.visibility = "visible";
		document.getElementById("Zam_toler").innerHTML =document.getElementById("Zam_toler").innerHTML +"<b>"+ (parseFloat(Finished_OutOfRange)*100/parseFloat(Finished_Sum)).toFixed(2)+"%"+"</b>";
        document.getElementById("Zam_toler").innerHTML =document.getElementById("Zam_toler").innerHTML +"<br>Liczba losowań: <b>"+Finished_Sum+"</b>";
        document.getElementById("Zam_toler").innerHTML =document.getElementById("Zam_toler").innerHTML +"&nbsp &nbsp &nbsp Liczba elementów poza zakresem: <b>"+Finished_OutOfRange+"</b>";
	    Finished_OutOfRange=0;
        for(j=0; j<3; j++){         // odrzucamy tak by zostało: 99,73% i 99% obserwacji
            var k=podzialka;
            let maxDim=parseFloat(document.getElementById("minOrgDimUpDIV").getAttribute('data-value'));
            let minDim=parseFloat(document.getElementById("minOrgDimDownDIV").getAttribute('data-value'));
            if (isNaN(maxDim) || maxDim==0) maxDim=rozFinished[k];
            if (isNaN(minDim) || minDim==0) minDim=rozFinished[0];
            temp=0;
            temp2=0;
            if (j==0){
                temp1=parseFloat(index_losowan*0.0027);
            } else if (j==1) {
                temp1=parseFloat(index_losowan*0.01);
            } else {
                temp1=0;
            }
                for (i=0; i<(podzialka+1) ; i++){ 
                    if (isNaN(rozFinished[k])) rozFinished[k]=0;
                    if (isNaN(rozFinished[i])) rozFinished[i]=0;
                    if (parseFloat(rozFinished[k])<parseFloat(rozFinished[i])){ // prawa strona 
                            if (temp1<rozFinished[k]){ 
                                temp1=0.1;
                                i=100;
                            } else {
                                if (k>maxDim && maxDim != podzialka) {
                                    //alert("asdasd");
                                    temp2=(maxDim-k);
                                }
                                else temp2=temp2+1;
                                temp1=(temp1-parseFloat(rozFinished[k])).toFixed(1);
                            }
                            k=k-1;
                    }
                    else { // lewa strona 
                            if(temp1<rozFinished[i]){ 
                                temp1=0.1;
                                i=100;
                            } else {
                                if (i<minDim && minDim != 0) {
                                    //alert("asdasd");
                                    temp=(i-minDim);
                                }
                                else temp=temp+1;
                                temp1=(temp1-parseFloat(rozFinished[i])).toFixed(1);
                            }
                    }
                }
            //alert("temp= " + temp + "  temp2=  " + temp2);
            if (j==0){
                document.getElementById("Compare_09973").innerHTML ="99,73% obserwacji (3σ): &nbsp &nbsp <b>"+(100-(temp+temp2)*2.083333333).toFixed(2)+"%</b>";
            } else if (j==1) {
                document.getElementById("Compare_099").innerHTML ="99% obserwacji (2,57583σ):  <b>"+(100-(temp+temp2)*2.083333333).toFixed(2)+"%</b>";
            } else if (j==2 && document.getElementById("Zam_czesciowa").value=="checked") {
                document.getElementById("Compare_All").innerHTML ="100% obserwacji:&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp <b>"+(100-(temp+temp2)*2.083333333).toFixed(2)+"%</b>"; 
            }
        }
    }
	if ( Param==1 || Param==0){ 
        DimIndex="Z";
	} else { 
        DimIndex=DimIndex[tempIndex];	
	}
	if (DimNew==0 && DevUpNew==0 && DevDownNew==0){ // Wymiar i odchyłki =0 NIE WPISUJEMY dodatkowego wymiaru
	Param=0;
    document.getElementById("btn+"+DimIndex).value="checked"
	document.getElementById('btn-'+DimIndex).className="button button3";
	document.getElementById('btn+'+DimIndex).className="button button2";
	}
    if (DevUpNew.length>10&& DevUpNew.substr(DevUpNew.length-1,1)==9){
        DevUpNew=parseFloat(DevUpNew)+0.0001;
        if (DevUpNew>0){
        DevUpNew= "+" + DevUpNew;
        } else {
            DevUpNew= "-" + DevUpNew;
        }
    }
    if (DevDownNew.length>10 && DevDownNew.substr(DevDownNew.length-1,1)==9){
        DevDownNew=parseFloat(DevDownNew)+0.0001;
        if (DevDownNew>0){
        DevDownNew= "+" + DevDownNew;
        } else {
            DevDownNew= "-" + DevDownNew;
        }
    }
    
	if (Param!=-1){
		if (document.getElementById("Zam_czesciowa").value!="checked"){ //Wymiary przed zamiennością
            OrgDim=DimNew;
			OrgDevUp=DevUpNew.toString().substr(0,6);
			OrgDevDown=DevDownNew.toString().substr(0,6);
		}
        if (document.getElementById("Zam_czesciowa").value=="checked"){
            document.getElementById("ZamdevUp"+DimIndex).value=DevUpNew.toString().substr(0,6).replace(".",",");
            document.getElementById("ZamdevDown"+DimIndex).value=DevDownNew.toString().substr(0,6).replace(".",",");
        } else {
            document.getElementById("devUp"+DimIndex).value=(DevUpNew.toString().substr(0,6).replace(".",","));
            document.getElementById("devDown"+DimIndex).value=DevDownNew.toString().substr(0,6).replace(".",",");
        }
		document.getElementById("dim"+DimIndex).value=DimNew.toString().substr(0,6).replace(".",",");
		document.getElementById("dim"+DimIndex).style.color='blue';
		document.getElementById("devUp"+DimIndex).style.color='blue';
		document.getElementById("devDown"+DimIndex).style.color='blue';
        AcceptRozkladDiv();
        //MaxRange=parseFloat(DevUpNew)-parseFloat(DevDownNew); //Wpisywanie informacji w boksy
        var sigmaNorm=0.0;
        sigmaNorm=(MaxRange/(2*Math.sqrt(3*Math.PI))).toFixed(3);
        if (OrgDim==""){
            OrgDim=document.getElementById("dimZ").value.replace(",",".");
        }
        document.getElementById("Parag_Max").innerHTML ="Wymiar Max: <b>"+(parseFloat(OrgDim)+parseFloat(DevUpNew))+"</b>";
        document.getElementById("Parag_Min").innerHTML ="Wymiar Min: <b>"+(parseFloat(OrgDim)+parseFloat(DevDownNew))+"</b>";
        for (i=0; i<podzialka; i++){ //wykryty minimalny wymiar
            if (rozFinished[i]>0){
                document.getElementById("Parag_Min_wykryte").innerHTML ="Wykryty wym. Min: <b>"+zmienneXFinished[i].toFixed(3)+"</b>";
                i=podzialka+1;
                }
        }
        for (i=rozFinished.length-1;i>0;i--){ //wykryty maksymalny wymiar
            if (rozFinished[i]>0){
                document.getElementById("Parag_Max_wykryte").innerHTML ="Wykryty wym. Max: <b>"+zmienneXFinished[i].toFixed(3)+"</b>";
                i=0;
                }
        }
        document.getElementById("Zam_toler").innerHTML =document.getElementById("Zam_toler").innerHTML;
    }
	DimIndex=["Z", "A", "B", "C", "D", "E", "F", "Z"];
	DimTemp=parseFloat(document.getElementById("dim"+DimIndex[1]).value.replace(",","."));
	temp=0;
    temp1=0;
    var maxSum=0;
	for (i=1; i<7; i++) { //skalowanie łańcucha wymiarowego w okno
        if (document.getElementById("dim"+DimIndex[i]).value!=""){
            if (document.getElementById("btn-"+DimIndex[i]).value=="checked") {
                Sign=-1;
            } else {
                Sign=1;
            }
            DimTemp=parseFloat(document.getElementById("dim"+DimIndex[i]).value.replace(",","."));
            temp1=temp1+Sign*DimTemp;
            if (temp1<0 && temp1<temp) {
                temp=temp1;
            } else if(maxSum<temp1) {
                maxSum=temp1;
            }
        }
	}
    temp=-temp+maxSum;
    scale=750/temp;
	DimTemp=5000;
	temp2=DimTemp;
	for (i=1; i<7; i++) {
	color='#009900';
	Dim=parseFloat(document.getElementById("dim"+DimIndex[i]).value.replace(",","."));
	if (isNaN(Dim)){
	Dim="";
	}
	if (Dim!=""){
		Sign=1;
		temp=parseFloat(document.getElementById("dim"+DimIndex[i]).value.replace(",","."));
		if (document.getElementById("btn-"+DimIndex[i]).value=="checked") {
			Sign=-1;
			color='#CC0000';
		}
		if (Sign==-1) { // Wymiar ujemny
			DimTemp=DimTemp-(temp*scale);
		}
		if (DimTemp<temp2){
			temp2=DimTemp;
		}
		Draw(DimTemp,(i*45),temp*scale,40,color,DimIndex[i]+"="+temp,Sign);
		if (i==1 && Sign==1) {
			Drawline(DimTemp+2,(i*45+40),DimTemp+2,(i*45-85),"black",3);
			Xstart=DimTemp+2;
		} else if (i==1 && Sign!=1) {
            Xstart=(DimTemp+2)+temp*scale;
            Drawline(Xstart,(i*45+40),Xstart,(i*45-85),"black",3);
        }
		if (Sign==1) { // Wymiar dodatni
			DimTemp=DimTemp+temp*scale*Sign;
		} 
		if (document.getElementById("dim"+DimIndex[i+1]).value.replace(",",".")=="" || i==6){
			Drawline((DimTemp+2),(i*45+40),(DimTemp+2),(i*45-i*85),"black",3);
			if (OrgDim<0) {
			Draw(DimTemp+2,0,(Xstart-DimTemp),30,"black",DimIndex[0]+"="+DimNew,Sign);
			} else {
			Draw(Xstart,0,(DimTemp-Xstart),30,"black",DimIndex[0]+"="+DimNew,Sign);
			}
		}
	}
}    
document.getElementById("container").style.marginLeft = (-temp2+10)+"px";
svg.setAttribute("width", (-temp2+10+10800));
}