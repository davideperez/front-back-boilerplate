import { useState } from 'react';

export const Home = () => {
  [form, setForm] = useState({text: "",})

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form sent: ', form);
  }

  return (
    <div className='flex w-screen h-screen p-20 bg-gray-100 justify-normal align-middle'>
      <div className='flex flex-col w-full max-w-md bg-white p-6 rounded-lg shadow-md'>
        <h1 className='' >Home</h1>
        <div>
          <form className='flex flex-col gap-1' onSubmit={handleSubmit}>
            <label htmlFor="text">Ingrese Texto</label>
            <input type="text" className='bg-slate-100 text-black' placeholder="Ingrese el texto aqui" />
          </form>
        </div>
      </div>
    </div>
  )
}

