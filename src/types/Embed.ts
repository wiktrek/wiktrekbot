import { EmbedAuthorOptions } from "eris"
interface Field {

}
class Embed {
    author = {} as EmbedAuthorOptions
    title = "You forgot to set the title"
    description = "You forgot to set the description"
    color = 0x000000
    fields = []
    setTitle(title: string) {
        this.title = title
    }
    setDescription(description: string) {
        this.description = description
    }
    setColor(color: number) {
        this.color = color
    }
    setAuthor(name: string, icon_url?: string,url?:string) {
        this.author = {
            name, icon_url, url
        }
    }
}
export default Embed;