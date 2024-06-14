import AppHeader from "../components/AppHeader"
import AppFooter from "../components/AppFooter"
import AppSidebar from "../components/AppSidebar"

const Homepage = () => {
    return (
        <div>
            <AppSidebar />
            <div className="wrapper d-flex flex-column min-vh-100">
                <AppHeader />
                <div className='body flex-grow-1'>
                    <div className='container-lg px-4'>
                        <div className='row'>
                            <div className="col-12">
                                <h2>Bem-vindo à ferramenta de administração do site 'Massaiá'!</h2>
                                <p>Nesta será possível realizar operações, como adicionar, editar ou apagar, nos vários items que fazem parte da base de dados do site. Todas as alterações realizadas irão refletir-se no próprio site.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <AppFooter />
            </div>
        </div>
    )
}

export default Homepage