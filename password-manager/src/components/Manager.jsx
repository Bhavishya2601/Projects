import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const ref = useRef()
    const passwordRef = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setPasswordArray] = useState([])

    const getPasswords = async () => {
        let req = await fetch("https://password-manager-backend-liard.vercel.app/")
        let passwords = await req.json()
        setPasswordArray(passwords)
    }


    useEffect(() => {
        getPasswords()
    }, [])


    const copyText = (text) => {
        toast('Copied to Clipboard!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        navigator.clipboard.writeText(text)
    }


    const showPassword = () => {
        if (ref.current.src.includes("/eyecross.png")) {
            ref.current.src = "/eye.png"
            passwordRef.current.type = 'password'
        } else {
            ref.current.src = "/eyecross.png"
            passwordRef.current.type = 'text'
        }

    }

    const savePassword = async () => {
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
            setPasswordArray([...passwordArray, { ...form, id: uuidv4() }])
            let res = await fetch('http://localhost:3000/', { method: 'POST', headers: { "content-Type": "application/json" }, body: JSON.stringify({ ...form, id: uuidv4() }) })
            setform({ site: "", username: "", password: "" })
            toast('Password Saved!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } else {
            toast.error('Password not saved', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }

    const deletePassword = async (id) => {
        if (confirm('Do you want to delete this Password?')) {
            setPasswordArray(passwordArray.filter((item) => { return item.id !== id }))
            // localStorage.setItem("passwords", JSON.stringify(passwordArray.filter((item)=>{return item.id!==id})))
            let res = await fetch('http://localhost:3000/', { method: 'DELETE', headers: { "content-Type": "application/json" }, body: JSON.stringify({ id }) })
            toast('Password Deleted!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }

    const editPassword = async (id) => {
        setform(passwordArray.filter(item => item.id === id)[0])
        setPasswordArray(passwordArray.filter((item) => { return item.id !== id }))
        let res = await fetch('http://localhost:3000/', { method: 'DELETE', headers: { "content-Type": "application/json" }, body: JSON.stringify({ id }) })
    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }



    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition="Bounce"
            />
            <ToastContainer />

            <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div></div>


            <div className='mx-auto max-w-4xl py-8 px-1 sm:px-5 min-h-[calc(100vh-96px)]' >
                <div className='text-center'>
                    <div className='font-bold text-3xl '>
                        <span className='text-green-600'>&lt;</span>
                        Pass
                        <span className='text-green-600'>OP/&gt;</span>
                    </div>
                    <p className='text-green-800'>Your own password manager</p>
                </div>
                <div className='text-white flex flex-col p-4 gap-5'>
                    <input type="text" value={form.site} placeholder='Enter Website URL' onChange={handleChange} name="site" />
                    <div className='flex flex-col sm:flex-row justify-between gap-4 w-full'>
                        <input type="text" placeholder='Enter Username' value={form.username} onChange={handleChange} name="username" />
                        <div className='relative w-full'>
                            <input ref={passwordRef} type="password" placeholder='Enter Password' value={form.password} onChange={handleChange} name="password" />
                            <span className='absolute top-1 right-2 cursor-pointer' onClick={showPassword}>
                                <img ref={ref} width={20} src="/eye.png" alt="" />
                            </span>
                        </div>
                    </div>
                </div>
                <button className='gap-2 mx-auto flex justify-center items-center bg-green-400 rounded-full px-4 py-2 hover:bg-green-500 border-green-900 border' onClick={savePassword}>
                    <lord-icon
                        src="https://cdn.lordicon.com/jgnvfzqg.json"
                        trigger="hover"
                        style={{ "width": "25px", "height": "25px" }} >
                    </lord-icon>
                    Save
                </button>

                <div className="passwords py-6">
                    <h1 className='font-bold text-2xl p-2'>Your Passwords</h1>
                    {passwordArray.length === 0 && <div className='px-2 '> No Passwords to show </div>}
                    {passwordArray.length != 0 &&
                        <table className="table-auto w-full rounded-md overflow-hidden">
                            <thead>
                                <tr className='bg-green-800 text-white '>
                                    <th>Site</th>
                                    <th>Username</th>
                                    <th>Password</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody className='bg-green-100'>
                                {passwordArray.map((items, index) => {
                                    return <tr key={index}>
                                        <td className='underline overflow-hidden md:w-1/2 '>
                                            <div className='flex justify-center'>
                                                <span className='w-[45px] overflow-auto xs:w-auto'><a href={items.site} target='_blank'>{items.site}</a></span>
                                                <div className='cursor-pointer' onClick={() => { copyText(items.site) }}>
                                                    <lord-icon
                                                        style={{ "width": "25px", "height": "25px", "paddingTop": '4px', "paddingLeft": "3px" }}
                                                        src="https://cdn.lordicon.com/iykgtsbt.json"
                                                        trigger="hover" >
                                                    </lord-icon>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='md:w-1/5 '>
                                            <div className='flex justify-center'>
                                                <span className='xs:w-auto w-[45px] overflow-auto'>{items.username}</span>
                                                <div className='cursor-pointer' onClick={() => { copyText(items.username) }}>
                                                    <lord-icon
                                                        style={{ "width": "25px", "height": "25px", "paddingTop": '4px', "paddingLeft": "3px" }}
                                                        src="https://cdn.lordicon.com/iykgtsbt.json"
                                                        trigger="hover" >
                                                    </lord-icon>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='md:w-1/5 '>
                                            <div className='flex justify-center'>
                                                <span className='xs:w-auto w-[45px] overflow-auto'>{'*'.repeat(items.password.length)}</span>
                                                <div className='cursor-pointer' onClick={() => { copyText(items.password) }}>
                                                    <lord-icon
                                                        style={{ "width": "25px", "height": "25px", "paddingTop": '4px', "paddingLeft": "3px" }}
                                                        src="https://cdn.lordicon.com/iykgtsbt.json"
                                                        trigger="hover" >
                                                    </lord-icon>
                                                </div>
                                            </div>
                                        </td>
                                        <td className=' md:w-[10%]'>
                                            <span className='cursor-pointer mx-1' onClick={() => { editPassword(items.id) }}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/gwlusjdu.json"
                                                    trigger="hover"
                                                    style={{ "width": "25px", "height": "25px" }}>
                                                </lord-icon>
                                            </span>
                                            <span className='cursor-pointer mx-1' onClick={() => { deletePassword(items.id) }}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/skkahier.json"
                                                    trigger="hover"
                                                    style={{ "width": "25px", "height": "25px" }}>
                                                </lord-icon>
                                            </span>
                                        </td>
                                    </tr>
                                })}
                            </tbody>
                        </table>}
                </div>
            </div>

        </>
    )
}

export default Manager
