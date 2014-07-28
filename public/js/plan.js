
$(document).ready(function() {
	var engine = new Bloodhound({
		datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
		queryTokenizer: Bloodhound.tokenizers.whitespace,
		limit: 5,   
		prefetch: {
			url: '/moduleList.json',
			filter: function(list) {
				//var array = $.makeArray(list);
				//alert(Object.keys(list));
				return $.map(list, function(val, keys) { 
					var concat = keys+" : "+val;
					return { value: concat }; });
			}
		}
	});
	engine.initialize(true);
	engine.clearPrefetchCache();
	$('.module-input').typeahead({
	 minLength: 1,
	 highlight: true
 },
 {
	 name: 'modules',
	 displayKey: 'value',
	 source: engine.ttAdapter()
 });

	$('.module-input').keydown(function(event){
		if(event.keyCode==13){
			event.preventDefault();
			var module = $(this).val();
			var sem = this.id;
			sem = sem.substring(sem.length - 1);
			//enter validation of input
			module = module.substring(0,module.indexOf(' '));
			//alert(module);
			addModules(parseInt(sem), module);
			$(this).val('');
		}
	});
	$('.module-input').blur(function(){
		$(this).val('');
	});

	$('.sem-table').on('click', '.remove-button', function(){
		var test = $(this).closest('tr');
		var moduleCode = $(test).find('td:eq(0)').html();
		var sem = $(this).closest('tbody').attr('id');
		sem = sem.substring(sem.length-1);
		deleteModule(parseInt(sem), moduleCode);
		$(this).closest('tr').remove();
	});
});
