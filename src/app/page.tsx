export default function Home() {
    return (
        <>
            <header className="d-flex justify-content-center py-3">
                <ul className="nav nav-pills">
                    <li className="nav-item"><a href="#" className="nav-link active" aria-current="page">Home</a></li>
                    <li className="nav-item"><a href="#" className="nav-link disabled">Rants</a></li>
                </ul>
            </header>
            <div className="divider"></div>
            <div className="container py-3">
                <header>
                    <div className="p-3 pb-md-4 mx-auto text-center">
                        <h1 className="display-4 fw-normal text-body-emphasis">Welcome</h1>
                        <p className="fs-5 my-4 text-body-secondary">Read about my experiences with tech, after years spent developing apps for mobile and web platforms.
                            I have worked with multiple technologies (including, but not limited to: Android, iOS, backend development, embedded devices)
                            and languages (C, C++, Java, PHP, JavaScript, Kotlin, Go, Rust, ...)</p>
                        <p className="fs-5 my-4 text-body-tertiary">Here's what you can find on this page:</p>
                    </div>
                </header>
            </div>
            <main>
                <div className="row row-cols-l row-cols-md-2 mx-auto text-center">
                    <div className="col">
                        <div className="card mb-4 rounded-3 shadow-sm">
                            <div className="card-header py-3">
                                <h4 className="my-0 fw-normal">Home</h4>
                            </div>
                            <div className="card-body">
                                <ul className="list-unstyled mt-3 mb-4">
                                    <li>General info</li>
                                    <li>Contact info</li>
                                    <li>Coming soon?</li>
                                    <li>About</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card mb-4 rounded-3 shadow-sm">
                            <div className="card-header py-3">
                                <h4 className="my-0 fw-normal">Rants</h4>
                            </div>
                            <div className="card-body">
                                Complaints about:
                                <ul className="list-unstyled mt-3 mb-4">
                                    <li>Languages</li>
                                    <li>Technologies</li>
                                    <li>Software</li>
                                    <li>Design</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <div className="divider"></div>
            <div className="px-4 my-3 text-center">
                <h2 className="display-8 fw-bold text-body-emphasis">Contact</h2>
                <div className="col-lg-6 mx-auto">
                    <p className="lead mb-4">I may build a contact form here at some point, in the meantime, you can try <a href="linkedin.com/in/zskamljic">LinkedIn</a></p>
                </div>
            </div>
            <div className="divider"></div>
            <footer className="py-3 my-1">
                <p className="text-center text-body-secondary">© 2023 Zan Skamljic.</p>
                <p className="text-center text-body-tertiary">Opinions described here are my own. Experiences may vary with different levels of skill in different tech.</p>
            </footer>
        </>
    )
}
