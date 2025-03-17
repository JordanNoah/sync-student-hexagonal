export default class InstitutionDto {
    constructor(
        public uuid: string,
        public name: string,
        public fullName: string,
        public abbreviation: string,
        public domain: string,
        public website: string,
        public restPath: string,
        public modality: string,
        public translations: string,
        public token: string,
        public active: boolean = true,
        public parent: number | null = null,
    ) { }

    static create(object: { [key: string]: any }):[string?, InstitutionDto?] {
        const {uuid, name, fullname, abbreviation, domain, website, restPath, modality, translations, token, active, parent} = object
        if (!uuid) return ['uuid is required']
        if (!name) return ['name is required']
        if (!fullname) return ['fullname is required']
        if (!abbreviation) return ['abbreviation is required']
        if (!domain) return ['domain is required']
        if (!website) return ['website is required']
        if (!restPath) return ['restPath is required']
        if (!modality) return ['modality is required']
        if (!token) return ['token is required']
        return [undefined, new InstitutionDto(uuid, name, fullname, abbreviation, domain, website, restPath, modality, translations, token, active, parent)]
    }
}