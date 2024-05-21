import AppHeader from "../components/AppHeader"
import AppFooter from "../components/AppFooter"
import AppSidebar from "../components/AppSidebar"

const Homepage = () => {
    return (
        <div>
            <AppSidebar />
            <div className="wrapper d-flex flex-column min-vh-100">
                <AppHeader />
                <AppFooter />
            </div>
        </div>
    )
}

export default Homepage