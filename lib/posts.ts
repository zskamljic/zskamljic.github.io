import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import {remark} from "remark";
import html from "remark-html";

const rantsDirectory = path.join(process.cwd(), 'rants')

export function getSortedRantsData(): { id: string, date: string, title: string }[] {
    const fileNames = fs.readdirSync(rantsDirectory)
    const allPostsData = fileNames.map((fileName) => {
        const id = fileName.replace(/\.md$/, '')
        const fullPath = path.join(rantsDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')

        const matterResult = matter(fileContents)

        return {
            id,
            date: matterResult.data.date,
            title: matterResult.data.title,
        }
    })

    return allPostsData.sort((a, b) => {
        if (a.date < b.date) {
            return 1
        } else {
            return -1
        }
    })
}

export async function getRantData(id: string) {
    const fullPath = path.join(rantsDirectory, `${id}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    const matterResult = matter(fileContents)

    const processedContent = await remark()
        .use(html)
        .process(matterResult.content)
    const contentHtml = processedContent.toString()

    return {
        id,
        contentHtml,
        date: matterResult.data.date,
        title: matterResult.data.title,
    }
}