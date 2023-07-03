const saveAnnBtn=document.querySelector('#saveAnnBtn');
const saveAnnBtnEng=document.querySelector('#saveAnnBtnEng');
const saveUserBtn=document.querySelector('#saveUserBtn');
const saveUserBtnEng=document.querySelector('#saveUserBtnEng');
const logUserBtn=document.querySelector('#logUserBtn');
const logUserBtnEng=document.querySelector('#logUserBtnEng');
const deleteAnnBtn=document.querySelector('#deleteAnnBtn');
const deleteAnnBtnEng=document.querySelector('#deleteAnnBtnEng');
const allAnn=document.getElementById('announ');
const userD=document.getElementById('userDa');
var tel = window.matchMedia("(max-width: 639px)")
IsLog();
ChangeMainContent('ogloszenie');

function openNav() {
	document.getElementById("mySidenav").style.width = "100%";
}
function closeNav() {
	document.getElementById("mySidenav").style.width = "0";
}
function CookiesAccept(){
	document.getElementById("cookies").style.display='none';
}
function closeLog() {
	document.getElementById("panelLog").style.display = 'none';
}
function openLog(){
	closeNav();
	document.getElementById("panelLog").style.display = 'block';
	closeReg();
}
function registration(){
	closeLog();
	document.getElementById("panelReg").style.display='block';
}
function closeReg() {
	document.getElementById("panelReg").style.display = 'none';
}
function closeAnn(){
	document.getElementById("addAnn").style.display = 'none';
}
function addAnn(){
	document.getElementById("addAnn").style.display = 'block';
	var uName=getCookie('name');
}
function closeDeleteAnn(){
	document.getElementById("deleteAnn").style.display = 'none';
}
function showDelAnnPanel()
{
	document.getElementById('deleteAnn').style.display='block';
	getAllAnnouncementsForUser();
}
function showUpdateAnnPanel()
{
	document.getElementById('updateAnn').style.display='block';
}
function clearRegForm()
{
	document.getElementById('nameReg').value='';
	document.getElementById('lastNameReg').value='';
	document.getElementById('emailReg').value='';
	document.getElementById('pswReg').value='';	
}
function clearLogForm()
{
	document.getElementById('emailLog').value='';
	document.getElementById('pswLog').value='';	
}
function clearNewAnnForm()
{
	document.getElementById('titleAnn').value='';
	document.getElementById('contentAnn').value='';	
}
function ChangeLanguage()
{
	var language=document.getElementById("language").value;
	if(language=='pl')
	{
		var elements=document.getElementsByClassName('pl');
		for (var i=0; i<elements.length; i++){
			elements[i].style.display='block';
		};
		var elements=document.getElementsByClassName('eng');
		for (var i=0; i<elements.length; i++){
			elements[i].style.display='none';
		};
	}
	else
	{
		var elements=document.getElementsByClassName('eng');
		for (var i=0; i<elements.length; i++){
			elements[i].style.display='block';
		};
		var elements=document.getElementsByClassName('pl');
		for (var i=0; i<elements.length; i++){
			elements[i].style.display='none';
		};
	}
}
//----------------------------ANOUNCEMENTS FROM DATABASE-----------------------------------------------------------------
function displayAnnouncements(announcements)
{
	let allAnnouncements='';
	announcements.forEach(ann => {
		const announcementElement=
								`
								<hr><h3>${ann.title}</h3>
								<p>${ann.content}<br><b>Tel: ${ann.phoneNumber}<br>${ann.name}</b></p>
								`
	    allAnnouncements+=announcementElement;
	});
	allAnn.innerHTML=allAnnouncements;
}
function getAllAnnouncements()
{
	fetch('https://sggw-pwi-shelter-app.azurewebsites.net/api/ann')
	.then(data=>data.json())
	.then(response=>displayAnnouncements(response));
}
//----------------------------USERS DATA AND ANNOUNCEMENTS ON ACCOUNT----------------------------------------------------
function displayUserData(udd)
{
	const allData=`<p>${udd.name} ${udd.lastName}<br>email: ${udd.email}<br>tel:${udd.phoneNumber}</p><button class="button2" onclick="LogOut()"><div class="pl">Wyloguj</div><div class="eng">Log out</div></button>`;
	userD.innerHTML=allData;
	document.cookie="name="+udd.name;
	document.cookie="lastName="+udd.lastName;
	document.cookie="email="+udd.email;
	document.cookie="tel="+udd.phoneNumber;
	document.cookie="Id="+String(udd.id);
}
function displayAnnouncementsForUser(announcements)
{
	let allAnnouncements='<div class="pl"><h2>Moje ogłoszenia</h2><button class="button3"onclick="addAnn()">Dodaj</button><button class="button3" onclick="showDelAnnPanel()">Usuń</button></div><div class="eng"><h2>My announcements</h2><button class="button3"onclick="addAnn()">Add</button><button class="button3" onclick="showDelAnnPanel()">Delete</button></div>';
	let allNumbers='<select id="idDelAnn">';
	announcements.forEach(ann => {
		const announcementElement=`
								<div class="pl"><hr><p><b>[Nr ogłoszenia:${ann.id}]</b></p><h3>${ann.title}</h3><p>${ann.content}<br><b>Tel: ${ann.phoneNumber}<br>${ann.name}</b></p></div>
								<div class="eng"><hr><p><b>[Announcement Id:${ann.id}]</b></p><h3>${ann.title}</h3><p>${ann.content}<br><b>Phone: ${ann.phoneNumber}<br>${ann.name}</b></p></div>
								`
	    allAnnouncements+=announcementElement;
		const allAnnNumbers=
							`
							<option value="${ann.id}">${ann.id}</option>
						`
						allNumbers+=allAnnNumbers;
	});
	allAnn.innerHTML=allAnnouncements;
	document.getElementById('delId').innerHTML=allNumbers+'</select><br><br>';
	allAnn.style.display='block';
	ChangeLanguage();
}
function getAllAnnouncementsForUser()
{
	fetch('https://sggw-pwi-shelter-app.azurewebsites.net/api/ann/user/'+getCookie('Id'))
	.then(data=>data.json())
	.then(response=>displayAnnouncementsForUser(response));
}
//-----------------------------------------MAIN CONTENT-------------------------------------------------------------
function ChangeMainContent(page){
	var content;
	switch(page){
		case 'konto':
			content='<h1><div class="pl">Konto użytkownika</div><div class="eng">User account</div></h1>'
			break;
		case 'ogloszenie':
			content='<div class="pl"><h1>Ogłoszenia</h1><p>Zapraszamy do sekcji "Nasze zwierzaki", aby zobaczyć jakie stworzenia poszukują kochającego domu.</p></div><div class="eng"><h1>Announcements</h1><p>We invite you to the "Our pets" section to see what creatures are looking for a loving home.</p></div>'
			break;
		case 'adopcja':
			content='<div class="pl"><h1>Szczegóły adopcji</h1><p>Zwierzęta widoczne w sekcji "Nasze zwierzaki" nadal szukają domu. Jeśli jesteś w stanie im pomóc, przeczytaj nasz regulamin i skontaktuj się z nami.<br><b>Kontakt:</b><br>e-mail:<b>schronisko@gmail.com</b><br>nr tel:<b>213980765</b></p></div><div class="eng"><h1>Adoption details</h1><p>The animals shown in the "Our pets" section are still looking for a home. If you are able to help them, read our terms and conditions and contact us.<br><b>Contact:</b><br>email:<b>schronisko@gmail.com</b><br> phone number:<b>213980765</b></p></div>'
			break;
		case 'karmienie':
			content='<div class="pl"><h1>Karmienie zwierzaków</h1><p>Jeśli nie możesz dać tym zwierzakom domu, a chiałbyś im pomóc masz taką możliwość. Można dokonać anonimowej darowizny, za którą zostanie zakupiona karma dla zwierzaków. Za wszelkie darowizny serdecznie dziękujemy!!!<br><b>Dane do wpłat:</b><br>nr konta: <b>23 5645 6543 4321 879 765 544</b><br>tytuł przelewu: Karmienie zwierzakow schronisko</p></div><div class="eng"><h1>Feeding pets</h1><p>If you cant give these pets a home and would like to help them, you can. You can make an anonymous donation to buy pet food. We would like to thank you for all donations!!!<br><b>Data for payments:</b><br>account number: <b>23 5645 6543 4321 879 765 544</b><br>transfer title: Feeding pets shelter</p></div>'
			break;
		case 'tymczasowe':
			content='<div class="pl"><h1>Tymczasowe domy</h1><p>Jeśli lubisz zwierzęta i chociaż przez tydzień możesz zaopiekować się jakimś to zapraszamy do kontaktu. Zwierząt jakie do nas trafiają przybywa z każdym dniem, a miejsc w schronisku jest niewiele. <b>Pamiętaj, każda pomoc się liczy. Razem możemy uratować te zwierzęta.</b> <br>Jeśli jesteś zainteresowany zapraszamy do kontaktu:<br>e-mail:<b>schronisko@gmail.com</b><br>nr tel:<b>213980765</b></p></div><div class="eng"><h1>Temporary homes</h1><p>If you like animals and can take care of one for at least a week, please contact us. There are more animals that come to us every day, and there are few places in the shelter. <b>Remember, every help counts. Together we can save these animals.</b> <br>If you are interested, please contact us:<br>e-mail:<b>schronisko@gmail.com</b><br>tel:<b>213980765</b></p></div>'
			break;
		default:
			content='<div class="pl"><li><h2>Nasze Zwierzaczki</h2><p>Te stworzenia potrzebują twojego wsparcia. Pomóż, jeśli możesz!</p></li><li><div class="SH2"><img class="animal" src="piesel.jpg" alt="Alex, 12 miesięcy"><p>Alex, 12 miesięcy.</p></div></li><li><div class="SH2"><img class="animal" src="kotek.jpg" alt="Kiara, 5 miesiące"><p>Kiara, 5 miesięcy.</p></div></li><li><div class="SH2"><img class="animal" src="kot.jpg" alt="Sunia, 4 miesiące"><p>Sunia, 4 miesiące.</p></div></li><li><div class="SH2"><img class="animal" src="piesek.jpg" alt="Max, 18 miesięcy"><p>Max, 18 miesięcy.</p></div></li></div><div class="eng"><li><h2>Our Pets</h2><p>These creatures need your support. Help if you can!</p></li><li><div class="SH2"><img class="animal" src="piesel.jpg" alt="Alex, 12 months old"><p> Alex, 12 months old.</p></div></li><li><div class="SH2"><img class="animal" src="kotek.jpg" alt="Kiara, 5 months old"> <p>Kiara, 5 months old.</p></div></li><li><div class="SH2"><img class="animal" src="kot.jpg" alt="Puppy , 4 months old"><p>Sunia, 4 months old.</p></div></li><li><div class="SH2"><img class="animal" src="piesek.jpg" alt="Max, 18 months"><p>Max, 18 months.</p></div></li></div>'
			break;
	}
	document.getElementById('content').innerHTML=content;
	closeNav();
	if(page=='ogloszenie')
	{	
		if(userD.innerHTML!="")
		{
			document.querySelector('.addNewAnn').style.display='block';
		}
		else document.querySelector('.addNewAnn').style.display='none';
		document.getElementById('content').style.minHeight=100+"px";
		closeAnn();
		clearNewAnnForm();
		document.getElementById('announ').style.display='block';
		userD.style.display='none';
		getAllAnnouncements();
	}
	else if(page=='konto')
	{
		userD.style.display='block';
		document.querySelector('.addNewAnn').style.display='none';
		document.getElementById('announ').style.display='none';
		getAllAnnouncementsForUser();
		document.getElementById('content').style.minHeight=50+"px";
	}
	else
	{
		userD.style.display='none';
		document.getElementById('announ').style.display='none';
		document.getElementById('content').style.minHeight=500+"px";
		document.querySelector('.addNewAnn').style.display='none';
	}
	ChangeLanguage();
}
//---------------------------USERS----------------------------------------------------------------------------------
function saveUser(name,lastName,email,password,phone)
{
	const body={
		name:name,
		lastName:lastName,
		email:email,
		password:password,
		phoneNumber:phone
	};
	fetch('https://sggw-pwi-shelter-app.azurewebsites.net/api/user',
	{
		method:'POST',
		body:JSON.stringify(body),
		headers:{"content-type":"application/json"}
	})
	.then(data=>data.json())
	.then(response=>ChangeWhenIsLog('ok',response),response=>ChangeWhenIsLog('notOk',response))
}
function LogOut()
{
	deleteCookie('name');
	deleteCookie('lastName');
	deleteCookie('Id');
	deleteCookie('email');
	userD.innerHTML='';
	ChangeMainContent('ogloszenie');
	document.querySelector('.konto').style.display='none';
	document.querySelector('.kontoB').style.display='none';
	if(tel.matches)
	{
		document.querySelector('.logujB').style.display='inline-block';
		document.querySelector('.loguj').style.display='none';
	}
	else{
		document.querySelector('.loguj').style.display='inline-block';
		document.querySelector('.logujB').style.display='none';
	}
}
function ChangeWhenIsLog(isLogg,response)
{
	if(isLogg=='ok')
	{
		displayUserData(response);
		ChangeMainContent('konto');
		closeLog();
		closeReg();
		clearLogForm();
		clearRegForm();
		IsLog();
	}
	else 
	{
		if(isLogg=="noOkLog")
		{
			alert("Błędne logowanie");
		}
		else
		{
			alert("Błędna rejestracja");
		}
	}
}
function IsLog()
{
	var uNameCookie=getCookie('name');
	if(userD.innerHTML!="" || uNameCookie!="")
	{
		clearLogForm();
		document.querySelector('.loguj').style.display='none';
		document.querySelector('.logujB').style.display='none';
		if(tel.matches)
		{
			document.querySelector('.kontoB').style.display='inline-block';
			document.querySelector('.konto').style.display='none';
		}
		else{
			document.querySelector('.konto').style.display='inline-block';
			document.querySelector('.kontoB').style.display='none';
		}
	}
	else{
		if(tel.matches)
		{
			document.querySelector('.logujB').style.display='inline-block';
			document.querySelector('.loguj').style.display='none';
		}
		else{
			document.querySelector('.loguj').style.display='inline-block';
			document.querySelector('.logujB').style.display='none';
		}
	}
	if(userD.innerHTML=="" && uNameCookie!="")
	{
		var uLastNameCookie=getCookie('lastName');
		var uEmailCookie=getCookie('email');
		var uPhone=getCookie('tel');
		const allData=`<p>${uNameCookie} ${uLastNameCookie}<br>email: ${uEmailCookie}<br>tel:${uPhone}</p><button class="button2" onclick="LogOut()"><div class="pl">Wyloguj</div><div class="eng">Log out</div></button>`;
		userD.innerHTML=allData;
	}
}
function logUser(email,password)
{
	const body={
		email:email,
		password:password
	}
	fetch('https://sggw-pwi-shelter-app.azurewebsites.net/api/user/log',
	{
		method:'POST',
		body:JSON.stringify(body),
		headers:{"content-type":"application/json"}
	})
	.then(data=>data.json())
	.then(response=>ChangeWhenIsLog('ok',response),response=>ChangeWhenIsLog('noOkLog',response))
}
// -------------------------ANNOUNCEMENTS--------------------------------------------------------------------
function saveAnn(content,phoneNumber,name,title,userId)
{
	const body={
		content:content,
		phoneNumber:phoneNumber,
		name:name,
		title:title,
		userId:userId
	};
	fetch('https://sggw-pwi-shelter-app.azurewebsites.net/api/ann',
	{
		method:'POST',
		body:JSON.stringify(body),
		headers:{"content-type":"application/json"}
	})
	.then(data=>data.json())
	.then(response=>ChangeMainContent('ogloszenie'))
}
function ChangeWhenIsUpdate(isUpd,response)
{
	if(isUpd=='ok')
	{
		ChangeMainContent('konto');
		closeAnn();
	}
	else{
		alert("Podane ogłoszenie nie zostało utworzone z tego konta.");
	}
}
function deleteAnnouncement(id)
{
	const body={
		id:id
	}
	fetch('https://sggw-pwi-shelter-app.azurewebsites.net/api/ann/'+id,
	{
		method:'DELETE',
		headers:{"content-type":"application/json"}
	})
	.then(data=>data.json())
	.then(response=>ChangeWhenIsUpdate('ok',response),response=>ChangeWhenIsUpdate('notOk',response))
}

