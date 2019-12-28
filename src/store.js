/* eslint-disable import/prefer-default-export */
import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';

const fb = require('./firebaseConfig');

const VuexLocal = new VuexPersistence({
  storage: window.localStorage,
  reducer: state => ({
    studentProfile: state.studentProfile,
    studentProjectData: state.studentProjectData,
  }),
});

Vue.use(Vuex);

fb.auth.onAuthStateChanged((user) => {
  if (user) {
    store.commit('setCurrentUser', user);
    console.log({ 'fetching userdata....for: ': user.uid });
    store.dispatch('fetchStudentProfile');
    store.dispatch('fetchStudentProjectData');

    fb.studentsData.doc(user.uid).onSnapshot((doc) => {
      console.log({ 'studentData recieved: ': doc.data() });
      store.commit('setStudentProfile', doc.data());
    });

    fb.projectData.doc(store.state.studentProfile.project_id).onSnapshot((doc) => {
      console.log({ 'projectData recieved: ': doc.data() });
      store.commit('setStudentProjectData', doc.data());
    });
  }
});


export const store = new Vuex.Store({
  plugins: [VuexLocal.plugin],
  state: {
    currentUser: null,
    studentProfile: undefined,
    studentProjectData: undefined,
  },
  mutations: {
    setCurrentUser(state, val) {
      state.currentUser = val;
    },
    setStudentProfile(state, val) {
      state.studentProfile = val;
    },
    setStudentProjectData(state, val) {
      state.studentProjectData = val;
    },
  },
  actions: {
    clearData({ commit }) {
      commit('setCurrentUser', null);
      commit('setStudentProfile', undefined);
      commit('setStudentProjectData', undefined);
    },
    fetchStudentProfile({ commit, state }) {
      fb.studentsData
        .doc(state.currentUser.uid)
        .get()
        .then((res) => {
          commit('setStudentProfile', res.data());
        })
        .catch((err) => {
          commit.error(err);
          console.error(err);
          console.error('error getting Student Data');
        });
    },
    fetchStudentProjectData({ commit, state }) {
      fb.projectData
        .doc(state.studentProfile.project_id)
        .get()
        .then((res) => {
          commit('setStudentProjectData', res.data());
        })
        .catch((err) => {
          commit.error(err);
          console.error(err);
          console.error('error getting Project Data');
        });
    },
  },
});
