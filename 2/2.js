alert('ЗАДАНИЕ №1'); 

let time = 24;
	time = prompt('Сколько часов?');

	if (time > 17) { 
		alert('Добрый вечер'); 
		
	}
	else { 
		alert('Добрый день');
	}



alert('ЗАДАНИЕ №2'); 

let name = prompt('Как вас зовут?');

name == "John" ? alert('Привет, John!') : alert('Я вас не знаю');



alert('ЗАДАНИЕ №3'); 

let login = prompt('Введите имя:');
let password;

switch (login) {

	case 'ivan':
		password = prompt('Введите пароль:');
		if (password == '333') { alert('Добро пожаловать!'); }
		else { alert('Неверный пароль'); }
	break;	

	case 'ssss':
		password = prompt('Введите пароль:');
		if (password == '666') { alert('Добро пожаловать!'); }
		else { alert('Неверный пароль'); }
	break;	

	case 'gibs':
		password = prompt('Введите пароль:');
		if (password == '0000') { alert('Добро пожаловать!'); }
		else { alert('Неверный пароль'); }
	break;	

	default:
		alert('Пользователь не найден');

}



alert('ЗАДАНИЕ №4'); 

let a = prompt('Введите 1 число:');
let b = prompt('Введите 2 число:');
let c = prompt('Введите 3 число:');

let max = a;

if (a == b && a == c) {
	alert(`Все числа равны ${max}`);
}
else {

	if (b > a) {
		max = b;
	}

	if (c > a) {
		max = c;
	}

	alert(`Максимальное число: ${max}`);

}

