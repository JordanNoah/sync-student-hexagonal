const institutionSeederData = [
    {
        uuid: "5dc2c983-3932-5bc7-b246-dc5f088c212e",
        name: "FUNIBER",
        fullname: "Fundación Universitaria Iberoamericana",
        abbreviation: "FBR",
        domain: "funiber.org",
        token: "e3fc5cf24c4a0a4932fffb64b0f3b45b",
        website: "http://192.168.100.177/moodle",
        restPath: "/webservice/rest/server.php",
        modality: 'virtual',
        translations: JSON.stringify({
            en_US: "Iberoamerican University Foundation",
            pt_BR: "Fundação Universitária Iberoamericana",
            pt_PT: "Fundação Universitária Iberoamericana",
            fr_FR: "Fondation Universitaire Ibéro-américaine",
            it_IT: "Fondazione Universitaria Iberoamericana",
            zh_CN: "伊比利亚美洲大学基金会"
        }),
        active: true,
        parent: null,
        importance: 5,
        created_at: new Date(),
        updated_at: new Date()
    },
    {
        uuid: "57699b8b-60a1-53a6-bd28-e0fd5f3ea9a9",
        name: "UNEATLANTICO",
        fullname: "Universidad Europea del Atlántico",
        abbreviation: "UEA",
        domain: "uneatlantico.es",
        token: "10028ff9d42ed0a13dba09526a439290",
        website: "http://localhost/moodle2",
        restPath: "/webservice/rest/server.php",
        modality: 'virtual',
        translations: JSON.stringify({
            en_US: "European University of the Atlantic",
            pt_BR: "Universidade Europeia do Atlântico",
            pt_PT: "Universidade Europeia do Atlântico",
            fr_FR: "Université européenne de l'Atlantique",
            it_IT: "Università Europea dell'Atlantico",
            zh_CN: "大西洋欧洲大学"
        }),
        active: true,
        parent: 1,
        importance: 2,
        created_at: new Date(),
        updated_at: new Date()
    },
    {
        uuid: "bbed52e6-5a60-56ad-940f-be6e6d8fe8a5",
        name: "UNIB",
        fullname: "Universidad Internacional Iberoamericana",
        abbreviation: "UNIB",
        domain: "unib.org",
        token: "87dce7128c39",
        website: "https://campus.unib.org",
        restPath: "/webservice/rest/server.php",
        modality: 'virtual',
        translations: JSON.stringify({
            en_US: "International Ibero-American University",
            pt_BR: "Universidade Internacional Iberoamericana",
            pt_PT: "Universidade Internacional Iberoamericana"
        }),
        active: false,
        parent: 1,
        importance: 1,
        created_at: new Date(),
        updated_at: new Date()
    },
    {
        uuid: "4fc725b9-e2b6-54dc-ac5d-ba9e5cdba862",
        name: "UNINI",
        fullname: "Universidad Internacional Iberoamericana",
        abbreviation: "UNINI-MX",
        domain: "unini.edu.mx",
        token: "87dce7128c39",
        website: "https://campus.funiber.org",
        restPath: "/webservice/rest/server.php",
        modality: 'virtual',
        translations: JSON.stringify({
            en_US: "International Ibero-American University",
            pt_BR: "Universidade Internacional Iberoamericana",
            pt_PT: "Universidade Internacional Iberoamericana"
        }),
        active: false,
        parent: 1,
        importance: 4,
        created_at: new Date(),
        updated_at: new Date()
    },
    {
        uuid: "d72ebd7f-3766-5f24-a3ff-f6c3bf56eb81",
        name: "UNINCOL",
        fullname: "Fundación Universitaria Internacional de Colombia",
        abbreviation: "UNINCOL",
        domain: "unincol.edu.co",
        token: "87dce7128c39",
        website: "https://campus.unincol.edu.co",
        restPath: "/webservice/rest/server.php",
        modality: 'virtual',
        translations: JSON.stringify({
            en_US: "International University Foundation of Colombia",
            pt_PT: "Fundação Universitária Internacional da Colômbia",
            pt_BR: "Fundação Universitária Internacional da Colômbia"
        }),
        active: false,
        parent: 1,
        importance: 3,
        created_at: new Date(),
        updated_at: new Date()
    },
    {
        uuid: "b905084c-75c3-5738-a4f0-e8cd73aef0c5",
        name: "UNIC",
        fullname: "Universidade Internacional do Cuanza",
        abbreviation: "UNIC",
        domain: "unic.co.ao",
        token: "87dce7128c39",
        website: "https://campus.unic.co.ao",
        restPath: "/webservice/rest/server.php",
        modality: 'virtual',
        translations: JSON.stringify({
            en_US: "International University of Cuanza",
            es_ES: "Universidad Internacional de Cuanza"
        }),
        active: false,
        parent: 1,
        importance: 7,
        created_at: new Date(),
        updated_at: new Date()
    },
    {
        uuid: "4f72cec2-fc61-5f68-89ff-c6da026d89f8",
        name: "UNIROMANA",
        fullname: "Universidad de la Romana",
        abbreviation: "UNIROMANA",
        domain: "uniromana.do",
        token: "87dce7128c39",
        website: "https://campus.uniromana.do",
        restPath: "/webservice/rest/server.php",
        modality: 'virtual',
        translations: JSON.stringify({
            en_US: "University of la Romana",
            es_ES: "Universidad de la Romana"
        }),
        active: false,
        parent: 1,
        importance: 6,
        created_at: new Date(),
        updated_at: new Date()
    }
]
export default institutionSeederData;