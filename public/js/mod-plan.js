function ModuleSemester(){
	this.mods = [];
	this.totalMC = 0;
}
ModuleSemester.prototype.addMod = function(mod){
	this.mods[this.mods.length] = mod;
	this.totalMC += parseInt(mod["ModuleCredit"]);
};
ModuleSemester.prototype.delMod = function(mod){
	var index = 0;
	for(i=0;i<this.mods.length;i++){
		if(this.mods[i]["ModuleCode"]==mod){
			index = i;
			break;
		}
	}
	this.totalMC -= parseInt(this.mods[index]["ModuleCredit"]);
	this.mods.splice(index,1);
}
var choice = [];
for (i=0; i<8; i++){
	choice[i] = new ModuleSemester();
}
function addModules(sem, module){
	$.get("/mod/"+ module, function(data){
		choice[sem-1].addMod(data);
		$('#content-sem'+sem).append('<tr><td><a href="javascript:showDetails('+"'"+data["ModuleCode"]+"'"+')">'+data["ModuleCode"]+'</a></td><td>'+data["ModuleTitle"]+'</td><td><center><a href="#" title="remove" class="remove-button"><span class="glyphicon glyphicon-remove-sign" style="color: #000000;"></span></a></center></td></tr>');
		//$('#total-credit'+(sem.toString())).empty();
		$('#total-credit'+(sem.toString())).html(choice[sem-1].totalMC.toString());
	},"json");	
}
function deleteModule(sem, module){
	choice[sem-1].delMod(module);
	$('#total-credit'+(sem.toString())).html(choice[sem-1].totalMC.toString());
}
function save(){
	var sem = [];
	for(i=0;i<choice.length;i++){
		for(j=0;j<choice[i].mods.length;j++){
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
		for(i=0;i<data["History"].length;i++){
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