window.onload = () => {
	let btn = document.querySelector('.btn2');
	let btn2 = document.querySelector('.btn3');
	let test777 = document.querySelector('.test777');
	let tableUl = document.querySelector('.table-ul');
	let btnBase = document.querySelector('.base');
	let btnInfo = document.querySelector('.info');
	let tableInfo = document.querySelector('.tableInfo');
	let tabledb = document.querySelector('.tabledb');
	let btnSearch = document.querySelector('.btn-search');
	let searchInput = document.querySelector('.search');



	function dbTable(data) {
		if (test777.childNodes.length != 0) {
			tableUl.parentNode.removeChild(tableUl);

		}
		tableUl = document.createElement('div');
		tableUl.className = 'table-ul col';
		test777.appendChild(tableUl);



		let arrTest=[];
		for (let key in data['ops']) {
			
		let dataNameCell = data['ops'][key]['name'].split(' ');
			for( let i = 1; i <= 3 ; i++ ){
				if(dataNameCell.length !=3) {dataNameCell.push('-')};
			}
			dataNameCell.push(data['ops'][key]['startWork']);
			dataNameCell.push(data['ops'][key]['endWork']);
			dataNameCell.push(data['ops'][key]['bedОrders']);
			dataNameCell.push(data['ops'][key]['goodОrders']);
			dataNameCell.push(data['ops'][key]['dateАdded']);
		
		arrTest.push(dataNameCell);
			dataNameCell=[];
		}
		
		
		let indexNaemeArr = ["cell surname-col","cell name-col","cell patronymic-col","cell start-work","cell end-work","cell bad-work","cell good-work","cell date-added"]
		//let tableUl = document.querySelector('.table-wrap');
			
		
	
		for(let i in arrTest){
		let tableRow = document.createElement('div');
			tableRow.className = 'table-row row';
			for(let indexName = 0; indexName < indexNaemeArr.length; indexName++){
				let cell = document.createElement('div');
					cell.className = indexNaemeArr[indexName];
					cell.innerHTML = arrTest[i][indexName]
					tableRow.appendChild(cell)
			}
		tableUl.appendChild(tableRow);
		}
	
	}
	function dateM(date){
		let dateNew = date.split('.');
		return dateNew[1]+'.'+dateNew[0]+'.'+dateNew[2];
	}
	
	function dbTable2(data) {
		if (test777.childNodes.length != 0) {
			tableUl.parentNode.removeChild(tableUl);

		}
		tableUl = document.createElement('div');
		tableUl.className = "table-ul col";
		test777.appendChild(tableUl);



		let arrTest=[];
		for (let key in data['ops']) {
			
		let dataNameCell = data['ops'][key]['name'].split(' ');
			for( let i = 1; i <= 3 ; i++ ){
				if(dataNameCell.length !=3) {dataNameCell.push('-')};
			}
			dataNameCell.push(data['ops'][key]['startWork']);
			dataNameCell.push(data['ops'][key]['endWork']);
			let nd1 = 	new Date(dateM(dataNameCell[4]));
			let nd2 = 	new Date(dateM(dataNameCell[3]));
			dataNameCell.push(Math.floor((Date.parse(nd1)-Date.parse(nd2)))/ 86400000);
			dataNameCell.push(data['ops'][key]['bedОrders']);
			dataNameCell.push(data['ops'][key]['goodОrders']);
			dataNameCell.push(Number(dataNameCell[6])+Number(dataNameCell[7]));
			dataNameCell.push(((Number(dataNameCell[6])/Number(dataNameCell[7]))*100).toFixed(1));
		
		arrTest.push(dataNameCell);
			dataNameCell=[];
		}
		
		
		let indexNaemeArr = ["cell surname-col","cell name-col","cell patronymic-col","cell start-work","cell end-work","cell amount-of-days-work","cell bad-work","cell good-work","cell all-work","cell percent-bad-work"]
		//let tableUl = document.querySelector('.table-wrap');
			
		
	
		for(let i in arrTest){
		let tableRow = document.createElement('div');
			tableRow.className = 'table-row row';
			for(let indexName = 0; indexName < indexNaemeArr.length; indexName++){
				let cell = document.createElement('div');
					cell.className = indexNaemeArr[indexName];
					cell.innerHTML = arrTest[i][indexName]
					tableRow.appendChild(cell)
			}
		tableUl.appendChild(tableRow);
		}
	
	}

	function reqBeckend(rout) {
		fetch('/getData')
			.then(response => response.json())
			.then(commits => rout(commits));
	}


	btn.addEventListener('click', () => {
		reqBeckend(dbTable)
	})
	btn2.addEventListener('click', () => {
		reqBeckend(dbTable2)
	})
	
	btnBase.addEventListener('click', () => {
		tabledb.style.display = 'flex';
		tableInfo.style.display = 'none';
		reqBeckend(dbTable);
		btn.style.display = 'block';
		btn2.style.display = 'none';
	})
	
	btnInfo.addEventListener('click', () => {
		tabledb.style.display = 'none';
		tableInfo.style.display = 'flex';
		reqBeckend(dbTable2)
		btn.style.display = 'none';
		btn2.style.display = 'block';
	})
	
	
	function search(val){
			for(let key = 0; key < tableUl.childNodes.length; key++){
				if (tableUl.childNodes[key].children[0].innerHTML == val) {}
				else{
					tableUl.childNodes[key].innerHTML = '';
				};
			}
		
	}
	
	btnSearch.addEventListener('click',()=>{
		search(searchInput.value);
	})
	
}