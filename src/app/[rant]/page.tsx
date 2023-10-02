import {getRantData, getSortedRantsData} from "../../../lib/posts";
import Divider from "@/components/divider";
import Footer from "@/components/footer";
import FormattedDate from "@/components/formattedDate";
import Link from "next/link";

export async function generateMetadata({params}: { params: { rant: string } }) {
    const rantData = await getRantData(params.rant)

    return {
        title: rantData.title
    }
}

export default async function Rant({params}: { params: { rant: string, } }) {
    const rantData = await getRantData(params.rant)

    return (
        <>
            <Divider/>
            <div className="p-3 mx-auto col-12 col-md-6">
                <Link href="/" className="navigation">← Home</Link>
                <h1 className="mt-4">{rantData.title}</h1>
                <div className="text-secondary">
                    <FormattedDate dateString={rantData.date}/>
                </div>
                <div className="pt-4" dangerouslySetInnerHTML={{__html: rantData.contentHtml}}/>
            </div>
            <Divider/>
            <Footer/>
        </>
    )
}

export function generateStaticParams() {
    const rants = getSortedRantsData()

    return rants.map((rant) => ({
        rant: rant.id
    }))
}