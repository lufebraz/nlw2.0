const Database = require('./db')
const createProffy = require('./createProffy')

Database.then(async (db) => {
    // Inserir dados

    proffyValue = {
        name: 'Luiz Fernando',
        avatar: 'https://avatars1.githubusercontent.com/u/47341327?s=460&u=58e473e45301d05069688b20ca424d9682493c6a&v=4',
        whatsapp: '61982539019',
        bio: 'Instrutor de relações romanticas'
        
    }

    classValue = {
        subject: 1,
        cost: '40',
        // o proffy vira pelo banco de dados
    }

    classScheduleValues = [
        //class_id virar pelo bancos de dados apos cadastrarmos a class
        {
            weekday:1,
            time_from: 540,
            time_to: 1220
        },
        {
            weekday:0,
            time_from: 520,
            time_to: 1220
        }
    ]

    // await createProffy(db,{ proffyValue, classValue, classScheduleValues })
    // Consultar os dados inseridos

    // todos os proffys
    const selectedProffys = await db.all("SELECT * FROM proffys")
    // console.log(selectedProffys)

    //consultar as classes de um determinado professor
    // e trazer junto os dados do professor
    const selectClassesAndProffys = await db.all(`
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE classes.proffy_id = 2;
    `)
    // console.log(selectClassesAndProffys)

    const selectClassesSchedules = await db.all(`
        SELECT class_schedule.*
        FROM class_schedule
        WHERE class_schedule.class_id = "1"
        AND class_schedule.weekday = "0"
        AND class_schedule.time_from <= "620"
        AND class_schedule.time_to > "1219"
    `)

    console.log(selectClassesSchedules)
})