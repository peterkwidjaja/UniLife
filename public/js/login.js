function logoutModal(){
	emptyModal();
	$('#modalTitle').append("<center>Sign Out</center>");
	$('#modalBody').append('<center><a href="javascript:logout()" role="button" id="logout-button" class="btn btn-primary">Sign out<span class="glyphicon glyphicon-log-out" style="margin-left: 10px;"></span></a></center>');
	$('#mainModal').modal('show');
}
function logout(){
	$.post('/logout', function(){
		window.location.replace("/");
	});
}
function login(){
	emptyModal();
	$('#modalTitle').append("<center>Sign in</center>");
	$('#modalBody').append('<p><center><a href="/auth/nus" role="button" id="login-button" class="btn btn-primary">Sign in with NUSNET ID<span class="glyphicon glyphicon-log-in" style="margin-left: 10px;"></span></a></center></p>');
	$('#mainModal').modal('show');
}
function emptyModal(){
	$('#modalTitle').empty();
	$('#modalBody').empty();
}