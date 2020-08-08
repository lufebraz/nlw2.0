module.exports = async function(db, { proffyValue, classValue, classScheduleValues }) {
    
    // Inserir dados na table de proffys
   const insertedProffy = await db.run(`
        INSERT INTO proffys (
            name,
            avatar,
            whatsapp,
            bio
        ) VALUES (
            "${proffyValue.name}",
            "${proffyValue.avatar}",
            "${proffyValue.whatsapp}",
            "${proffyValue.bio}"
        );
   `)
    
   const proffy_id = insertedProffy.lastID

   //inserir dados na table classes
   const insertedClass = await db.run(`
            INSERT INTO classes (
                subject,
                cost,
                proffy_id
            ) VALUES (
                "${classValue.subject}",
                "${classValue.cost}",
                "${proffy_id}"
            );
   `)

   const class_id = insertedClass.lastID

   // Inserir dados na table class_schedule
   const insertedAllClassScheduleValues = classScheduleValues.map((classScheduleValues) => {
       return db.run(`
            INSERT INTO class_schedule (
                class_id,
                weekday,
                time_from,
                time_to
            ) VALUES (
                "${class_id}",
                "${classScheduleValues.weekday}",
                "${classScheduleValues.time_from}",
                "${classScheduleValues.time_to}"
            );
       `)
   })

   //aqui vou executar todos os db.runs() das class_schedule
   await Promise.all(insertedAllClassScheduleValues)
}