import { EmbedAuthorOptions } from "eris"
interface Field {
    name: string
    value: string
    inline?: boolean
}
class Embed {
    author = {} as EmbedAuthorOptions
    title = "You forgot to set the title"
    description = "You forgot to set the description"
    color = 0x000000
    fields: Field[] = []
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
    addField(field: Field) {
        this.fields.push(field)
    }
    addFields(fields: Field[]) {
        fields.map(f => {
            this.fields.push(f)
        })
    }
}
export default Embed;