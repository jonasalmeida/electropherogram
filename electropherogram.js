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

bin2dec:function(x){ // an ellaboration on jmat.dec2bin
	return jmat.bin2dec(x.map(function(d){return jmat.dec2bin(d,8)}).join().replace(/\,/g,''))
},

parseABIF:function(x,cb){
	// http://www6.appliedbiosystems.com/support/software_community/ABIF_File_Format.pdf
	x = x.split('').map(function(xi){return xi.charCodeAt(0)});
	xx=x;
	if(!cb){cb=function(x){console.log(x)}};
	var bin2dec=this.bin2dec; // not jmat's !!!!
	//var abif={}
	abif={};
	// parse HEADER (p.7)
	abif.header={
		signature:jmat.char(x.slice(0,4)),
		version:x[5].toString().replace('0','.'),
		tagName:jmat.char(x.slice(6,10)),
		tagNumber:bin2dec(x.slice(10,14)),
		elementType:bin2dec(x.slice(14,16)),
		elementSize:bin2dec(x.slice(16,18)),
		numElements:bin2dec(x.slice(18,22)),
		dataSize:bin2dec(x.slice(22,26)),
		dataOffset:bin2dec(x.slice(26,30)),
		dataHandle:bin2dec(x.slice(30,34))
	}
	
	
	cb(abif);
}

}