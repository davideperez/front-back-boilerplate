export default function Header() {
    return (
        <nav 
            style={{
                display: "flex", 
                flexDirection: "column", 
                width: "200px", 
                padding: "20px", 
                backgroundColor: "#f0f0f0"
            }}
        >
            <h1>Sidebar</h1>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/folders">Legajos</a></li>
                <li><a href="/users">Usuarios</a></li>
                <li><a href="/settings">Settings</a></li>
                <li><a href="/my-profile">Mi Perfil</a></li>
                <li><a href="/logout">Logout</a></li>
            </ul>
        </nav>
    )
}
