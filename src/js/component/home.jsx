import React, {useState} from "react";

const Home = () => {

	const [newTask, setNewTask] = useState('');
    const [toDoTasks, setToDoTasks] = useState([]);
	const [user, setUser] = useState("");

	const createUser = () =>{
		fetch(`https://assets.breatheco.de/apis/fake/todos/user/${user}`, {
			method: 'POST',
			headers: {
				"Content-Type": "application/json"
			  },
			body: JSON.stringify([])
		})
		.then(resp=>{return resp.json()})
		.then(data=> {
			getTasks();
		})
		.catch((error) =>{
			// Handle error
		  console.log(error);
	  });
	}

	const getTasks= () =>{		
		fetch(`https://assets.breatheco.de/apis/fake/todos/user/${user}`, {
			method: 'GET',
			param: 'none',
			headers: {
				"Content-Type": "application/json"
			  },			
			})
		.then((response) => response.json())
		.then((data) =>{
			console.log(data);
			setToDoTasks(data);
		})
		.catch((error) =>{			  
			console.log(error);
		});			
	}

	const updateTasks = (newToDo) =>{
		const newToDos = [...toDoTasks, newToDo];
		fetch(`https://assets.breatheco.de/apis/fake/todos/user/${user}`, {
			method: 'PUT',
			headers: {
				"Content-Type": "application/json"
			  },
			body:JSON.stringify(newToDos)		
			})
		.then((response) => response.json())
		.then((data) =>{
			console.log(data);
			getTasks();
		})
		.catch((error) =>{			  
			console.log(error);
		})
	}
	const deleteTasks = (index) =>{
		const newToDos = toDoTasks.filter(
			(task, currentIndex) =>
				index !== currentIndex
		)
		fetch(`https://assets.breatheco.de/apis/fake/todos/user/${user}`, {
			method: 'PUT',
			headers: {
				"Content-Type": "application/json"
			  },
			body:JSON.stringify(newToDos)		
			})
		.then((response) => response.json())
		.then((data) =>{
			console.log(data);
			getTasks();
		})
		.catch((error) =>{
			 console.log(error);
		});

	}
	const deleteUser = () =>{
		fetch(`https://assets.breatheco.de/apis/fake/todos/user/${user}`, {
			method: 'DELETE',
			headers: {
				"Content-Type": "application/json"
			  }					
			})
		.then((response) => response.json())
		.then((data) =>{
			console.log(data);
			setUser("")
			setToDoTasks([])
		})
		.catch((error) =>{			 
			console.log(error);
		});
	}

	return(
		<div className="main">
			<div className="container">
				<h1>
					To Do List 📝
				</h1>				
				<ul>
					<li>
						<input 
							type="text" 
							onChange={(e) => setUser(e.target.value)}                 
							value={user}
							onKeyDown={(e) =>{
								if (e.key === 'Enter'){
									createUser();
								}
							}}							
							placeholder="Type your username">																
						</input>
					</li>
					<li>
						<input 
							type="text" 
							onChange={(e) => setNewTask(e.target.value)}                 
							value={newTask}
							onKeyDown={(e) =>{
								if (e.key === 'Enter'){
									updateTasks({label:newTask, done:false});
									setNewTask("");
								}
							}}
							placeholder="What needs to be done?😎">								
						</input>
					</li>												
					{toDoTasks.map((task, index) =>(
						<div key={index}>	
							<li>{task.label}
								<i 
								className="far fa-trash-alt pe-2"
								onClick={() =>
									deleteTasks(index)																	
								}></i>
							</li>
						</div>
					))}					
				</ul>
				<div className="footer">
					<strong>{toDoTasks.length}</strong> task(s) left
				</div>				
			</div>
			<div className="container">
				<div className="container" id="p1"></div>
				<div className="container" id="p2"></div>
			</div>
			<div className="container">
				<button 
					type="button" 
					className="btn btn-outline-danger"				
					onClick={()=>
						deleteUser(user)
					}
					> Delete the user
				</button>
			</div>			
			<div className="container-fluid" id="byebye">
				<p>Made with love and lots of patience 😅</p>
			</div>							
		</div>
    )
}
export default Home