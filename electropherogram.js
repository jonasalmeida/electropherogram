console.log('electropherogram toolbox loaded')

electropherogram={

buildUI:function(){
	4
},

buildUI:function(id){
	id = id || jmat.uid('ELF');
	var div = document.getElementById(id)
	if(!div){
		div = document.createElement('div');div.id=id;
		document.body.appendChild(div);	
	}
	electropherogram.div=div;
	var p = document.createElement('p');
	p.innerHTML='Electropherogram ToolBox [<a href="https://github.com/jonasalmeida/electropherogram" target=_blank>source</a>]';
	div.appendChild(p);
	ipf = document.createElement('input'); // input file
	ipf.type="file";
	ipf.onchange=function(evt){
		var f=evt.target.files[0];
		console.log(evt.target.files[0].name+' file selected')
		var reader = new FileReader();
        reader.onload=function(x){
			var txt=x.target.result;
    	    electropherogram.parseABIF(txt);
	    }
	    //reader["readAsText"](f);
		reader["readAsBinaryString"](f);
	}
	div.appendChild(ipf);
	4

},

parseABIF:function(x,cb){
	// http://www6.appliedbiosystems.com/support/software_community/ABIF_File_Format.pdf
	x = x.split('').map(function(xi){return xi.charCodeAt(0)});
	xx=x;
	if(!cb){cb=function(x){console.log(x)}};
	//var abif={}
	abif={};
	// parse HEADER (p.7)
	abif.header={
		signature:jmat.char(x.slice(0,4)),
		version:x[5].toString().replace('0','.'),
		tagName:jmat.char(x.slice(6,10)),
		tagNumber:jmat.num2str(x.slice(10,14)),
		elementType:jmat.num2str(x.slice(14,16)),
		elementSize:jmat.num2str(x.slice(16,18)),
		numElements:jmat.num2str(x.slice(18,22)),
		dataSize:jmat.num2str(x.slice(22,26)),
		dataOffset:jmat.num2str(x.slice(26,30)),
		dataHandle:jmat.num2str(x.slice(30,34))
	}
	
	
	cb(x);
}

}