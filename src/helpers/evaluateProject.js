import { statsInteraction, getProjectStats, getProjectStatsFromUser } from '../services/index';

const evaluateProject = async (evaluation, openLoginNeededModal, openVerifyUserModal, setProject, project, setUserStats, userData, userStats) => {
    if (!userData) {
        openLoginNeededModal();
    } else if (!userData.verifiedEmail) {
        openVerifyUserModal();
    } else {
        let evaluationStatus = false;
        if (evaluation === 'likes') {
            evaluationStatus = !userStats.like;
        } else {
            evaluationStatus = !userStats.dislike;
        }
        await statsInteraction(localStorage.getItem('token'), project.id, evaluation, evaluationStatus);
        await getProjectStats(project.id)
            .then((response) => {
                setProject({ ...project, stats: response });
            })
        await getProjectStatsFromUser(localStorage.getItem('token'), project.id)
            .then((response) => {
                setUserStats(response);
            })
    }
}

export default evaluateProject;