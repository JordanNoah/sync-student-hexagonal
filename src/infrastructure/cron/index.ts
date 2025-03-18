import { CronJob } from 'cron';
import InscriptionDatasourceImpl from '@/infrastructure/datasources/inscription.datasource.impl';
import CronProcessorDatasourceImpl from '../datasources/cronProcessor.datasource.impl';

let syncInscriptionsRunning = false
let syncAcademicSelectionsRunning = false

export const syncInscriptions = CronJob.from({
    cronTime: '5 * * * * *',
    onTick: async () => {
        if (syncInscriptionsRunning) {
            console.log("Inscriptions sync already running")
            return
        }
        syncInscriptionsRunning = true
        console.log("Starting Inscription process...");
        try {
            await new CronProcessorDatasourceImpl().processInscriptions()
        } catch (error) {
            console.log("Error in syncInscriptions", error);
        }
        syncInscriptionsRunning = false
    },
})

export const syncAcademicSelections = CronJob.from({
    cronTime: '5 * * * * *',
    onTick: async () => {
        //if (syncAcademicSelectionsRunning) {
        //    console.log("Academic selections sync already running")
        //    return
        //}
        //syncAcademicSelectionsRunning = true
        //console.log("Starting academic element association process...");
        //const academicSelections = await new AcademicSelectionDataSourceImpl().getNotProcessedAfterNow()
        //for (const academicSelection of academicSelections) {
        //    const enrolment = await new EnrollmentDatasourceImpl().getByUuid(academicSelection.enrollmentUuid)
        //    if (!enrolment) {
        //        console.log(`Enrolment with id ${academicSelection.enrollmentUuid} does not exist`)
        //        continue
        //    }
        //    const inscription = await new InscriptionDatasourceImpl().getByUuid(enrolment.inscriptionUuid)
        //    if (!inscription) {
        //        console.log(`Inscription with id ${enrolment.inscriptionUuid} does not exist`)
        //        continue
        //    }
        //    console.log("inscription status: ", inscription.status);
        //    
        //    if (!inscription.status){
        //        console.log(`Inscription with id ${enrolment.inscriptionUuid} is not activated`)
        //        continue
        //    }
        //    if (!inscription.processed){
        //        console.log(`Inscription with id ${enrolment.inscriptionUuid} is not processed`)
        //        continue
        //    }
        //    const degrees = await new DegreeDataSourceImpl().getByInscriptionUuid(inscription.uuid)
        //    if (degrees.length === 0) {
        //        console.log(`Inscription with id ${inscription.id} does not have degrees`)
        //        continue
        //    }
//
        //    const institution = await new InstitutionDatasourceImpl().getByDegrees(degrees)
        //    if (!institution) {
        //        console.log(`Institution not found in degrees ${degrees.map(d => d.id)}`)
        //        continue
        //    }
//
        //    const studentSg = await askForStudentData(inscription.studentUuid)
        //    const studentEdu = await getStudentData(inscription.studentUuid, institution.abbreviation, institution.modality)
        //    const moodleStudent = StudentToMoodleDto.fromExternal(studentEdu, studentSg)
//
        //    if (!moodleStudent.id) {
        //        console.log(`Student with uuid ${inscription.studentUuid} does not have an id in moodle`)
        //        continue
        //    }
//
        //    await academicSelectionToMoodle(academicSelection, degrees, moodleStudent, inscription, institution)
        //    await new AcademicSelectionDataSourceImpl().setProcessed(academicSelection.id)
        //    console.log(`Academic selection with id ${academicSelection.id} processed`);
        //}
        //syncAcademicSelectionsRunning = false
    }
})