function ModuleSemester() {
    this.mods = [];
    this.totalMC = 0;
    this.checkMod = function(mod) {
        //Cut the postfix letter coding of the modules when checking for existence
        while (mod.charCodeAt(mod.length - 1) >= 65) {
            mod = mod.substring(0, mod.length - 1);
        }
        for (var i = 0; i < this.mods.length; i++) {
            var code = this.mods[i]["ModuleCode"];

            //Cut the postfix letter coding of the modules when checking for existence
            while (code.charCodeAt(code.length - 1) >= 65) {
                code = code.substring(0, code.length - 1);
            }
            
            if (code == mod) {
                return true;
            }
        }
        return false;
    }
}
ModuleSemester.prototype.addMod = function(mod) {
    this.mods[this.mods.length] = mod;
    this.totalMC += parseInt(mod["ModuleCredit"]);
};
ModuleSemester.prototype.delMod = function(mod) {
    var index = 0;
    for (var i = 0; i < this.mods.length; i++) {
        if (this.mods[i]["ModuleCode"] == mod) {
            index = i
;            break;
        }
    }
    this.totalMC -= parseInt(this.mods[index]["ModuleCredit"]);
    this.mods.splice(index, 1);
};

//Initialize 8 Semesters of ModuleSemester array
var choice = [];
for (var i = 0; i < 8; i++) {
    choice[i] = new ModuleSemester();
}

function checkSem(sem, data) {
    for (var i = 0; i < data["History"].length; i++) {
        if (((sem + 1) % 2) + 1 == data["History"][i]["Semester"]) {
            return true;
        }
    }
    return false;
}

function checkModules(module) {
    for (var i = 0; i < 8; i++) {
        if (choice[i].checkMod(module)) {
            return true;
        }
    }
    return false;
}

function checkPrereq(sem, prereq, type) {
    if (prereq[" and "]) {
        return checkPrereq(sem, prereq[" and "], "and");
    } else if (prereq[" or "]) {
        return checkPrereq(sem, prereq[" or "], "or");
    } else if (prereq instanceof Array) {
        if (type == "and") {
            for (var i = 0; i < prereq.length; i++) {
                if (!checkPrereq(sem, prereq[i], "and")) {
                    return false;
                }
            }
            return true;
        } else if (type == "or") {
            for (var i = 0; i < prereq.length; i++) {
                if (checkPrereq(sem, prereq[i], "or")) {
                    return true;
                }
            }
            return false;
        }
    } else {
        for (var i = sem - 1; i >= 0; i--) {
            if (choice[i].checkMod(prereq)) {
                return true;
            }
        }
        return false;
    }
}

function checkPreclusion(preclusion) {
    for (var i = 0; i < preclusion.length; i++) {
        for (var j = 0; j < 8; j++) {
            if (choice[j].checkMod(preclusion[i])) {
                return false;
            }
        }
    }
    return true;
}

//Function to add modules into the plan
function addModules(sem, module) {
    if (checkModules(module)) {
        alert(module + " is already in your plan!");
    } else {
        $.get("/mod/" + module, function(data) {
            if (checkSem(sem, data)) {
                var prereq = true;
                var preclus = true;
                if (data["ParsedPrerequisite"]) {
                    prereq = checkPrereq(sem - 1, data["ParsedPrerequisite"], "and");
                }
                if (data["ParsedPreclusion"]) {
                    preclus = checkPreclusion(data["ParsedPreclusion"]);
                }
                if (!preclus) {
                    addWarning();
                    $('#warning').append('<strong>Please check whether you have satisfied the preclusion for <a class="alert-link" href="javascript:showDetails(' + "'" + data["ModuleCode"] + "'" + ')">' + data["ModuleCode"] + '</a>!</strong>');
                } else if (!prereq) {
                    addWarning();
                    $('#warning').append('<strong>Please check whether you have satisfied the prerequisite for <a class="alert-link" href="javascript:showDetails(' + "'" + data["ModuleCode"] + "'" + ')">' + data["ModuleCode"] + '</a>!</strong>');
                } else {
                    choice[sem - 1].addMod(data);
                    $('#content-sem' + sem).append('<tr><td><a href="javascript:showDetails(' + "'" + data["ModuleCode"] + "'" + ')" class="module-code'+(sem%2)+'">' + data["ModuleCode"] + '</a></td><td>' + data["ModuleTitle"] + '</td><td class="action-button"><center><a href="#" title="info" class="info-button hidden-xs module-button'+sem%2+'"><span class="glyphicon glyphicon-info-sign"></span></a><a href="#" title="remove" class="remove-button module-button'+sem%2+'"><span class="glyphicon glyphicon-remove-sign"></span></a></center></td></tr>');
                    $('#total-credit' + (sem.toString())).html(choice[sem - 1].totalMC.toString());
                }
            } else {
                alert(module + " is not available on this semester!");
            }
        }, "json");
    }
}

function addWarning() {
    if ($('.alert').length) {
        $('.alert').alert('close');
    }
    $('#alert-container').append('<div class="alert alert-danger alert-dismissible" role="alert" ><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button><span id="warning"></span></div>');
}

function deleteModule(sem, module) {
    choice[sem - 1].delMod(module);
    $('#total-credit' + (sem.toString())).html(choice[sem - 1].totalMC.toString());
}

function save() {
    var sem = [];
    for (var i = 0; i < choice.length; i++) {
        for (var j = 0; j < choice[i].mods.length; j++) {
            if (j == 0) sem[i] = "";
            if (j == choice[i].mods.length - 1) {
                sem[i] = sem[i] + choice[i].mods[j]["ModuleCode"];
            } else {
                sem[i] = sem[i] + choice[i].mods[j]["ModuleCode"] + " ";
            }
        }
    }
    var data = sem.join(",");
    $.post('/plan', {
        mods: data
    });
}

function showDetails(moduleCode) {
    $.get("/mod/" + moduleCode, function(data) {
        emptyDetails();
        $('#moduleTitle').append(moduleCode + " - " + data["ModuleTitle"]);
        $('#moduleDescription').append("<p>" + data["ModuleDescription"] + "</p>");
        $('#moduleCredit').append("<p><b>Module Credit:</b>  " + data["ModuleCredit"] + "</p>");
        $('#moduleWorkload').append("<p><b>Workload:</b>  " + data["Workload"] + "</p>");
        if (data["Prerequisite"])
            $('#modulePrereq').append("<p><b>Prerequisite:</b> " + data["Prerequisite"] + "</p>");
        else
            $('#modulePrereq').append("<p><b>Prerequisite:</b>  Nil</p>");
        if (data["Preclusion"])
            $('#modulePreclus').append("<p><b>Preclusion:</b>  " + data["Preclusion"] + "</p>");
        else
            $('#modulePreclus').append("<p><b>Preclusion:</b>  Nil</p>");
        var html = "<p><b>Semester:</b>  ";
        for (var i = 0; i < data["History"].length; i++) {
            var temp = data["History"][i]["Semester"];
            var sem = temp.toString();
            if (temp == 3) sem = "Special Term 1";
            else if (temp == 4) sem = "Special Term 2";
            html += sem.toString();
            if (i != data["History"].length - 1) html += ", ";
        }
        html += "</p>";
        $('#moduleSemester').append(html);
        $('#moduleDetails').modal('show');
    }, "json");
}

function emptyDetails() {
    $('#moduleTitle').empty();
    $('#moduleDescription').empty();
    $('#moduleCredit').empty();
    $('#moduleWorkload').empty();
    $('#modulePrereq').empty();
    $('#modulePreclus').empty();
    $('#moduleSemester').empty();
}
