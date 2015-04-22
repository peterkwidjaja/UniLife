$(document).ready(function() {
    $.get('/plan/mods', function(data) {
        var sem = data.split(",");
        for (i = 0; i < sem.length; i++) {
            var mods = sem[i].split(" ");
            for (j = 0; j < mods.length; j++) {
                addModules(i + 1, mods[j]);
            }
        }
    });
    var engine = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        limit: 5,
        prefetch: {
            url: '/moduleList.json',
            filter: function(list) {
                //var array = $.makeArray(list);
                //alert(Object.keys(list));
                return $.map(list, function(arr, index) {
                    var concat = arr["ModuleCode"] + " : " + arr["ModuleTitle"];
                    return {
                        value: concat
                    };
                });
            }
        }
    });
    engine.initialize(true);
    engine.clearPrefetchCache();
    $('.module-input').typeahead({
        minLength: 1,
        highlight: true
    }, {
        name: 'modules',
        displayKey: 'value',
        source: engine.ttAdapter()
    });

    $('.module-input').keydown(function(event) {
        if (event.keyCode == 13) {
            event.preventDefault();
            var module = $(this).val();
            var sem = this.id;
            sem = sem.substring(sem.length - 1);
            //enter validation of input
            module = module.substring(0, module.indexOf(' '));
            //alert(module);
            addModules(parseInt(sem), module);
            $(this).val('');
        }
    });
    $('.module-input').blur(function() {
        $(this).val('');
    });
    $('.form-group').on('click', '.add-button', function() {
        event.preventDefault();
        var input = $(this).closest('.form-group');
        var input2 = $(input).find('.module-input.tt-input');
        alert($(input2).attr('id'));
        var e = jQuery.Event('keydown');
        e.keyCode = 13;
        $(input2).trigger(e);
    });
    $('.sem-table').on('click', '.remove-button', function() {
        var test = $(this).closest('tr');
        var moduleCode = $(test).find('td:eq(0)').find('a').html();
        var sem = $(this).closest('tbody').attr('id');
        sem = sem.substring(sem.length - 1);
        deleteModule(parseInt(sem), moduleCode);
        $(this).closest('tr').remove();
    });
    $('.sem-table').on('click', '.info-button', function() {
        var test = $(this).closest('tr');
        var moduleCode = $(test).find('td:eq(0)').find('a').html();
        showDetails(moduleCode);
    });
    $('#save-plan-btn').popover({
        trigger: 'focus',
        container: 'body',
        content: 'Your plan is saved!',
        placement: 'right',
    });
    $('#save-plan-btn').click(function() {
        save();
    });
});
