import databaseService from '~~/server/services/database.service';

export default defineNitroPlugin(async () => {
    await databaseService.initialize();
});
