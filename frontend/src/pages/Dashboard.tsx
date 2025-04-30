export function Dashboard() {
    const mockUser = {
      firstName: "David",
      lastName: "Pérez",
      email: "mock@email.com"
    }  
  
    return (
      <main>
        { mockUser.firstName}'s Dashboard 
      </main>
    )
  }