function ModuleSemester(){
	this.mods = [];
	this.totalMC = 0;
	this.checkMod = function(mod){
		for(var i=0;i<this.mods.length;i++){
			if(this.mods[i]["ModuleCode"]==mod){
				return true;
			}
		}
		return false;
	}
}
ModuleSemester.prototype.addMod = function(mod){
	this.mods[this.mods.length] = mod;
	this.totalMC += parseInt(mod["ModuleCredit"]);
};
ModuleSemester.prototype.delMod = function(mod){
	var index = 0;
	for(var i=0;i<this.mods.length;i++){
		if(this.mods[i]["ModuleCode"]==mod){
			index = i;
			break;
		}
	}
	this.totalMC -= parseInt(this.mods[index]["ModuleCredit"]);
	this.mods.splice(index,1);
};
var choice = [];
for (var i=0; i<8; i++){
	choice[i] = new ModuleSemester();
}
function checkSem(sem, data){
	for(var i=0; i<data["History"].length;i++){
		if((sem%2)+1==data["History"][i]["Semester"]){
			return true;
		}
	}
	return false;
}
function checkModules(module){
	for(var i=0;i<8;i++){
		if(choice[i].checkMod(module)){
			return true;
		}
	}
	return false;
}
function addModules(sem, module){
	if(checkModules(module)){
		alert(module+" is already in your plan!");
	}
	else{
		$.get("/mod/"+ module, function(data){
			if(checkSem(sem, data)){
				choice[sem-1].addMod(data);
				$('#content-sem'+sem).append('<tr><td><a href="javascript:showDetails('+"'"+data["ModuleCode"]+"'"+')">'+data["ModuleCode"]+'</a></td><td>'+data["ModuleTitle"]+'</td><td class="action-button"><center><a href="#" title="info" class="info-button hidden-xs"><span class="glyphicon glyphicon-info-sign" style="color: #000000;"></span></a><a href="#" title="remove" class="remove-button"><span class="glyphicon glyphicon-remove-sign" style="color: #000000;"></span></a></center></td></tr>');
				$('#total-credit'+(sem.toString())).html(choice[sem-1].totalMC.toString());
			}
			else{
				alert(module+" is not available on this semester!");
			}
		},"json");
	}
}
function deleteModule(sem, module){
	choice[sem-1].delMod(module);
	$('#total-credit'+(sem.toString())).html(choice[sem-1].totalMC.toString());
}
function save(){
	var sem = [];
	for(var i=0;i<choice.length;i++){
		for(var j=0;j<choice[i].mods.length;j++){
			if(j==0) sem[i] = "";
			if(j==choice[i].mods.length-1){
				sem[i] = sem[i] + choice[i].mods[j]["ModuleCode"];
			}
			else{
				sem[i] = sem[i] + choice[i].mods[j]["ModuleCode"]+" ";
			}
		}
	}
	var data = sem.join(",");
	$.post('/plan',{mods: data});
}
function showDetails(moduleCode) {
	$.get("/mod/"+ moduleCode, function(data){
		emptyDetails();
		$('#moduleTitle').append(moduleCode+" - "+data["ModuleTitle"]);
		$('#moduleDescription').append("<p>"+data["ModuleDescription"]+"</p>");
		$('#moduleCredit').append("<p>Module Credit:  "+data["ModuleCredit"]+"</p>");
		$('#moduleWorkload').append("<p>Workload:  "+data["Workload"]+"</p>");
		if(data["Prerequisite"])
			$('#modulePrereq').append("<p>Prerequisite:  "+data["Prerequisite"]+"</p>");
		else
			$('#modulePrereq').append("<p>Prerequisite:  Nil</p>");
		if(data["Preclusion"])
			$('#modulePreclus').append("<p>Preclusion:  "+data["Preclusion"]+"</p>");
		else
			$('#modulePreclus').append("<p>Preclusion:  Nil</p>");
		var html="<p>Semester:  ";
		for(var i=0;i<data["History"].length;i++){
			var temp = data["History"][i]["Semester"];
			var sem = temp.toString();
			if(temp==3) sem="Special Term 1";
			else if(temp==4) sem="Special Term 2";
			html += sem.toString();
			if(i!=data["History"].length-1) html += ", ";
		}
		html+="</p>";
		$('#moduleSemester').append(html);
		$('#moduleDetails').modal('show');
	},"json");
}
function emptyDetails(){
	$('#moduleTitle').empty();
	$('#moduleDescription').empty();
	$('#moduleCredit').empty();
	$('#moduleWorkload').empty();
	$('#modulePrereq').empty();
	$('#modulePreclus').empty();
	$('#moduleSemester').empty();
}