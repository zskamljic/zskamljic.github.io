import Divider from "@/components/divider";
import Footer from "@/components/footer";
import Link from "next/link";
import FormattedDate from "@/components/formattedDate";
import {getSortedRantsData} from "../../lib/posts";

export default function Home() {
    const allRantsData = getSortedRantsData()

    return (
        <>
            <Divider/>
            <div className="container py-3">
                <header>
                    <div className="p-3 pb-md-4 mx-auto text-center">
                        <h1 className="display-4 fw-normal text-body-emphasis">Welcome</h1>
                        <p className="fs-5 my-4 text-body-secondary">Read about my experiences with tech, after years
                            spent developing apps for mobile and web platforms.
                            I have worked with multiple technologies (including, but not limited to: Android, iOS,
                            backend development, embedded devices)
                            and languages (C, C++, Java, PHP, JavaScript, Kotlin, Go, Rust, ...)</p>
                    </div>
                </header>
            </div>
            <main className="container p-3">
                <h3 className="mx-auto text-center">Rants</h3>
                <div className="p-3 mx-auto col-12 col-md-9 text-center">
                    <ul>
                        {allRantsData.map(({id, date, title}) => (
                            <li key={id}>
                                <Link href={`/${id}`} className="navigation">{title}</Link>
                                <br/>
                                <small>
                                    <FormattedDate dateString={date}/>
                                </small>
                            </li>
                        ))}
                    </ul>
                </div>
            </main>
            <Divider/>
            <div className="px-4 my-3 text-center">
                <h2 className="display-8 fw-bold text-body-emphasis">Contact</h2>
                <div className="col-lg-6 mx-auto">
                    <p className="lead mb-4">I may build a contact form here at some point, in the meantime, you can
                        try&nbsp;<a href="linkedin.com/in/zskamljic" className="navigation">LinkedIn</a></p>
                </div>
            </div>
            <Divider/>
            <Footer/>
        </>
    )
}
