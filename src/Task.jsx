import React, { useEffect, useState } from 'react'
import axios from 'axios'
function Task() {
    const [body, setBody] = useState('');
    const [edit, setEdit] = useState(false);
    let [details, setDetails] = useState({ id: "", name: "", age: "", hobbies: [], languages: [], course: "" });
    const [errors, setErrors] = useState({});
    const [form, setForm] = useState({})


    const clicking = async (e) => {
        e.preventDefault();
        let isValid = true;
        const newErrors = {};

        if (details.id === "") {
            newErrors.id = 'Id required';
            isValid = false;
        }
        if (details.name === "") {
            newErrors.name = 'Name required';
            isValid = false;
        }

        if (details.age === "") {
            newErrors.age = 'Age required';
            isValid = false;
        }

        if (!details.hobbies.length) {
            newErrors.hobbies = 'Select hobbies!';
            isValid = false;
        }
        if (!details.languages.length) {
            newErrors.languages = 'Select languages!';
            isValid = false;
        }
        if (!details.course) {
            newErrors.course = 'Select Course!'
            isValid = false
        }
        setErrors(newErrors);
        if (isValid) {
            let detail = JSON.stringify(details)
            const {data} = await axios
                .post('http://localhost:2000/details', detail)
            setBody(data)
            console.log(data);

            clearing();
        }
    }
    //    const clicking= async(e)=>{
    //     e.preventDefault();
    //     let detail=JSON.stringify(details)
    //     const pranya=await axios
    //     .post('http://localhost:2000/details',detail)
    //     setBody(pranya.data)
    //     console.log(pranya.data);

    //     clearing();


    //    }  



    // .then((data)=>{
    //     alert('done')
    //     setBody(data)
    //     clearing();    
    // })
    // .catch((err) => {
    //     console.log(err.message);
    //  });

    // const clicking=(e)=>{
    //     e.preventDefault();
    //     fetch('http://localhost:2000/details',{
    //     method:'POST',
    //     body:JSON.stringify(details)
    // })
    //     .then((res) => res.json())
    //     .then((data) => {
    //             alert("done");
    //             setBody(data);
    //             clearing()
    //          })
    //          .catch((err) => {
    //             console.log(err.message);
    //          });

    //     }
    const clearing = () => {
        details.id = ""
        details.name = ""
        details.age = ""
        details.hobbies = []
        details.languages = []
        details.course = ""
    }
    const editing = async (e) => {
        e.preventDefault();
        const id = details?.id
        console.log(id)
        
            const { data } = await axios
            .get(`http://localhost:2000/details/?id=${id}`).then((data)=>{
                setDetails(data[0]);
                setEdit(true)
            }).catch((err)=>{
                console.log('error')
            })
               
       
        
    }


    //     const editing=(e)=>{
    //         e.preventDefault();
    //         const id=details?.id
    //         console.log(":::id:::",id);
    //         fetch(`http://localhost:2000/details/?id=${id}`)
    //         .then(res=>res.json())
    //         .then(data => { 
    //                 console.log(data[0]);
    //                 setDetails(data[0])
    //                 setEdit(true)   
    //         })
    //         .catch((err)=>console.log("error"))      
    //  }
    useEffect(() => {
        setDetails({
            id: details.id,
            name: details.name,
            age: details.age,
            hobbies: details.hobbies,
            languages: details.languages,
            course: details.course
        });
    }, [])
    const updating = async (e) => {
        let detail = JSON.stringify(details)
        e.preventDefault();
        const { data } = await axios
            .put(`http://localhost:2000/details/${details.id}`, detail)
        alert('done')
        setDetails(data)
        setEdit(false)
        setDetails({
            id: '',
            name: '',
            age: '',
            hobbies: [],
            languages: [],
            course: ""

        })
    }

    //     const updating = (e) => {
    //         e.preventDefault();
    //         fetch(`http://localhost:2000/details/${details.id}`, {
    //             method: 'PUT',
    //             body: JSON.stringify(details)


    //     })
    //     .then((res) => res.json())
    //     .then((data) => {
    //             console.log(data)
    //             alert("updated Sucessfully");
    //             setDetails(data);
    //             setEdit(false)
    //             // clearing();
    //             setDetails({
    //                 id:"",
    //                 name:"",
    //                 age:"",
    //                 hobbies:[],
    //                 languages:[],
    //                 course:""
    //             })

    //          })
    //          .catch((err) => {
    //             console.log(err.message);
    //          });
    //  }
    const deleting = async (e) => {
        e.preventDefault();
        await axios
            .delete(`http://localhost:2000/details/${details.id}`).then(
                () => {
                    alert('deleted')
                    details.id = ''
                })
            .catch((err) =>{ console.log("error")
                 alert("Id not found")
            })


    };
    // const deleting = (e) => {
    //     e.preventDefault();
    //     fetch(`http://localhost:2000/details/${details.id}`, {
    //         method: 'DELETE'
    //     })
    //     .then(response => {
    //         console.log(response);
    //         return response.json();
    //     })
    //     .then(data => {
    //         console.log(data);
    //         alert('deleted')
    //         details.id=""
    //     })
    //     .catch(error => {
    //         console.error(error);
    //     });
    // };

    const handlechange = (e) => {
        let error = { ...form };
        const { name, value, checked } = e.target;
    
        setDetails(prevState => ({
            ...prevState,
            [name]: value,
        }));
        if (name === 'languages') {
            if (checked) {
                setDetails(prevState => ({
                    ...prevState,
                    [name]: value,
                }))}
        }
            
    
        if (name === 'hobbies') {
            let copy = { ...details };
    
            if (checked) {
                copy.hobbies.push(value);
            } else {
                copy.hobbies = copy.hobbies.filter((hobby) => hobby !== value);
            }
    
            if (copy.hobbies.length === 0) {
                error.hobbies = "complete hobbies";
            } else {
                error.hobbies = "";
            }
    
            setDetails(copy);
        } else {
            if (value === "") {
                if (name === 'id') {
                    error.id = "complete id";
                }
                if (name === 'name') {
                    error.name = "complete name";
                }
                if (name === 'age') {
                    error.age = "complete age";
                }
                if (name === 'course') {
                    error.course = "complete courses";
                }
            } else {
                error[name] = "";
            }
        }
    
        setForm(error,name);
    };

  

    return (
        <div>
            <h1>Task1</h1>
            <form >
                <table>
                    <tbody>
                        <tr>
                            <th><label>ID:</label></th>
                            <td><input type='text' name="id" value={details?.id} onChange={handlechange} /></td>
                            {errors.id && <span style={{ color: 'red' }}> {errors.id}</span>}
                            {form.id && <span style={{ color: 'red' }}>{form.id}</span>}


                        </tr>
                        <tr>
                            <th><label>Name:</label></th>
                            <td><input type='text' name="name" value={details?.name} onChange={handlechange} /></td>

                            {errors.name && <span style={{ color: 'red' }}>{errors.name}</span>}
                            {form.name && <span style={{ color: 'red' }}>{form.name}</span>}
                        </tr>
                        <tr>
                            <th><label>Age:</label></th>
                            <td><input type='text' name="age" value={details?.age} onChange={handlechange} /></td>
                            {errors.age && <span style={{ color: 'red' }}>{errors.age}</span>}
                            {form.age && <span style={{ color: 'red' }}>{form.age}</span>}
                        </tr>
                        <tr>
                            <th><label>Hobbies</label></th>
                            <td>
                                <input type='checkbox' name='hobbies' value="Playing" onChange={handlechange} checked={details?.hobbies && details.hobbies.includes("Playing")} />
                                <label>playing</label>
                                <br />
                                <input type='checkbox' name='hobbies' value="Eating" onChange={handlechange} checked={details?.hobbies && details.hobbies.includes("Eating")} />
                                <label>Eating</label>
                                <br />
                                <input type='checkbox' name='hobbies' value="Singing" onChange={handlechange} checked={details?.hobbies && details.hobbies.includes("Singing")} />
                                <label>Singing</label>
                            </td>
                            {errors.hobbies && <span style={{ color: 'red' }}>{errors.hobbies}</span>}
                            {form.hobbies && <span style={{ color: 'red' }}>{form.hobbies}</span>}
                        </tr>
                        <tr>
                            <th><label>languages:</label></th>
                            <td>
                                <input type='radio' name='languages' value="Telugu" onChange={handlechange} checked={details?.hobbies && details.languages.includes("Telugu")} />
                                <label>Telugu</label>
                                <br />
                                <input type='radio' name='languages' value="English" onChange={handlechange} checked={details?.hobbies && details.languages.includes("English")} />
                                <label>English</label>
                                <br />
                                <input type='radio' name='languages' value="Hindi" onChange={handlechange} checked={details?.hobbies && details.languages.includes("Hindi")} />
                                <label>Hindi</label>
                            </td>
                            {errors.languages && <span style={{ color: 'red' }}>{errors.languages}</span>}
                            {form.value && <span style={{ color: 'red' }}>{form.value}</span>}
                        </tr>
                        <tr>
                            <th><label for="course">Course:</label></th>
                            <td>
                                <select name="course" onChange={handlechange} value={details?.course}>
                                    <option value="">SELECT</option>
                                    <option value="Dental">Dental</option>
                                    <option value="B.Tech">B.Tech</option>
                                    <option value="Medical">Medical</option>
                                    <option value="Degree">Degree</option>
                                </select>
                            </td>
                            {errors.course && <span style={{ color: 'red' }}>{errors.course}</span>}
                            {form.course && <span style={{ color: 'red' }}>{form.course}</span>}
                        </tr>
                    </tbody>
                </table>
                <br />
                <button onClick={clicking} >Add</button>
                {edit ? (
                    <button onClick={updating}>Update</button>
                ) : (
                    <button onClick={editing}>edit</button>
                )}
                <button onClick={deleting}>Delete</button>
            </form>

        </div>
    );
}


export default Task

