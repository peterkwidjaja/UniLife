function ModuleSemester(){
	this.mods = [];
	this.totalMC = 0;
}
ModuleSemester.prototype.addMod = function(mod){
	this.mods[this.mods.length] = mod;
	this.totalMC += parseInt(mod["ModuleCredit"]);
};

var choice = [];
for (i=0; i<8; i++){
	choice[i] = new ModuleSemester();
}

function addModules(sem, module){
	//lert(module);
	$.get("/mod/"+ module, function(data){
		choice[sem-1].addMod(data);
		$('#content-sem'+sem).append('<tr><td>'+data["ModuleCode"]+'</td><td>'+data["ModuleTitle"]+'</td><td><a href="#" title="remove" id=""><span class="glyphicon glyphicon-remove-sign"></span></a></td></tr>');
		//$('#total-credit'+(sem.toString())).empty();
		$('#total-credit'+(sem.toString())).html(choice[sem-1].totalMC.toString());
	},"json");	
}