import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import Team from '@/models/team';
import Task from '@/models/task';
import TeamTask from '@/models/teamTask';

Vue.use(Vuex);

const store = new Vuex.Store({
    plugins: [createPersistedState({ paths: ['showPonies'] })],
    state: {
        round: 0,
        roundTime: null,
        roundStart: null,
        roundProgress: null,
        // constructor({ name, ip, id, teamTasks, tasks, highlighted }) {
        //     this.name = name;
        //     this.ip = ip;
        //     this.id = id;
        //     this.highlighted = highlighted;
        //     this.taskModels = tasks;
        //     this.update(teamTasks);
        // }
        teams: null, //[new Team({name: 'Test', ip: '192.168.1.1', teamTasks: [], tasks: [], highlighted: false})],
        tasks: null,
        teamTasks: null,
        firstBloodScreen: false,
        firstBloodRowIndex: -1,
        showPonies: true,

        layout: 'default-layout',
        theme: false
    },
    mutations: {
        setRound(state, round) {
            state.round = round;
        },
        setRoundStart(state, roundStart) {
            state.roundStart = roundStart;
        },
        setRoundTime(state, roundTime) {
            state.roundTime = roundTime;
        },
        setRoundProgress(state, roundProgress) {
            state.roundProgress = roundProgress;
        },
        setTeams(state, teams) {
            state.teams = teams;
        },
        setTasks(state, tasks) {
            state.tasks = tasks;
        },
        setGameState(state, payload) {
            state.round = payload.round;
            state.roundStart = payload.roundStart;
            state.teamTasks = payload.teamTasks;
        },
        updateTeams(state) {
            if (state.teams !== null) {
                state.teams.forEach((team) => {
                    team.update(state.teamTasks);
                });
                state.teams = state.teams.sort(Team.comp);
            }
        },
        togglePonies(state) {
            state.showPonies = !state.showPonies;
        },
        setLayout(state, layout) {
            state.layout = layout;
        },
        toggleDarkTheme(state){
            state.theme = !state.theme;
        },
        toggleFirstBloodScreen(state) {
            state.firstBloodScreen = !state.firstBloodScreen;
        },
        setFirstBloodRowIndex(state, index){
            state.firstBloodRowIndex = index;
        }
    },
    getters: {
        layout(state) {
            return state.layout;
        },
    },
    actions: {
        fetchRoundTime: async function (context) {
            const {
                data: { round_time: roundTime },
            } = await this.$http.get('/client/config/');
            context.commit('setRoundTime', roundTime);
        },
        calculateRoundProgress: function (context) {
            const { round, roundTime, roundStart } = context.state;
            if (roundTime === null || roundStart === null || round < 1) {
                context.commit('setRoundProgress', null);
            }
            let roundProgress =
                (new Date().getTime() / 1000 - roundStart - roundTime) /
                roundTime;
            roundProgress = Math.min(roundProgress, 1);
            roundProgress = Math.floor(roundProgress * 100);
            context.commit('setRoundProgress', roundProgress);
        },
        handleUpdateScoreboardMessage(context, payload) {
            let {
                round,
                round_start: roundStart,
                team_tasks: teamTasks,
            } = payload;

            teamTasks = teamTasks.map((tt) => new TeamTask(tt));
            const state = { round, roundStart, teamTasks };

            context.commit('setGameState', state);
            context.commit('updateTeams');
        },
        handleInitScoreboardMessage(context, payload) {
            let { state, teams, tasks } = payload;

            tasks = tasks.map((task) => new Task(task)).sort(Task.comp);
            context.commit('setTasks', tasks);
            context.dispatch('handleUpdateScoreboardMessage', state);

            teams = teams
                .map(
                    (team) =>
                        new Team({
                            teamTasks: context.state.teamTasks,
                            tasks: context.state.tasks,
                            ...team,
                        })
                )
                .sort(Team.comp);

            context.commit('setTeams', teams);
        },
    },
});

export default store;