//-------------------------------cookies----------------------------------------------------------------
function setCookie(cname, cvalue, exdays) {
	const d = new Date();
	d.setTime(d.getTime() + (exdays*24*60*60*1000));
	let expires = "expires="+ d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function getCookie(cname) {
	let name = cname + "=";
	let decodedCookie = decodeURIComponent(document.cookie);
	let ca = decodedCookie.split(';');
	for(let i = 0; i <ca.length; i++) {
	  let c = ca[i];
	  while (c.charAt(0) == ' ') {
		c = c.substring(1);
	  }
	  if (c.indexOf(name) == 0) {
		return c.substring(name.length, c.length);
	  }
	}
	return "";
}
function deleteCookie(name) {
    const cookieName = encodeURIComponent(name);
    document.cookie = cookieName + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
}

//--------------------------BUTTONS LISTENERS-----------------------------------------------------------
saveUserBtn.addEventListener('click',function()
{
	const name1=document.getElementById('nameReg');
	const lastName1=document.getElementById('lastNameReg');
	const email1=document.getElementById('emailReg');
	const password1=document.getElementById('pswReg');
	const phone1=document.getElementById('phoneReg');
	saveUser(name1.value,lastName1.value,email1.value,password1.value,phone1.value);
});
saveUserBtnEng.addEventListener('click',function()
{
	const name1=document.getElementById('nameReg');
	const lastName1=document.getElementById('lastNameReg');
	const email1=document.getElementById('emailReg');
	const password1=document.getElementById('pswReg');
	const phone1=document.getElementById('phoneReg');
	saveUser(name1.value,lastName1.value,email1.value,password1.value,phone1.value);
});
saveUserBtnEng.addEventListener('click',function()
{
	const name1=document.getElementById('nameReg');
	const lastName1=document.getElementById('lastNameReg');
	const email1=document.getElementById('emailReg');
	const password1=document.getElementById('pswReg');
	const phone1=document.getElementById('phoneReg');
	saveUser(name1.value,lastName1.value,email1.value,password1.value,phone1.value);
});
logUserBtn.addEventListener('click',function()
{
	const email1=document.getElementById('emailLog');
	const password1=document.getElementById('pswLog');
	logUser(email1.value,password1.value);
});
logUserBtnEng.addEventListener('click',function()
{
	const email1=document.getElementById('emailLog');
	const password1=document.getElementById('pswLog');
	logUser(email1.value,password1.value);
});
saveAnnBtn.addEventListener('click',function()
{
	const contentInp=document.getElementById('contentAnn');
	const phonenumberInp=getCookie('tel');
	const titleInp=document.getElementById('titleAnn');
	const nameInp=getCookie('name');
	const userId=getCookie('Id');
	saveAnn(contentInp.value,phonenumberInp,nameInp,titleInp.value,userId);
});
deleteAnnBtn.addEventListener('click',function()
{
	const select=document.getElementById('idDelAnn');
	deleteAnnouncement(select.value);
});
deleteAnnBtnEng.addEventListener('click',function()
{
	const select=document.getElementById('idDelAnn');
	deleteAnnouncement(select.value);
});
tel.addListener(IsLog);