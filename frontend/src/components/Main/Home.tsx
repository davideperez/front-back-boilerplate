// TODO: DELETE THIS.
const mockedUserData = [
  {
    name: 'Olivier', 
    lastName: ' Messiaen',
    email: 'olivier@gmail.com'
  }, 
  {
    name: 'Maurice', 
    lastName: ' Ravel',
    email: 'maurice@gmail.com'
  }
]

export const Home = () => {
  
  return (
    <div className='flex w-screen h-screen p-20 bg-gray-100 justify-normal align-middle'>
      <div className='flex flex-col w-full max-w-md bg-white p-6 rounded-lg shadow-md'>
        <h1 className='' >Home</h1>
        <div>
          <p>This is Home</p>
        </div>
      </div>
    </div>
  )
}

