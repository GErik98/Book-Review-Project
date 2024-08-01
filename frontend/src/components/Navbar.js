import { Link } from 'react-router-dom'

const Navbar = () => {

    return(
        <header>
            <div className="mt-4 mb-3">
                <Link to="/">
                    <h1>Book reviewer</h1>
                </Link>
            </div>
        </header>
    )
}

export default Navbar