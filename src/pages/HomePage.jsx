import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export function HomePage() {
      const user = useSelector(storeState => storeState.userModule.loggedinUser)

    return (
        <section className="home-page">
            <h1>Welcome to MissToy Shop!</h1>
            <div className="actions">
                <Link to="/toy">
                    <button>צפייה בצעצועים</button>
                </Link>
                {!user &&   
                <Link to="/login">
                    <button>התחברות</button>
                </Link>}
            </div>
        </section>

    )
}
