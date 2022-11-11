import { remark } from 'remark'
import html from 'remark-html'

const markdownToHtml = async (markdown: any) => {
  try {
    const result = await remark().use(html).process(markdown)
    return result.toString()
  } catch (e) {}
}
export default markdownToHtml
